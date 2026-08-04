import { Suspense } from "react";
import Link from "next/link";
import { ResetPasswordView } from "./reset-password-view";
import { AuthShell } from "@/components/auth-shell";

export default function ResetPasswordPage() {
  return (
    <AuthShell
      title="Reset password"
      lede="Enter a new password for your account."
      footer={
        <>
          Remembered your password? <Link href="/login">Sign in</Link>
        </>
      }
    >
      <Suspense
        fallback={
          <p className="mt-6 text-center text-sm" style={{ color: "var(--color-muted)" }}>
            Loading…
          </p>
        }
      >
        <ResetPasswordView />
      </Suspense>
    </AuthShell>
  );
}
