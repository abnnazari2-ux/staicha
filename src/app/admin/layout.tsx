import type { Metadata } from "next";
import AdminSidebar from "./AdminSidebar";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-ink text-bone grid grid-cols-1 md:grid-cols-[260px_1fr] pt-[72px]">
      <AdminSidebar />
      <section className="p-s6 md:p-s8">{children}</section>
    </div>
  );
}
