import mongoose, { Types, model } from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        min: 4,
        max: 20
    },
    image:{
        type:Object,
        required: true,
    },
    description: {
        type: String,
    },
    slug:{
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: 'active',
        enum: ['active', 'inactive'],
    },
    createdBy:{
        type:Types.ObjectId,ref:'User',
    },
    updatedBy:{type:Types.ObjectId,ref:'User'}
}, {
    timestamps: true,
});

const categoryModel = model('Category', categorySchema);
export default categoryModel;