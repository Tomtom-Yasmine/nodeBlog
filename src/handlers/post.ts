import { Request, RequestHandler } from "express";
import db from "../db";
import { comparePassword, createJWT, hashPassword } from "../modules/auth";

export const createPost: RequestHandler = async (req, res) => {
    try {
        console.log(req.user);
        if (!(req.body?.title)) {
            throw new Error('Invalid body provided');
        }
        const post = await db.post.create({
            data: {
                title: req.body.title,
                authorId: req.user.id,
            }
        });
        if (!post) {
            return res.status(500).json({ error: "Post list creation failed" });
        }
        return res.status(201).json({ post })
    } catch (e) {
        console.error({ error: e });
        return res.status(500).json();
    }
}

export const getAllPosts: RequestHandler = async (req, res) => {
    try {
        const posts = await db.post.findMany(
            (req.user.role === 'ADMIN') ? undefined :
                { where: { authorId: req.user.id } }
        );
        if (!posts) {
            return res.status(500).json({ error: "Post list fetch failed" });
        }
        return res.status(200).json({ message: posts });
    } catch (e) {
        console.error({ error: e });
        return res.status(500).json();
    }
}

export const getPostById: RequestHandler = async (req, res) => {
    try {
        const post = await db.post.findUnique({ where: { id: req.params.id } });
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }
        return res.status(200).json({ message: post });
    } catch (e) {
        console.error({ error: e });
        return res.status(500).json();
    }
}

export const deletePost: RequestHandler = async (req, res) => {
    try {
        const post = await db.post.findUnique({ where: { id: req.params.id } });
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }
        return res.status(200).json({ message: post });
    } catch (e) {
        console.error({ error: e });
        return res.status(500).json();
    }
}


export const updatePost: RequestHandler = async (req, res) => {
    try {
        const post = await db.post.findUnique({ where: { id: req.params.id } });
        const { title } = req.body;
        if (!post) {
            return res.status(404).json({ error: "Post list not found" });
        }
        if (!(post.authorId === req.user.id)) {
            return res.status(403).json({ error: "Post access denied (forbidden)" });
        }
        const result = await db.post.update({
            where: {
                id: req.params.id,
            },
            data: {
                title,
            }
        });
        if (!result) {
            return res.status(500).json({ error: "Post update failed" });
        }
        return res.status(200).json({ message: "Post updated successfully " });
    }
    catch (e) {
        console.error({ error: e });
        return res.status(500).json();
    }
}