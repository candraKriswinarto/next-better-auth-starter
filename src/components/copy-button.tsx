"use client";

import { useState } from "react";

export function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      className="code-card__copy"
      onClick={handleCopy}
      data-copied={copied}
      aria-live="polite"
    >
      {copied ? "Copied ✓" : label}
    </button>
  );
}
