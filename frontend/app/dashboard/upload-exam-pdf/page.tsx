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
            name: "status",
            label: "Attach to Course",
            type: "select",
            options: statusOptions,
            required: true,
            span: 2,
        },
        {
            name: "courseMaterial",
            label: "Upload exam File",
            type: "file",
            accept: "image/*",
            hint: "",
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
        <div className="min-h-screen p-6">
          
            {/* Header Section */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-(--color-text-primary) mb-2">
                    Upload Exam PDFs
                </h1>
                <p className="text-lg text-(--color-placeholder-text) mb-6">
                    Upload exam materials and documentation
                </p>
            </div>

            <UniversalForm<AddCourseFormData>
                title=""
                subtitle=""
                fields={fields}
                schema={addCourseSchema}
                defaultValues={{
                    status: "",
                }}
                onSubmit={handleSubmit}
                submitText="Upload Lecture PDF"
                setOpen={setIsOpen}
            />
        </div>
    );
}
