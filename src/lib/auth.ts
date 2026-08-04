import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, token }) => {
      const url = `${process.env.BETTER_AUTH_URL}/reset-password?token=${token}`;
      console.log(`[better-auth] Password reset link for ${user.email}: ${url}`);
    },
  },
  emailVerification: {
    enabled: true,
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, token }) => {
      const url = `${process.env.BETTER_AUTH_URL}/verify-email?token=${token}`;
      console.log(`[better-auth] Email verification link for ${user.email}: ${url}`);
    },
  },
});