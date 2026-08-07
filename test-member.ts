import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const members = await prisma.member.findMany({ take: 1 });
  if (members.length === 0) { console.log("No members"); return; }
  const id = members[0].id;
  console.log("Testing with ID:", id);
  
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);

  try {
    const member = await prisma.member.findUnique({
      where: { id },
      include: {
        user: true,
        deposits: {
          where: {
            transaction: {
              date: {
                gte: startOfMonth,
                lte: endOfMonth
              }
            }
          },
          include: {
            transaction: true
          }
        },
        mealRecords: {
          where: {
            date: {
              gte: startOfMonth,
              lte: endOfMonth
            }
          }
        }
      }
    });
    console.log("Result:", member ? "Success" : "Not Found");
  } catch (error) {
    console.error("Error:", error);
  }
}
main().finally(() => prisma.$disconnect());
