import { Router } from 'express';
import { createUser } from '../controllers/UserController';

export const userRouter = Router();

userRouter.post('/', (req, res, next) => {
  Promise.resolve(createUser(req, res)).catch(next);
});
