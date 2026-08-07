import { PrismaClient } from '@prisma/client'

export async function seedSettings(prisma: PrismaClient) {
  console.log('Seeding Settings...')

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
