import { ReactNode } from "react";
import {
  Roboto_Flex as Roboto,
  Bai_Jamjuree as BaiJamJuree
} from "next/font/google";
import { cookies } from "next/headers";

import "@root/lib/dayjs";

import { Blur } from "@root/components/Blur";
import { Stripes } from "@root/components/Stripes";
import { Profile } from "@root/components/Profile";
import { SignIn } from "@root/components/SignIn";
import { Hero } from "@root/components/Hero";
import { Copyright } from "@root/components/Copyright";

import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  preload: true
});
const baiJamjuree = BaiJamJuree({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-bai-jamjuree",
  preload: true
});

export const metadata = {
  title: "NLW Spacetime",
  description:
    "Uma cápsula do tempo construída com React, Next.js, TailwindCSS e TypesScript."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const isAuthenticated = cookies().has("token");

  return (
    <html lang="pt-BR">
      <body
        className={`${roboto.variable} ${baiJamjuree.variable} bg-slate-900 font-sans text-gray-100`}
      >
        <main className="grid min-h-screen grid-cols-2">
          {/* Left */}
          <div className="relative flex flex-col items-start justify-between overflow-hidden border-r border-white/10 bg-[url(../assets/bg-stars.svg)] bg-cover px-28 py-16 ">
            <Blur />

            <Stripes />

            {isAuthenticated ? <Profile /> : <SignIn />}

            <Hero />

            <Copyright />
          </div>

          {/* Right */}
          <div className="flex flex-col bg-[url(../assets/bg-stars.svg)] bg-cover">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
