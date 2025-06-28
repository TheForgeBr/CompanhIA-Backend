import dotenv from 'dotenv';
dotenv.config();

import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const sendMessageToAI = async (message: string, userId: string): Promise<string> => {
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: `You are a personalized companion for user ${userId}.` },
      { role: 'user', content: message },
    ],
  });

  return response.choices[0].message?.content || 'Sorry, I did not understand.';
};
