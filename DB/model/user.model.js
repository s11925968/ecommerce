import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 20
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    image: {
        type: Object
    },
    phone: {
        type: String,
    },
    address: {
        type: String,
    },
    confirmEmail: {
        type: Boolean,
        default: false,
    },
    gender: {
        type: String,
        enum: ['male', 'female']
    },
    status: {
        type: String,
        default: 'Active', // Match the case used in the enum
        enum: ['Active', 'Inactive'] // Corrected case sensitivity
    },
    role: {
        type: String,
        default: 'user', // Match the case used in the enum
        enum: ['user', 'admin']
    }
}, {
    timestamps: true
});

const UserModel = model('User', userSchema);
export default UserModel;
