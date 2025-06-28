import { Router } from 'express';
import { getFriendSuggestions } from '../controllers/FriendController';

export const friendRouter = Router();

friendRouter.get('/suggestions', (req, res, next) => {
  Promise.resolve(getFriendSuggestions(req, res)).catch(next);
});
