"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Trash2, X } from "lucide-react";

export function DeleteMemoryModal() {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="hover:brightness-75">
        <Trash2 className="h-5 w-5" />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/25" />

        <Dialog.Content className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2  rounded bg-gray-600 px-6 py-6">
          <Dialog.Close className="absolute right-3 top-3 hover:brightness-75">
            <X className="h-5 w-5" />
          </Dialog.Close>

          <Dialog.Title className="text-lg font-bold text-gray-50">
            Deseja excluir essa memória?
          </Dialog.Title>

          <Dialog.Description>
            Após a exclusão os dados da memória não poderão ser recuperados.
          </Dialog.Description>

          <footer className="mt-6 flex items-center justify-end gap-3">
            <Dialog.DialogClose className="transition-colors hover:text-gray-200">
              Cancelar
            </Dialog.DialogClose>

            <button className=" text-red-400 transition-colors hover:text-red-500">
              Excluir
            </button>
          </footer>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
