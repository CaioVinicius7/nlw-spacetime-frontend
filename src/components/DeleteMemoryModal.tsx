"use client";

import { useRouter } from "next/navigation";
import { Trash2, X } from "lucide-react";
import Cookie from "js-cookie";
import * as Dialog from "@radix-ui/react-dialog";

import { api } from "@root/lib/api";

interface DeleteMemoryModalProps {
  memoryId: string;
}

export function DeleteMemoryModal({ memoryId }: DeleteMemoryModalProps) {
  const router = useRouter();

  async function handleDeleteMemory() {
    const token = Cookie.get("token");

    await api.delete(`/memories/${memoryId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    router.push("/");
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger className="hover:brightness-75">
        <Trash2 className="h-5 w-5" />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />

        <Dialog.Content className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2  rounded bg-gray-500 px-6 pb-6 pt-8">
          <Dialog.Close className="absolute right-3 top-3 hover:brightness-75">
            <X className="h-5 w-5" />
          </Dialog.Close>

          <Dialog.Title className="text-lg font-bold text-gray-50">
            Deseja excluir essa memória?
          </Dialog.Title>

          <Dialog.Description>
            Após a exclusão os dados da memória não poderão ser recuperados.
          </Dialog.Description>

          <footer className="mt-12 flex items-center justify-end gap-3">
            <Dialog.DialogClose className="transition-colors hover:text-gray-200">
              Cancelar
            </Dialog.DialogClose>

            <button
              onClick={handleDeleteMemory}
              className=" text-red-400 transition-colors hover:text-red-500"
            >
              Excluir
            </button>
          </footer>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
