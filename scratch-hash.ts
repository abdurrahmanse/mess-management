import { hashPassword } from "better-auth/crypto";
async function run() {
  const hash = await hashPassword("AR.1$lpd");
  console.log("HASH:", hash);
}
run();
