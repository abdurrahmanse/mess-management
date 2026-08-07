import { PrismaClient, TransactionType, PaymentMethod, ExpenseStatus, MealType } from '@prisma/client';
import { Decimal } from 'decimal.js';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding demo data...');

  const members = await prisma.member.findMany();
  if (members.length === 0) {
    console.log('No members found. Please run seed-mock-users.ts first.');
    return;
  }

  // 1. Seed Expense Categories
  const categories = ['Grocery', 'Utilities', 'Salary', 'Maintenance', 'Other'];
  const dbCategories = [];
  for (const cat of categories) {
    let dbCat = await prisma.expenseCategory.findUnique({ where: { name: cat } });
    if (!dbCat) {
      dbCat = await prisma.expenseCategory.create({
        data: { name: cat, description: `${cat} expenses` },
      });
    }
    dbCategories.push(dbCat);
  }

  const groceryCat = dbCategories.find((c) => c.name === 'Grocery')!;
  const utilCat = dbCategories.find((c) => c.name === 'Utilities')!;

  // We'll generate data for August 2026
  const year = 2026;
  const month = 7; // 0-indexed, so 7 is August
  
  const startDate = new Date(year, month, 1, 10, 0, 0);
  const endDate = new Date(year, month, 25, 10, 0, 0); // Seed up to Aug 25

  // 2. Add Deposits for all members (Let's say each deposited 3000 tk)
  console.log('Adding deposits...');
  for (const member of members) {
    // Only one deposit per member for demo
    const depositDate = new Date(year, month, Math.floor(Math.random() * 5) + 1, 10, 0, 0);
    
    // Check if member already has a deposit for this month (approx)
    const existing = await prisma.deposit.findFirst({
      where: { memberId: member.id, transaction: { date: { gte: startDate, lte: endDate } } }
    });

    if (!existing) {
      await prisma.transaction.create({
        data: {
          type: TransactionType.DEPOSIT,
          amount: new Decimal(3000),
          date: depositDate,
          description: `August Deposit for ${member.firstName}`,
          paymentMethod: PaymentMethod.CASH,
          deposit: {
            create: {
              memberId: member.id,
            }
          }
        }
      });
    }
  }

  // 3. Add Shopping (Bazar) and linked General Expenses
  console.log('Adding shopping records...');
  // We'll add 10 shopping trips
  for (let i = 1; i <= 10; i++) {
    const shopDate = new Date(year, month, i * 2, 8, 0, 0); // every 2 days
    const shopper = members[i % members.length];
    
    const amount = new Decimal(Math.floor(Math.random() * 2000) + 1000); // 1000 to 3000 tk

    const existingShop = await prisma.shopping.findFirst({
      where: { date: { gte: new Date(year, month, i * 2, 0, 0, 0), lte: new Date(year, month, i * 2, 23, 59, 59) } }
    });

    if (!existingShop) {
      await prisma.shopping.create({
        data: {
          date: shopDate,
          totalAmount: amount,
          shopperId: shopper.id,
          items: {
            create: [
              { name: 'Rice', quantity: 5, price: 300 },
              { name: 'Chicken', quantity: 2, price: 400 },
              { name: 'Vegetables', quantity: 3, price: 150 },
            ]
          }
        }
      });

      // Also create an Expense transaction for it
      await prisma.transaction.create({
        data: {
          type: TransactionType.EXPENSE,
          amount: amount,
          date: shopDate,
          description: `Bazar by ${shopper.firstName}`,
          paymentMethod: PaymentMethod.CASH,
          expense: {
            create: {
              categoryId: groceryCat.id,
              status: ExpenseStatus.APPROVED
            }
          }
        }
      });
    }
  }

  // 4. Add Daily Meals
  console.log('Adding daily meals...');
  for (let day = 1; day <= 25; day++) {
    const mealDate = new Date(year, month, day, 12, 0, 0);
    
    // Have we already seeded this day?
    const existMeals = await prisma.mealRecord.findFirst({
      where: { date: mealDate }
    });

    if (!existMeals) {
      const mealRecords = [];
      for (const member of members) {
        // Randomly they might eat or not, but mostly eat 1 breakfast, 1 lunch, 1 dinner
        if (Math.random() > 0.1) {
          mealRecords.push({ memberId: member.id, date: mealDate, type: MealType.BREAKFAST, quantity: 1 });
        }
        if (Math.random() > 0.1) {
          mealRecords.push({ memberId: member.id, date: mealDate, type: MealType.LUNCH, quantity: 1 });
        }
        if (Math.random() > 0.1) {
          mealRecords.push({ memberId: member.id, date: mealDate, type: MealType.DINNER, quantity: 1 });
        }
        // Occasional guest
        if (Math.random() > 0.9) {
          mealRecords.push({ memberId: member.id, date: mealDate, type: MealType.GUEST, quantity: 1 });
        }
      }

      await prisma.mealRecord.createMany({
        data: mealRecords
      });
    }
  }

  // 5. Add a fixed Utility Expense
  const utilityDate = new Date(year, month, 15, 10, 0, 0);
  const existingUtil = await prisma.expense.findFirst({
    where: { categoryId: utilCat.id, transaction: { date: { gte: startDate, lte: endDate } } }
  });

  if (!existingUtil) {
    await prisma.transaction.create({
      data: {
        type: TransactionType.EXPENSE,
        amount: new Decimal(2500),
        date: utilityDate,
        description: 'Electricity and Internet Bill',
        paymentMethod: PaymentMethod.CASH,
        expense: {
          create: {
            categoryId: utilCat.id,
            status: ExpenseStatus.APPROVED
          }
        }
      }
    });
  }

  console.log('Demo data seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
