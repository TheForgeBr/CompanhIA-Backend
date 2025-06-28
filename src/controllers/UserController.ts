import { Request, Response } from 'express';
import { supabase } from '../utils/SupabaseClient';
import validator from 'validator';

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
  } catch (error: any) {
    console.error('Erro ao criar usuário:', error); // Adicione este log
    return res.status(400).json({ error: error.message || 'User creation failed.' });
  }
};

export const updateUserProfile = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!validator.isUUID(id)) {
    return res.status(400).json({ error: 'Invalid UUID' });
  }

  const allowedFields = [
    'avatar_url',
    'bio',
    'gender',
    'birthdate',
    'language_pref',
    'timezone',
    'last_active_at',
  ];
  const updates: Record<string, any> = {};
  for (const field of allowedFields) {
    if (field in req.body) updates[field] = req.body[field];
  }

  try {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return res.status(200).json(data);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};
