import { Request, Response } from 'express';
import { fetchFriendSuggestions } from '../services/friendService';

export const getFriendSuggestions = async (req: Request, res: Response) => {
  const userId = req.query.userId as string;
  if (!userId) return res.status(400).json({ error: 'Missing userId' });

  try {
    const suggestions = await fetchFriendSuggestions(userId);
    return res.status(200).json(suggestions);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
