import { Router } from 'express';
import { createUser, updateUserProfile } from '../controllers/UserController';

export const userRouter = Router();

userRouter.post('/', (req, res, next) => {
  Promise.resolve(createUser(req, res)).catch(next);
});

userRouter.patch('/:id', (req, res, next) => {
  Promise.resolve(updateUserProfile(req, res)).catch(next);
});
