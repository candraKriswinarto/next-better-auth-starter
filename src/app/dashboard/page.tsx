"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { ChangePasswordForm } from "./change-password-form";

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  async function handleSignOut() {
    await authClient.signOut();
    router.push("/login");
  }

  if (isPending) {
    return (
      <div className="flex flex-1 items-center justify-center bg-zinc-50 p-6 dark:bg-black">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">Loading…</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 bg-zinc-50 p-6 text-center dark:bg-black">
        <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
          You are not signed in
        </h1>
        <Link
          href="/login"
          className="flex h-11 items-center justify-center rounded-lg bg-zinc-900 px-6 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
        >
          Log in
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col bg-zinc-50 p-6 dark:bg-black">
      <main className="mx-auto w-full max-w-3xl">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
              Dashboard
            </h1>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              Welcome back, {session.user.name}!
            </p>
          </div>
          <button
            type="button"
            onClick={handleSignOut}
            className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900"
          >
            Sign out
          </button>
        </header>

        <section className="mt-8 rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="text-sm font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            Your profile
          </h2>
          <dl className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-sm text-zinc-500 dark:text-zinc-400">Name</dt>
              <dd className="mt-0.5 font-medium text-zinc-900 dark:text-zinc-50">
                {session.user.name}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-zinc-500 dark:text-zinc-400">
                Email
              </dt>
              <dd className="mt-0.5 font-medium text-zinc-900 dark:text-zinc-50">
                {session.user.email}
              </dd>
            </div>
          </dl>
        </section>

        <ChangePasswordForm />
      </main>
    </div>
  );
}