import { supabase } from '../utils/SupabaseClient';
import { ConversationSession } from '../models/ConversationSession';
import validator from 'validator';

export const createSession = async (session: Omit<ConversationSession, 'id' | 'started_at' | 'ended_at'>) => {
  const id = crypto.randomUUID();
  const started_at = new Date().toISOString();
  const { data, error } = await supabase.from('conversation_sessions').insert([{
    ...session,
    id,
    started_at,
  }]).select().single();
  if (error) throw error;
  return data;
};

export const listSessions = async (userId?: string) => {
  let query = supabase.from('conversation_sessions').select('*');
  if (userId) {
    if (!validator.isUUID(userId)) throw new Error('Invalid userId');
    query = query.eq('user_id', userId);
  }
  const { data, error } = await query;
  if (error) throw error;
  return data;
};

export const updateSession = async (id: string, updates: Partial<ConversationSession>) => {
  if (!validator.isUUID(id)) throw new Error('Invalid UUID');
  const dbUpdates = { ...updates };
  if (dbUpdates.ended_at instanceof Date) {
    (dbUpdates as any).ended_at = dbUpdates.ended_at.toISOString();
  }
  const { data, error } = await supabase.from('conversation_sessions').update(dbUpdates).eq('id', id).select().single();
  if (error) throw error;
  return data;
};

export const deleteSession = async (id: string) => {
  if (!validator.isUUID(id)) throw new Error('Invalid UUID');
  const { error } = await supabase.from('conversation_sessions').delete().eq('id', id);
  if (error) throw error;
};
