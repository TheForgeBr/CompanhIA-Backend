import { supabase } from '../utils/SupabaseClient';
import validator from 'validator';

interface FriendSuggestion {
  suggestedUserId: string;
  assistantName: string;
  score: number;
}

export const fetchFriendSuggestions = async (userId: string, topN = 5): Promise<FriendSuggestion[]> => {
  if (!validator.isUUID(userId)) throw new Error('Invalid userId');

  // Busca os assistants do usuário e temas (usando description como tema)
  const { data: myAssistants } = await supabase
    .from('assistants')
    .select('id, name, description, user_id')
    .eq('user_id', userId);

  if (!myAssistants || myAssistants.length === 0) return [];

  // Busca todos os assistants de outros usuários
  const { data: otherAssistants } = await supabase
    .from('assistants')
    .select('id, name, description, user_id')
    .neq('user_id', userId);

  if (!otherAssistants || otherAssistants.length === 0) return [];

  // Calcula score por similaridade de temas (description)
  const suggestions: FriendSuggestion[] = [];

  for (const other of otherAssistants) {
    let score = 0;
    for (const mine of myAssistants) {
      if (
        mine.description &&
        other.description &&
        mine.description.trim().length > 0 &&
        other.description.trim().length > 0
      ) {
        // Score simples: número de palavras em comum no tema
        const mineWords = new Set(mine.description.toLowerCase().split(/\W+/));
        const otherWords = new Set(other.description.toLowerCase().split(/\W+/));
        const common = [...mineWords].filter(w => otherWords.has(w));
        score += common.length;
      }
    }
    if (score > 0) {
      suggestions.push({
        suggestedUserId: other.user_id,
        assistantName: other.name,
        score,
      });
    }
  }

  // Ordena por score decrescente e retorna top N
  suggestions.sort((a, b) => b.score - a.score);
  return suggestions.slice(0, topN);
};
