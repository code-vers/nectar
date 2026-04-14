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
      label: "Course Title",
      type: "text",
      placeholder: "Enter course title",
      required: true,
      span: 2,
    },
    {
      name: "courseDescription",
      label: "Course Description",
      type: "textarea",
      placeholder: "Enter course description",
      required: true,
      span: 2,
    },
    {
      name: "category",
      label: "Category",
      type: "select",
      options: categoryOptions,
      required: true,
      span: 2,
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      options: statusOptions,
      required: true,
      span: 2,
    },
    {
      name: "courseBanner",
      label: "Course Display Picture",
      type: "file",
      accept: "image/*",
      hint: "Upload course banner image",
      span: 2,
    },
    {
      name: "courseMaterial",
      label: "Course Material File",
      type: "file",
      accept: "*/*",
      hint: "Upload course material (PDF, ZIP, etc.)",
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
            Course Added Successfully
          </h2>
          <p className="mt-2 text-gray-600">
            Redirecting to courses page...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <UniversalForm<AddCourseFormData>
        title="Add New Course"
        subtitle="Create a new course by filling in the details below"
        fields={fields}
        schema={addCourseSchema}
        defaultValues={{
          courseTitle: "",
          courseDescription: "",
          category: "",
          status: "",
        }}
        onSubmit={handleSubmit}
        submitText="Add Course"
        setOpen={setIsOpen}
      />
    </div>
  );
}
