import { Request, Response } from 'express';
import * as sessionService from '../services/sessionService';

export const createSession = async (req: Request, res: Response) => {
  try {
    const session = await sessionService.createSession(req.body);
    return res.status(201).json(session);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

export const listSessions = async (req: Request, res: Response) => {
  try {
    const sessions = await sessionService.listSessions(req.query.userId as string);
    return res.status(200).json(sessions);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

export const updateSession = async (req: Request, res: Response) => {
  try {
    const session = await sessionService.updateSession(req.params.id, req.body);
    return res.status(200).json(session);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

export const deleteSession = async (req: Request, res: Response) => {
  try {
    await sessionService.deleteSession(req.params.id);
    return res.status(204).send();
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};
