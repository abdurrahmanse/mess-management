import { PrismaClient } from '@prisma/client'

export async function seedCategories(prisma: PrismaClient) {
  console.log('Seeding Expense Categories...')
  
  const categoryGrocery = await prisma.expenseCategory.upsert({
    where: { name: 'Grocery' },
    update: {},
    create: {
      name: 'Grocery',
      description: 'Daily bazaar and food supplies',
    },
  })

  const categoryRent = await prisma.expenseCategory.upsert({
    where: { name: 'Rent' },
    update: {},
    create: {
      name: 'Rent',
      description: 'Monthly flat rent and service charges',
    },
  })

  const categoryUtilities = await prisma.expenseCategory.upsert({
    where: { name: 'Utilities' },
    update: {},
    create: {
      name: 'Utilities',
      description: 'Electricity, Gas, Water, Internet',
    },
  })

  console.log('Seeding Units...')
  const unitKg = await prisma.unit.upsert({
    where: { name: 'Kilogram' },
    update: {},
    create: { name: 'Kilogram', abbreviation: 'kg' }
  })
  
  const unitL = await prisma.unit.upsert({
    where: { name: 'Liter' },
    update: {},
    create: { name: 'Liter', abbreviation: 'L' }
  })
  
  const unitPcs = await prisma.unit.upsert({
    where: { name: 'Pieces' },
    update: {},
    create: { name: 'Pieces', abbreviation: 'pcs' }
  })

  return { 
    categories: { categoryGrocery, categoryRent, categoryUtilities },
    units: { unitKg, unitL, unitPcs }
  }
}
