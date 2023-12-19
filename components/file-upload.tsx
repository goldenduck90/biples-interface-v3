"use client";

import { FileIcon, X } from "lucide-react";
import Image from "next/image";

import { UploadDropzone } from "@/lib/uploadthing";

import { Icon } from "@iconify/react";
import "@uploadthing/react/styles.css";

interface FileUploadProps {
  onChange: (url?: string) => void;
  value: string;
  endpoint: "messageFile" | "serverImage";
}

export const FileUpload = ({ onChange, value, endpoint }: FileUploadProps) => {
  const fileType = value?.split(".").pop();

  if (value && fileType !== "pdf") {
    return (
      <div className="relative h-28 w-28 border border-transparent">
        <Image fill src={value} alt="Upload" className="rounded-full" />
        <button
          onClick={() => onChange("")}
          className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  if (value && fileType === "pdf") {
    return (
      <div className="relative flex h-28 w-28 items-center p-2 mt-2 rounded-md bg-background/10">
        <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400" />
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
        >
          {value}
        </a>
        <button
          onClick={() => onChange("")}
          className="bg-rose-500 text-white p-1 rounded-full absolute -top-2 -right-2 shadow-sm"
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <UploadDropzone
      endpoint={endpoint}
      appearance={{
        allowedContent: "hidden",
        label: "mt-[0.1rem]",
        button: "mt-[0.2rem]",
      }}
      content={{
        uploadIcon({ ready, isUploading }) {
          if (ready || !ready)
            return (
              <Icon
                icon="solar:upload-minimalistic-bold-duotone"
                className="h-8 w-8 text-foreground"
              />
            );

          if (isUploading) return <div className="sr-only hidden"></div>;
          return;
        },
        label({ ready, isUploading }) {
          if (ready || !ready)
            return (
              <span className="text-xs font-light mt-[0.1rem] hover:text-[#50FFFF] text-[#40CACA]">
                Drag & Drop or <br /> Choose File
              </span>
            );
          if (isUploading) return <div className="sr-only hidden"></div>;
          return;
        },
        button({ ready }) {
          if (ready) return <div className="text-xs ">Continue</div>;
        },
      }}
      className="cursor-pointer py-0 focus:ring-0 h-28 w-28 border border-foreground rounded-full overflow-hidden"
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
      }}
      onUploadError={(error: Error) => {
        console.log(error);
      }}
    />
  );
};
