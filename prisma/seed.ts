import { PrismaClient, Role, UserStatus, TransactionType, PaymentMethod, ExpenseStatus, MealType } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding the database...')

  // 1. Create Expense Categories
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

  // 2. Create Users & Members
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

  // We need the member IDs to create transactions
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

  // 3. Create Deposits
  // Admin deposit
  await prisma.transaction.create({
    data: {
      type: TransactionType.DEPOSIT,
      amount: 5000.00,
      date: new Date(),
      description: 'Initial deposit for the month',
      paymentMethod: PaymentMethod.MOBILE_MONEY,
      createdById: userAdmin.id,
      deposit: {
        create: {
          memberId: memberAdmin.id,
        }
      }
    }
  })

  // Regular Member deposit
  await prisma.transaction.create({
    data: {
      type: TransactionType.DEPOSIT,
      amount: 3000.00,
      date: new Date(),
      description: 'Partial deposit',
      paymentMethod: PaymentMethod.CASH,
      createdById: userAdmin.id,
      deposit: {
        create: {
          memberId: memberReg.id,
        }
      }
    }
  })

  // 4. Create Expenses
  await prisma.transaction.create({
    data: {
      type: TransactionType.EXPENSE,
      amount: 1500.00,
      date: new Date(),
      description: 'Weekly bazaar - Rice and vegetables',
      paymentMethod: PaymentMethod.CASH,
      createdById: userAdmin.id,
      expense: {
        create: {
          categoryId: categoryGrocery.id,
          status: ExpenseStatus.APPROVED,
        }
      }
    }
  })

  console.log('Seeding finished successfully.')

  // 5. Create Units
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

  // 6. Create Shopping & Shopping Items
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

  // 7. Create Meal Records
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

  // 8. Create Settings
  const existingSettings = await prisma.settings.findFirst()
  if (!existingSettings) {
    await prisma.settings.create({
      data: {
        messName: 'AI Mess Alpha',
        currency: 'BDT',
        timezone: 'Asia/Dhaka',
        defaultMealRate: 60.0,
      }
    })
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
