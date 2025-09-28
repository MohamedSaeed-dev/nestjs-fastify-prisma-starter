import { PrismaClient } from "../../src/generated/client";
import { usersSeeder } from "./users.seeder";
const prisma = new PrismaClient();
async function seeder() {
  await usersSeeder(prisma);
}
seeder()
  .catch((e) => {
    console.error('❌ Error seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
