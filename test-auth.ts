import { auth } from "./apps/web/lib/auth";
import { toNodeHandler } from "better-auth/node";
import { createServer } from "http";

async function run() {
  try {
    const res = await fetch("http://localhost:3000/api/auth/sign-up/email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "test13@example.com", password: "Password123!", name: "Test" })
    });
    console.log(res.status, await res.text());
  } catch (e) {
    console.error("Error", e);
  }
}
run();
