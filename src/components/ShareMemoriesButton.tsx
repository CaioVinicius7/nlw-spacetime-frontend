"use client";

import { useState } from "react";
import { Share, Check } from "lucide-react";

interface ShareMemoriesButtonProps {
  userId: string;
}

export function ShareMemoriesButton({ userId }: ShareMemoriesButtonProps) {
  const [urlWasCopied, setUrlWasCopied] = useState(false);

  function handleCopyMemoriesPageUrlToClipboard() {
    navigator.clipboard.writeText(
      `http://localhost:3000/user/${userId}/memories`
    );

    setUrlWasCopied(true);
  }

  if (!urlWasCopied) {
    return (
      <button
        onClick={handleCopyMemoriesPageUrlToClipboard}
        className="flex max-w-[200px] items-center gap-0 text-xs hover:text-gray-200 md:gap-2 lg:max-w-none lg:text-sm"
      >
        <Share className="h-5 w-5" />
        Compartilhar minhas memórias
      </button>
    );
  }

  return (
    <button className="flex max-w-[200px] items-center gap-0 text-xs hover:text-gray-200 md:gap-2 lg:max-w-none lg:text-sm">
      <Check className="h-5 w-5" />
      URL copiada para área de transferência
    </button>
  );
}
