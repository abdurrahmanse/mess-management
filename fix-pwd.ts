import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const admin = await prisma.user.findUnique({ where: { email: 'abdurrahmansoftw@gmail.com' }, include: { accounts: true } });
  const adminPassword = admin?.accounts.find(a => a.providerId === 'credential')?.password;
  
  if (adminPassword) {
    const managers = await prisma.user.findMany({ where: { email: { in: ['manager1@example.com', 'manager2@example.com'] } }});
    for (const m of managers) {
      await prisma.account.updateMany({
        where: { userId: m.id, providerId: 'credential' },
        data: { password: adminPassword }
      });
      console.log(`Updated ${m.email} to use admin password hash.`);
    }
  }
}
main().finally(() => prisma.$disconnect());
