import express from 'express';
import { createPost, getAllPosts, getPostById, deletePost, updatePost } from '../handlers/post';

const app = express.Router();

app.post('/post', createPost);
app.get('/todoList', getAllPosts);
app.get('/todoList/:id', getPostById);
app.delete('/todoList/:id', deletePost);
app.put('/todoList/:id', updatePost);

export default app;