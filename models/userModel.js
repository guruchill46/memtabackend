/////server/models/userModel.js
import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({

    name:{type:String, required:true},
    email:{type: String, required:true},
    password:{type: String, required:true},
    id:{type: String}

})

export const userModel = mongoose.model('userModel', UserSchema);