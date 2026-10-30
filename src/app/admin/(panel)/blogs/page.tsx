import type { Metadata } from "next";
import { Plus } from "lucide-react";
import { mockBlogs } from "@/admin/data/mock";
import {
  AdminButton,
  AdminPageIntro,
  AdminTable,
  StatusPill,
} from "@/components/admin/ui";

export const metadata: Metadata = {
  title: "Blogs",
};

export default function AdminBlogsPage() {
  return (
    <div>
      <AdminPageIntro
        title="Blogs"
        description="List and edit articles. Connect create/update endpoints later."
        action={
          <AdminButton>
            <Plus className="size-4" />
            New post
          </AdminButton>
        }
      />

      <AdminTable headers={["Title", "Status", "Date", "Author", ""]}>
        {mockBlogs.map((post) => (
          <tr key={post.id} className="hover:bg-[#FAFAFB]">
            <td className="px-4 py-3.5 font-medium text-[#151C4B]">{post.title}</td>
            <td className="px-4 py-3.5">
              <StatusPill status={post.status} />
            </td>
            <td className="px-4 py-3.5 text-[#6B7280]">{post.date}</td>
            <td className="px-4 py-3.5 text-[#6B7280]">{post.author}</td>
            <td className="px-4 py-3.5 text-right">
              <button
                type="button"
                className="text-sm font-semibold text-[#151C4B] hover:text-[#E81E62]"
              >
                Edit
              </button>
            </td>
          </tr>
        ))}
      </AdminTable>
    </div>
  );
}
