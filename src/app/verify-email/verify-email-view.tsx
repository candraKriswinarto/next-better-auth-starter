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
      <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">
        Verifying your email…
      </p>
    );
  }

  if (status === "error") {
    return (
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          Verification failed
        </h1>
        <p
          role="alert"
          className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950 dark:text-red-300"
        >
          {error}
        </p>
        <Link
          href="/login"
          className="flex h-11 items-center justify-center rounded-lg bg-zinc-900 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
        >
          Go to login
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
        Email verified
      </h1>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        Your email has been verified successfully. Redirecting you…
      </p>
    </div>
  );
}