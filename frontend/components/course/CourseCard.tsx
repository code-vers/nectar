"use client";
import Image from "next/image";
import React from "react";
import { CiClock2 } from "react-icons/ci";
import { FiUsers } from "react-icons/fi";
import { LuBookOpen } from "react-icons/lu";
import TertiaryButton from "../website/typography/TertiaryButton";

interface CourseCardProps {
  title: string;
  description?: string;
  level?: string;
  banner: string;
  totalEnroll: number;
  category?: string;
  totalHours: number;
  lessons: number;
}

const BookIcon = () => (
  <svg
    width='14'
    height='14'
    viewBox='0 0 16 16'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    className='text-(--color-placeholder-text)'>
    <path
      d='M2 3.5C2 2.67 2.67 2 3.5 2H12.5C13.33 2 14 2.67 14 3.5V12.5C14 13.33 13.33 14 12.5 14H3.5C2.67 14 2 13.33 2 12.5V3.5Z'
      stroke='currentColor'
      strokeWidth='1.2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M5 2V14'
      stroke='currentColor'
      strokeWidth='1.2'
      strokeLinecap='round'
    />
    <path
      d='M8 5.5H11'
      stroke='currentColor'
      strokeWidth='1.2'
      strokeLinecap='round'
    />
    <path
      d='M8 8H11'
      stroke='currentColor'
      strokeWidth='1.2'
      strokeLinecap='round'
    />
  </svg>
);

const getLevelBadgeStyle = (level: string): React.CSSProperties => {
  const normalized = level.toLowerCase();

  if (normalized === "beginner") {
    return {
      backgroundColor: "#F0FFF0",
      color: "#3DB53D",
      border: "1.5px dashed #3DB53D",
    };
  }

  if (normalized === "intermediate") {
    return {
      backgroundColor: "#E8F4FF",
      color: "#3B9EDB",
      border: "1.5px solid #3B9EDB",
    };
  }

  if (normalized === "advanced") {
    return {
      backgroundColor: "#F0EAFF",
      color: "#9B6FD4",
      border: "1.5px solid #C9AAEE",
    };
  }

  // fallback
  return {
    backgroundColor: "#F3F3F3",
    color: "#888",
    border: "1.5px solid #ccc",
  };
};

const CourseCard: React.FC<CourseCardProps> = ({
  title,
  description,
  level,
  banner,
  totalEnroll,
  category,
  totalHours,
  lessons,
}) => {
  const levelText = level ?? "Beginner";
  const safeDescription = description ?? "";
  const badgeStyle = getLevelBadgeStyle(levelText);

  return (
    <div className='bg-(--color-card-bg) border border-input-border p-4 rounded-xl overflow-hidden flex flex-col'>
      {/* Banner Image */}
      <div className='relative w-full' style={{ height: "148px" }}>
        <Image
          src={banner}
          alt={title}
          fill
          className='object-cover rounded-2xl'
        />
        <span className='absolute bg-white text-[#666666] top-4 left-4 text-[11px] font-medium px-3 py-0.75 rounded-full whitespace-nowrap'>
          {levelText}
        </span>
      </div>

      {/* Card Body */}
      <div className='flex flex-col flex-1 px-4 pt-6 pb-0'>
        {/* Title + Badge */}
        <div className='flex items-center gap-8 pb-1'>
          <h3
            className='font-medium text-[18px] leading-[1.4] '
            style={{ color: "var(--color-text-primary)" }}>
            {title}
          </h3>

          {/* <span className='text-[11px] font-medium px-3 py-0.75 rounded-full whitespace-nowrap bg-(--color-sidebar-active) text-(--color-sidebar-active-text)'>
            {category}
          </span>

 
          <span
            className='text-[11px] font-medium px-3 py-0.75 rounded-full whitespace-nowrap'
            style={badgeStyle}>
            {level}
          </span> */}
        </div>

        {/* Description */}
        <p
          className='text-[14px] leading-[1.55] text-muted-btn-bg mb-3 line-clamp-3'
          style={{ color: "var(--color-placeholder-text)" }}>
          {safeDescription}
        </p>

        {/* Lesson Count */}
        <div className='flex  items-center gap-1.5 mb-3'>
          <span className='mb-0.5'>
            {" "}
            <FiUsers />
          </span>
          <span
            className='text-[12px]'
            style={{ color: "var(--color-placeholder-text)" }}>
            {totalEnroll}
          </span>
          <CiClock2 className='mb-0.5 ml-4' />
          <span
            className='text-[12px]'
            style={{ color: "var(--color-placeholder-text)" }}>
            {totalHours} Hours
          </span>
        </div>
        <div className=' w-1/2 text-center flex items-center gap-1.5 mb-4 rounded-full'>
          <LuBookOpen className='text-[#4A5568]' />
          <span className='text-[#4A5568] text-[12px]'>{lessons} Lessons</span>
        </div>
      </div>

      {/* Start Courses Button — full width, bottom */}
      <TertiaryButton>Start Course</TertiaryButton>
    </div>
  );
};

export default CourseCard;
