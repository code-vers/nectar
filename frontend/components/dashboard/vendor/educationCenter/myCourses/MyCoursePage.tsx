"use client";

import CourseCard from "@/components/dashboard/common/CourseCard";
import { Course, courses } from "@/types/course.type";

const myCourseFakeData: Course[] = courses.slice(0, 2).map((course, index) => ({
  ...course,
  title: "Property Management Fundamentals",
  course_description: "Make learning numbers fun and easy",
  totalHours: 302,
  completedLessons: 12,
  totalLessons: 12,
  progressPercent: index === 0 ? 100 : 50,
  badgeText: "Completed",
  actionLabel: index === 0 ? "View Certificate" : "Continue Learning",
  secondaryActionLabel: index === 0 ? "Review Courses" : undefined,
}));

const MyCoursePage = () => {
  const handleStartCourse = (course: Course) => {
    console.log("Open my course action:", course.id);
  };

  return (
    <div className='space-y-4 mt-16'>
      <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <h1 className='text-[32px] font-semibold text-(--color-text-primary)'>
          My Courses
        </h1>
        <input
          type='text'
          placeholder='Search Forms'
          className='h-10 w-full bg-transparent rounded-md border border-(--color-card-border)  px-3 text-sm text-(--color-text-primary) outline-none sm:max-w-72'
        />
      </div>

      <div className='space-y-4'>
        {myCourseFakeData.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            onStart={handleStartCourse}
            layout='row'
          />
        ))}
      </div>
    </div>
  );
};

export default MyCoursePage;
