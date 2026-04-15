"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import {
  MdBarChart,
  MdClose,
  MdDashboard,
  MdEmojiEvents,
  MdKeyboardArrowDown,
  MdKeyboardArrowRight,
  MdKeyboardArrowUp,
  MdMenuBook,
  MdNotifications,
  MdOutlineBookmarks,
  MdPerson,
} from "react-icons/md";

type NavChild = { label: string; href: string };
type NavItem = {
  label: string;
  icon: React.ElementType;
  href?: string;
  hasArrow?: boolean;
  children?: NavChild[];
};

const navItems: NavItem[] = [
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
    hasArrow: true,
  },
  {
    label: "Notification",
    icon: MdNotifications,
    href: "/dashboard/notification",
  },
  { label: "Account", icon: MdPerson, href: "/dashboard/account" },
];
const MaintenanceNavItems: NavItem[] = [
  {
    label: "Dashboard",
    icon: MdDashboard,
    href: "/dashboard",
  },
  {
    label: "User Management",
    icon: MdMenuBook,
    children: [
      {
        label: "All Users",
        href: "/dashboard/all-users",
      },
      {
        label: "Role & Permission",
        href: "/dashboard/role-permission",
      },
    ],
  },
  {
    label: "Education Center",
    icon: MdEmojiEvents,
    children: [
      { label: "Course Library", href: "/dashboard/course-library" },
      {
        label: "Add Courses",
        href: "/dashboard/add-courses",
      },
    ],
  },
  {
    label: "Content Upload",
    icon: MdEmojiEvents,
    children: [
      {
        label: "Upload Training PDFs",
        href: "/dashboard/upload-training-pdfs",
      },
      {
        label: "Upload Exam PDFs",
        href: "/dashboard/upload-exam-pdfs",
      },
    ],
  },
  {
    label: "Referral System",
    icon: MdEmojiEvents,
    children: [
      {
        label: "Invite Links",
        href: "/dashboard/invite-links",
      },
    ],
  },
  {
    label: "Communication Center",
    icon: MdEmojiEvents,
    children: [
      {
        label: "Community Notices",
        href: "/dashboard/community-notices",
      },
      {
        label: "Post Announcement",
        href: "/dashboard/post-announcement",
      },
    ],
  },
  {
    label: "Platform Settings",
    icon: MdEmojiEvents,
    children: [
      {
        label: "General Settings",
        href: "/dashboard/general-settings",
      },
      {
        label: "Subscription Settings",
        href: "/dashboard/subscription-settings",
      },
    ],
  },
];

const vendorNavItems: NavItem[] = [
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
        href: "/dashboard/course-library",
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
    hasArrow: true,
  },
  {
    label: "Notification",
    icon: MdNotifications,
    href: "/dashboard/notification",
  },
  { label: "Account", icon: MdPerson, href: "/dashboard/account" },
];
const investorDashboardNavItems: NavItem[] = [
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
    label: "Operational Resources",
    icon: MdEmojiEvents,
    children: [
      { label: "Guide", href: "/dashboard/guide/" },
      {
        label: "Form & Templates",
        href: "/dashboard/success-path/form-templates",
      },
      {
        label: "Process Checklists",
        href: "/dashboard/success-path/process-checklists",
      },
      {
        label: "Uploaded Files",
        href: "/dashboard/success-path/uploaded-files",
      },
    ],
  },
  {
    label: "Residents Success Center",
    icon: MdOutlineBookmarks,
    href: "/dashboard/workbooks",
  },
  {
    label: "Progress",
    icon: MdBarChart,
    href: "/dashboard/progress",
    hasArrow: true,
  },
  {
    label: "Notification",
    icon: MdNotifications,
    href: "/dashboard/notification",
  },
  {
    label: "Communication Center",
    icon: MdEmojiEvents,
    children: [
      { label: "Community Notices", href: "/dashboard/community-notices/" },
      {
        label: "Post Announcement",
        href: "/dashboard/success-path/post-announcement",
      },
    ],
  },
  {
    label: "Residents",
    icon: MdEmojiEvents,
    children: [
      { label: "Community Notices", href: "/dashboard/community-notices/" },
      {
        label: "Resident Listt",
        href: "/dashboard/success-path/resident-list",
      },
    ],
  },
  {
    label: "Platform Overview",
    icon: MdEmojiEvents,
    href: "/dashboard/platform-overview",
  },
  {
    label: "Notification",
    icon: MdEmojiEvents,
    href: "/dashboard/notification",
  },
  {
    label: "Account",
    icon: MdEmojiEvents,
    href: "/dashboard/account",
  },
];

type SidebarProps = {
  isOpen?: boolean;
  onClose?: () => void;
};

const Sidebar = ({ isOpen = false, onClose }: SidebarProps) => {
  const pathname = usePathname();

  const getDefaultOpen = () =>
    navItems
      .filter((item) => item.children?.some((c) => pathname.startsWith(c.href)))
      .map((item) => item.label);

  const [openMenus, setOpenMenus] = useState<string[]>(getDefaultOpen);

  const toggleMenu = (label: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenMenus((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label],
    );
  };

  const isActive = (href: string) => pathname === href;
  const isGroupActive = (children: NavChild[]) =>
    children.some((c) => pathname.startsWith(c.href));

  return (
    <aside
      className={`
        fixed inset-y-0 left-0 z-30 w-50 bg-primary flex flex-col text-white shrink-0
        transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:relative lg:translate-x-0 lg:inset-auto lg:z-auto
      `}>
      {/* Top user profile */}
      <div className='px-4 py-5 border-b border-white/10'>
        <div className='flex items-center gap-3'>
          <div className='w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-white font-semibold text-sm shrink-0'>
            EH
          </div>
          <div className='min-w-0 flex-1'>
            <p className='text-sm font-semibold text-white leading-tight truncate'>
              Esther Howard
            </p>
            <p className='text-xs text-white/50 leading-tight'>Resident</p>
          </div>
          <button
            onClick={onClose}
            className='lg:hidden shrink-0 w-7 h-7 flex items-center justify-center rounded-md hover:bg-white/15 transition-colors'
            aria-label='Close sidebar'>
            <MdClose size={18} className='text-white/70' />
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className='flex-1 py-3 overflow-y-auto'>
        {MaintenanceNavItems.map((item) => {
          const Icon = item.icon;
          const menuOpen = openMenus.includes(item.label);

          if (item.children) {
            const groupActive = isGroupActive(item.children);
            return (
              <div key={item.label}>
                <button
                  type='button'
                  onClick={(e) => toggleMenu(item.label, e)}
                  className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors hover:bg-sidebar-active hover:text-sidebar-active-text ${
                    groupActive ? "text-sidebar-active-text" : "text-white/75"
                  }`}>
                  <div className='flex items-center gap-2.5'>
                    <Icon size={15} className='shrink-0' />
                    <span>{item.label}</span>
                  </div>
                  <MdKeyboardArrowDown
                    size={16}
                    className={`transition-transform duration-200 ${menuOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {menuOpen && (
                  <div className='ml-5 pl-4 pb-1 border-l border-white/35'>
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        onClick={onClose}
                        className={`block py-1.5 px-2 text-xs rounded transition-colors ${
                          isActive(child.href)
                            ? "text-sidebar-active-text bg-sidebar-active font-medium"
                            : "text-white/55 hover:text-sidebar-active-text hover:bg-sidebar-active"
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
              href={item.href!}
              onClick={onClose}
              className={`flex items-center justify-between px-4 py-2.5 text-sm transition-colors ${
                isActive(item.href!)
                  ? "bg-sidebar-active text-sidebar-active-text font-medium border-r-2 border-secondary"
                  : "text-white/75 hover:bg-sidebar-active hover:text-sidebar-active-text"
              }`}>
              <div className='flex items-center gap-2.5'>
                <Icon size={15} className='shrink-0' />
                <span>{item.label}</span>
              </div>
              {item.hasArrow && (
                <MdKeyboardArrowRight size={16} className='text-white/40' />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom user section */}
      <div className='px-4 py-4 border-t border-white/10'>
        <div className='flex items-center gap-2.5'>
          <div className='w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white text-xs font-semibold shrink-0'>
            S
          </div>
          <div className='min-w-0 flex-1'>
            <p className='text-sm font-medium text-white leading-tight truncate'>
              shadcn
            </p>
            <p className='text-xs text-white/50 leading-tight truncate'>
              m@example.com
            </p>
          </div>
          <MdKeyboardArrowUp size={16} className='text-white/40 shrink-0' />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
