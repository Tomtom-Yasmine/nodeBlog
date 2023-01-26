import { User } from '@prisma/client';
import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import db from '../db';

export const createJWT = (user: User) => {
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET as string
  );

  return token
}

export const protect: RequestHandler = (req, res, next) => {
  const bearer = req.headers.authorization

  if(!bearer) {
    return res.status(401).json({ message: 'Not authorized' })
  }
  
  const [, token] = bearer.split(' ')
  
  if (!token) {
    return res.status(401).json({ message: 'Not authorized' })
  }
  
  try {
    if (typeof process.env.JWT_SECRET !== 'string') {
      return res.status(401).json({ message: 'Not authorized' })
    }
    const payload = jwt.verify(token, process.env.JWT_SECRET) as User
    req.user = payload
    return next()
  } catch(e) {
    return res.status(401).json({ message: 'Not authorized' })
  }
};

export const adminProtect: RequestHandler = (req, res, next) => {
  console.log({ reqUser: req.user });
  if (req.user?.role !== 'ADMIN') {
    return res.status(401).json({ message: 'Admin privileges required' });
  }
  return next();
};

export const enrichUser: RequestHandler = async (req, res, next) => {
  const id = req.user?.id;
  if (! id) {
    return res.status(400).json({ error: 'Invalid body provided' });
  }
  const user = await db.user.findUnique({ where: { id } });

  if (! user) {
    return res.status(404).json({ error: 'User not found' });
  }

  req.user = user;
  return next();
};

export const comparePassword = (password: string, hash: string) => {
  return bcrypt.compare(password, hash)
}

export const hashPassword = (password: string) => {
  return bcrypt.hash(password, 10)
}
