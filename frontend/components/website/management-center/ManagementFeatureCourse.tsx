import CourseCard from '@/components/course/CourseCard';
import { courses } from '@/types/course.type';
import SectionHeading from '../typography/SectionHeading';

const ManagementFeatureCourse = () => {
  return (
    <div className='pt-16'>
      <SectionHeading title='Featured Courses' description='Start with these popular courses designed for property owners at every level'/>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8'>
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            title={course.title}
            description={course.course_description}
            category={course.category}
            banner={course.course_banner}
            lavel={course.lavel}
            totalEnroll={course.totalEnroll}

          />
        ))}
      </div>

    </div>
  );
};

export default ManagementFeatureCourse;