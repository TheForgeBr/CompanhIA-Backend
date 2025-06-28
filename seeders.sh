#!/bin/bash

echo "Rodando seeder de usuários..."
npx ts-node src/seeders/userSeeder.ts

echo "Rodando seeder de assistentes..."
npx ts-node src/seeders/assistantSeeder.ts

echo "Rodando seeder de sessões e mensagens..."
npx ts-node src/seeders/conversationSeeder.ts

echo "Rodando seeder de memórias de usuário..."
npx ts-node src/seeders/userMemorySeeder.ts

echo "Seeders finalizados!"
