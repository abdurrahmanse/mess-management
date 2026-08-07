import { PrismaClient, TransactionType, PaymentMethod, ExpenseStatus } from '@prisma/client'

export async function seedTransactions(
  prisma: PrismaClient, 
  memberAdmin: any, 
  memberReg: any,
  userAdmin: any,
  categoryGrocery: any
) {
  console.log('Seeding Transactions...')

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

  // Create Expenses
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
}
