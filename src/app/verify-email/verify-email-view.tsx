"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";

type VerifyStatus = "loading" | "success" | "error";

export function VerifyEmailView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const callbackURL = searchParams.get("callbackURL") ?? "/";

  const [status, setStatus] = useState<VerifyStatus>("loading");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function verify() {
      if (!token) {
        setStatus("error");
        setError("No verification token provided. Use the link from your email.");
        return;
      }

      const { data, error: verifyError } = await authClient.verifyEmail({
        query: { token },
      });

      if (cancelled) return;

      if (verifyError) {
        setStatus("error");
        setError(verifyError.message ?? "Verification failed. The link may be invalid or expired.");
        return;
      }

      setStatus("success");
      if (data?.status) {
        setTimeout(() => router.push(callbackURL), 1500);
      }
    }

    verify();
    return () => {
      cancelled = true;
    };
  }, [token, callbackURL, router]);

  if (status === "loading") {
    return (
      <p className="text-center text-sm" style={{ color: "var(--color-muted)" }}>
        Verifying your email…
      </p>
    );
  }

  if (status === "error") {
    return (
      <div className="flex flex-col gap-4 mt-6">
        <p role="alert" className="alert alert--error">
          {error}
        </p>
        <Link href="/login" className="btn btn--primary w-full">
          Go to sign in
        </Link>
      </div>
    );
  }

  return (
    <p className="alert alert--ok mt-6">
      Your email has been verified successfully. Redirecting you…
    </p>
  );
}
