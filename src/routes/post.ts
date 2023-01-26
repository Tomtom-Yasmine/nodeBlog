import express from 'express';
import { enrichUser } from '../modules/auth';
import { createPost, getAllPosts, getPostById, deletePost, updatePost } from '../handlers/post';

const app = express.Router();

app.get('/posts', enrichUser, getAllPosts); // ?from=[Date]
app.get('/post/:id', enrichUser, getPostById);
app.post('/post', createPost);
app.put('/post/:id', enrichUser, updatePost);
app.delete('/post/:id', enrichUser, deletePost);

export default app;
