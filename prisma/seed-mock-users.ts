import { PrismaClient, Role, UserStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding mock users...');
  
  // We need to hash passwords for better-auth so these users can actually log in.
  // We use require here to avoid import issues if running as a plain node script without ts-node's full path resolution
  const { hashPassword } = require("better-auth/crypto");
  
  const defaultPasswordHash = await hashPassword("password123");
  const adminPasswordHash = await hashPassword("AR.1$lpd");

  // 1. Create 2 Admins
  for (let i = 1; i <= 2; i++) {
    const email = i === 1 ? "abdurrahmansoftw@gmail.com" : `admin${i}@example.com`;
    const passwordHash = i === 1 ? adminPasswordHash : defaultPasswordHash;

    let user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          name: `Admin ${i}`,
          emailVerified: true,
          role: Role.ADMIN,
          status: UserStatus.ACTIVE,
        },
      });

      // Create better-auth Account for login
      await prisma.account.create({
        data: {
          userId: user.id,
          accountId: user.email,
          providerId: "credential",
          password: passwordHash,
        }
      });

      await prisma.member.create({
        data: {
          userId: user.id,
          firstName: 'Admin',
          lastName: `${i}`,
          phone: `0171000000${i}`,
          roomNumber: `A${i}`,
          seatRent: 2000,
          utilityBill: 500,
          otherBill: 100,
        },
      });
      console.log(`Created admin: ${email}`);
    } else {
      console.log(`Admin ${email} already exists`);
    }
  }

  // 2. Create 2 Managers
  for (let i = 1; i <= 2; i++) {
    const email = `manager${i}@example.com`;

    let user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          name: `Manager ${i}`,
          emailVerified: true,
          role: Role.MANAGER,
          status: UserStatus.ACTIVE,
        },
      });
      
      // Create better-auth Account for login
      await prisma.account.create({
        data: {
          userId: user.id,
          accountId: user.email,
          providerId: "credential",
          password: defaultPasswordHash,
        }
      });

      await prisma.member.create({
        data: {
          userId: user.id,
          firstName: 'Manager',
          lastName: `${i}`,
          phone: `0172000000${i}`,
          roomNumber: `M${i}`,
          seatRent: 2000,
          utilityBill: 500,
          otherBill: 100,
        },
      });
      console.log(`Created manager: ${email}`);
    } else {
      console.log(`Manager ${email} already exists`);
    }
  }

  // 3. Create 20 Regular Members
  for (let i = 1; i <= 20; i++) {
    const email = `member${i}@example.com`;

    let user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          name: `Member ${i}`,
          emailVerified: true,
          role: Role.MEMBER,
          status: UserStatus.ACTIVE,
        },
      });
      
      // Create better-auth Account for login
      await prisma.account.create({
        data: {
          userId: user.id,
          accountId: user.email,
          providerId: "credential",
          password: defaultPasswordHash,
        }
      });

      await prisma.member.create({
        data: {
          userId: user.id,
          firstName: 'Member',
          lastName: `${i}`,
          phone: `017300000${i < 10 ? '0' + i : i}`,
          roomNumber: `R${Math.ceil(i / 2)}`, // 2 people per room
          seatRent: 2000,
          utilityBill: 500,
          otherBill: 100,
        },
      });
      console.log(`Created member: ${email}`);
    } else {
      console.log(`Member ${email} already exists`);
    }
  }

  console.log('Seeding mock users complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
