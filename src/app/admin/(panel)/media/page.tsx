import type { Metadata } from "next";
import { ImageIcon, Plus, Upload } from "lucide-react";
import { mockMedia } from "@/admin/data/mock";
import {
  AdminButton,
  AdminCard,
  AdminPageIntro,
} from "@/components/admin/ui";

export const metadata: Metadata = {
  title: "Media",
};

export default function AdminMediaPage() {
  return (
    <div>
      <AdminPageIntro
        title="Media"
        description="Asset library UI. Hook uploads and storage when your backend is ready."
        action={
          <AdminButton>
            <Upload className="size-4" />
            Upload
          </AdminButton>
        }
      />

      <AdminCard className="mb-6 flex flex-col items-center justify-center border-dashed px-6 py-10 text-center">
        <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-[#F7F5F1] text-[#8B90A0]">
          <Plus className="size-5" />
        </span>
        <p className="mt-4 font-heading-manrope text-sm font-bold text-[#151C4B]">
          Drop files here
        </p>
        <p className="mt-1 max-w-sm text-sm text-[#6B7280]">
          Drag-and-drop zone is visual only for now.
        </p>
      </AdminCard>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {mockMedia.map((file) => (
          <AdminCard key={file.id} className="p-4">
            <div className="flex aspect-[16/10] items-center justify-center rounded-xl bg-[#F7F5F1] text-[#8B90A0]">
              <ImageIcon className="size-8" strokeWidth={1.5} />
            </div>
            <p className="mt-3 truncate font-body-poppins text-sm font-medium text-[#151C4B]">
              {file.name}
            </p>
            <p className="mt-1 text-xs text-[#8B90A0]">
              {file.type} · {file.size}
            </p>
          </AdminCard>
        ))}
      </div>
    </div>
  );
}
