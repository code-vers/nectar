"use client";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

type TopbarConfig = {
  title: string;
  subtitle?: string;
};

const TOPBAR_DEFAULT: TopbarConfig = {
  title: "Dashboard",
  subtitle: "Track your platform activity and progress.",
};

const TOPBAR_BY_PATH: Record<string, TopbarConfig> = {
  "/dashboard": {
    title: "Dashboard",
    subtitle: "Track your platform activity and progress.",
  },
  "/dashboard/all-users": {
    title: "All Users",
    subtitle: "View and manage all platform users.",
  },
  "/dashboard/course-library": {
    title: "Course Library",
    subtitle: "Browse and manage available course content.",
  },
  "/dashboard/invite-links": {
    title: "Invite Links",
    subtitle: "Create and share invite links with your team.",
  },
  "/dashboard/role-permission": {
    title: "Role & Permission",
    subtitle: "Control access levels and user permissions.",
  },
  "/dashboard/(common)/success-path/overview": {
    title: "Success Path",
    subtitle: "Your structure monthly journey to property management mastery.",
  },
  "/dashboard/success-path/overview": {
    title: "Success Path",
    subtitle: "Your structure monthly journey to property management mastery.",
  },
  "/dashboard/success-path/monthly-progress": {
    title: "Monthly Progress",
    subtitle: "Track your daily and weekly progress for the current month.",
  },
};

const normalizePath = (path: string) => {
  if (path.length > 1 && path.endsWith("/")) return path.slice(0, -1);
  return path;
};

const resolveTopbarConfig = (path: string): TopbarConfig => {
  const normalizedPath = normalizePath(path);
  return TOPBAR_BY_PATH[normalizedPath] ?? TOPBAR_DEFAULT;
};

export default function DashboardShell({
  children,
  topbarConfig,
}: {
  children: React.ReactNode;
  topbarConfig?: Partial<TopbarConfig>;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const routeConfig = resolveTopbarConfig(pathname);

  const finalTopbarConfig: TopbarConfig = {
    title: topbarConfig?.title ?? routeConfig.title,
    subtitle: topbarConfig?.subtitle ?? routeConfig.subtitle,
  };

  return (
    <div className='flex h-screen bg-section-bg overflow-hidden'>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className='fixed inset-0 bg-black/50 z-20 lg:hidden'
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className='flex-1 flex flex-col overflow-hidden min-w-0'>
        <Topbar
          onMenuToggle={() => setSidebarOpen((prev) => !prev)}
          title={finalTopbarConfig.title}
          subtitle={finalTopbarConfig.subtitle}
        />
        <main className='flex-1 overflow-y-auto p-6 bg-[#F5F0E8]'>
          {children}
        </main>
      </div>
    </div>
  );
}
