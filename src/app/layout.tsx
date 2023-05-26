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
import { Header } from "@root/components/Header";

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
        className={`${roboto.variable} ${baiJamjuree.variable} overflow-hidden bg-slate-900 font-sans  text-gray-100`}
      >
        <main className="flex min-h-screen flex-col md:grid md:grid-cols-2">
          {/* Mobile Header */}
          <Header />

          {/* Left */}
          <div className="relative hidden flex-col items-start justify-between overflow-hidden border-r border-white/10 bg-[url(../assets/bg-stars.svg)] bg-cover px-28 py-16 md:flex">
            <Blur />

            <Stripes />

            {isAuthenticated ? <Profile /> : <SignIn />}

            <Hero />

            <Copyright />
          </div>

          {/* Right */}
          <div className="flex max-h-screen w-screen flex-1 flex-col overflow-y-auto bg-[url(../assets/bg-stars.svg)] bg-cover md:w-auto">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
