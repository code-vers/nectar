import DashboardShell from "@/components/dashboard/layout/DashboardShell";
import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Nectar",
  description: "A complete learning platform for property owners, managers, residents, and families with professional training, downloads, and educational resources.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <DashboardShell>{children}</DashboardShell>;
}
