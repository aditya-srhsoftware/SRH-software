import type { Metadata } from "next";
import { mockMessages } from "@/admin/data/mock";
import { AdminPageIntro, AdminTable, StatusPill } from "@/components/admin/ui";

export const metadata: Metadata = {
  title: "Messages",
};

export default function AdminMessagesPage() {
  return (
    <div>
      <AdminPageIntro
        title="Messages"
        description="Contact form submissions will land here once you connect your backend."
      />

      <AdminTable headers={["Name", "Email", "Interest", "Status", "Date", ""]}>
        {mockMessages.map((message) => (
          <tr key={message.id} className="hover:bg-[#FAFAFB]">
            <td className="px-4 py-3.5 font-medium text-[#151C4B]">{message.name}</td>
            <td className="px-4 py-3.5 text-[#6B7280]">{message.email}</td>
            <td className="px-4 py-3.5 text-[#6B7280]">{message.interest}</td>
            <td className="px-4 py-3.5">
              <StatusPill status={message.status} />
            </td>
            <td className="px-4 py-3.5 text-[#6B7280]">{message.date}</td>
            <td className="px-4 py-3.5 text-right">
              <button
                type="button"
                className="text-sm font-semibold text-[#151C4B] hover:text-[#E81E62]"
              >
                Open
              </button>
            </td>
          </tr>
        ))}
      </AdminTable>
    </div>
  );
}
