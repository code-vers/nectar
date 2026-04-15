import { courses } from "@/types/course.type";
import React from "react";
import CourseCard from "../course/CourseCard";
const TestCard: React.FC = () => {
  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-4'>
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          title={course.title}
          description={course.course_description}
          lavel={course.lavel}
          banner={course.course_banner}
          totalEnroll={course.totalEnroll}
          category={course.category}
          totalHours={course.totalHours}
          lessons={course.course.length || 0}
        />
      ))}
    </div>
  );
};

export default TestCard;
