import { emailOTP } from "better-auth/plugins";
import { betterAuth } from "better-auth";

const auth = betterAuth({
  plugins: [
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        console.log(email, otp, type);
      },
      sendVerificationOnSignUp: true,
    })
  ]
})
