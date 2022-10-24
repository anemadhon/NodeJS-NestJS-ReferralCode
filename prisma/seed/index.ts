import { PrismaClient } from '@prisma/client';
import { referralSeeder } from './referral.seed';
import { userSeeder } from './user.seed';

const prisma = new PrismaClient();

Promise.all([userSeeder(), referralSeeder()])
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.log(error);

    await prisma.$disconnect();

    process.exit(1);
  });
