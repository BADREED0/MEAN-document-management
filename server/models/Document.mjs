import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema({
    emplacement: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    }, 
    extension: {
        type: String,
        enum: ['txt', 'doc', 'ppt', 'jpg', 'mp3', 'mp4', 'other'],
        required: true
    },
    type: {
        type: String,
        enum: ['text', 'document', 'powerpoint', 'image', 'sound', 'video', 'other'],
        required: true
    },
    taille: {
        type: Number,
        required: true,
    },
    proprietaire: {
        type: String,
        required: true
    }
   
});

export default mongoose.model('Document', documentSchema);