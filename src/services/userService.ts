import { supabase } from '../utils/SupabaseClient';
import { User } from '../models/User';
import validator from 'validator';

export const createUser = async (user: Partial<User>) => {
  const { data, error } = await supabase.from('users').insert([user]).select().single();
  if (error) throw error;
  return data;
};

export const getUserById = async (id: string) => {
  if (!validator.isUUID(id)) {
    throw new Error('Invalid UUID');
  }

  const { data, error } = await supabase.from('users').select('*').eq('id', id).single();
  if (error) throw error;
  return data;
};

