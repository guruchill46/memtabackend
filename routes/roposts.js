//////server/routes/roposts.js
import express from 'express';
import {getPosts, getPostsBySearch, createPost, updatePost, deletePost, likePost, getPostd, commentPost} from '../controllers/conposts.js';
import mauth from '../middlewares/mauth.js';

const router = express.Router();

router.get('/', getPosts)
router.get('/search', getPostsBySearch)
router.get('/:id', getPostd)
router.post('/',mauth, createPost)
router.patch('/:id', updatePost)
router.delete('/:id', deletePost)
router.patch('/:id/likePost',mauth, likePost);
router.post(`/:id/commentPost`, commentPost);

export default router;