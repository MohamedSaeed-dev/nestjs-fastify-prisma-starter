import { defineConfig } from '@prisma/config';
import 'dotenv/config';

export default defineConfig({
  schema: 'prisma/schemas',
  typedSql: {
    path: 'prisma/sql',
  },
  migrations: {
    seed: 'ts-node prisma/seeders/index.ts',
    path: 'prisma/migrations',
  },
});
