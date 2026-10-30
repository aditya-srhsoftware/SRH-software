import type { Metadata } from "next";
import { Plus } from "lucide-react";
import { mockPortfolio } from "@/admin/data/mock";
import {
  AdminButton,
  AdminPageIntro,
  AdminTable,
  StatusPill,
} from "@/components/admin/ui";

export const metadata: Metadata = {
  title: "Portfolio",
};

export default function AdminPortfolioPage() {
  return (
    <div>
      <AdminPageIntro
        title="Portfolio"
        description="Projects shown on the public portfolio page. UI shell only."
        action={
          <AdminButton>
            <Plus className="size-4" />
            Add project
          </AdminButton>
        }
      />

      <AdminTable headers={["Project", "Category", "Status", "Year", ""]}>
        {mockPortfolio.map((item) => (
          <tr key={item.id} className="hover:bg-[#FAFAFB]">
            <td className="px-4 py-3.5 font-medium text-[#151C4B]">{item.title}</td>
            <td className="px-4 py-3.5 text-[#6B7280]">{item.category}</td>
            <td className="px-4 py-3.5">
              <StatusPill status={item.status} />
            </td>
            <td className="px-4 py-3.5 text-[#6B7280]">{item.year}</td>
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
