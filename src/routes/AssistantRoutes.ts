import { Router } from 'express';
import {
  createAssistant,
  listAssistants,
  updateAssistant,
  deleteAssistant,
} from '../controllers/AssistantController';

export const assistantRouter = Router();

assistantRouter.post('/', (req, res, next) => {
  Promise.resolve(createAssistant(req, res)).catch(next);
});

assistantRouter.get('/', (req, res, next) => {
  Promise.resolve(listAssistants(req, res)).catch(next);
});

assistantRouter.patch('/:id', (req, res, next) => {
  Promise.resolve(updateAssistant(req, res)).catch(next);
});

assistantRouter.delete('/:id', (req, res, next) => {
  Promise.resolve(deleteAssistant(req, res)).catch(next);
});



