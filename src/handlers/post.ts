import { Role } from "@prisma/client";
import { Request, RequestHandler } from "express";
import db from "../db";
import { comparePassword, createJWT, hashPassword } from "../modules/auth";
import dayjs from 'dayjs';

export const createPost: RequestHandler = async (req, res) => {
    try {
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
        const { from } = req.query;
        const fromDate = from ? new Date((+from) * 1000) : null;
        console.log({ fromDate });

        let where = {};
        if (fromDate) {
            where = {
                ...where,
                createdAt: {
                    gte: fromDate
                }
            }
        }
        if (req.user.role !== Role.ADMIN) {
            where = {
                ...where,
                authorId: req.user.id
            };
        }
        const posts = await db.post.findMany(
            (where && { where }) || undefined
        );
        if (! posts) {
            return res.status(500).json({ error: "Post list fetch failed" });
        }
        return res.status(200).json({ posts });
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
        return res.status(200).json({ post });
    } catch (e) {
        console.error({ error: e });
        return res.status(500).json();
    }
}

export const deletePost: RequestHandler = async (req, res) => {
    try {
        const post = await db.post.findUnique({ where: { id: req.params.id } });
        if (! post || (post.authorId !== req.user.id && req.user.role !== Role.ADMIN)) {
            return res.status(403).json({ error: "Post does not exist or you are its owner" });
        }
        const deletedPost = await db.post.delete({ where: { id: post.id } });
        if (! deletedPost) {
            return res.status(500).json({ error: "Post deletion failed" });
        }
        return res.status(200).json({ post: deletedPost });
    } catch (e) {
        console.error({ error: e });
        return res.status(500).json();
    }
}

export const updatePost: RequestHandler = async (req, res) => {
    try {
        if (! req.body?.title) {
            console.error({ error: "Invalid body provided" });
            return res.status(400).json({ error: "Invalid body provided" });
        }
        const post = await db.post.findUnique({ where: { id: req.params.id } });
        if (! post || (post.authorId !== req.user.id && req.user.role !== Role.ADMIN)) {
            return res.status(403).json({ error: "Post does not exist or you are its owner" });
        }
        const updatedPost = await db.post.update({
            where: {
                id: post.id,
            },
            data: {
                title: req.body.title
            }
        });
        if (! updatedPost) {
            return res.status(500).json({ error: "Post update failed" });
        }
        return res.status(200).json({ message: "Post updated successfully" });
    }
    catch (e) {
        console.error({ error: e });
        return res.status(500).json();
    }
}
