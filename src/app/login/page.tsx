"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { AuthShell } from "@/components/auth-shell";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);
    const { error: signInError } = await authClient.signIn.email(
      { email, password },
      {
        onSuccess: () => router.push("/dashboard"),
        onError: (ctx) => setError(ctx.error.message ?? "Something went wrong"),
      },
    );

    if (signInError) {
      setError(signInError.message ?? "Something went wrong");
      setLoading(false);
    }
  }

  return (
    <AuthShell
      title="Welcome back"
      lede="Sign in to your account to continue."
      footer={
        <>
          Don&apos;t have an account?{" "}
          <Link href="/sign-up">Sign up</Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4" noValidate>
        <label className="field">
          <span className="field__label">Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="field__input"
            autoComplete="email"
            disabled={loading}
          />
        </label>

        <label className="field">
          <span className="field__label-row">
            <span className="field__label">Password</span>
            <Link href="/forgot-password">Forgot password?</Link>
          </span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Your password"
            className="field__input"
            autoComplete="current-password"
            disabled={loading}
          />
        </label>

        {error && (
          <p role="alert" className="alert alert--error">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="btn btn--primary mt-2 w-full"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </AuthShell>
  );
}
