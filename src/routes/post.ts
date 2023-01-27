import express from 'express';
import { enrichUser } from '../modules/auth';
import { createPost, getAllPosts, getPostById, deletePost, updatePost } from '../handlers/post';
import {
    getPostComments,
    createPostComment,
    updatePostComment,
    deletePostComment,
} from '../handlers/comment';

const app = express.Router();

app.get('/posts', enrichUser, getAllPosts); // ?from=[Date]
app.get('/post/:id', enrichUser, getPostById);
app.post('/post', createPost);
app.put('/post/:id', enrichUser, updatePost);
app.delete('/post/:id', enrichUser, deletePost);

app.get('/post/:id/comments', enrichUser, getPostComments);
app.post('/post/:id/comment', enrichUser, createPostComment);
app.put('/comment/:commentId', enrichUser, updatePostComment);
app.delete('/comment/:commentId', enrichUser, deletePostComment);

export default app;
