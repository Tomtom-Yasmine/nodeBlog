import express from 'express';
import { createPost, getAllPosts, getPostById, deletePost, updatePost } from '../handlers/post';

const app = express.Router();

app.post('/post', createPost);
app.get('/allPosts', getAllPosts);
app.get('/post/:id', getPostById);
app.delete('/post/:id', deletePost);
app.put('/post/:id', updatePost);

export default app;