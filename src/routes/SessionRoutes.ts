import { Router } from 'express';
import {
  createSession,
  listSessions,
  updateSession,
  deleteSession,
} from '../controllers/SessionController';

export const sessionRouter = Router();

sessionRouter.post('/', (req, res, next) => {
  Promise.resolve(createSession(req, res)).catch(next);
});

sessionRouter.get('/', (req, res, next) => {
  Promise.resolve(listSessions(req, res)).catch(next);
});

sessionRouter.patch('/:id', (req, res, next) => {
  Promise.resolve(updateSession(req, res)).catch(next);
});

sessionRouter.delete('/:id', (req, res, next) => {
  Promise.resolve(deleteSession(req, res)).catch(next);
});
