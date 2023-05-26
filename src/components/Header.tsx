import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { LogIn, LogOut, Plus } from "lucide-react";

import nlwLogo from "../assets/nlw-spacetime-alternative-logo.svg";

export function Header() {
  const isAuthenticated = cookies().has("token");

  return (
    <header className="flex h-16 w-full items-center justify-between px-4 py-6 md:hidden">
      <Link href="/">
        <Image src={nlwLogo} alt="NLW Spacetime" />
      </Link>

      {isAuthenticated ? (
        <div className="flex gap-3">
          <Link
            href="/memories/new"
            className="rounded-full bg-green-500 p-2 transition-colors hover:brightness-75"
          >
            <Plus className="h-4 w-4 text-[#09090A]" />
          </Link>

          <a
            href="/api/auth/logout"
            className="rounded-full bg-red-500 p-2 transition-colors hover:brightness-90"
          >
            <LogOut className="h-4 w-4 text-[#f2f2f2]" />
          </a>
        </div>
      ) : (
        <a
          href={`https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`}
          className="rounded-full bg-green-500 p-2 transition-colors hover:brightness-75"
        >
          <LogIn className="h-4 w-4 text-[#09090A]" />
        </a>
      )}
    </header>
  );
}
