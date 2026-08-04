import { Suspense } from "react";
import { VerifyEmailView } from "./verify-email-view";

export default function VerifyEmailPage() {
  return (
    <div className="flex flex-1 items-center justify-center bg-zinc-50 p-6 dark:bg-black">
      <div className="w-full max-w-sm">
        <Suspense
          fallback={
            <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">
              Verifying your email…
            </p>
          }
        >
          <VerifyEmailView />
        </Suspense>
      </div>
    </div>
  );
}