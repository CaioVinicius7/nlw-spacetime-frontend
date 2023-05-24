import Link from "next/link";
import { ChevronLeft } from "lucide-react";

import { NewMemoryForm } from "@root/components/NewMemoryForm";

export default async function NewMemory() {
  return (
    <section className="flex flex-1 flex-col gap-4 p-16">
      <Link
        href="/"
        className="flex w-fit items-center gap-1  text-sm text-gray-200 hover:text-gray-100"
      >
        <ChevronLeft className="h-4 w-4" />
        Voltar à timeline
      </Link>

      <NewMemoryForm />
    </section>
  );
}
