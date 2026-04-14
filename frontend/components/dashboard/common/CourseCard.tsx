import { Course } from "@/types/course.type";
import React from "react";
import { FiClock, FiUsers } from "react-icons/fi";

interface ReusableCourseCardProps {
  course: Course;
  onStart?: (course: Course) => void;
}

const CourseCard: React.FC<ReusableCourseCardProps> = ({
  course,
  onStart,
}) => {
  const shortDescription =
    course.course_description || "Make learning numbers fun and easy";

  return (
    <div className='w-full max-w-96 border border-(--color-card-border) bg-(--color-card-bg) p-3.5 shadow-[0_2px_10px_rgba(15,23,42,0.06)]'>
      <img
        src={course.course_banner}
        alt={course.title}
        className='h-35.5 w-full rounded-lg object-cover'
      />

      <div className='mt-4 space-y-1.5 px-0.5'>
        <h3 className='line-clamp-1 text-[27px] font-medium leading-[1.35] text-(--color-text-primary)'>
          {course.title}
        </h3>
        <p className='line-clamp-1 text-xs text-(--color-placeholder-text)'>
          {shortDescription}
        </p>

        <div className='flex items-center gap-5 pt-1 text-xs text-(--color-placeholder-text)'>
          <span className='inline-flex items-center gap-1.5'>
            <FiClock className='text-[13px]' />
            {course.totalHours}hours
          </span>
          <span className='inline-flex items-center gap-1.5'>
            <FiUsers className='text-[13px]' />
            {course.totalEnroll}
          </span>
        </div>
      </div>

      <button
        type='button'
        onClick={() => onStart?.(course)}
        className='mt-5 w-full rounded-md border border-(--color-input-border) bg-(--color-btn-primary-bg) px-4 py-3 text-sm font-semibold text-(--color-primary-btn-text) transition hover:opacity-95'>
        Start Courses
      </button>
    </div>
  );
};

export default CourseCard;
