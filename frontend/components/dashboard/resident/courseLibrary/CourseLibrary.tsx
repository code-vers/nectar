"use client";

import { Course } from "@/types/course.type";
import { useState } from "react";
import { FiBookOpen, FiCheckCircle, FiTrendingUp } from "react-icons/fi";
import CourseCard from "../../common/CourseCard";
import StatCard from "../../course/StatCard";

type TabKey =
  | "allCourses"
  | "lifeSkills"
  | "wellness"
  | "jobAndCareer"
  | "hobbyAndCraft"
  | "financialEducation";

const CourseLibrary = () => {
  const [activeTab, setActiveTab] = useState<TabKey>("allCourses");

  const tabButton: { title: string; link: TabKey }[] = [
    {
      title: "All Courses",
      link: "allCourses",
    },
    {
      title: "Life Skills",
      link: "lifeSkills",
    },
    {
      title: "Wellness",
      link: "wellness",
    },
    {
      title: "Job & Career",
      link: "jobAndCareer",
    },
    {
      title: "Hobby & Craft",
      link: "hobbyAndCraft",
    },
    {
      title: "Financial Education",
      link: "financialEducation",
    },
  ];

  // Mock data - replace with real data
  const stats = [
    { icon: <FiBookOpen />, value: "24", title: "Total Courses" },
    { icon: <FiTrendingUp />, value: "5", title: "Entrolled Courses" },
    { icon: <FiCheckCircle />, value: "12.5K", title: "Active Students" },
  ];

  const allCourses: Course[] = [
    // Mock courses - replace with real data
    {
      id: "1",
      title: "Financial Literacy Basics",
      // course_description: "Description 1",
      category: "Category 1",
      status: true,
      course: [],
      course_banner:
        "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&h=220&fit=crop",
      totalHours: 10,
      totalEnroll: 100,
      // progressPercent: 50,
    },
    {
      id: "2",
      title: "Effective Communication",
      // course_description: "Description 1",
      category: "Category 1",
      status: true,
      course: [],
      course_banner:
        "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&h=220&fit=crop",
      totalHours: 10,
      totalEnroll: 100,
      // progressPercent: 50,
    },
    {
      id: "3",
      title: "Budgeting for Rent",
      // course_description: "Description 1",
      category: "Category 1",
      status: true,
      course: [],
      course_banner:
        "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&h=220&fit=crop",
      totalHours: 10,
      totalEnroll: 100,
      // progressPercent: 50,
    },
    {
      id: "4",
      title: "Being a Great Resident",
      // course_description: "Description 1",
      category: "Category 1",
      status: true,
      course: [],
      course_banner:
        "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&h=220&fit=crop",
      totalHours: 10,
      totalEnroll: 100,
      // progressPercent: 50,
    },
    // Add more courses
  ];

  const wellness: Course[] = [
    // Mock completed courses
    {
      id: "1",
      title: "Budgeting for Rent",
      // course_description: "Description 1",
      category: "Category 1",
      status: true,
      course: [],
      course_banner:
        "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&h=220&fit=crop",
      totalHours: 10,
      totalEnroll: 100,
      // progressPercent: 50,
    },
    {
      id: "2",
      title: "Financial Literacy Basics",
      // course_description: "Description 1",
      category: "Category 1",
      status: true,
      course: [],
      course_banner:
        "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&h=220&fit=crop",
      totalHours: 10,
      totalEnroll: 100,
      // progressPercent: 50,
    },
    {
      id: "3",
      title: "Effective Communication",
      // course_description: "Description 1",
      category: "Category 1",
      status: true,
      course: [],
      course_banner:
        "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&h=220&fit=crop",
      totalHours: 10,
      totalEnroll: 100,
      // progressPercent: 50,
    },
    // Add more courses
  ];

  const lifeSkills: Course[] = [
    // Mock completed courses
    {
      id: "1",
      title: "Budgeting for Rent",
      // course_description: "Description 1",
      category: "Category 1",
      status: true,
      course: [],
      course_banner:
        "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&h=220&fit=crop",
      totalHours: 10,
      totalEnroll: 100,
      // progressPercent: 50,
    },
    {
      id: "2",
      title: "Financial Literacy Basics",
      // course_description: "Description 1",
      category: "Category 1",
      status: true,
      course: [],
      course_banner:
        "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&h=220&fit=crop",
      totalHours: 10,
      totalEnroll: 100,
      // progressPercent: 50,
    },
    {
      id: "3",
      title: "Effective Communication",
      // course_description: "Description 1",
      category: "Category 1",
      status: true,
      course: [],
      course_banner:
        "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&h=220&fit=crop",
      totalHours: 10,
      totalEnroll: 100,
      // progressPercent: 50,
    },
    // Add more courses
  ];

  const jobAndCareer: Course[] = [
    // Mock completed courses
    {
      id: "1",
      title: "Budgeting for Rent",
      // course_description: "Description 1",
      category: "Category 1",
      status: true,
      course: [],
      course_banner:
        "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&h=220&fit=crop",
      totalHours: 10,
      totalEnroll: 100,
      // progressPercent: 50,
    },
    {
      id: "2",
      title: "Financial Literacy Basics",
      // course_description: "Description 1",
      category: "Category 1",
      status: true,
      course: [],
      course_banner:
        "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&h=220&fit=crop",
      totalHours: 10,
      totalEnroll: 100,
      // progressPercent: 50,
    },
    {
      id: "3",
      title: "Effective Communication",
      // course_description: "Description 1",
      category: "Category 1",
      status: true,
      course: [],
      course_banner:
        "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&h=220&fit=crop",
      totalHours: 10,
      totalEnroll: 100,
      // progressPercent: 50,
    },
    // Add more courses
  ];

  const hobbyAndCraft: Course[] = [
    // Mock completed courses
    {
      id: "1",
      title: "Budgeting for Rent",
      // course_description: "Description 1",
      category: "Category 1",
      status: true,
      course: [],
      course_banner:
        "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&h=220&fit=crop",
      totalHours: 10,
      totalEnroll: 100,
      // progressPercent: 50,
    },
    {
      id: "2",
      title: "Financial Literacy Basics",
      // course_description: "Description 1",
      category: "Category 1",
      status: true,
      course: [],
      course_banner:
        "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&h=220&fit=crop",
      totalHours: 10,
      totalEnroll: 100,
      // progressPercent: 50,
    },
    {
      id: "3",
      title: "Effective Communication",
      // course_description: "Description 1",
      category: "Category 1",
      status: true,
      course: [],
      course_banner:
        "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&h=220&fit=crop",
      totalHours: 10,
      totalEnroll: 100,
      // progressPercent: 50,
    },
    // Add more courses
  ];

  const financialEducation: Course[] = [
    // Mock completed courses
    {
      id: "1",
      title: "Budgeting for Rent",
      // course_description: "Description 1",
      category: "Category 1",
      status: true,
      course: [],
      course_banner:
        "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&h=220&fit=crop",
      totalHours: 10,
      totalEnroll: 100,
      // progressPercent: 50,
    },
    {
      id: "2",
      title: "Financial Literacy Basics",
      // course_description: "Description 1",
      category: "Category 1",
      status: true,
      course: [],
      course_banner:
        "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&h=220&fit=crop",
      totalHours: 10,
      totalEnroll: 100,
      // progressPercent: 50,
    },
    {
      id: "3",
      title: "Effective Communication",
      // course_description: "Description 1",
      category: "Category 1",
      status: true,
      course: [],
      course_banner:
        "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&h=220&fit=crop",
      totalHours: 10,
      totalEnroll: 100,
      // progressPercent: 50,
    },
    // Add more courses
  ];

  return (
    <div className='space-y-8'>
      {/* Section 1: 3 StatCards */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            icon={stat.icon}
            value={stat.value}
            title={stat.title}
          />
        ))}
      </div>

      {/* Section 2: Tabs for In Progress and Completed Courses */}
      <h1 className='section-title'>Courses</h1>

      <div className=''>
        <div className='flex mb-6'>
          {tabButton.map((button, index) => (
            <button
              key={index}
              className={`px-6 py-2 font-medium overflow-hidden ${
                activeTab === button.link
                  ? "text-black border-black border-b-2"
                  : "text-gray-400"
              } ${
                index !== tabButton.length - 1 ? "border-r border-gray-300" : ""
              }`}
              onClick={() => setActiveTab(button.link)}>
              {button.title}
            </button>
          ))}
        </div>

        <div className=''>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {activeTab === "allCourses" &&
              allCourses.map((course) => (
                <CourseCard key={course.id} course={course} layout='grid' />
              ))}
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {activeTab === "lifeSkills" &&
              lifeSkills.map((course) => (
                <CourseCard key={course.id} course={course} layout='grid' />
              ))}
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {activeTab === "wellness" &&
              wellness.map((course) => (
                <CourseCard key={course.id} course={course} layout='grid' />
              ))}
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {activeTab === "jobAndCareer" &&
              jobAndCareer.map((course) => (
                <CourseCard key={course.id} course={course} layout='grid' />
              ))}
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {activeTab === "hobbyAndCraft" &&
              hobbyAndCraft.map((course) => (
                <CourseCard key={course.id} course={course} layout='grid' />
              ))}
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {activeTab === "financialEducation" &&
              financialEducation.map((course) => (
                <CourseCard key={course.id} course={course} layout='grid' />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseLibrary;
