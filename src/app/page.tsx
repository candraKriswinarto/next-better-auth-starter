import { db } from "@/db";
import { user as users } from "@/db/schema";

export const dynamic = "force-dynamic";

export default async function Home() {
  const allUsers = await db.select().from(users);

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-center py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
          Users
        </h1>
        <ul className="mt-8 flex w-full flex-col gap-3">
          {allUsers.map((user) => (
            <li
              key={user.id}
              className="flex items-center justify-between gap-4 rounded-lg border border-black/[.08] px-4 py-3 dark:border-white/[.145]"
            >
              <div>
                <p className="font-medium text-zinc-900 dark:text-zinc-50">
                  {user.name}
                </p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  {user.email}
                </p>
              </div>
              <span className="text-sm tabular-nums text-zinc-400">
                #{user.id}
              </span>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}