import { auth } from "./apps/web/lib/auth";

async function run() {
  try {
    const res = await auth.api.signUpEmail({
      body: { email: "test20@example.com", password: "Password123!", name: "Test User" },
      headers: new Headers()
    });
    console.log("Success:", res);
  } catch (e) {
    console.error("Error:", e);
  }
}
run();
