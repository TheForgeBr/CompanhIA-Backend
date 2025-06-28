import { Request, Response } from 'express';
import * as assistantService from '../services/assistantService';

export const createAssistant = async (req: Request, res: Response) => {
  try {
    const assistant = await assistantService.createAssistant(req.body);
    return res.status(201).json(assistant);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

export const listAssistants = async (_req: Request, res: Response) => {
  try {
    const assistants = await assistantService.listAssistants();
    return res.status(200).json(assistants);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateAssistant = async (req: Request, res: Response) => {
  try {
    const assistant = await assistantService.updateAssistant(req.params.id, req.body);
    return res.status(200).json(assistant);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

export const deleteAssistant = async (req: Request, res: Response) => {
  try {
    await assistantService.deleteAssistant(req.params.id);
    return res.status(204).send();
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};
