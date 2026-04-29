"use client";

import React, { useState } from "react";
import StatCard from "../../course/StatCard";
import ProgressBar from "../../common/ProgressBar";
import CourseCard from "../../common/CourseCard";
import { FiBookOpen, FiTrendingUp, FiCheckCircle } from "react-icons/fi";
import { Course } from "@/types/course.type";

const MyLearning = () => {
    const [activeTab, setActiveTab] = useState<"inProgress" | "completed">(
        "inProgress",
    );

    // Mock data - replace with real data
    const stats = [
        { icon: <FiBookOpen />, value: 12, title: "Total Courses" },
        { icon: <FiTrendingUp />, value: 5, title: "In Progress" },
        { icon: <FiCheckCircle />, value: 7, title: "Completed" },
    ];

    const overallProgress = 65; // Mock progress percentage

    const inProgressCourses: Course[] = [
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

    const completedCourses: Course[] = [
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
        <div className="space-y-8">
            {/* Section 1: 3 StatCards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                    <StatCard
                        key={index}
                        icon={stat.icon}
                        value={stat.value}
                        title={stat.title}
                    />
                ))}
            </div>

            {/* Section 2: Learning ProgressBar */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">
                    Overall Learning Progress
                </h3>

                <div className="flex flex-col gap-2">
                    <p>Total Progress</p>
                    <ProgressBar
                        value={overallProgress}
                        showLabel={true}
                    />
                </div>
                <p>
                    You have completed 2 out of 5 courses. Keep up the great work!
                </p>
            </div>

            {/* Section 3: Tabs for In Progress and Completed Courses */}
            <div className="">
                <div className="flex mb-6">
                    <button
                        className={`px-4 py-2 font-medium${
                            activeTab === "inProgress"
                                ? "text-black border-b-2 border-black"
                                : "text-gray-500"
                        }`}
                        onClick={() => setActiveTab("inProgress")}
                    >
                        In Progress
                    </button>
                    <button
                        className={`px-4 py-2 font-medium ${
                            activeTab === "completed"
                                ? "text-black border-b-2 border-black"
                                : "text-gray-500"
                        }`}
                        onClick={() => setActiveTab("completed")}
                    >
                        Completed
                    </button>
                </div>

                <div className="">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {activeTab === "inProgress" &&
                            inProgressCourses.map((course) => (
                                <CourseCard
                                    key={course.id}
                                    course={course}
                                    layout="grid"
                                />
                            ))}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {activeTab === "completed" &&
                            completedCourses.map((course) => (
                                <CourseCard
                                    key={course.id}
                                    course={course}
                                    layout="grid"
                                />
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyLearning;
