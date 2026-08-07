import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
const prisma = new PrismaClient();
async function main() {
  const user = await prisma.user.findUnique({ where: { email: 'manager1@example.com' } });
  if (!user) return console.log("User not found");
  const hashedPassword = await bcrypt.hash("manager123", 10);
  await prisma.account.updateMany({
    where: { userId: user.id, providerId: 'credential' },
    data: { password: hashedPassword }
  });
  console.log("Password updated successfully!");
}
main().finally(() => prisma.$disconnect());
