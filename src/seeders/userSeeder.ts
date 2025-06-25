import { supabase } from '../utils/SupabaseClient';

export const seedUsers = async () => {
  const aliceId = crypto.randomUUID();
  const bobId = crypto.randomUUID();

  const users = [
    {
      id: aliceId,
      name: 'Alice',
      email: 'alice@example.com',
      email_verified: true,
      avatar_url: 'https://randomuser.me/api/portraits/women/1.jpg',
      bio: 'Gosta de IA e tecnologia.',
      gender: 'female',
      birthdate: '1990-01-01',
      language_pref: 'pt', // ajuste conforme seu enum
      timezone: 'America/Sao_Paulo',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      last_active_at: new Date().toISOString(),
    },
    {
      id: bobId,
      name: 'Bob',
      email: 'bob@example.com',
      email_verified: false,
      avatar_url: 'https://randomuser.me/api/portraits/men/2.jpg',
      bio: 'Apaixonado por programação.',
      gender: 'male',
      birthdate: '1985-05-20',
      language_pref: 'en', // ajuste conforme seu enum
      timezone: 'America/New_York',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      last_active_at: new Date().toISOString(),
    },
  ];

  for (const user of users) {
    const { error } = await supabase.from('users').insert([user]);
    if (error) {
      console.error('Erro ao inserir usuário:', error);
    }
  }

  return { aliceId, bobId };
};

if (require.main === module) {
  seedUsers().then(() => process.exit(0));
}
