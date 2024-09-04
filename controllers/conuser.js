/////////server/controllers/conuser.js
import {userModel} from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const signin =async (req,res)=>{
    try{
        const {email, password}= req.body;
        const existingUser = await userModel.findOne({email})
        if(!existingUser)
        return res.status(404).json("user doesn't exist. Please Sign up")
        const passwordcheck =await bcrypt.compare(password, existingUser.password)
        if (!passwordcheck)
        return res.status(404).json('incorrect password')
        
        const token = jwt.sign({email:existingUser.email, id:existingUser._id}, 'vr46vr46', {expiresIn:'1h'})
        res.status(201).json({result:existingUser, token})

    }
    catch(error){
        console.log(error)
    }
}

export const signup = async (req,res)=>{
    try{
    const {email, password, confirmPassword, firstName, lastName} = req.body;

    const existingUser= await userModel.findOne({email})
    if(existingUser)
    return res.status(201).json('user already exists')
    if(password!==confirmPassword)
    return res.status(401).json('repeat password does not match');
    const hashedPassword= await bcrypt.hash(password, 12)
    const result = await userModel.create({email, password: hashedPassword, name:`${firstName} ${lastName}`})
    const token = jwt.sign({email, id:result._id}, 'vr46vr46', {expiresIn: '1h'})
    res.status(201).json({result, token})
}

    catch(error){
        console.log(error)
    }

}