"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { ChangePasswordForm } from "./change-password-form";
import { siteConfig } from "@/lib/site";

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  async function handleSignOut() {
    await authClient.signOut();
    router.push("/login");
  }

  if (isPending) {
    return (
      <div className="flex min-h-dvh items-center justify-center" style={{ background: "var(--color-paper)" }}>
        <p style={{ color: "var(--color-muted)", fontSize: "var(--text-sm)" }}>
          Loading…
        </p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center gap-4 text-center" style={{ background: "var(--color-paper)", padding: "var(--space-xl)" }}>
        <h1 style={{ fontSize: "var(--text-xl)", fontWeight: 600, color: "var(--color-ink)" }}>
          You are not signed in
        </h1>
        <Link href="/login" className="btn btn--primary">
          Sign in
        </Link>
      </div>
    );
  }

  return (
    <div className="flex min-h-dvh flex-col" style={{ background: "var(--color-paper)" }}>
      <header className="nav">
        <div className="nav__inner">
          <Link href="/" className="nav__brand">
            <span className="nav__brand-dot" aria-hidden="true" />
            {siteConfig.name}
          </Link>
          <nav className="nav__center" aria-label="Primary">
            <Link href="/" className="nav__link">
              Home
            </Link>
          </nav>
          <div className="nav__right">
            <button
              type="button"
              onClick={handleSignOut}
              className="btn btn--outline"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1" style={{ padding: "var(--space-2xl) var(--page-gutter)" }}>
        <div className="mx-auto w-full" style={{ maxWidth: "var(--page-max)" }}>
          <header className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 600, letterSpacing: "-0.02em", color: "var(--color-ink)" }}>
                Dashboard
              </h1>
              <p style={{ marginTop: "var(--space-xs)", fontSize: "var(--text-sm)", color: "var(--color-muted)" }}>
                Welcome back, {session.user.name}!
              </p>
            </div>
          </header>

          <section className="status-panel" style={{ marginTop: "var(--space-2xl)" }}>
            <h2>Your profile</h2>
            <dl style={{ marginTop: "var(--space-lg)", display: "grid", gap: "var(--space-lg)", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
              <div>
                <dt style={{ fontSize: "var(--text-sm)", color: "var(--color-muted)" }}>
                  Name
                </dt>
                <dd style={{ marginTop: "var(--space-2xs)", fontWeight: 500, color: "var(--color-ink)" }}>
                  {session.user.name}
                </dd>
              </div>
              <div>
                <dt style={{ fontSize: "var(--text-sm)", color: "var(--color-muted)" }}>
                  Email
                </dt>
                <dd style={{ marginTop: "var(--space-2xs)", fontWeight: 500, color: "var(--color-ink)" }}>
                  {session.user.email}
                </dd>
              </div>
            </dl>
          </section>

          <ChangePasswordForm />
        </div>
      </main>

      <footer className="foot-line">
        <div className="foot-line__inner">
          <span>© 2026 {siteConfig.name} · MIT licensed</span>
          <a href={siteConfig.github}>GitHub</a>
        </div>
      </footer>
    </div>
  );
}
