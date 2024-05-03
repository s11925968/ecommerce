import { status } from "express/lib/response";
import mongoose, { model } from "mongoose";

const userSchema=new Schema({

    userName:{
        type:String,
        required:true,
        min:4,
        max:20
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        min:6,
        max:20
    },
    image:{
        type:Object
    },
    phone:{
        type:String,
    },
    address:{
        type:String,
    },
    confirmEmail:{
        type:Boolean,
        default:false,
    },
    gender:{
        type:String,
        enum:['male','female']
    },
    status:{
        type:String,
        default:'active',
        enum:['Active','inActive'],
    },
    role:{
        type:String,
        default:'user',
        enum:['user','admin']
    }
},{
    timestamps:true,
});

const UserModel=model('User',userSchema);
export default UserModel;
