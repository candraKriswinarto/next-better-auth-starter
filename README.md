# Next.js + Better Auth Starter

A minimal, production-ready Next.js starter with Better Auth wired in. Clone it and ship your app.

## What's Inside

- **Next.js 16** — App Router, React 19, server components
- **Better Auth** — Email + password authentication, session handling
- **Email flows** — Sign-up verification, password reset, already configured
- **Protected routes** — Dashboard with session guard and change-password form
- **Drizzle ORM** — Type-safe database queries
- **Neon Postgres** — Serverless database (or use any Postgres)
- **Tailwind CSS 4** — Utility-first styling
- **TypeScript** — Full type safety
- **Clean design** — Hallmark Cobalt theme (modern-minimal, developer-focused)

## Quick Start

```bash
# Clone the repo
git clone https://github.com/candraKriswinarto/next-better-auth-starter.git
cd next-better-auth-starter

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your database URL and auth secret

# Run database migrations
npm run db:migrate

# Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you'll see the landing page with a working auth system.

## Environment Variables

Create a `.env` file in the root:

```env
# Database (Neon Postgres or any Postgres connection string)
DATABASE_URL="postgresql://user:password@host/database"

# Better Auth
BETTER_AUTH_SECRET="your-secret-key-here"  # Generate with: openssl rand -base64 32
BETTER_AUTH_URL="http://localhost:3000"    # Your app URL (update for production)

# Email (optional for local dev — links print to console)
# SMTP_HOST="smtp.example.com"
# SMTP_PORT="587"
# SMTP_USER="your-email@example.com"
# SMTP_PASSWORD="your-password"
```

## Database Setup

This starter uses Drizzle ORM with Neon Postgres. To set up your database:

1. **Create a Neon database** (or use any Postgres provider):
   - Visit [neon.tech](https://neon.tech) and create a free database
   - Copy the connection string to `DATABASE_URL` in `.env`

2. **Run migrations**:
   ```bash
   npm run db:migrate
   ```

3. **Optional — seed the database**:
   ```bash
   npm run db:seed
   ```

4. **Open Drizzle Studio** to inspect your data:
   ```bash
   npm run db:studio
   ```

## Auth Pages

All authentication pages are included and styled:

- **`/`** — Landing page with clone instructions
- **`/login`** — Sign in with email + password
- **`/sign-up`** — Create a new account
- **`/forgot-password`** — Request a password reset link
- **`/reset-password`** — Set a new password (via email token)
- **`/verify-email`** — Confirm email address (via email token)
- **`/dashboard`** — Protected profile page with change-password form

## Email in Development

By default, email verification and password reset links are **printed to the console** when running locally. Check your terminal for the links.

To use real email in development, configure SMTP in `.env` (see Environment Variables above).

## Project Structure

```
src/
├── app/
│   ├── (auth pages)/        # All auth routes
│   ├── dashboard/           # Protected dashboard + change password
│   ├── api/auth/[...all]/   # Better Auth API routes
│   ├── page.tsx             # Home landing page
│   ├── layout.tsx           # Root layout with fonts
│   └── globals.css          # Cobalt design tokens + component styles
├── components/
│   ├── auth-shell.tsx       # Shared auth page wrapper
│   ├── copy-button.tsx      # Copy-to-clipboard for git clone
│   └── reveal.tsx           # Entrance animations (IntersectionObserver)
├── db/
│   ├── index.ts             # Drizzle client
│   ├── schema.ts            # Database schema (users, sessions, etc.)
│   └── seed.ts              # Optional seed data
└── lib/
    ├── auth.ts              # Better Auth server config
    ├── auth-client.ts       # Better Auth client
    └── site.ts              # Site constants (name, GitHub URL)
```

## Available Scripts

```bash
npm run dev          # Start dev server (http://localhost:3000)
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

npm run db:generate  # Generate Drizzle migrations
npm run db:migrate   # Run migrations
npm run db:studio    # Open Drizzle Studio
npm run db:seed      # Seed the database
```

## Customize

- **GitHub URL**: Update `src/lib/site.ts` with your repository URL
- **Site name**: Change `siteConfig.name` in `src/lib/site.ts`
- **Design tokens**: Edit `src/app/globals.css` for colors, spacing, typography
- **Database schema**: Modify `src/db/schema.ts` and run `npm run db:generate`

## Design System

This starter uses the **Hallmark Cobalt theme** — a modern-minimal design system for developer tools:

- **Cool engineered palette** — near-white paper, electric cobalt accent
- **Hairline structure** — 1px borders, no heavy shadows
- **Code-as-hero** — terminal-style git clone card on the home page
- **Geist fonts** — Clean sans-serif for display/body, mono for code
- **Responsive** — Mobile-first, tested at 320px–1920px
- **Accessible** — WCAG AA contrast, keyboard navigation, reduced-motion support

To change the theme, edit the CSS custom properties in `src/app/globals.css`.

## Production Checklist

Before deploying:

- [ ] Update `BETTER_AUTH_URL` in `.env` to your production domain
- [ ] Configure SMTP for real email delivery
- [ ] Set a strong `BETTER_AUTH_SECRET` (32+ characters)
- [ ] Update the GitHub URL in `src/lib/site.ts`
- [ ] Run `npm run build` to verify everything compiles
- [ ] Test all auth flows (sign-up, login, forgot password, verify email)

## Deploy

Deploy to Vercel (recommended):

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or deploy to any platform that supports Next.js:
- [Vercel](https://vercel.com)
- [Netlify](https://netlify.com)
- [Railway](https://railway.app)
- [Render](https://render.com)

## Tech Stack

- [Next.js 16](https://nextjs.org) — React framework
- [Better Auth](https://better-auth.com) — Authentication library
- [Drizzle ORM](https://orm.drizzle.team) — TypeScript ORM
- [Neon](https://neon.tech) — Serverless Postgres
- [Tailwind CSS 4](https://tailwindcss.com) — Utility-first CSS
- [TypeScript](https://typescriptlang.org) — Type safety

## License

MIT — use it for anything.

## Contributing

Issues and pull requests are welcome. This is a starter template, so keep it minimal and focused on auth + database setup.

---

Built with [Hallmark](https://github.com/anomalyco/hallmark) design system.
