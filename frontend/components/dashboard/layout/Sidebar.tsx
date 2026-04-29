/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useGetUserProfileQuery } from "@/services/user";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useMemo, useState } from "react";
import {
  MdBarChart,
  MdClose,
  MdDashboard,
  MdEmojiEvents,
  MdKeyboardArrowDown,
  MdMenuBook,
  MdNotifications,
  MdOutlineBookmarks,
  MdPerson,
} from "react-icons/md";

/* ---------------- NAV ITEMS ---------------- */

const navItems = [
  {
    label: "Dashboard",
    icon: MdDashboard,
    href: "/dashboard",
  },
  {
    label: "Education Center",
    icon: MdMenuBook,
    children: [
      {
        label: "Course Library",
        href: "/dashboard/education-center/course-library",
      },
      { label: "My Courses", href: "/dashboard/education-center/my-courses" },
      {
        label: "Certification",
        href: "/dashboard/education-center/certification",
      },
    ],
  },
  {
    label: "Success Path",
    icon: MdEmojiEvents,
    children: [
      { label: "Overview", href: "/dashboard/success-path/overview" },
      {
        label: "Monthly Progress",
        href: "/dashboard/success-path/monthly-progress",
      },
    ],
  },
  {
    label: "Workbooks",
    icon: MdOutlineBookmarks,
    href: "/dashboard/workbooks",
  },
  {
    label: "Progress",
    icon: MdBarChart,
    href: "/dashboard/progress",
  },
  {
    label: "Notification",
    icon: MdNotifications,
    href: "/dashboard/notification",
  },
  { label: "Account", icon: MdPerson, href: "/dashboard/account" },
];

/* ---------------- ROLE MAP ---------------- */

const roleBasedSidebar = {
  super_admin: navItems,

  maintenance_tech: [
    {
      label: "Dashboard",
      icon: MdDashboard,
      href: "/dashboard",
    },
    {
      label: "User Management",
      icon: MdMenuBook,
      children: [
        { label: "All Users", href: "/dashboard/all-users" },
        { label: "Role & Permission", href: "/dashboard/role-permission" },
      ],
    },
    {
      label: "Education Center",
      icon: MdEmojiEvents,
      children: [
        { label: "Course Library", href: "/dashboard/course-library" },
        { label: "Add Courses", href: "/dashboard/add-courses" },
      ],
    },
    {
      label: "Account",
      icon: MdPerson,
      href: "/dashboard/account",
    },
  ],

  vendor: navItems,

  owner: navItems,

  property_manager: navItems,

  user: navItems,
};

/* ---------------- COMPONENT ---------------- */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Sidebar = ({ isOpen = false, onClose }: any) => {
  const pathname = usePathname();
  const { data } = useGetUserProfileQuery(undefined, undefined);

  const roles: string[] = data?.data?.roles || [];

  const sidebarItems = useMemo(() => {
    if (!roles.length) return roleBasedSidebar.user;

    const role = roles[0]; // primary role
    return (
      roleBasedSidebar[role as keyof typeof roleBasedSidebar] ||
      roleBasedSidebar.user
    );
  }, [roles]);

  const getDefaultOpen = () =>
    sidebarItems
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .filter((item: any) =>
        item.children?.some((c: any) => pathname.startsWith(c.href)),
      )
      .map((item: any) => item.label);

  const [openMenus, setOpenMenus] = useState<string[]>(getDefaultOpen());

  const toggleMenu = (label: string, e: React.MouseEvent) => {
    e.preventDefault();
    setOpenMenus((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label],
    );
  };

  const isActive = (href: string) => pathname === href;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isGroupActive = (children: any[]) =>
    children.some((c) => pathname.startsWith(c.href));

  return (
    <aside
      className={`
        fixed inset-y-0 left-0 z-30 w-60 bg-primary flex flex-col text-white
        transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:relative
      `}>
      {/* Header */}
      <div className='px-4 py-5 border-b border-white/10 flex justify-between'>
        <div className='font-semibold'>Dashboard</div>
        <button onClick={onClose} className='lg:hidden'>
          <MdClose />
        </button>
      </div>

      {/* NAV */}
      <nav className='flex-1 overflow-y-auto py-3'>
        {sidebarItems.map((item: any) => {
          const Icon = item.icon;
          const menuOpen = openMenus.includes(item.label);

          if (item.children) {
            const activeGroup = isGroupActive(item.children);

            return (
              <div key={item.label}>
                <button
                  onClick={(e) => toggleMenu(item.label, e)}
                  className={`w-full flex justify-between px-4 py-2 text-sm ${
                    activeGroup ? "text-yellow-300" : "text-white/70"
                  }`}>
                  <div className='flex items-center gap-2'>
                    <Icon />
                    {item.label}
                  </div>
                  <MdKeyboardArrowDown
                    className={`${menuOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {menuOpen && (
                  <div className='ml-6 border-l border-white/20 pl-3'>
                    {item.children.map((child: any) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={`block py-1 text-xs ${
                          isActive(child.href)
                            ? "text-yellow-300"
                            : "text-white/60"
                        }`}>
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-2 px-4 py-2 text-sm ${
                isActive(item.href) ? "text-yellow-300" : "text-white/70"
              }`}>
              <Icon />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className='px-4 py-4 border-t border-white/10 text-sm'>
        Role: {roles.join(", ")}
      </div>
    </aside>
  );
};

export default Sidebar;
