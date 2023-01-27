import { Role } from '.prisma/client';
import {
    body,
    param,
    query,
    validationResult,
} from 'express-validator';


export default {
    $validationResult: validationResult,
    user: {
        idInParam: () => param('userId').isString().withMessage('Invalid id provided'),
        usernameInBody: () => body('username').isString().isLength({ min: 2, max: 20 }).withMessage('Username must be between 2 and 20 characters long'),
        passwordInBody: () => body('password').isStrongPassword().withMessage('Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number and one special character'),
        roleInBody: () => body('role').isIn(Object.values(Role)).withMessage('Invalid role provided'),
    },
    post: {
        idInParam: () => param('postId').isString().withMessage('Invalid id provided'),
        titleInBody: () => body('title').isString().isLength({ min: 2 }).withMessage('Title must be at least 2 characters long'),
        contentInBody: () => body('content').isString().isLength({ min: 2 }).withMessage('Content must be at least 2 characters long'),
    },
    comment: {
        idInParam: () => param('commentId').isString().withMessage('Invalid id provided'),
        titleInBody: () => body('title').isString().isLength({ min: 2 }).withMessage('Title must be at least 2 characters long'),
        contentInBody: () => body('content').isString().isLength({ min: 2 }).withMessage('Content must be at least 2 characters long'),
    },
};
