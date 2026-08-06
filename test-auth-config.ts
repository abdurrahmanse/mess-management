import { betterAuth } from "better-auth";
import { emailOTP } from "better-auth/plugins";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";

export const auth = betterAuth({
  database: prismaAdapter(new PrismaClient(), { provider: "postgresql" }),
  plugins: [
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
      },
      sendVerificationOnSignUp: true,
    })
  ]
})
