"use client";

import { useState } from "react";
import { z } from "zod";
import UniversalForm from "@/components/universal-form/UniversalForm";
import { FieldConfig } from "@/components/universal-form/form.types";

// Zod schema for course validation
const addCourseSchema = z.object({
    courseTitle: z.string().min(1, "Course title is required"),
    courseDescription: z.string().min(1, "Course description is required"),
    category: z.string().min(1, "Category is required"),
    status: z.string().min(1, "Status is required"),
    courseBanner: z.instanceof(File).optional(),
    courseMaterial: z.instanceof(File).optional(),
});

type AddCourseFormData = z.infer<typeof addCourseSchema>;

const categoryOptions = [
    { label: "Life Skills", value: "life-skills" },
    { label: "Professional Development", value: "professional-development" },
    { label: "Technical Skills", value: "technical-skills" },
    { label: "Communication", value: "communication" },
    { label: "Financial Literacy", value: "financial-literacy" },
    { label: "Health & Wellness", value: "health-wellness" },
];

const statusOptions = [
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
    { label: "Draft", value: "draft" },
];

export default function AddCoursePage() {
    const [isOpen, setIsOpen] = useState(true);

    const fields: FieldConfig<AddCourseFormData>[] = [
        {
            name: "courseTitle",
            label: "Announcement Type",
            type: "select",
            options: statusOptions,
            required: true,
            span: 2,
        },
        {
            name: "courseTitle",
            label: "Announcement Tittle",
            type: "text",
            placeholder: "Enter announcement title",
            required: true,
            span: 2,
        },
        {
            name: "courseDescription",
            label: "Message Content",
            type: "textarea",
            placeholder: "Write Your Announcement message here..",
            required: true,
            span: 2,
        },
    ];

    const handleSubmit = (data: AddCourseFormData) => {
        console.log("Form Data:", data);
        // TODO: Send data to the backend API
        // Example: await createCourse(data);
        setIsOpen(false);
    };

    if (!isOpen) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-semibold text-gray-800">
                        Upload Exam PDFs
                    </h2>
                    <p className="mt-2 text-gray-600">Create a new course</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen gap-6 p-6">
            {/* LEFT SIDE */}
            <div className="flex-1">
                {/* Header Section */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-(--color-text-primary) mb-2">
                        Post Announcement
                    </h1>
                    <p className="text-lg text-(--color-placeholder-text) mb-6">
                        Create a new announcement for your community
                    </p>
                </div>

                <div className="flex gap-5 justify-center">

                    {/* left side */}
                    <div className="flex-1 max-w-4xl">
                        <UniversalForm<AddCourseFormData>
                            title=" Announcement"
                            subtitle=""
                            fields={fields}
                            schema={addCourseSchema}
                            defaultValues={{
                                status: "",
                            }}
                            onSubmit={handleSubmit}
                            submitText="Publish Announcement"
                            setOpen={setIsOpen}
                        />
                    </div>

                    {/* RIGHT SIDE (FIXED WIDTH) */}
                    <div className="w-[350px] h-fit rounded-xl border border-blue-200 bg-yellow-100 p-6">
                        <div className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-blue-500 text-blue-500 mb-4">
                            !
                        </div>

                        <h2 className="text-xl font-semibold text-gray-800 mb-4">
                            Announcement Tips
                        </h2>

                        <ul className="list-disc pl-5 space-y-3 text-gray-700">
                            <li>Keep titles clear and concise</li>
                            <li>Include specific dates and times</li>
                            <li>Provide contact info if needed</li>
                            <li>Use appropriate announcement type</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
