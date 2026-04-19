"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "../../../public/images/shared/logo4.png";

const Footer = () => {
  const router = usePathname();
  if (router.includes("/dashboard") || router.includes("/admin")) {
    return null;
  }
  return (
    <div className='bg-main-bg'>
      <footer
        className='w-full  py-12 px-6'
        style={{ backgroundColor: "#1A2035" }}>
        <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10'>
          {/* Brand Column */}
          <div className='flex flex-col gap-4'>
            <Image src={logo} alt='Nectar Logo' width={140} height={140} />
            <p className='text-sm leading-relaxed' style={{ color: "#B9C6C0" }}>
              Empowering property owners, managers, and residents with education
              and resources.
            </p>
          </div>

          {/* Quick Access */}
          <div className='flex flex-col gap-4'>
            <h4 className='text-sm font-semibold text-white'>Quick Access</h4>
            <nav className='flex flex-col gap-3'>
              {[
                "Courses",
                "Download",
                "Success Academy",
                "Children's Center",
              ].map((item) => (
                <Link
                  key={item}
                  href='#'
                  className='text-sm transition-colors duration-200 hover:text-white'
                  style={{ color: "#8B95A8" }}>
                  {item}
                </Link>
              ))}
            </nav>
          </div>

          {/* Company */}
          <div className='flex flex-col gap-4'>
            <h4 className='text-sm font-semibold text-white'>Company</h4>
            <nav className='flex flex-col gap-3'>
              {["About Us", "Pricing", "Contact", "FAQs"].map((item) => (
                <Link
                  key={item}
                  href='#'
                  className='text-sm transition-colors duration-200 hover:text-white'
                  style={{ color: "#B9C6C0" }}>
                  {item}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Us */}
          <div className='flex flex-col gap-4'>
            <h4 className='text-sm font-semibold text-white'>Contact Us</h4>

            <div className='flex items-start gap-2'>
              <svg
                className='mt-0.5 flex-shrink-0'
                width='14'
                height='14'
                viewBox='0 0 24 24'
                fill='none'
                stroke='#8B95A8'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'>
                <path d='M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z' />
                <circle cx='12' cy='10' r='3' />
              </svg>
              <p className='text-xs leading-snug' style={{ color: "#8B95A8" }}>
                4140 Parker Rd. Allentown, New Mexico 31134
              </p>
            </div>

            <div className='flex items-center gap-2'>
              <svg
                width='14'
                height='14'
                viewBox='0 0 24 24'
                fill='none'
                stroke='#8B95A8'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'>
                <path d='M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.56 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.54a16 16 0 0 0 5.55 5.55l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z' />
              </svg>
              <span className='text-xs' style={{ color: "#8B95A8" }}>
                9606768745666
              </span>
            </div>

            {/* Social Icons */}
            <div className='flex items-center gap-2 mt-1'>
              <a
                href='#'
                aria-label='Facebook'
                className='w-7 h-7 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity'
                style={{ backgroundColor: "#1877F2" }}>
                <svg width='12' height='12' viewBox='0 0 24 24' fill='white'>
                  <path d='M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z' />
                </svg>
              </a>
              <a
                href='#'
                aria-label='Twitter'
                className='w-7 h-7 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity'
                style={{ backgroundColor: "#1DA1F2" }}>
                <svg width='12' height='12' viewBox='0 0 24 24' fill='white'>
                  <path d='M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z' />
                </svg>
              </a>
              <a
                href='#'
                aria-label='Instagram'
                className='w-7 h-7 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity'
                style={{ backgroundColor: "#E1306C" }}>
                <svg
                  width='12'
                  height='12'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='white'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'>
                  <rect x='2' y='2' width='20' height='20' rx='5' ry='5' />
                  <circle cx='12' cy='12' r='4' />
                  <circle
                    cx='17.5'
                    cy='6.5'
                    r='0.5'
                    fill='white'
                    stroke='none'
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
