import Link from "next/link";
import Image from "next/image";
import dayjs from "dayjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ChevronLeft } from "lucide-react";

import { api } from "@root/lib/api";

import { DeleteMemoryModal } from "@root/components/DeleteMemoryModal";

interface PageParams {
  id: string;
}

interface GetMemoryResponse {
  memory: {
    id: string;
    coverUrl: string;
    content: string;
    date: Date;
    createdAt: Date;
  };
}

export default async function Memory({ params }: { params: PageParams }) {
  const isAuthenticated = cookies().has("token");

  if (!isAuthenticated) {
    return redirect("/");
  }

  const token = cookies().get("token")?.value;

  const response = await api.get<GetMemoryResponse>(`/memories/${params.id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const { memory } = response.data;

  return (
    <section className="flex flex-1 flex-col gap-4 p-16">
      <header className="flex items-center justify-between">
        <Link
          href="/"
          className="flex w-fit items-center gap-1  text-sm text-gray-200 hover:text-gray-100"
        >
          <ChevronLeft className="h-4 w-4" />
          Voltar à timeline
        </Link>

        <DeleteMemoryModal />
      </header>

      <div className="space-y-4">
        <time className=" flex items-center gap-2 text-xl text-gray-100 before:h-px before:w-5 before:bg-gray-50">
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
          {memory.content}
        </p>
      </div>
    </section>
  );
}
