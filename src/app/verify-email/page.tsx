import { Suspense } from "react";
import Link from "next/link";
import { VerifyEmailView } from "./verify-email-view";
import { AuthShell } from "@/components/auth-shell";

export default function VerifyEmailPage() {
  return (
    <AuthShell
      title="Verify email"
      lede="Confirming your email address…"
      footer={
        <>
          Need help? <Link href="/login">Back to sign in</Link>
        </>
      }
    >
      <Suspense
        fallback={
          <p className="mt-6 text-center text-sm" style={{ color: "var(--color-muted)" }}>
            Verifying your email…
          </p>
        }
      >
        <VerifyEmailView />
      </Suspense>
    </AuthShell>
  );
}
