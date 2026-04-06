'use client'
import Image from 'next/image';
import React from 'react';

interface CourseCardProps {
  title: string;
  description: string;
  level: string;
  banner: string;
  lessonCount: number;
}

const BookIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-[var(--color-placeholder-text)]"
  >
    <path
      d="M2 3.5C2 2.67 2.67 2 3.5 2H12.5C13.33 2 14 2.67 14 3.5V12.5C14 13.33 13.33 14 12.5 14H3.5C2.67 14 2 13.33 2 12.5V3.5Z"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5 2V14"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    <path
      d="M8 5.5H11"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    <path
      d="M8 8H11"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
  </svg>
);

const CourseCard: React.FC<CourseCardProps> = ({
  title,
  description,
  level,
  banner,
  lessonCount,
}) => {
  return (
    <div
      className="bg-[var(--color-card-bg)] rounded-xl overflow-hidden flex flex-col"
      style={{
        border: '1px solid var(--color-card-border)',
        boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
        width: '260px',
      }}
    >
      {/* Banner Image */}
      <div className="relative w-full" style={{ height: '148px' }}>
        <Image
          src={banner}
          alt={title}
          fill
          className="object-cover"
        />
        {/* Level Badge */}
        <div
          className="absolute top-3 right-3 text-white text-[11px] font-medium px-3 py-[3px] rounded-full"
          style={{ backgroundColor: 'var(--color-secondary)' }}
        >
          {level}
        </div>
      </div>

      {/* Card Body */}
      <div className="flex flex-col flex-1 px-4 pt-3 pb-0">
        {/* Title */}
        <h3
          className="font-semibold text-[15px] leading-[1.4] mb-[6px]"
          style={{ color: 'var(--color-text-primary)' }}
        >
          {title}
        </h3>

        {/* Description */}
        <p
          className="text-[12.5px] leading-[1.55] mb-3 line-clamp-3"
          style={{ color: 'var(--color-placeholder-text)' }}
        >
          {description}
        </p>

        {/* Lesson Count */}
        <div className="flex items-center gap-[6px] mb-3">
          <BookIcon />
          <span
            className="text-[12px]"
            style={{ color: 'var(--color-placeholder-text)' }}
          >
            {lessonCount} Lessons
          </span>
        </div>
      </div>

      {/* Start Courses Button — full width, bottom */}
      <button
        className="w-full text-white text-[14px] font-semibold py-[13px] transition-colors duration-200"
        style={{
          backgroundColor: 'var(--color-btn-primary-bg)',
          borderRadius: '0',
          letterSpacing: '0.01em',
        }}
        onMouseEnter={(e) =>
          ((e.currentTarget as HTMLButtonElement).style.backgroundColor =
            'var(--color-btn-primary-hover-bg)')
        }
        onMouseLeave={(e) =>
          ((e.currentTarget as HTMLButtonElement).style.backgroundColor =
            'var(--color-btn-primary-bg)')
        }
      >
        Start Courses
      </button>
    </div>
  );
};

export default CourseCard;