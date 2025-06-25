import { supabase } from '../utils/SupabaseClient';

export const seedUserMemories = async () => {
  const { data: users } = await supabase.from('users').select('id, name');
  const { data: assistants } = await supabase.from('assistants').select('id, user_id');

  for (const user of users ?? []) {
    const assistant = assistants?.find(a => a.user_id === user.id);
    if (!assistant) continue;

    const memories = [
      {
        id: crypto.randomUUID(),
        user_id: user.id,
        assistant_id: assistant.id,
        memory_text: `${user.name} gosta de conversar sobre tecnologia.`,
        created_at: new Date().toISOString(),
      },
      {
        id: crypto.randomUUID(),
        user_id: user.id,
        assistant_id: assistant.id,
        memory_text: 'Prefere respostas detalhadas e exemplos práticos.',
        created_at: new Date().toISOString(),
      },
    ];

    for (const memory of memories) {
      const { error } = await supabase.from('user_memories').insert([memory]);
      if (error) {
        console.error('Erro ao inserir memória:', error);
      }
    }
  }

  console.log('Memórias inseridas para todos os usuários!');
};

if (require.main === module) {
  seedUserMemories().then(() => process.exit(0));
}
