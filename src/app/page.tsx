import { cookies } from "next/headers";
import Link from "next/link";
import Image from "next/image";
import dayjs from "dayjs";
import { ArrowRight } from "lucide-react";

import { EmptyMemories } from "@root/components/EmptyMemories";
import { api } from "@root/lib/api";

interface Memory {
  id: string;
  coverUrl: string;
  excerpt: string;
  date: Date;
  createdAt: Date;
}

export default async function Home() {
  const isAuthenticated = cookies().has("token");

  if (!isAuthenticated) {
    return <EmptyMemories />;
  }

  const token = cookies().get("token")?.value;

  const response = await api.get<Memory[]>("/memories", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const memories = response.data;

  if (memories.length === 0) {
    return <EmptyMemories />;
  }

  return (
    <div className="flex flex-col gap-10 px-8 py-16">
      {memories.map((memory) => (
        <section key={memory.id} className="space-y-4">
          <time className="-ml-8 flex items-center gap-2 text-sm text-gray-100 before:h-px before:w-5 before:bg-gray-50">
            {dayjs(memory.date).add(3, "hour").format("D[ de ]MMMM[, ]YYYY")}
          </time>

          <Image
            src={memory.coverUrl}
            width={892}
            height={280}
            alt=""
            className="aspect-video w-full rounded-lg object-cover"
          />

          <p className="text-lg leading-relaxed text-gray-100">
            {memory.excerpt}
          </p>

          <Link
            href={`/memory/${memory.id}`}
            className="flex items-center gap-2 text-sm text-gray-200 hover:text-gray-100"
          >
            Ler mais
            <ArrowRight className="h-4 w-4" />
          </Link>
        </section>
      ))}
    </div>
  );
}
