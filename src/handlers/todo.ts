import { Request, RequestHandler } from "express";
import db from "../db";
import { comparePassword, createJWT, hashPassword } from "../modules/auth";

export const createToDoList: RequestHandler = async (req, res) => {
    try {
        if (!(req.body?.name)) {
            throw new Error('Invalid body provided')
        }
        const todo = await db.todoList.create({
            data: {
                name: req.body.name,
                userId: req.user.id,
            }
        });
        if (!todo) {
            return res.status(500).json({ error: "To do list creation failed" });
        }
        return res.status(201).json({ todo })
    } catch (e) {
        res.status(500).json({ error: e?.toString() })
    }
}

export const getToDoLists: RequestHandler = async (req, res) => {
    try {
        const todoLists = await db.todoList.findMany({ where: { userId: req.user.id } });
        if (!todoLists) {
            return res.status(500).json({ error: "To do list fetch failed" });
        }
        return res.status(200).json({ message: todoLists });
    } catch (e) {
        res.status(500).json({ error: e?.toString() })
    }
}

export const deleteToDoList: RequestHandler = async (req, res) => {
    try {
        const todoList = await db.todoList.findUnique({ where: { id: req.params.id } });
        if (!todoList) {
            return res.status(404).json({ error: "To do list not found" });
        }
        if (!(todoList.userId === req.user.id)) {
            return res.status(403).json({ error: "To do list access denied (forbidden)" });
        }
        const result = await db.todoList.delete({ where: { id: req.params.id } })
        if (!result) {
            return res.status(500).json({ error: "To do list deleted failed" });
        }
        return res.status(200).json({ message: "To do List deleted successfully " });
    }
    catch (e) {
        res.status(500).json({ error: e?.toString() })
    }
}

export const updateToDoList: RequestHandler = async (req, res) => {
    try {
        const todoList = await db.todoList.findUnique({ where: { id: req.params.id } });
        const { name } = req.body;
        if (!todoList) {
            return res.status(404).json({ error: "To do list not found" });
        }
        if (!(todoList.userId === req.user.id)) {
            return res.status(403).json({ error: "To do list access denied (forbidden)" });
        }
        const result = await db.todoList.update({
            where: {
                id: req.params.id,
            },
            data: {
                name,
            }
        });
        if (!result) {
            return res.status(500).json({ error: "To do list update failed" });
        }
        return res.status(200).json({ message: "To do List updated successfully " });
    }
    catch (e) {
        return res.status(500).json({ error: e?.toString() })
    }
}