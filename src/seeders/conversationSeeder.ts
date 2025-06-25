import { supabase } from '../utils/SupabaseClient';

export const seedConversations = async () => {
  // Busca todos os usuários e seus assistants
  const { data: users } = await supabase.from('users').select('id, name');
  const { data: assistants } = await supabase.from('assistants').select('id, user_id');

  for (const user of users ?? []) {
    const assistant = assistants?.find(a => a.user_id === user.id);
    if (!assistant) continue;

    const sessionId = crypto.randomUUID();

    // Cria uma sessão
    await supabase.from('conversation_sessions').insert([
      {
        id: sessionId,
        user_id: user.id,
        assistant_id: assistant.id,
        title: `Sessão de ${user.name}`,
        started_at: new Date().toISOString(),
      },
    ]);

    // Cria mensagens na sessão
    const messages = [
      {
        id: crypto.randomUUID(),
        session_id: sessionId,
        user_id: user.id,
        assistant_id: assistant.id,
        content: 'Oi, tudo bem?',
        sender: 'user',
        sequence: 1,
        created_at: new Date().toISOString(),
      },
      {
        id: crypto.randomUUID(),
        session_id: sessionId,
        user_id: user.id,
        assistant_id: assistant.id,
        content: 'Olá! Como posso ajudar?',
        sender: 'ai',
        sequence: 2,
        created_at: new Date().toISOString(),
      },
    ];

    for (const msg of messages) {
      const { error } = await supabase.from('messages').insert([msg]);
      if (error) {
        console.error('Erro ao inserir mensagem:', error);
      }
    }
  }

  console.log('Sessões e mensagens inseridas para todos os usuários!');
};

if (require.main === module) {
  seedConversations().then(() => process.exit(0));
}
