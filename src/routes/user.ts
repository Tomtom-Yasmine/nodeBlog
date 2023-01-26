import express from 'express';
import db from '../db';
import {
  adminProtect,
  enrichUser,
} from '../modules/auth';
import {
  grantRoleToUser,
} from '../handlers/user';

const app = express.Router();

app.get(
  '/grant/:id/:newRole',
  enrichUser,
  adminProtect,
  grantRoleToUser
);

app.get('/user', (req, res) => {
  res.status(200).json({ message: 'Hello user' });
});

export default app;
