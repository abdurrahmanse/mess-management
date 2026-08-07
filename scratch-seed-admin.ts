import { PrismaClient } from "@prisma/client"
import { hashPassword } from "better-auth/crypto"

const prisma = new PrismaClient()

async function main() {
  const email = "abdurrahmansoftw@gmail.com"
  const password = "AR.1$lpd"
  const hashedPassword = await hashPassword(password)

  let user = await prisma.user.findUnique({ where: { email } })
  if (!user) {
    user = await prisma.user.create({
      data: {
        email,
        name: "Admin User",
        emailVerified: true,
        role: "ADMIN",
        status: "ACTIVE",
      },
    })
  }

  // Ensure Account exists
  const account = await prisma.account.findFirst({
    where: { userId: user.id, providerId: "credential" }
  })

  if (!account) {
    await prisma.account.create({
      data: {
        userId: user.id,
        accountId: user.email,
        providerId: "credential",
        password: hashedPassword,
      }
    })
  } else {
    await prisma.account.update({
      where: { id: account.id },
      data: { password: hashedPassword }
    })
  }

  // Ensure Member exists
  const member = await prisma.member.findUnique({ where: { userId: user.id } })
  if (!member) {
    await prisma.member.create({
      data: {
        userId: user.id,
        firstName: "Admin",
        lastName: "User",
        phone: "01700000000",
        roomNumber: "A1",
        seatRent: 2000,
        utilityBill: 500,
        otherBill: 100,
      }
    })
  }

  console.log(`Successfully seeded ${email} with password!`)
}

main().catch(console.error).finally(() => prisma.$disconnect())
