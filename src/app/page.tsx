import { cookies } from "next/headers";

import { Blur } from "@root/components/Blur";
import { Copyright } from "@root/components/Copyright";
import { EmptyMemories } from "@root/components/EmptyMemories";
import { Hero } from "@root/components/Hero";
import { SignIn } from "@root/components/SignIn";
import { Stripes } from "@root/components/Stripes";
import { Profile } from "@root/components/Profile";

export default function Home() {
  const isAuthenticated = cookies().has("token");

  return (
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
      <div className="flex flex-col bg-[url(../assets/bg-stars.svg)] bg-cover p-16">
        <EmptyMemories />
      </div>
    </main>
  );
}
