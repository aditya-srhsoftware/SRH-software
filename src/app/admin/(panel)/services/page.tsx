import type { Metadata } from "next";
import { Plus } from "lucide-react";
import { mockServices } from "@/admin/data/mock";
import {
  AdminButton,
  AdminPageIntro,
  AdminTable,
  StatusPill,
} from "@/components/admin/ui";

export const metadata: Metadata = {
  title: "Services",
};

export default function AdminServicesPage() {
  return (
    <div>
      <AdminPageIntro
        title="Services"
        description="Service pages and slugs for the public site. Placeholder rows only."
        action={
          <AdminButton>
            <Plus className="size-4" />
            Add service
          </AdminButton>
        }
      />

      <AdminTable headers={["Service", "Slug", "Status", ""]}>
        {mockServices.map((service) => (
          <tr key={service.id} className="hover:bg-[#FAFAFB]">
            <td className="px-4 py-3.5 font-medium text-[#151C4B]">
              {service.title}
            </td>
            <td className="px-4 py-3.5 font-mono text-xs text-[#6B7280]">
              /services/{service.slug}
            </td>
            <td className="px-4 py-3.5">
              <StatusPill status={service.status} />
            </td>
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
