//Server/models/postMessage.js
import mongoose from 'mongoose'

const PostSchema = mongoose.Schema({
    name: String,
    title: String,
    message: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likes: {
        type: [String],
        default: []
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    comments: {
        type: [String],
         default:[]
        }
})

const PostMessage = mongoose.model('PostDetails', PostSchema);

export default PostMessage;