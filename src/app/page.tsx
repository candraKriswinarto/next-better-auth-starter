import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { Reveal } from "@/components/reveal";
import { CopyButton } from "@/components/copy-button";

const features = [
  {
    label: "Stack",
    title: "Next.js 16 + Tailwind 4",
    body: "App Router, React 19, and Tailwind v4 utility classes. Clean, modern baseline with no boilerplate to delete.",
  },
  {
    label: "Auth",
    title: "Better Auth",
    body: "Email and password out of the box — sign up, sign in, session handling, and route protection already wired.",
  },
  {
    label: "Email",
    title: "Verification + password reset",
    body: "Verify-on-sign-up email links and a full forgot / reset-password flow. Tokens logged locally when no SMTP is set.",
  },
  {
    label: "Database",
    title: "Drizzle ORM + Neon Postgres",
    body: "Type-safe schema and a generated schema-to-codebridge for your database, running on serverless Postgres.",
  },
  {
    label: "Protected",
    title: "Dashboard",
    body: "A session-guarded dashboard with your profile and an inline change-password form. Refresh-proof via a proxy.",
  },
];

const routes = [
  {
    path: "/",
    name: "Home",
    desc: "This landing page — the clone-ready overview.",
  },
  {
    path: "/login",
    name: "Sign in",
    desc: "Email and password authentication.",
  },
  {
    path: "/sign-up",
    name: "Sign up",
    desc: "Create an account with email + password.",
  },
  {
    path: "/forgot-password",
    name: "Forgot password",
    desc: "Request a password reset link.",
  },
  {
    path: "/reset-password",
    name: "Reset password",
    desc: "Set a new password with a token.",
  },
  {
    path: "/verify-email",
    name: "Verify email",
    desc: "Confirm your address on sign-up.",
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    desc: "Protected profile + change password.",
  },
];

export default function Home() {
  const clone = `git clone ${siteConfig.github.replace("https://", "")}.git`;

  return (
    <div className="flex flex-col">
      <header className="nav">
        <div className="nav__inner">
          <a className="nav__brand" href="#">
            <span className="nav__brand-dot" aria-hidden="true" />
            {siteConfig.name}
          </a>
          <nav className="nav__center" aria-label="Primary">
            <a href="#stack" className="nav__link">
              Stack
            </a>
            <a href="#routes" className="nav__link">
              Auth pages
            </a>
          </nav>
          <div className="nav__right">
            <Link href="/login" className="btn btn--text">
              Sign in
            </Link>
            <Link href="/sign-up" className="btn btn--primary">
              Sign up
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="hero">
          <Reveal>
            <p className="eyebrow">Next.js × Better Auth starter</p>
            <h1>Auth, already wired. Clone it.</h1>
            <p className="hero__lede">
              A small, opinionated Next.js starter with Better Auth set up —
              sign-up, sign-in, email verification, password reset, and a
              protected dashboard. No wiring left to do.
            </p>
            <div className="hero__cta">
              <Link href="/sign-up" className="btn btn--primary">
                Get started
              </Link>
              <Link href="#stack" className="btn btn--outline">
                See what&apos;s inside
              </Link>
            </div>
          </Reveal>

          <Reveal delay={1}>
            <div className="code-card">
              <div className="code-card__bar">
                <span className="code-card__file">terminal</span>
                <span className="code-card__status">200 OK</span>
              </div>
              <div className="code-card__body" aria-label="Clone command">
                <div>
                  <span className="tok-prompt">$</span>{" "}
                  <span className="tok-cmd">{clone}</span>
                  <span className="caret" aria-hidden="true" />
                </div>
                <div>
                  <span className="tok-prompt">$</span>{" "}
                  <span className="tok-cmd">cd {siteConfig.name}</span>
                </div>
                <div>
                  <span className="tok-prompt">$</span>{" "}
                  <span className="tok-cmd">npm install <span className="tok-accent">&amp;&amp;</span> npm run dev</span>
                </div>
                <div>
                  <span className="tok-prompt">$</span>{" "}
                  <span className="tok-cmd tok-accent">Ready in 412ms</span>
                </div>
                <CopyButton text={clone} label="Copy clone URL" />
              </div>
            </div>
          </Reveal>
        </section>

        <section className="section" id="stack">
          <Reveal as="header" className="head-hang">
            <h2>What&apos;s inside</h2>
            <p className="head-hang__lede">
              Five pieces wired together so you can ship the product part, not
              the plumbing.
            </p>
          </Reveal>
          <div className="feature-list">
            {features.map((f, i) => (
              <Reveal key={f.label} delay={i % 2} className="feature-row">
                <span className="feature-row__label">{f.label}</span>
                <div className="feature-row__body">
                  <h3>{f.title}</h3>
                  <p>{f.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="section" id="routes">
          <Reveal as="header" className="head-hang">
            <h2>Auth pages included</h2>
            <p className="head-hang__lede">
              Every screen the starter ships, ready to restyle.
            </p>
          </Reveal>
          <div className="route-grid">
            {routes.map((r, i) => (
              <Reveal key={r.path} delay={i % 3}>
                <Link href={r.path} className="route-card">
                  <div>
                    <span className="route-card__path">{r.path}</span>
                    <h3 className="route-card__name">{r.name}</h3>
                    <p className="route-card__desc">{r.desc}</p>
                  </div>
                  <span className="eyebrow">Open →</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="cta-band">
          <Reveal>
            <h2>Clone the template</h2>
            <p>
              The repo is ready to fork. One command and you&apos;re building
              your app.
            </p>
          </Reveal>
          <Reveal delay={1}>
            <div className="btn-group">
              <a href={siteConfig.github} className="btn btn--primary">
                View on GitHub
              </a>
              <Link href="/dashboard" className="btn btn--outline">
                Visit dashboard
              </Link>
            </div>
          </Reveal>
        </section>
      </main>

      <footer className="foot-line">
        <div className="foot-line__inner">
          <span>
            © 2026 {siteConfig.name} · MIT licensed
          </span>
          <div className="foot-line__links">
            <a href={siteConfig.github}>GitHub</a>
            <Link href="/login">Sign in</Link>
            <Link href="/sign-up">Sign up</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}