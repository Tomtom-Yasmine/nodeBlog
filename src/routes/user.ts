import express from 'express';
import db from '../db';
import {
  adminProtect,
  enrichUser,
} from '../modules/auth';
import {
  deleteUser,
  grantRoleToUser,
} from '../handlers/user';

const app = express.Router();

app.get(
  '/grant/:id/:newRole',
  enrichUser,
  adminProtect,
  grantRoleToUser
);

app.delete(
  '/user/:id',
  enrichUser,
  adminProtect,
  deleteUser
);

app.get('/user', (req, res) => {
  res.status(200).json({ message: 'Hello user' });
});

export default app;
