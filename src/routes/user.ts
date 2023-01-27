import express from 'express';
import db from '../db';
import {
  adminProtect,
  enrichUser,
} from '../modules/auth';
import {
  deleteUser,
  getUsers,
  grantRoleToUser,
} from '../handlers/user';
import validators from '../modules/validators';


const app = express.Router();

app.get(
  '/users',
  enrichUser,
  adminProtect,
  getUsers
);

app.put(
  '/user/:userId/grant',
  enrichUser,
  adminProtect,
  validators.user.idInParam(),
  validators.user.roleInBody(),
  grantRoleToUser
);

app.delete(
  '/user/:userId',
  enrichUser,
  adminProtect,
  validators.user.idInParam(),
  deleteUser
);

export default app;
