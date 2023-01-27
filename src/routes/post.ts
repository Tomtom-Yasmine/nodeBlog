import express from 'express';
import { enrichUser } from '../modules/auth';
import { createPost, getAllPosts, getPostById, deletePost, updatePost } from '../handlers/post';
import {
    getPostComments,
    createPostComment,
    updatePostComment,
    deletePostComment,
} from '../handlers/comment';
import validators from '../modules/validators';


const app = express.Router();

app.get(
    '/posts',
    enrichUser,
    validators.post.$fromInQuery(),
    getAllPosts
);
app.get(
    '/post/:postId',
    enrichUser,
    validators.post.idInParam(),
    getPostById
);
app.post(
    '/post',
    validators.post.titleInBody(),
    validators.post.contentInBody(),
    createPost
);
app.put(
    '/post/:postId',
    enrichUser,
    validators.post.idInParam(),
    validators.post.titleInBody() || validators.post.contentInBody(),
    updatePost
);
app.delete(
    '/post/:postId',
    enrichUser,
    validators.post.idInParam(),
    deletePost
);

app.get(
    '/post/:postId/comments',
    enrichUser,
    validators.post.idInParam(),
    getPostComments
);
app.post(
    '/post/:id/comment',
    enrichUser,
    validators.post.idInParam(),
    validators.comment.titleInBody(),
    validators.comment.contentInBody(),
    createPostComment
);
app.put(
    '/comment/:commentId',
    enrichUser,
    validators.comment.idInParam(),
    validators.comment.titleInBody() || validators.comment.contentInBody(),
    updatePostComment
);
app.delete(
    '/comment/:commentId',
    enrichUser,
    validators.comment.idInParam(),
    deletePostComment
);

export default app;
