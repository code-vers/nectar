"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FiChevronDown, FiMenu, FiX } from "react-icons/fi";
import logo from "../../../public/images/shared/logo2.png";
import PrimaryButton from "../typography/PrimaryButton";

const menuItems = [
  { label: "Home", href: "/", hasDropdown: false, dropdown: [] },
  {
    label: "How It works",
    href: "/how-it-works",
    hasDropdown: false,
    dropdown: [],
  },
  { label: "Pricing", href: "/pricing", hasDropdown: false, dropdown: [] },
  {
    label: "Centers",
    href: "#",
    hasDropdown: true,
    dropdown: [
      { label: "Owner Education Center", href: "/education-center" },
      {
        label: "Property Management Education Center",
        href: "/management-education-center",
      },
      { label: "Resident Success Academy", href: "/success-academy" },
    ],
  },
  {
    label: "Contact us",
    href: "/contact-us",
    hasDropdown: false,
    dropdown: [],
  },
];

const Navbar = () => {
  const router = usePathname();

  if (router.includes("/dashboard") || router.includes("/admin")) {
    return null;
  }
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className='bg-tertiary shadow-sm border-b border-(--color-card-border)'>
        <div className=' mx-auto px-16 h-20 flex items-center justify-between'>
          {/* ── Logo ── */}
          <Image src={logo} alt='Nectar Logo' width={120} height={78} />

          {/* ── Nav Links (Desktop) ── */}
          <ul className='hidden lg:flex items-center gap-8 list-none m-0 p-0'>
            {menuItems.map((item) => (
              <li
                key={item.label}
                className='relative'
                onMouseEnter={() =>
                  item.hasDropdown && setOpenDropdown(item.label)
                }
                onMouseLeave={() => setOpenDropdown(null)}>
                <Link
                  href={item.href}
                  className='title-subtitle flex  items-center gap-1 text-placeholder-text  no-underline whitespace-nowrap py-1 transition-colors duration-150 hover:text-(--color-primary)'>
                  {item.label}
                  {item.hasDropdown && (
                    <FiChevronDown
                      size={14}
                      className='text-placeholder-text transition-transform duration-200'
                      style={{
                        transform:
                          openDropdown === item.label
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                      }}
                    />
                  )}
                </Link>

                {/* Dropdown panel */}
                {item.hasDropdown && openDropdown === item.label && (
                  <div className='absolute top-full left-0 pt-2 min-w-80 z-50'>
                    <div className='bg-(--color-card-bg) border border-(--color-card-border) rounded-lg shadow-lg py-2'>
                      {item.dropdown.map((opt) => (
                        <Link
                          key={opt.label}
                          href={opt.href}
                          className='block px-4 py-2 title-subtitle text-[#000000] no-underline transition-colors duration-150 hover:bg-(--color-hover-surface) hover:text-(--color-primary)'>
                          {opt.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>

          {/* ── Right Actions (Desktop) ── */}
          <div className='hidden lg:flex items-center gap-3 shrink-0'>
            {/* Log In */}
            <button className='title-subtitle text-[18px] font-semibold  text-(--color-text-primary) bg-transparent border-none cursor-pointer px-3 py-2 rounded-md transition-colors duration-150 '>
              Log In
            </button>

            {/* Sign Up */}
            {/* <button className='title-subtitle text-(--color-primary-btn-text) bg-(--color-btn-primary-bg) border-none cursor-pointer px-5 py-2.25 rounded-md transition-all duration-150 hover:bg-(--color-btn-primary-hover-bg) hover:-translate-y-px whitespace-nowrap'>
              Sign Up
            </button> */}

            <PrimaryButton href='/sign-up'>Sign Up</PrimaryButton>
          </div>

          {/* ── Mobile Menu Toggle ── */}
          <button
            className='lg:hidden flex items-center justify-center p-2 text-(--color-text-primary) bg-transparent border-none cursor-pointer'
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label='Toggle menu'>
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </nav>

      {/* ── Mobile Menu Sidebar ── */}
      {mobileMenuOpen && (
        <div className='fixed inset-0 z-40 lg:hidden'>
          {/* Overlay */}
          <div
            className='absolute inset-0 bg-transparent'
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Slide-in Menu */}
          <div className='absolute top-0 left-0 h-screen w-72 bg-(--color-card-bg) shadow-lg overflow-y-auto transform transition-transform duration-300 ease-out'>
            <div className='p-6'>
              {/* Close Button */}
              <button
                onClick={() => setMobileMenuOpen(false)}
                className='mb-6 p-2 text-(--color-text-primary) bg-transparent border-none cursor-pointer'>
                <FiX size={24} />
              </button>

              {/* Mobile Menu Items */}
              <ul className='list-none m-0 p-0 space-y-2'>
                {menuItems.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className='block px-4 py-3 title-subtitle text-(--color-text-primary) no-underline rounded-md transition-colors duration-150 hover:bg-(--color-hover-surface) hover:text-(--color-primary)'
                      onClick={() =>
                        !item.hasDropdown && setMobileMenuOpen(false)
                      }>
                      {item.label}
                    </Link>

                    {/* Mobile Dropdown */}
                    {item.hasDropdown && (
                      <ul className='list-none m-0 p-0 ml-4 space-y-1 mt-2 border-l-2 border-(--color-card-border) pl-4'>
                        {item.dropdown.map((opt) => (
                          <li key={opt.label}>
                            <Link
                              href={opt.href}
                              className='block px-3 py-2 text-sm text-(--color-placeholder-text) no-underline rounded-md transition-colors duration-150 hover:bg-(--color-hover-surface) hover:text-(--color-primary)'
                              onClick={() => setMobileMenuOpen(false)}>
                              {opt.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>

              {/* Mobile Action Buttons */}
              <div className='flex flex-col gap-3 mt-8 pt-6 border-t border-(--color-card-border)'>
                {/* Log In */}
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className='w-full title-subtitle font-semibold text-(--color-text-primary) bg-transparent border border-(--color-input-border) cursor-pointer px-4 py-2 rounded-md transition-colors duration-150 hover:text-(--color-primary) hover:bg-(--color-hover-surface)'>
                  Log In
                </button>

                {/* Sign Up */}
                {/* <button
                  onClick={() => setMobileMenuOpen(false)}
                  className='w-full title-subtitle text-(--color-primary-btn-text) bg-(--color-btn-primary-bg) border-none cursor-pointer px-4 py-2 rounded-md transition-all duration-150 hover:bg-(--color-btn-primary-hover-bg)'>
                  Sign Up
                </button> */}
                <PrimaryButton>Sign Up</PrimaryButton>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
