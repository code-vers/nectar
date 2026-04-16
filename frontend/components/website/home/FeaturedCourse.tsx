import { Course, CourseLavel } from "@/types/course.type";
import Image from "next/image";
import { AiOutlineClockCircle } from "react-icons/ai";
import { HiOutlineUsers } from "react-icons/hi2";
import PrimaryButton from "../typography/PrimaryButton";
import SectionHeading from "../typography/SectionHeading";

const courses: Course[] = [
  {
    id: "1",
    title: "Being a Great Resident",
    course_description:
      "Learn how to communicate with property management and follow lease expectations.",
    category: "Life Skills",
    status: true,
    course: [],
    course_banner:
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&h=220&fit=crop",
    lavel: CourseLavel.BEGINNER,
    totalHours: 4,
    totalEnroll: 869,
  },
  {
    id: "2",
    title: "Budgeting for Rent",
    course_description:
      "Understand how to plan monthly expenses and manage rent payments.",
    category: "Finance",
    status: true,
    course: [],
    course_banner:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=220&fit=crop",
    lavel: CourseLavel.BEGINNER,
    totalHours: 4,
    totalEnroll: 869,
  },
  {
    id: "3",
    title: "Property Management Foundations",
    course_description:
      "Learn the core systems used in professional property management.",
    category: "Management",
    status: true,
    course: [],
    course_banner:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=220&fit=crop",
    lavel: CourseLavel.INTERMEDIATE,
    totalHours: 4,
    totalEnroll: 869,
  },
  {
    id: "4",
    title: "Being a Great Resident",
    course_description:
      "Learn how to communicate with property management and follow lease expectations.",
    category: "Life Skills",
    status: true,
    course: [],
    course_banner:
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&h=220&fit=crop&crop=right",
    lavel: CourseLavel.BEGINNER,
    totalHours: 4,
    totalEnroll: 869,
  },
  {
    id: "5",
    title: "Financial Literacy Basics",
    course_description:
      "Build a strong foundation in personal finance and money management.",
    category: "Finance",
    status: true,
    course: [],
    course_banner:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=220&fit=crop",
    lavel: CourseLavel.BEGINNER,
    totalHours: 4,
    totalEnroll: 869,
  },
  {
    id: "6",
    title: "Effective Communication",
    course_description:
      "Learn how to communicate with property management and follow lease expectations.",
    category: "Life Skills",
    status: true,
    course: [],
    course_banner:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=220&fit=crop",
    lavel: CourseLavel.INTERMEDIATE,
    totalHours: 4,
    totalEnroll: 869,
  },
  {
    id: "7",
    title: "Budgeting for Rent",
    course_description:
      "Learn how to communicate with property management and follow lease expectations.",
    category: "Finance",
    status: true,
    course: [],
    course_banner:
      "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&h=220&fit=crop",
    lavel: CourseLavel.BEGINNER,
    totalHours: 4,
    totalEnroll: 869,
  },
  {
    id: "9",
    title: "Being a Great Resident",
    course_description:
      "Learn how to communicate with property management and follow lease expectations.",
    category: "Life Skills",
    status: true,
    course: [],
    course_banner:
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&h=220&fit=crop&crop=right",
    lavel: CourseLavel.BEGINNER,
    totalHours: 4,
    totalEnroll: 869,
  },
];

const CourseCard = ({ course }: { course: Course }) => {
  return (
    <div className='bg-[var(--color-section-bg)] bg-[var(--color-section-bg)] p-4 rounded-xl border border-(--color-card-border) overflow-hidden flex flex-col transition-shadow duration-200 hover:shadow-md'>
      {/* Banner */}
      <div className='w-full h-35 overflow-hidden'>
        <Image
          height={400}
          width={400}
          src={course.course_banner}
          alt={course.title}
          className='w-full h-full rounded-lg object-cover'
        />
      </div>

      {/* Body */}
      <div className='p-4 flex mt-6 flex-col flex-1'>
        <h3 className='title-subtitle font-semibold text-(--color-text-primary) mb-1 leading-snug'>
          {course.title}
        </h3>
        <p className='text-[13px] leading-[160%] text-(--color-placeholder-text) flex-1'>
          {course.course_description}
        </p>

        {/* Footer meta */}
        <div className='flex items-center gap-4  pt-4 '>
          <span className='flex items-center gap-1 text-[12px] text-(--color-placeholder-text)'>
            <AiOutlineClockCircle size={13} />
            {course.totalHours} hours
          </span>
          <span className='flex items-center gap-1 text-[12px] text-(--color-placeholder-text)'>
            <HiOutlineUsers size={13} />
            {course.totalEnroll}
          </span>
        </div>
      </div>
    </div>
  );
};

const FeaturedCourse = () => {
  return (
    <div className='pt-20 pb-16 md:mx-25 mx-5 '>
      <SectionHeading
        title='Featured Courses'
        description='Explore our most popular courses across all learning categories'
      />

      {/* Grid container with dashed border */}
      <div className='max-w-360 mx-auto mt-10   '>
        <div className='grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4 gap-4'>
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        {/* Explore More Button */}
        <div className='flex justify-center mt-8'>
          <PrimaryButton href='/courses'>Explore More</PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCourse;
