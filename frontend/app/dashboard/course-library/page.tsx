"use client";

import React, { useState } from "react";
import CourseCard from "@/components/dashboard/common/CourseCard";
import { Course, CourseLavel } from "@/types/course.type";
import { LuCircleDotDashed, LuClock5, LuTouchpad } from "react-icons/lu";
import StatCard from "@/components/dashboard/course/StatCard";
import Link from "next/link";

interface CourseLevelTab {
    id: string;
    label: string;
    value: string | null;
}

const courseLevelTabs: CourseLevelTab[] = [
    { id: "all", label: "All", value: null },
    { id: "beginner", label: "Beginner", value: CourseLavel.BEGINNER },
    {
        id: "intermediate",
        label: "Intermediate",
        value: CourseLavel.INTERMEDIATE,
    },
    { id: "advanced", label: "Advanced", value: CourseLavel.ADVANCED },
    { id: "trending", label: "Trending", value: "trending" },
];

const courseLibraryStat = [
    {
        icon: <LuTouchpad />,
        value: "24",
        title: "Total Courses",
    },
    {
        icon: <LuCircleDotDashed />,
        value: "16",
        title: "Enrolled Courses",
    },
    {
        icon: <LuClock5 />,
        value: "12.5k",
        title: "Active Students",
    },
];

// Mock data - Replace with actual API data
const mockCourses: Course[] = [
    {
        id: "1",
        title: "Introduction to Mathematics",
        course_description: "Learn the fundamentals of mathematics",
        category: "Math",
        status: true,
        course: [],
        course_banner:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRV-gHFEYmxJWk7mkqaOKfW_j4Qd9nepaaJQ&s",
        lavel: CourseLavel.BEGINNER,
        totalHours: 20,
        totalEnroll: 150,
    },
    {
        id: "2",
        title: "Advanced Python Programming",
        course_description: "Master advanced Python concepts",
        category: "Programming",
        status: true,
        course: [],
        course_banner:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRV-gHFEYmxJWk7mkqaOKfW_j4Qd9nepaaJQ&s",
        lavel: CourseLavel.ADVANCED,
        totalHours: 40,
        totalEnroll: 320,
    },
    {
        id: "3",
        title: "Digital Marketing Basics",
        course_description: "Get started with digital marketing",
        category: "Marketing",
        status: true,
        course: [],
        course_banner:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRV-gHFEYmxJWk7mkqaOKfW_j4Qd9nepaaJQ&s",
        lavel: CourseLavel.INTERMEDIATE,
        totalHours: 15,
        totalEnroll: 280,
    },
    {
        id: "4",
        title: "HTML & CSS Fundamentals",
        course_description: "Master web basics with HTML and CSS",
        category: "Web Development",
        status: true,
        course: [],
        course_banner:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRV-gHFEYmxJWk7mkqaOKfW_j4Qd9nepaaJQ&s",
        lavel: CourseLavel.BEGINNER,
        totalHours: 25,
        totalEnroll: 450,
    },
    {
        id: "5",
        title: "Data Science Mastery",
        course_description: "Advanced data analysis and machine learning",
        category: "Data Science",
        status: true,
        course: [],
        course_banner:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRV-gHFEYmxJWk7mkqaOKfW_j4Qd9nepaaJQ&s",
        lavel: CourseLavel.ADVANCED,
        totalHours: 60,
        totalEnroll: 200,
    },
    {
        id: "6",
        title: "JavaScript Intermediate",
        course_description: "Learn intermediate JavaScript concepts",
        category: "Programming",
        status: true,
        course: [],
        course_banner:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRV-gHFEYmxJWk7mkqaOKfW_j4Qd9nepaaJQ&s",
        lavel: CourseLavel.INTERMEDIATE,
        totalHours: 30,
        totalEnroll: 380,
    },
    {
        id: "7",
        title: "React Foundations",
        course_description: "Build modern UIs with React",
        category: "Web Development",
        status: true,
        course: [],
        course_banner:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRV-gHFEYmxJWk7mkqaOKfW_j4Qd9nepaaJQ&s",
        lavel: CourseLavel.INTERMEDIATE,
        totalHours: 35,
        totalEnroll: 520,
    },
    {
        id: "8",
        title: "Graphic Design 101",
        course_description: "Start your graphic design journey",
        category: "Design",
        status: true,
        course: [],
        course_banner:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRV-gHFEYmxJWk7mkqaOKfW_j4Qd9nepaaJQ&s",
        lavel: CourseLavel.BEGINNER,
        totalHours: 18,
        totalEnroll: 290,
    },
    {
        id: "9",
        title: "Cloud Architecture",
        course_description: "Design scalable cloud systems",
        category: "Cloud",
        status: true,
        course: [],
        course_banner:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRV-gHFEYmxJWk7mkqaOKfW_j4Qd9nepaaJQ&s",
        lavel: CourseLavel.ADVANCED,
        totalHours: 50,
        totalEnroll: 150,
    },
];

export default function CourseLibraryPage() {
    const [activeTab, setActiveTab] = useState<string>("all");

    const handleStartCourse = (course: Course) => {
        console.log("Starting course:", course);
        // Add navigation or modal logic here
    };

    const getFilteredCourses = () => {
        if (activeTab === "all") {
            return mockCourses;
        } else if (activeTab === "trending") {
            return mockCourses.filter((course) => course.totalEnroll > 300);
        } else {
            const selectedLevel = courseLevelTabs.find(
                (tab) => tab.id === activeTab,
            )?.value;
            return mockCourses.filter(
                (course) => course.lavel === selectedLevel,
            );
        }
    };

    const filteredCourses = getFilteredCourses();

    return (
        <div className="min-h-screen bg-(--color-page-bg) px-6 py-8">
            {/* Header Section */}
            <div className="mb-8">
                {/* Primary Button */}
                <Link href={'/dashboard/add-courses'}>
                    <button className="px-6 py-3 rounded-lg font-semibold text-(--color-primary-btn-text) bg-(--color-btn-primary-bg) hover:opacity-90 transition">
                        Add Courses
                    </button>
                </Link>
            </div>

            {/* Featured Courses Section */}
            <div className="mb-12">
                {/* 3 Course Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courseLibraryStat.map((course, i) => (
                        <StatCard
                            key={i}
                            icon={course.icon}
                            value={course.value}
                            title={course.title}
                            // onStart={handleStartCourse}
                        />
                    ))}
                </div>
            </div>

            {/* Courses by Level Section */}
            <div className="mb-12">
                <h2 className="text-2xl font-bold text-(--color-text-primary) mb-8">
                    Courses
                </h2>

                {/* Tabs */}
                <div className="flex gap-4 border-b border-(--color-card-border) mb-8 overflow-x-auto">
                    {courseLevelTabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-4 py-2 font-medium whitespace-nowrap transition border-b-2 ${
                                activeTab === tab.id
                                    ? "border-(--color-btn-primary-bg) text-(--color-btn-primary-bg)"
                                    : "border-transparent text-(--color-placeholder-text) hover:text-(--color-text-primary)"
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredCourses.map((course) => (
                        <CourseCard
                            key={course.id}
                            course={course}
                            onStart={handleStartCourse}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
