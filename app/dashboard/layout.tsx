
import type { Metadata } from "next";

import AuthNavbar from "@/components/AuthNavbar"

export const metadata: Metadata = {
  title: "Project David",
  description: "Project David is a platform for financial institutions to manage their users for compliance purposes.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col flex-1 bg-[#F8FAFC] h-screen">
      <main
        className="flex-1 relative overflow-y-auto overflow-x-hidden"
        id="main-element"
      >
        <AuthNavbar />
        {children}
      </main>
    </div>
  );
}