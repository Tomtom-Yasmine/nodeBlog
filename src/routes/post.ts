import express from 'express';
import { enrichUser } from '../modules/auth';
import { createPost, getAllPosts, getPostById, deletePost, updatePost } from '../handlers/post';

const app = express.Router();

app.post('/post', createPost);
app.get('/allPosts', enrichUser, getAllPosts);
app.get('/post/:id', enrichUser, getPostById);
app.delete('/post/:id', enrichUser, deletePost);
app.put('/post/:id', enrichUser, updatePost);

export default app;
