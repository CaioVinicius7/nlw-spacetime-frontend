import Image from "next/image";

import { getUser } from "@root/lib/auth";

import { ShareMemoriesButton } from "./ShareMemoriesButton";

export function Profile() {
  const { name, avatarUrl, sub } = getUser();

  return (
    <header className="flex w-full items-center justify-between">
      <div className="flex items-center gap-3 text-left">
        <Image
          src={avatarUrl}
          width={40}
          height={40}
          alt=""
          className="h10 w-10 rounded-full"
        />

        <p className="max-w-[140px] text-sm leading-snug ">
          {name}
          <a
            href="/api/auth/logout"
            className="block text-red-400 hover:text-red-300"
          >
            Quero sair
          </a>
        </p>
      </div>

      <ShareMemoriesButton userId={sub} />
    </header>
  );
}
