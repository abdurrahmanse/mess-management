import { PrismaClient } from '@prisma/client'
import { seedCategories } from './seeds/categories'
import { seedUsers } from './seeds/users'
import { seedTransactions } from './seeds/transactions'
import { seedMess } from './seeds/mess'
import { seedSettings } from './seeds/settings'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting modular seed process...')

  const { categories, units } = await seedCategories(prisma)
  const { users, members } = await seedUsers(prisma)

  await seedTransactions(
    prisma, 
    members.memberAdmin, 
    members.memberReg, 
    users.userAdmin, 
    categories.categoryGrocery
  )

  await seedMess(
    prisma,
    members.memberAdmin,
    members.memberReg,
    units.unitKg,
    units.unitL
  )

  await seedSettings(prisma)

  console.log('Modular seeding finished successfully.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
