"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export function ChangePasswordForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (newPassword.length < 8) {
      setError("New password must be at least 8 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    setLoading(true);
    const { error: changeError } = await authClient.changePassword({
      currentPassword,
      newPassword,
      revokeOtherSessions: true,
    });
    setLoading(false);

    if (changeError) {
      if (changeError.status === 401 || changeError.status === 400) {
        setError("Your current password is incorrect.");
      } else {
        setError(changeError.message ?? "Could not change password. Please try again.");
      }
      return;
    }

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setSuccess(true);
  }

  return (
    <section className="status-panel" style={{ marginTop: "var(--space-xl)" }}>
      <h2>Change password</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4" style={{ marginTop: "var(--space-lg)" }} noValidate>
        <label className="field">
          <span className="field__label">Current password</span>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Your current password"
            className="field__input"
            autoComplete="current-password"
            disabled={loading}
          />
        </label>

        <label className="field">
          <span className="field__label">New password</span>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="At least 8 characters"
            className="field__input"
            autoComplete="new-password"
            disabled={loading}
          />
        </label>

        <label className="field">
          <span className="field__label">Confirm new password</span>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Repeat your new password"
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

        {success && (
          <p role="status" className="alert alert--ok">
            Your password has been updated.
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="btn btn--primary mt-2 w-full"
        >
          {loading ? "Changing…" : "Change password"}
        </button>
      </form>
    </section>
  );
}
