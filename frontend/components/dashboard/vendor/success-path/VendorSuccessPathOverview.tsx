"use client";

import ProgressBar from "@/components/dashboard/common/ProgressBar";
import React from "react";

interface TopicBadgeProps {
  label: string;
}

const TopicBadge: React.FC<TopicBadgeProps> = ({ label }) => (
  <span className='inline-block px-3 py-1 text-xs font-medium rounded-full bg-[#FFF3E0] text-[#D4A017] mr-2 mb-2'>
    {label}
  </span>
);

interface StatusBadgeProps {
  status: "completed" | "active" | "locked";
  label: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, label }) => {
  const statusStyles = {
    completed: "bg-[#E8F5E9] text-[#4CAF50]",
    active: "bg-[#FFF3E0] text-[#D4A017]",
    locked: "bg-[#F5F5F5] text-[#999999]",
  };

  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full ${statusStyles[status]}`}>
      <svg className='w-3 h-3' fill='currentColor' viewBox='0 0 20 20'>
        {status === "completed" && (
          <path
            fillRule='evenodd'
            d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
            clipRule='evenodd'
          />
        )}
        {status === "active" && (
          <path
            fillRule='evenodd'
            d='M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z'
            clipRule='evenodd'
          />
        )}
        {status === "locked" && (
          <path
            fillRule='evenodd'
            d='M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z'
            clipRule='evenodd'
          />
        )}
      </svg>
      {label}
    </span>
  );
};

interface MonthSectionProps {
  monthNumber: number;
  monthTitle: string;
  status: "completed" | "active" | "locked";
  progress: number;
  topics: string[];
}

const MonthSection: React.FC<MonthSectionProps> = ({
  monthNumber,
  monthTitle,
  status,
  progress,
  topics,
}) => {
  const progressColor = progress === 0 ? "#CCCCCC" : "#D4A017";

  return (
    <div className='bg-white border border-[#E5E7EB] rounded-lg p-6 mb-4'>
      {/* Header with Month Info and Progress */}
      <div className='flex justify-between items-start mb-4'>
        <div className='flex items-center gap-3'>
          <div className='flex items-center justify-center w-10 h-10 rounded-full bg-[#E8C547]'>
            <span className='text-sm font-bold text-[#1f2937]'>
              {monthNumber}
            </span>
          </div>
          <div>
            <h3 className='font-playfair text-lg font-semibold text-[#1f2937]'>
              Month {monthNumber}
            </h3>
            <p className='text-xs text-[#6b7280]'>{monthTitle}</p>
          </div>
        </div>
        <div className='text-right'>
          <p className='text-xl font-bold text-[#1b2a4a]'>{progress}%</p>
        </div>
      </div>

      {/* Status Badge */}
      <div className='mb-4'>
        <StatusBadge
          status={status}
          label={status.charAt(0).toUpperCase() + status.slice(1)}
        />
      </div>

      {/* Progress Bar */}
      <div className='mb-6'>
        <ProgressBar value={progress} color={progressColor} height={12} />
      </div>

      {/* Key Topics */}
      <div>
        <h4 className='text-xs font-semibold text-[#6b7280] mb-3'>
          Key Topics:
        </h4>
        <div className='flex flex-wrap'>
          {topics.map((topic, idx) => (
            <TopicBadge key={idx} label={topic} />
          ))}
        </div>
      </div>
    </div>
  );
};

const VendorSuccessPathOverview = () => {
  // Sample data matching the design
  const months = [
    {
      monthNumber: 1,
      monthTitle: "Promotion & Branding",
      status: "completed" as const,
      progress: 100,
      topics: [
        "Understanding Targets Management",
        "Legal Basis",
        "Target Refining",
      ],
    },
    {
      monthNumber: 2,
      monthTitle: "Operation and Maintenance",
      status: "active" as const,
      progress: 60,
      topics: [
        "Maintenance Protocols",
        "Weekly Management",
        "Emergency Procedures",
      ],
    },
    {
      monthNumber: 2,
      monthTitle: "Operation and Maintenance",
      status: "locked" as const,
      progress: 0,
      topics: [
        "Maintenance Protocols",
        "Weekly Management",
        "Emergency Procedures",
      ],
    },
    {
      monthNumber: 2,
      monthTitle: "Operation and Maintenance",
      status: "locked" as const,
      progress: 0,
      topics: [
        "Maintenance Protocols",
        "Weekly Management",
        "Emergency Procedures",
      ],
    },
  ];

  return (
    <div className='w-full max-w-4xl mx-auto p-6 '>
      {/* Top Stats Cards */}
      <div className='bg-[#f5d98c] rounded-xl px-5 py-3.5 grid grid-cols-3 gap-0 mb-8'>
        {/* Overall Progress */}
        <div className='flex items-center gap-2.5 pr-4 border-r border-white/40 mr-4'>
          <div className='flex items-center justify-center w-9 h-9 bg-white/35 rounded-lg flex-shrink-0'>
            <svg
              className='w-[18px] h-[18px]'
              fill='none'
              stroke='#7a5c00'
              strokeWidth={2}
              strokeLinecap='round'
              strokeLinejoin='round'
              viewBox='0 0 24 24'>
              <rect x='3' y='11' width='18' height='11' rx='2' ry='2' />
              <path d='M7 11V7a5 5 0 0 1 10 0v4' />
            </svg>
          </div>
          <div>
            <p className='text-[11px] font-medium  mb-0.5'>Overall Progress</p>
            <p className='text-base font-bold text-[#5a4200]'>35%</p>
          </div>
        </div>

        {/* Current Month */}
        <div className='flex items-center gap-2.5 pr-4 border-r border-white/40 mr-4'>
          <div className='flex items-center justify-center w-9 h-9 bg-white/35 rounded-lg flex-shrink-0'>
            <svg
              className='w-[18px] h-[18px]'
              fill='none'
              stroke='#7a5c00'
              strokeWidth={2}
              strokeLinecap='round'
              strokeLinejoin='round'
              viewBox='0 0 24 24'>
              <rect x='3' y='11' width='18' height='11' rx='2' ry='2' />
              <path d='M7 11V7a5 5 0 0 1 10 0v4' />
            </svg>
          </div>
          <div>
            <p className='text-[11px] font-medium text-[#7a5c00] mb-0.5'>
              Current Month
            </p>
            <p className='text-base font-bold text-[#5a4200]'>Month 2</p>
          </div>
        </div>

        {/* Months Remaining */}
        <div className='flex items-center gap-2.5'>
          <div className='flex items-center justify-center w-9 h-9 bg-white/35 rounded-lg flex-shrink-0'>
            <svg
              className='w-[18px] h-[18px]'
              fill='none'
              stroke='#7a5c00'
              strokeWidth={2}
              strokeLinecap='round'
              strokeLinejoin='round'
              viewBox='0 0 24 24'>
              <rect x='3' y='11' width='18' height='11' rx='2' ry='2' />
              <path d='M7 11V7a5 5 0 0 1 10 0v4' />
            </svg>
          </div>
          <div>
            <p className='text-[11px] font-medium text-[#7a5c00] mb-0.5'>
              Months Remaining
            </p>
            <p className='text-base font-bold text-[#5a4200]'>2</p>
          </div>
        </div>
      </div>

      <div>
        {months.map((month, idx) => (
          <MonthSection
            key={idx}
            monthNumber={month.monthNumber}
            monthTitle={month.monthTitle}
            status={month.status}
            progress={month.progress}
            topics={month.topics}
          />
        ))}
      </div>
    </div>
  );
};

export default VendorSuccessPathOverview;
