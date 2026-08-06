import { PrismaClient, Role, UserStatus, TransactionType, PaymentMethod, ExpenseStatus } from '@prisma/client'

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
      member: {
        create: {
          firstName: 'Admin',
          lastName: 'User',
          phone: '01700000000',
          roomNumber: 'A1',
        },
      },
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
      member: {
        create: {
          firstName: 'Regular',
          lastName: 'Member',
          phone: '01800000000',
          roomNumber: 'B1',
        },
      },
    },
  })

  // We need the member IDs to create transactions
  const memberAdmin = await prisma.member.findUnique({ where: { userId: userAdmin.id } })
  const memberReg = await prisma.member.findUnique({ where: { userId: userMember.id } })

  if (!memberAdmin || !memberReg) throw new Error("Members not found after creation.")

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
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
