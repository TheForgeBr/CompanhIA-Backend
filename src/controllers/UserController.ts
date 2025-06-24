import { Request, Response } from 'express';
import { supabase } from '../utils/SupabaseClient';

export const createUser = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ error: 'Missing fields.' });
  }

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw error;

    await supabase.from('users').insert([{ id: data.user?.id, name }]);

    return res.status(201).json({ message: 'User created successfully.' });
  } catch (error) {
    return res.status(500).json({ error: 'User creation failed.' });
  }
};
