"use client";
import Image from "next/image";
import React from "react";
import PrimaryButton from "../website/typography/PrimaryButton";

interface CourseCardProps {
  title: string;
  description: string;
  lavel: string;
  banner: string;
  totalEnroll: number;
  category: string;
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
  lavel,
  banner,
  totalEnroll,
  category,
}) => {
  const badgeStyle = getLevelBadgeStyle(lavel);

  return (
    <div className='bg-(--color-card-bg) border border-input-border p-6 rounded-xl overflow-hidden flex flex-col'>
      {/* Banner Image */}
      <div className='relative w-full' style={{ height: "148px" }}>
        <Image
          src={banner}
          alt={title}
          fill
          className='object-cover rounded-2xl'
        />
      </div>

      {/* Card Body */}
      <div className='flex flex-col flex-1 px-4 pt-6 pb-0'>
        {/* Title + Badge */}
        <div className='flex items-center gap-8 pb-4'>
          <h3
            className='font-semibold text-[15px] leading-[1.4] mb-1.5'
            style={{ color: "var(--color-text-primary)" }}>
            {title}
          </h3>

          <span className='text-[11px] font-medium px-3 py-0.75 rounded-full whitespace-nowrap bg-(--color-sidebar-active) text-(--color-sidebar-active-text)'>
            {category}
          </span>

          {/* Level Badge — conditionally styled */}
          <span
            className='text-[11px] font-medium px-3 py-0.75 rounded-full whitespace-nowrap'
            style={badgeStyle}>
            {lavel}
          </span>
        </div>

        {/* Description */}
        <p
          className='text-[12.5px] leading-[1.55] mb-3 line-clamp-3'
          style={{ color: "var(--color-placeholder-text)" }}>
          {description}
        </p>

        {/* Lesson Count */}
        <div className='flex py-2 items-center gap-1.5 mb-3'>
          <BookIcon />
          <span
            className='text-[12px]'
            style={{ color: "var(--color-placeholder-text)" }}>
            {totalEnroll} Lessons
          </span>
        </div>
      </div>

      {/* Start Courses Button — full width, bottom */}
      <PrimaryButton>Start Course</PrimaryButton>
    </div>
  );
};

export default CourseCard;
