import { Router } from 'express';
import { createConversation } from '../controllers/ConversationController';

export const conversationRouter = Router();

conversationRouter.post('/', (req, res, next) => {
  createConversation(req, res).catch(next);
});
