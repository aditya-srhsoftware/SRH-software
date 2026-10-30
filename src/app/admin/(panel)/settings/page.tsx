import type { Metadata } from "next";
import {
  adminInputClass,
  AdminButton,
  AdminCard,
  AdminField,
  AdminPageIntro,
} from "@/components/admin/ui";

export const metadata: Metadata = {
  title: "Settings",
};

export default function AdminSettingsPage() {
  return (
    <div>
      <AdminPageIntro
        title="Settings"
        description="Site-wide fields for later API wiring. Nothing is saved yet."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <AdminCard className="p-5 sm:p-6">
          <h3 className="font-heading-manrope text-base font-bold text-[#151C4B]">
            General
          </h3>
          <div className="mt-5 space-y-4">
            <AdminField label="Site name">
              <input
                className={adminInputClass}
                defaultValue="SRH Softwares"
              />
            </AdminField>
            <AdminField label="Support email">
              <input
                className={adminInputClass}
                defaultValue="sales@srhsoftwares.com"
              />
            </AdminField>
            <AdminField label="Tagline">
              <input
                className={adminInputClass}
                defaultValue="Build products that feel inevitable."
              />
            </AdminField>
            <AdminButton>Save changes</AdminButton>
          </div>
        </AdminCard>

        <AdminCard className="p-5 sm:p-6">
          <h3 className="font-heading-manrope text-base font-bold text-[#151C4B]">
            Social links
          </h3>
          <div className="mt-5 space-y-4">
            <AdminField label="LinkedIn">
              <input
                className={adminInputClass}
                placeholder="https://linkedin.com/company/…"
              />
            </AdminField>
            <AdminField label="Instagram">
              <input
                className={adminInputClass}
                placeholder="https://instagram.com/…"
              />
            </AdminField>
            <AdminField label="X / Twitter">
              <input
                className={adminInputClass}
                placeholder="https://x.com/…"
              />
            </AdminField>
            <AdminButton variant="secondary">Update links</AdminButton>
          </div>
        </AdminCard>
      </div>
    </div>
  );
}
