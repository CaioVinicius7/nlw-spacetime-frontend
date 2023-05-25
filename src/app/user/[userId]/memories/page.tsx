import { ArrowRight, ChevronLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import dayjs from "dayjs";

import { api } from "@root/lib/api";

interface PageParams {
  userId: string;
}

interface Memory {
  id: string;
  coverUrl: string;
  excerpt: string;
  date: Date;
  createdAt: Date;
}

export default async function UserMemories({ params }: { params: PageParams }) {
  const response = await api.get<Memory[]>(`user/${params.userId}/memories`);

  const memories = response.data;

  return (
    <section className="flex flex-1 flex-col gap-4 p-16">
      <header className="-ml-10 flex items-center justify-between">
        <Link
          href="/"
          className="flex w-fit items-center gap-1  text-sm text-gray-200 hover:text-gray-100"
        >
          <ChevronLeft className="h-4 w-4" />
          Voltar à timeline
        </Link>
      </header>

      {memories.map((memory) => (
        <section key={memory.id} className="-ml-8 space-y-4">
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
    </section>
  );
}
