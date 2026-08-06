import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: "postgresql://postgres:45683968@localhost:5433/mess_management?schema=public"
    }
  }
})
async function run() {
  try {
    await prisma.$connect()
    console.log("DB connection successful");
  } catch (e) {
    console.error("DB connection failed:", e.message);
  } finally {
    await prisma.$disconnect()
  }
}
run()
