"use client";

import { useState } from "react";
import CourseCard from "../../common/CourseCard";
import { Course } from "@/types/course.type";
import { FiBookOpen, FiCheckCircle, FiTrendingUp, FiX } from "react-icons/fi";
import PrimaryButton from "@/components/website/typography/PrimaryButton";
import DocumentCard from "../../common/DocumentCard";
import { Document } from "@/types/document.type";
import UniversalForm from "@/components/universal-form/UniversalForm";
import { z } from "zod";
import { LuHeart } from "react-icons/lu";

const ChildrensLearningCenter = () => {
    const [activeTab, setActiveTab] = useState<
        "booksAndStories" | "activitiesAndWorksheet" | "favorites"
    >("booksAndStories");
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

    const uploadSchema = z.object({
        description: z.string().min(1, "Description is required"),
        attachment: z.any().nullable(),
    });

    type UploadWorkFormValues = z.infer<typeof uploadSchema>;

    const tabButton = [
        {
            title: "Books & Stories",
            link: "booksAndStories",
        },
        {
            title: "Activities & Worksheet",
            link: "activitiesAndWorksheet",
        },
        {
            title: "Favorites",
            link: "favorites",
        },
    ] as const;

    const booksAndStories: Course[] = [
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

    const activitiesAndWorksheet: Document[] = [
        {
            id: "1",
            name: "Property Manager's Handbook",
            type: "pdf",
            url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
            description:
                "Standard residential lease contract template for property owners.",
            sizeLabel: "934 KB",
            uploadedAt: new Date("2026-03-20"),
        },
        {
            id: "2",
            name: "Tenant Communication Checklist",
            type: "pdf",
            url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
            description:
                "A practical checklist for handling tenant updates and notices.",
            sizeLabel: "1.2 MB",
            uploadedAt: new Date("2026-03-24"),
        },
        {
            id: "3",
            name: "Move-In Inspection Form",
            type: "docx",
            url: "https://file-examples.com/wp-content/storage/2017/02/file-sample_100kB.doc",
            description:
                "Reusable inspection format for new resident onboarding.",
            sizeLabel: "512 KB",
            uploadedAt: new Date("2026-04-01"),
        },
    ];

    const favorites: Course[] = [
    ];

    return (
        <div className="space-y-8">
            <div className="flex justify-between">
                <div>
                    <h1 className="section-title">Courses</h1>
                </div>
                <div className="flex gap-5">
                    <input
                        type="text"
                        placeholder="Search Farms"
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <PrimaryButton onClick={() => setIsUploadModalOpen(true)}>
                        {"Post Activities"}
                    </PrimaryButton>
                </div>
            </div>

            <div className="">
                <div className="flex mb-6">
                    {tabButton.map((button, index) => (
                        <button
                            key={index}
                            className={`px-6 py-2 font-medium overflow-hidden ${
                                activeTab === button.link
                                    ? "text-black border-black border-b-2"
                                    : "text-gray-400"
                            } ${
                                index !== tabButton.length - 1
                                    ? "border-r border-gray-300"
                                    : ""
                            }`}
                            onClick={() => setActiveTab(button.link)}
                        >
                            {button.title}
                        </button>
                    ))}
                </div>

                <div className="">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {activeTab === "booksAndStories" &&
                            booksAndStories.map((course) => (
                                <CourseCard
                                    key={course.id}
                                    course={course}
                                    layout="grid"
                                />
                            ))}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {activeTab === "activitiesAndWorksheet" &&
                            activitiesAndWorksheet.map((doc) => (
                                <DocumentCard
                                    key={doc.id}
                                    document={doc}
                                />
                            ))}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {activeTab === "favorites" &&
                        favorites.length <= 0 ? 
                        <div className="col-span-full flex flex-col items-center justify-center min-h-200 text-center">
                            <LuHeart className="text-6xl text-gray-300 mb-4"/>
                            <p className="text-xl font-medium text-gray-600 mb-2">No favorites yet</p>
                            <p className="text-gray-500">Click the heart icon on books and activities to save them here</p>
                        </div>
                        :
                            favorites.map((course) => (
                                <CourseCard
                                    key={course.id}
                                    course={course}
                                    layout="grid"
                                />
                            ))}
                    </div>
                </div>
            </div>
            {isUploadModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <div className="relative w-full max-w-2xl rounded-3xl bg-white shadow-xl">
                        <button
                            type="button"
                            aria-label="Close upload modal"
                            onClick={() => setIsUploadModalOpen(false)}
                            className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center bg-white text-gray-600 transition hover:cursor-pointer">
                            <FiX className="h-5 w-5" />
                        </button>

                        <UniversalForm<UploadWorkFormValues>
                            title="Upload your work"
                            subtitle="Description"
                            fields={[
                                {
                                    name: "attachment",
                                    label: "Upload File",
                                    type: "file",
                                    accept: "*/*",
                                    multiple: false,
                                    span: 2,
                                },
                            ]}
                            schema={uploadSchema}
                            defaultValues={{
                                description: "",
                                attachment: null,
                            }}
                            submitText="Upload"
                            setOpen={setIsUploadModalOpen}
                            onSubmit={() => setIsUploadModalOpen(false)}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChildrensLearningCenter;
