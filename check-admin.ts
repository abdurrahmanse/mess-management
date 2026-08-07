import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const admin = await prisma.user.findUnique({ where: { email: 'abdurrahmansoftw@gmail.com' }, include: { accounts: true } });
  console.log(admin?.accounts[0].password);
}
main().finally(() => prisma.$disconnect());
