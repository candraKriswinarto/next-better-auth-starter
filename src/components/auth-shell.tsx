import Link from "next/link";
import type { ReactNode } from "react";
import { siteConfig } from "@/lib/site";

export function AuthShell({
  title,
  lede,
  footer,
  children,
}: {
  title: string;
  lede: string;
  footer: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-dvh flex-col" style={{ background: "var(--color-paper)" }}>
      <header className="nav">
        <div className="nav__inner">
          <Link href="/" className="nav__brand">
            <span className="nav__brand-dot" aria-hidden="true" />
            {siteConfig.name}
          </Link>
          <div className="nav__right">
            <Link href="/" className="btn btn--text">
              Home
            </Link>
          </div>
        </div>
      </header>

      <main className="auth__body">
        <div className="auth__card">
          <h1>{title}</h1>
          <p className="auth__card__lede">{lede}</p>
          {children}
          <div className="auth__footer-link">{footer}</div>
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
