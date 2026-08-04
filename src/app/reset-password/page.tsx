import { Suspense } from "react";
import { ResetPasswordView } from "./reset-password-view";

export default function ResetPasswordPage() {
  return (
    <div className="flex flex-1 items-center justify-center bg-zinc-50 p-6 dark:bg-black">
      <div className="w-full max-w-sm">
        <Suspense
          fallback={
            <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">
              Loading…
            </p>
          }
        >
          <ResetPasswordView />
        </Suspense>
      </div>
    </div>
  );
}