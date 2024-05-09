import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import UserModel from '../../../DB/model/user.model.js'
export const register = async (req, res) => {
    const { userName, email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (user) {
        return res.status(409).json({ message: "User already exists" });
    }

    // Using bcrypt to hash the password asynchronously and safely
    const saltRounds = parseInt(process.env.SALTROUND) || 10;  // Providing a default value for safety
    bcrypt.hash(password, saltRounds, async (err, hashedPassword) => {
        if (err) {
            return res.status(500).json({ message: "Error hashing password" });
        }

        try {
            const createUser = await UserModel.create({
                userName,
                email,
                password: hashedPassword  // Ensuring this is the correct field name according to your schema
            });
            return res.status(201).json({ message: "success", user: createUser });
        } catch (error) {
            return res.status(500).json({ message: "Error creating user", error });
        }
    });
};

export const login=async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    if(user.status=="Inactive"){
        return res.status(400).json({message:"Your account is blocked"});
    }
    const match=await bcrypt.compare(password,user.password);
    if(!match){
        return res.status(401).json({message:"Invalid password"});
    }
    const token=jwt.sign({id:user.id,role:user.role,status:user.status},process.env.LOGINSIG);
    return res.status(200).json({ message:"success",token});

}