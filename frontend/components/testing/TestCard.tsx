import { courses } from "@/types/course.type";
import React from "react";
import CourseCard from "../course/CourseCard";
const TestCard: React.FC = () => {
  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          title={course.title}
          description={course.course_description}
          lavel={course.lavel}
          banner={course.course_banner}
          totalEnroll={course.totalEnroll}
          category={course.category}
        />
      ))}
    </div>
  );
};

export default TestCard;
