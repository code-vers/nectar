"use client";

import { useState } from "react";
import SectionHeading from "../typography/SectionHeading";

const faqs = [
  {
    id: 1,
    question: "Who is this platform for?",
    answer:
      "Our platform is designed for property managers, landlords, and real estate professionals who want to streamline their workflow, manage listings efficiently, and connect with the right tenants or buyers.",
  },
  {
    id: 2,
    question: "Do residents get access?",
    answer:
      "Yes! Residents get their own dedicated portal where they can view their lease details, submit maintenance requests, make payments, and communicate directly with property managers — all in one place.",
  },
  {
    id: 3,
    question: "Are downloads included with membership?",
    answer:
      "Absolutely. All membership plans include unlimited downloads of reports, documents, and resources. There are no hidden fees or per-download charges at any tier.",
  },
  {
    id: 4,
    question: "Can I Upgrade or change my membership?",
    answer:
      "Yes, you can upgrade, downgrade, or change your membership plan at any time from your account settings. Changes take effect immediately and billing is prorated accordingly.",
  },
];

const Faq = () => {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggle = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className='w-full py-24 bg-tertiary  lg:px-25 px-5'>
      <SectionHeading
        title='Frequently Asked Questions'
        description='Get answers to common questions about our platform'
      />

      <div className='mt-8 flex flex-col gap-3 max-w-480 mx-auto'>
        {faqs.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div
              key={faq.id}
              className='border rounded-xl overflow-hidden transition-all duration-200'
              style={{
                borderColor: isOpen
                  ? "var(--color-input-border-focus)"
                  : "var(--color-card-border)",
                backgroundColor: "var(--color-card-bg)",
              }}>
              <button
                onClick={() => toggle(faq.id)}
                className='w-full flex items-center justify-between px-5 py-4 text-left cursor-pointer'
                aria-expanded={isOpen}>
                <span
                  className='title-subtitle font-medium'
                  style={{ color: "var(--color-text-primary)" }}>
                  {faq.question}
                </span>

                {/* Chevron icon */}
                <span
                  className='ml-4 flex-shrink-0 transition-transform duration-300'
                  style={{
                    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    color: isOpen
                      ? "var(--color-primary)"
                      : "var(--color-placeholder-text)",
                  }}>
                  <svg
                    width='18'
                    height='18'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'>
                    <polyline points='6 9 12 15 18 9' />
                  </svg>
                </span>
              </button>

              {/* Animated answer panel */}
              <div
                className='overflow-hidden transition-all duration-300 ease-in-out'
                style={{
                  maxHeight: isOpen ? "300px" : "0px",
                  opacity: isOpen ? 1 : 0,
                }}>
                <div
                  className='px-5 pb-4 title-subtitle'
                  style={{ color: "var(--color-placeholder-text)" }}>
                  {faq.answer}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Faq;
