///////server/controller/conposts.js
import PostMessage from '../models/postMessage.js';
import mongoose from 'mongoose';

export const getPosts =async (req,res)=>{

    const {page} = req.query;

    try{
        const Limit = 8;
        const startIndex =(Number(page)-1)*Limit;
        const total = await PostMessage.countDocuments({});
        const posts=await PostMessage.find().sort({_id:-1}).limit(Limit).skip(startIndex);
        res.status(200).json({data: posts, currentPage: Number(page), NumberOfPages: Math.ceil(total/Limit)})
    }
    catch(error){
        res.status(404).json(error)
    }
}

export const getPostsBySearch = async (req,res)=>{

    const {searchQuery, tags} =req.query;
    // //console.log(searchQuery)
    // //console.log(tags)

    try{
        //const message = new RegExp (searchQuery, 'i');//mongodb syntax for query
        const title = new RegExp (searchQuery, 'i');
        //const tagss = new RegExp (tags.split(','), 'i');
        ////console.log(message)
        const posts = await PostMessage.find(
            //{$or:[{title},{message},{tags: {$in: tagss}}]}
            {$or: [{title}, {tags:{$in: tags.split(',')}}]}
        )
        res.json({data: posts})
    }
    catch(error){
        res.status(404).json(error)
    }

}

export const getPostd = async(req,res)=>{

    const {id} = req.params;
    try{
        const post = await PostMessage.findById(id);
        res.status(200).json(post);
    }
    catch(error){
        res.status(404).json(error)
    }

}

export const createPost=async (req,res)=>{
        const body =req.body;
        const newPost = new PostMessage({...body, creator: req.userId, createdAt: new Date().toISOString()})
    try{   
        await newPost.save();
        res.status(201).json(newPost)
    }
    catch(error){
        res.status(409).json(error)
    }
}

export const updatePost=async(req,res)=>{
    const {id}=req.params
    const body = req.body
    try{
        ////console.log(id)
        if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send('no post with that id')}
        const updatedPost=await PostMessage.findByIdAndUpdate(id,body,{new:true})
        res.status(201).json(updatedPost)
    }
    catch(error){
        console.log(error)
    }
}

export const deletePost=async(req,res)=>{
    const {id} = req.params
    try{
        if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send('no post with that id')
        await PostMessage.findByIdAndDelete(id)
        res.status(201).json({message:'post deleted successfully'})
        ////console.log('Deleted')
    }
    catch(error){
        console.log(error)
    }
}

export const likePost=async(req,res)=>{
    const {id}= req.params;
    try{
        if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send('no post with that id')
        if(!req.userId)
        return res.status(404).json({message: 'unauthorized'});
        const post = await PostMessage.findById(id)
        const index = await post.likes.findIndex((id)=>id===String(req.userId))
        if(index === -1){
            post.likes.push(req.userId)
        }
        else{
            post.likes= post.likes.filter((id)=>id!==String(req.userId))
        }
        const like = await PostMessage.findByIdAndUpdate(id, post, {new:true})
        res.status(201).json(like)
    }
    catch(error){
        console.log(error)
    }
}

export const commentPost = async (req,res)=>{

    const {id} = req.params;
    const {finalComment} = req.body;
    ////console.log(req.body)
    ////console.log(finalComment)
    try{
        const post = await PostMessage.findById(id);
        post.comments.push(finalComment);
        const updatedPost = await PostMessage.findByIdAndUpdate(id,post,{new:true});
        res.json(updatedPost);
    }
    catch(error){
        //console.log (error)
    }

}