"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export function ResetPasswordView() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (!token) {
      setError("Missing reset token. Use the link from your email.");
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
    const { error: resetError } = await authClient.resetPassword({
      newPassword: password,
      token,
    });
    setLoading(false);

    if (resetError) {
      setError(resetError.message ?? "Reset failed. The link may be invalid or expired.");
      return;
    }

    setSuccess(true);
  }

  if (success) {
    return (
      <div className="flex flex-col gap-4 mt-6">
        <p className="alert alert--ok">
          Your password has been updated. You can now sign in with your new password.
        </p>
        <Link href="/login" className="btn btn--primary w-full">
          Go to sign in
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4" noValidate>
        <label className="field">
          <span className="field__label">New password</span>
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
          {loading ? "Resetting…" : "Reset password"}
        </button>
      </form>
  );
}
