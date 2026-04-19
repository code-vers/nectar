import DocumentCard from "@/components/dashboard/common/DocumentCard";
import { Document } from "@/types/document.type";
import React from "react";

type WorkbookItem = {
  id: string;
  title: string;
  description: string;
  month: string;
  pages: string;
  buttonLabel: string;
  buttonTone: "gold" | "navy" | "locked";
  locked?: boolean;
};

const workbookItems: WorkbookItem[] = [
  {
    id: "w-1",
    title: "Month 1: Foundation Workbook",
    description:
      "Essential exercises for understanding property management basics",
    month: "Month 1",
    pages: "24 Pages",
    buttonLabel: "Download Again",
    buttonTone: "gold",
  },
  {
    id: "w-2",
    title: "Month 2: Operations Manual",
    description:
      "Essential exercises for understanding property management basics",
    month: "Month 1",
    pages: "24 Pages",
    buttonLabel: "Download PDF",
    buttonTone: "navy",
  },
  {
    id: "w-3",
    title: "Month 1: Foundation Workbook",
    description:
      "Essential exercises for understanding property management basics",
    month: "Month 1",
    pages: "24 Pages",
    buttonLabel: "Locked",
    buttonTone: "locked",
    locked: true,
  },
  {
    id: "w-4",
    title: "Month 1: Foundation Workbook",
    description:
      "Essential exercises for understanding property management basics",
    month: "Month 1",
    pages: "24 Pages",
    buttonLabel: "Locked",
    buttonTone: "locked",
    locked: true,
  },
];

const resourceDocuments: Array<Document & { disabled?: boolean }> = [
  {
    id: "r-1",
    name: "Tenant Screening Checklist",
    type: "pdf",
    url: "#",
  },
  {
    id: "r-2",
    name: "Maintenance Request Form",
    type: "pdf",
    url: "#",
  },
  {
    id: "r-3",
    name: "Lease Agreement Template",
    type: "pdf",
    url: "#",
    disabled: true,
  },
  {
    id: "r-4",
    name: "Property Inspection Report",
    type: "pdf",
    url: "#",
    disabled: true,
  },
];

const buttonToneClass: Record<WorkbookItem["buttonTone"], string> = {
  gold: "bg-[#F0D080] text-white hover:bg-[#E5C063]",
  navy: "bg-[#1D2C4F] text-white hover:bg-[#172540]",
  locked:
    "border border-[#DADFE8] bg-[#F2F4F8] text-[#A6AFBE] cursor-not-allowed",
};

const WorkbookCard: React.FC<{ item: WorkbookItem }> = ({ item }) => {
  return (
    <article
      className={`rounded-sm border p-3 ${
        item.locked
          ? "border-[#E1E5EC] bg-[#F4F6FA]"
          : "border-[#D5DCE7] bg-[#F4F6FA]"
      }`}>
      <div className='flex items-start gap-2.5'>
        <div
          className={`mt-0.5 rounded-[3px] border p-1 ${
            item.locked
              ? "border-[#D7DDE8] text-[#B6BFCE]"
              : "border-[#C6D0DD] text-[#2C3850]"
          }`}>
          {item.locked ? (
            <svg
              className='h-3.5 w-3.5'
              viewBox='0 0 20 20'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'>
              <rect
                x='4'
                y='9'
                width='12'
                height='8'
                rx='1.5'
                stroke='currentColor'
                strokeWidth='1.4'
              />
              <path
                d='M6.7 9V6.9C6.7 5.1 8.1 3.7 9.9 3.7C11.7 3.7 13.1 5.1 13.1 6.9V9'
                stroke='currentColor'
                strokeWidth='1.4'
                strokeLinecap='round'
              />
            </svg>
          ) : (
            <svg
              className='h-3.5 w-3.5'
              viewBox='0 0 20 20'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M6.2 2.9H11.4L15.8 7.3V16.1C15.8 17 15 17.8 14.1 17.8H6.2C5.3 17.8 4.5 17 4.5 16.1V4.6C4.5 3.7 5.3 2.9 6.2 2.9Z'
                stroke='currentColor'
                strokeWidth='1.4'
              />
              <path
                d='M11.4 2.9V7.3H15.8'
                stroke='currentColor'
                strokeWidth='1.4'
              />
              <path
                d='M7.3 11.2H12.8'
                stroke='currentColor'
                strokeWidth='1.4'
                strokeLinecap='round'
              />
            </svg>
          )}
        </div>

        <div className='min-w-0'>
          <h3
            className={`truncate text-[13px] font-semibold leading-tight ${
              item.locked ? "text-[#A7AFBD]" : "text-[#2A354A]"
            }`}>
            {item.title}
          </h3>
          <p
            className={`mt-0.5 line-clamp-1 text-[9px] leading-[1.3] ${
              item.locked ? "text-[#C2C9D4]" : "text-[#93A0B1]"
            }`}>
            {item.description}
          </p>

          <div className='mt-1.5 flex items-center gap-3 text-[9px] text-[#9EA7B6]'>
            <span className='inline-flex items-center gap-1'>
              <svg
                className='h-3.5 w-3.5'
                viewBox='0 0 20 20'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M6.5 1.8V4.2M13.5 1.8V4.2M2.9 7.2H17.1M4.5 3.4H15.5C16.4 3.4 17.1 4.1 17.1 5V15.5C17.1 16.4 16.4 17.1 15.5 17.1H4.5C3.6 17.1 2.9 16.4 2.9 15.5V5C2.9 4.1 3.6 3.4 4.5 3.4Z'
                  stroke='currentColor'
                  strokeWidth='1.4'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
              {item.month}
            </span>
            <span>{item.pages}</span>
          </div>
        </div>
      </div>

      <button
        type='button'
        disabled={item.locked}
        className={`mt-2.5 flex h-8 w-full items-center justify-center gap-1 rounded-xs text-[12px] font-semibold transition-colors ${buttonToneClass[item.buttonTone]}`}>
        <svg
          className='h-3.5 w-3.5'
          viewBox='0 0 20 20'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M10 3.5V12.4M10 12.4L13.2 9.3M10 12.4L6.8 9.3M4.1 15.4H15.9'
            stroke='currentColor'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
        {item.buttonLabel}
      </button>
    </article>
  );
};

const page = () => {
  return (
    <div className='space-y-7'>
      <section className='rounded-sm border border-[#DFE4EC] bg-[#F3F5F9] p-4 sm:p-5'>
        <h2 className='text-[32px] font-semibold leading-[1.2] text-[#273248]'>
          Monthly Workbooks
        </h2>

        <div className='mt-4 grid grid-cols-1 gap-3 md:grid-cols-2'>
          {workbookItems.map((item) => (
            <WorkbookCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      <section className='rounded-sm border border-[#DFE4EC] bg-[#F9FAFC] p-4 sm:p-5'>
        <h2 className='text-[32px] font-semibold leading-[1.2] text-[#273248]'>
          Templates & Resources
        </h2>

        <div className='mt-4 space-y-2.5'>
          {resourceDocuments.map((document) => (
            <DocumentCard
              key={document.id}
              document={document}
              variant='resource-row'
              disabled={document.disabled}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default page;
