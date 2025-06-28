import { supabase } from '../utils/SupabaseClient';
import { Assistant } from '../models/Assistant';
import validator from 'validator';

export const createAssistant = async (assistant: Omit<Assistant, 'id' | 'created_at' | 'updated_at'>) => {
  const id = crypto.randomUUID();
  const now = new Date().toISOString();
  const { data, error } = await supabase.from('assistants').insert([{
    ...assistant,
    id,
    created_at: now,
    updated_at: now,
  }]).select().single();
  if (error) throw error;
  return data;
};

export const listAssistants = async () => {
  const { data, error } = await supabase.from('assistants').select('*');
  if (error) throw error;
  return data;
};

export const updateAssistant = async (id: string, updates: Partial<Assistant>) => {
  if (!validator.isUUID(id)) throw new Error('Invalid UUID');
  updates.updated_at = new Date();
  const { data, error } = await supabase.from('assistants').update(updates).eq('id', id).select().single();
  if (error) throw error;
  return data;
};

export const deleteAssistant = async (id: string) => {
  if (!validator.isUUID(id)) throw new Error('Invalid UUID');
  const { error } = await supabase.from('assistants').delete().eq('id', id);
  if (error) throw error;
};
