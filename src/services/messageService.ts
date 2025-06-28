import { supabase } from '../utils/SupabaseClient';

export const saveMessage = async (userId: string, content: string, sender: 'user' | 'ai') => {
  await supabase.from('messages').insert([
    { user_id: userId, content, sender },
  ]);
};
