import { PrismaClient, Role, UserStatus } from '@prisma/client'

export async function seedUsers(prisma: PrismaClient) {
  console.log('Seeding Users & Members...')
  
  const userAdmin = await prisma.user.upsert({
    where: { email: 'abdurrahman.learn@gmail.com' },
    update: {},
    create: {
      email: 'abdurrahman.learn@gmail.com',
      name: 'Admin User',
      emailVerified: true,
      role: Role.ADMIN,
      status: UserStatus.ACTIVE,
    },
  })

  const userMember = await prisma.user.upsert({
    where: { email: 'learn.abdurrahman@gmail.com' },
    update: {},
    create: {
      email: 'learn.abdurrahman@gmail.com',
      name: 'Regular Member',
      emailVerified: true,
      role: Role.MEMBER,
      status: UserStatus.ACTIVE,
    },
  })

  let memberAdmin = await prisma.member.findUnique({ where: { userId: userAdmin.id } })
  if (!memberAdmin) {
    memberAdmin = await prisma.member.create({
      data: {
        userId: userAdmin.id,
        firstName: 'Admin',
        lastName: 'User',
        phone: '01700000000',
        roomNumber: 'A1',
      },
    })
  }

  let memberReg = await prisma.member.findUnique({ where: { userId: userMember.id } })
  if (!memberReg) {
    memberReg = await prisma.member.create({
      data: {
        userId: userMember.id,
        firstName: 'Regular',
        lastName: 'Member',
        phone: '01800000000',
        roomNumber: 'B1',
      },
    })
  }

  return {
    users: { userAdmin, userMember },
    members: { memberAdmin, memberReg }
  }
}
