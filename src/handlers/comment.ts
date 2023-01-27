import { Role } from "@prisma/client";
import { RequestHandler } from "express";
import db from "../db";


export const getPostComments: RequestHandler = async (req, res) => {
    try {
        const comments = await db.comment.findMany({
            where: {
                postId: req.params.id,
            }
        });
        if (! comments) {
            return res.status(500).json({ error: "Comment list fetch failed" });
        }
        return res.status(200).json({ comments });
    } catch (e) {
        console.error({ error: e });
        return res.status(500).json();
    }
}

export const createPostComment: RequestHandler = async (req, res) => {
    try {
        if (! (req.body?.title && req.body?.content)) {
            return res.status(400).json({ error: 'Invalid body provided' });
        }
        const comment = await db.comment.create({
            data: {
                title: req.body.title,
                content: req.body.content,
                authorId: req.user.id,
                postId: req.params.id,
            }
        });
        if (! comment) {
            return res.status(500).json({ error: 'Comment creation failed' });
        }
        return res.status(201).json({ comment });
    } catch (e) {
        console.error({ error: e });
        return res.status(500).json();
    }
}

export const updatePostComment: RequestHandler = async (req, res) => {
    try {
        if (! (req.body?.title || req.body?.content)) {
            return res.status(400).json({ error: "Invalid body provided" });
        }
        const comment = await db.comment.findUnique({ where: { id: req.params.commentId } });
        if (! comment || comment.authorId !== req.user.id) {
            return res.status(403).json({ error: "Post does not exist or you are not its owner" });
        }
        const updatedComment = await db.comment.update({
            where: {
                id: comment.id,
            },
            data: {
                title: req.body.title,
                content: req.body.content,
            }
        });
        if (! updatedComment) {
            return res.status(500).json({ error: "Comment update failed" });
        }
        return res.status(200).json({ message: "Comment updated successfully" });
    }
    catch (e) {
        console.error({ error: e });
        return res.status(500).json();
    }
}

export const deletePostComment: RequestHandler = async (req, res) => {
    try {
        const comment = await db.comment.findUnique({ where: { id: req.params.commentId } });
        if (! comment || (comment.authorId !== req.user.id && req.user.role !== Role.ADMIN)) {
            return res.status(403).json({ error: "Comment does not exist or you are not its owner" });
        }
        const deletedComment = await db.comment.delete({ where: { id: comment.id } });
        if (! deletedComment) {
            return res.status(500).json({ error: "Comment deletion failed" });
        }
        return res.status(200).json({ comment: deletedComment });
    } catch (e) {
        console.error({ error: e });
        return res.status(500).json();
    }
}
