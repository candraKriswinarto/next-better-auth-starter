"use client";

import { useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { AuthShell } from "@/components/auth-shell";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    const { error: forgotError } = await authClient.requestPasswordReset({
      email,
    });

    setLoading(false);

    if (forgotError) {
      setError(forgotError.message ?? "Something went wrong. Please try again.");
      return;
    }

    setSubmitted(true);
  }

  if (submitted) {
    return (
      <AuthShell
        title="Check your email"
        lede={`If an account exists for ${email}, you'll receive a password reset link. In local dev, the link is printed to the server console.`}
        footer={
          <>
            Remembered your password? <Link href="/login">Sign in</Link>
          </>
        }
      >
        <Link href="/login" className="btn btn--primary mt-6 w-full">
          Back to sign in
        </Link>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      title="Forgot password"
      lede="Enter your email and we'll send you a reset link."
      footer={
        <>
          Remembered your password? <Link href="/login">Sign in</Link>
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
          {loading ? "Sending…" : "Send reset link"}
        </button>
      </form>
    </AuthShell>
  );
}
