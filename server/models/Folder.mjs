import mongoose from 'mongoose';

const folderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  proprietaire: {
    type: String,
    required: true
  },
  documents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Document' 
    }
  ]

});

export default mongoose.model('Folder', folderSchema);
