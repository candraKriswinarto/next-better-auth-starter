"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { AuthShell } from "@/components/auth-shell";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password || !name.trim()) {
      setError("Please fill in all fields.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    const { error: signUpError } = await authClient.signUp.email(
      { name, email, password },
      {
        onSuccess: () => router.push("/verify-email"),
        onError: (ctx) => setError(ctx.error.message ?? "Something went wrong"),
      },
    );

    if (signUpError) {
      setError(signUpError.message ?? "Something went wrong");
      setLoading(false);
    }
  }

  return (
    <AuthShell
      title="Create account"
      lede="Sign up with your email and a password."
      footer={
        <>
          Already have an account? <Link href="/login">Sign in</Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4" noValidate>
        <label className="field">
          <span className="field__label">Name</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Jane Doe"
            className="field__input"
            autoComplete="name"
            disabled={loading}
          />
        </label>

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
          <span className="field__label">Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 8 characters"
            className="field__input"
            autoComplete="new-password"
            disabled={loading}
          />
        </label>

        <label className="field">
          <span className="field__label">Confirm password</span>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Repeat your password"
            className="field__input"
            autoComplete="new-password"
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
          {loading ? "Creating account…" : "Create account"}
        </button>
      </form>
    </AuthShell>
  );
}
