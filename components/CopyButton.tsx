"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

type CopyButtonProps = {
  value: string;
  label: string;
  className?: string;
};

export function CopyButton({ value, label, className = "" }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button
      type="button"
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        void copy();
      }}
      className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line bg-surface text-muted transition-colors hover:border-ink/30 hover:text-ink ${className}`}
      aria-label={copied ? "Copiado" : label}
      title={copied ? "Copiado" : label}
    >
      {copied ? <Check className="h-4 w-4 text-ok" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
      <span className="sr-only" aria-live="polite">
        {copied ? "Copiado" : ""}
      </span>
    </button>
  );
}
