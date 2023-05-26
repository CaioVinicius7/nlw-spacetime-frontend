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
        className="flex items-center gap-2 text-sm hover:text-gray-200"
      >
        <Share className="h-5 w-5" />
        Compartilhar minhas memórias
      </button>
    );
  }

  return (
    <button className="flex items-center gap-2 text-sm hover:text-gray-200">
      <Check className="h-5 w-5" />
      URL copiada para área de transferência
    </button>
  );
}
