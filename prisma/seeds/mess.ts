import { PrismaClient, MealType } from '@prisma/client'

export async function seedMess(
  prisma: PrismaClient,
  memberAdmin: any,
  memberReg: any,
  unitKg: any,
  unitL: any
) {
  console.log('Seeding Shopping & Meals...')

  // Shopping & Shopping Items
  await prisma.shopping.create({
    data: {
      date: new Date(),
      totalAmount: 1500,
      shopperId: memberAdmin.id,
      items: {
        create: [
          { name: 'Rice', quantity: 5, unitId: unitKg.id, price: 350 },
          { name: 'Chicken', quantity: 2, unitId: unitKg.id, price: 400 },
          { name: 'Oil', quantity: 3, unitId: unitL.id, price: 500 },
          { name: 'Onion', quantity: 2, unitId: unitKg.id, price: 250 },
        ],
      },
    },
  })

  // Meal Records
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)

  const mealData = [
    { memberId: memberReg.id, date: yesterday, type: MealType.LUNCH, quantity: 1 },
    { memberId: memberReg.id, date: yesterday, type: MealType.DINNER, quantity: 1 },
    { memberId: memberAdmin.id, date: yesterday, type: MealType.LUNCH, quantity: 1 },
    { memberId: memberAdmin.id, date: yesterday, type: MealType.DINNER, quantity: 2 },
    
    { memberId: memberReg.id, date: today, type: MealType.LUNCH, quantity: 1 },
    { memberId: memberReg.id, date: today, type: MealType.DINNER, quantity: 1 },
    { memberId: memberAdmin.id, date: today, type: MealType.DINNER, quantity: 1 },
  ]

  for (const meal of mealData) {
    await prisma.mealRecord.upsert({
      where: {
        memberId_date_type: {
          memberId: meal.memberId,
          date: meal.date,
          type: meal.type,
        }
      },
      update: {},
      create: meal,
    })
  }
}
