import { Request, RequestHandler } from 'express';
import { Role } from '@prisma/client';
import validators from '../modules/validators';
import db from '../db';
import { comparePassword, createJWT, hashPassword } from '../modules/auth';

interface TypedRequestParam extends Request {
  body: {
    username?: string;
    password?: string;
  }
}

export const createNewUser: RequestHandler = async (req, res) => {
  try {
    const errors = validators.$validationResult(req);
    if (! errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const hash = await hashPassword(req.body.password);
    const user = await db.user.create({
      data: {
        username: req.body.username,
        password: hash
      }
    });

    const token = createJWT(user);

    return res.status(201).json({
      sessionToken: token,
      user: {
        ...user,
        password: undefined
      }
    });
  } catch (e) {
    res.status(400).json({ error: e });
  }
}

export const signIn: RequestHandler = async (req, res) => {
  try {
    const errors = validators.$validationResult(req);
    if (! errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = await db.user.findUnique({
      where: {
        username: req.body.username
      }
    });

    if (user) {
      const isValid = await comparePassword(req.body.password, user.password);

      if (!isValid) {
        return res.status(401).json({ error: 'Invalid password' });
      }

      const token = createJWT(user);
      return res.status(200).json({
        sessionToken: token
      });
    }
  } catch (e) {
    res.status(500);
    return console.error({ error: e });
  }
};

export const getUsers: RequestHandler = async (req, res) => {
  try {
    const users = await db.user.findMany({
      select: {
        id: true,
        username: true,
        role: true,
        createdAt: true,
        updatedAt: true,

        password: false
      }
    });
    if (users) {
      return res.status(200).json({ users });
    } else {
      return res.status(404).json({ error: 'Users not found' });
    }
  } catch (e) {
    console.error({ error: e });
    return res.status(500);
  }
};

export const grantRoleToUser: RequestHandler = async (req, res) => {
  try {
    const errors = validators.$validationResult(req);
    if (! errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const id = req.params.userId;
    const newRole = req.body.role as Role;
    const user = await db.user.update({
      where: { id },
      data: { role: newRole }
    });

    if (user) {
      return res.status(200).json();
    } else {
      return res.status(404).json({ error: 'User not found or not updated' });
    }
  } catch (e) {
    res.status(500);
    return console.error({ error: e });
  }
};

export const deleteUser: RequestHandler = async (req, res) => {
  try {
    const errors = validators.$validationResult(req);
    if (! errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const id = req.params.userId;
    const user = await db.user.delete({
      where: { id }
    });

    if (user) {
      return res.status(200).json();
    } else {
      return res.status(404).json({ error: 'User not found or not deleted' });
    }
  } catch (e) {
    res.status(500);
    return console.error({ error: e });
  }
};
