import { Request, Response } from 'express';
import { sendMessageToAI } from '../services/aiService';
import { saveMessage } from '../services/messageService';

export const createConversation = async (req: Request, res: Response) => {
  const { userId, message } = req.body;

  if (!userId || !message) {
    return res.status(400).json({ error: 'Missing userId or message.' });
  }

  try {
    const aiResponse = await sendMessageToAI(message, userId);
    await saveMessage(userId, message, 'user');
    await saveMessage(userId, aiResponse, 'ai');

    return res.status(200).json({ reply: aiResponse });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to process the conversation.' });
  }
};
