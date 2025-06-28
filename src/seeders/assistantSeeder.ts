import { supabase } from '../utils/SupabaseClient';

export const seedAssistants = async () => {
  const { data: users, error } = await supabase.from('users').select('id, name');
  if (error) {
    console.error('Erro ao buscar usuários:', error);
    return;
  }

  for (const user of users ?? []) {
    const assistantId = crypto.randomUUID();
    const assistant = {
      id: assistantId,
      user_id: user.id,
      name: `Assistente de ${user.name}`,
      description: `Assistente pessoal de ${user.name}`,
      tone: 'friendly',
      voice_settings: { language: 'pt', speed: 1.0 },
      avatar_url: 'https://randomuser.me/api/portraits/lego/1.jpg',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    const { error: insertError } = await supabase.from('assistants').insert([assistant]);
    if (insertError) {
      console.error(`Erro ao inserir assistente para ${user.name}:`, insertError);
    }
  }

  console.log('Assistentes inseridos para todos os usuários!');
};

if (require.main === module) {
  seedAssistants().then(() => process.exit(0));
}
