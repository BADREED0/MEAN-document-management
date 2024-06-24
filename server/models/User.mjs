import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    fullName: {
        type: String
    },
    username:  {
        type: String,
        required: true,
        unique: true
    }, 
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    accountStatus: {
        type: String,
        enum: ['active', 'suspended'],
        default: 'active'
    }
   
});

export default mongoose.model('User', userSchema);