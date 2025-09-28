import { PrismaClient } from '../../src/generated/client';
import * as fs from 'fs';
import * as path from 'path';
import { Hashing } from '../../src/common/utils/hashing.util';

export async function usersSeeder(prisma: PrismaClient) {
  const filePath = path.resolve(__dirname, '../seeders/data/users.json');
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  const users = data.map(async (user: any) =>
    prisma.user.upsert({
      where: { email: user.email },
      update: {
        password: await Hashing.hash(user.password),
        username: user.username,
        role: user.role
      },
      create: {
        email: user.email,
        password: await Hashing.hash(user.password),
        role: user.role,
        username: user.username
      },
    }),
  );
  await Promise.all(users);

  console.log('✅ Users upserted, ', users.length);
}
