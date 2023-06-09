"use client";

import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Calendar, Camera } from "lucide-react";
import Cookie from "js-cookie";

import { api } from "@root/lib/api";

import { MediaPicker } from "./MediaPicker";

export function NewMemoryForm() {
  const router = useRouter();

  async function handleCreateMemory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const fileToUpload = formData.get("coverUrl");

    let coverUrl = "";

    if (fileToUpload) {
      const uploadFormData = new FormData();

      uploadFormData.set("file", fileToUpload);

      const uploadResponse = await api.post("/upload", uploadFormData);

      coverUrl = uploadResponse.data.fileUrl;
    }

    const token = Cookie.get("token");

    const date = String(formData.get("date"));

    await api.post(
      "/memories",
      {
        coverUrl,
        content: formData.get("content"),
        isPublic: formData.get("isPublic"),
        date: new Date(date)
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    router.push("/");
  }

  return (
    <form onSubmit={handleCreateMemory} className="flex flex-1 flex-col gap-2">
      <div className="flex flex-wrap items-center gap-4 2xl:flex-nowrap">
        <label
          htmlFor="media"
          className="flex cursor-pointer items-center gap-1.5 text-gray-200 hover:text-gray-100"
        >
          <Camera className="h-4 w-4" />
          Anexar mídia
        </label>

        <label
          htmlFor="isPublic"
          className="flex cursor-pointer items-center gap-1.5 text-gray-200 hover:text-gray-100"
        >
          <input
            type="checkbox"
            name="isPublic"
            id="isPublic"
            className="h4 w-4 cursor-pointer rounded border-gray-400 bg-gray-700 text-purple-500"
          />
          Tornar memória pública
        </label>

        <label
          htmlFor="date"
          className="flex items-center gap-1.5 text-gray-200"
        >
          <Calendar className="h-4 w-4" />
          Data da memória:
          <input
            type="date"
            name="date"
            id="date"
            className="h-8 w-[86px] appearance-none border-0 border-b border-gray-400 bg-transparent p-0 text-sm text-gray-200 focus:border-b-gray-200 focus:ring-0"
          />
        </label>
      </div>

      <MediaPicker />

      <textarea
        name="content"
        spellCheck={false}
        placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar para sempre."
        className=" w-full flex-1 resize-none rounded border-0 bg-transparent p-0 text-lg leading-relaxed text-gray-100 placeholder:text-gray-400 focus:ring-0"
      />

      <button
        type="submit"
        className="inline-block self-end rounded-full bg-green-500 px-5 py-3 font-alt text-sm uppercase leading-none text-black hover:bg-green-600"
      >
        Salvar
      </button>
    </form>
  );
}
