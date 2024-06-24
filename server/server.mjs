import express from 'express';
import cors from 'cors';
import User from './models/User.mjs';
import mongoose from 'mongoose';
import  Document  from './models/Document.mjs';
import Folder from './models/Folder.mjs';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const uri = `mongodb://localhost:27017/documentStore`;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(
        ()=>{
            console.log('connected');
        }
    )
    .catch(
        (err)=>{
            console.log(err);
        }
    )

app.post('/login', async(req, res) => {
    const { email, password } = req.body;
    console.log(`Login request from email => ${email}  pwd => ${password}`);
    try{
        const user = await User.findOne({ email, password });
        if(user){
            if(user.accountStatus === 'suspended'){
                return res.status(401).json({ message: "Your account is suspended" });
            }
            return res.json(user)
        }else{
            return res.status(400).json({ message: "Invalid email or password" });
        }
    }catch(error){
        console.error("Error during login: ", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

app.post('/signup', async(req, res) => {
    const {full_name, username, email, password} = req.body;
    try {
        const newUser = new User({full_name, username, email, password});
    
        await newUser.save();
    
        return res.status(201).json({ message: "User registered successfully" });
    
    }catch(error){
        console.error("Error during sign-up: ", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

app.get('/users', async (req, res) => {
    try {
        const users = await User.find({ role : "user" });
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/users', async (req, res) => {
    const { username } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!user.accountStatus) {
            return res.status(500).json({ message: 'User account status is missing' });
        }
        user.accountStatus = user.accountStatus === 'active' ? 'suspended' : 'active';
        await user.save();

        res.status(200).json({ message: 'User status updated successfully', user });
    } catch (error) {
        console.error('Error updating user status:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.delete('/users/:username', async (req, res) => {
    const { username } = req.params;

    try {
        const user = await User.findOne({username});

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await User.deleteOne({username});
        await Document.deleteMany({proprietaire : username});
        await Folder.deleteMany({proprietaire : username});

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/document', async(req, res) => {
    const {emplacement, name, extension, type, taille, proprietaire} = req.body;
    try {
        const folder = await Folder.findOne({ name : emplacement });
        if(!folder){
            return res.status(400).json({ message: "Folder does not exist" });
        }
        const newDocument = new Document({emplacement, name, extension, type, taille, proprietaire});
    
        await newDocument.save();

        folder.documents.push(newDocument._id);
        await folder.save();
    
        return res.status(201).json({ message: "Document registered successfully" });
  
    }catch(error){
        console.error("Error saving document: ", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

app.post('/documents', async (req, res) => {
    const { username } = req.body;
    try {
      const documents = await Document.find({ proprietaire : username });
      res.json(documents);
    } catch (error) {
      console.error('Error fetching documents:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
});

app.put('/documents/:id', async (req, res) => {
    try {
        const documentId = req.params.id;
        const updatedDocumentData = req.body;
    
        const updatedDocument = await Document.findOneAndUpdate({name: documentId}, updatedDocumentData, { new: true });
    
        if (!updatedDocument) {
            return res.status(404).json({ message: 'Document not found' });
        }
    
        res.status(200).json(updatedDocument);
        } catch (error) {
        console.error('Error updating document:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
})

app.delete('/documents/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const doc = await Document.findOne({name : id});

        if (!doc) {
            return res.status(404).json({ message: 'Document not found' });
        }

        const folder = await Folder.findOne({ documents: doc._id });

        if (!folder) {
            return res.status(404).json({ message: 'Folder not found for the document' });
        }
    
        folder.documents = folder.documents.filter(documentId => !documentId.equals(doc._id));
        await folder.save();

        await Document.deleteOne({name : id});

        res.status(200).json({ message: 'Document deleted successfully', doc });
    } catch (error) {
        console.error('Error deleting document:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/folder', async(req, res) => {
    const {name, proprietaire, documents} = req.body;
    try {
        const newFolder = new Folder({name, proprietaire, documents});
    
        await newFolder.save();
    
        return res.status(201).json({ message: "Folder registered successfully." });    
    }catch(error){
        console.error("Error saving folder: ", error);
        return res.status(500).json({ message: "Internal server error." });
    }
});

app.post('/folders', async (req, res) => {
    const { username } = req.body;
    try {
        const foldersData = await Folder.find({ proprietaire: username }).populate('documents').exec();

        //moi qui a commente ce code ci-dessous parce que foldersData avec .populate('documents').exec(); est suffisable car affiche tous le contenu des dossiers pas seulement l'id 

        // const folders = foldersData.map(folderData => ({
        //     name: folderData.name,
        //     proprietaire: folderData.proprietaire,
        //     documents: folderData.documents.map(documentData => ({
        //         emplacement: documentData.emplacement,
        //         name: documentData.name,
        //         extension: documentData.extension,
        //         type: documentData.type,
        //         taille: documentData.taille,
        //         proprietaire: documentData.proprietaire
        //     }))
        // }));
    
        res.json(foldersData);
    } catch (error) {
        console.error('Error fetching folders:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.delete('/folders/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const folder = await Folder.findOne({name : id});

        if (!folder) {
            return res.status(404).json({ message: 'Folder not found' });
        }

        await Folder.deleteOne({name : id});

        await Document.deleteMany({emplacement : id});

        res.status(200).json({ message: 'Folder deleted successfully' });
    } catch (error) {
        console.error('Error deleting folder:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.put('/folders/:id', async (req, res) => {
    try {
        const folderId = req.params.id;
        const { newName } = req.body;
    
        const updatedFolder = await Folder.findOneAndUpdate({name: folderId}, {name: newName}, { new: true });
    
        if (!updatedFolder) {
            return res.status(404).json({ message: 'Folder not found' });
        }

        await Document.updateMany({ emplacement: folderId }, { emplacement: newName });
    
        res.status(200).json({ message : "Folder updated successfully" });
    } catch (error) {
        console.error('Error updating folder:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});