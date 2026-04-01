'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import logo from '../../../public/images/shared/logo.jpg';

const menuItems = [
  { label: 'Home', href: '#', hasDropdown: false, dropdown: [] },
  { label: 'How It works', href: '#', hasDropdown: false, dropdown: [] },
  { label: 'Pricing', href: '#', hasDropdown: false, dropdown: [] },
  {
    label: 'Centers',
    href: '#',
    hasDropdown: true,
    dropdown: ['All Centers', 'Near Me', 'Map View'],
  },
  { label: 'Contact us', href: '#', hasDropdown: false, dropdown: [] },
];

const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <nav className="bg-(--color-card-bg) shadow-sm border-b border-(--color-card-border)">
      <div className="max-w-300 mx-auto px-6 h-20 flex items-center justify-between">

        {/* ── Logo ── */}
        <Image src={logo} alt="Nectar Logo" width={88} height={78} />
      
        {/* ── Nav Links ── */}
        <ul className="flex items-center gap-8 list-none m-0 p-0">
          {menuItems.map((item) => (
            <li
              key={item.label}
              className="relative"
              onMouseEnter={() => item.hasDropdown && setOpenDropdown(item.label)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                href={item.href}
                className="title-subtitle flex  items-center gap-1 text-placeholder-text  no-underline whitespace-nowrap py-1 transition-colors duration-150 hover:text-(--color-primary)"
              >
                {item.label}
                {item.hasDropdown && (
                  <FiChevronDown
                    size={14}
                    className="text-placeholder-text transition-transform duration-200"
                    style={{
                      transform:
                        openDropdown === item.label ? 'rotate(180deg)' : 'rotate(0deg)',
                    }}
                  />
                )}
              </Link>

              {/* Dropdown panel */}
              {item.hasDropdown && openDropdown === item.label && (
                <div className="absolute top-[calc(100%+8px)] left-0 bg-(--color-card-bg) border border-(--color-card-border) rounded-lg shadow-lg py-2 min-w-40 z-50">
                  {item.dropdown.map((opt) => (
                    <a
                      key={opt}
                      href="#"
                      className="block px-4 py-2 title-subtitle text-(--color-text-primary) no-underline transition-colors duration-150 hover:bg-(--color-hover-surface) hover:text-(--color-primary)"
                    >
                      {opt}
                    </a>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* ── Right Actions ── */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Log In */}
          <button className="title-subtitle font-semibold text-(--color-text-primary) bg-transparent border-none cursor-pointer px-3 py-2 rounded-md transition-colors duration-150 hover:text-(--color-primary) hover:bg-(--color-hover-surface)">
            Log In
          </button>

          {/* Sign Up */}
          <button className="title-subtitle font-semibold text-(--color-primary-btn-text) bg-(--color-btn-primary-bg) border-none cursor-pointer px-5 py-2.25 rounded-md transition-all duration-150 hover:bg-(--color-btn-primary-hover-bg) hover:-translate-y-px whitespace-nowrap">
            Sign Up
          </button>

          {/* Download icon */}
          {/* <button
            className="flex items-center justify-center p-1.5 rounded bg-transparent border-none cursor-pointer transition-colors duration-150 hover:bg-[var(--color-hover-surface)]"
            title="Download"
          >
            <MdOutlineFileDownload size={22} className="text-[var(--color-green)]" />
          </button> */}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;