import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const admin = await prisma.user.findUnique({ where: { email: 'abdurrahmansoftw@gmail.com' }, include: { accounts: true } });
  const adminPassword = admin?.accounts.find(a => a.providerId === 'credential')?.password;
  
  if (adminPassword) {
    const users = await prisma.user.findMany({ where: { email: { in: ['learn.abdurrahman@gmail.com', 'member1@example.com'] } }});
    for (const u of users) {
      await prisma.account.updateMany({
        where: { userId: u.id, providerId: 'credential' },
        data: { password: adminPassword }
      });
      console.log(`Updated ${u.email} to use admin password hash.`);
    }
  }
}
main().finally(() => prisma.$disconnect());
