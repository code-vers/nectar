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

type PricingItem = {
    title: string;
    price: number;
    duration: "month" | "year";
};

const pricingData: PricingItem[] = [
    {
        title: "Rent Payment Reminder",
        price: 56.32,
        duration: "month",
    },
    {
        title: "Annual Plan",
        price: 56.32,
        duration: "year",
    },
];

const formatPrice = (price: number, duration: string) => {
    const durationText = duration === "month" ? "Month" : "Yearly";
    return `$${price.toFixed(2)}/${durationText}`;
};

const PricingCard = ({ title, price, duration }: PricingItem) => {
    return (
        <div className="rounded-md border border-yellow-300 bg-yellow-100 p-6 md:pl-10 md:pr-36 md:py-4">
            <p className="text-sm text-gray-600 mb-1">{title}</p>
            <p className="text-lg font-semibold text-gray-800">
                {formatPrice(price, duration)}
            </p>
        </div>
    );
};

const categoryOptions = [
    { label: "US Dollar", value: "usd" },
    { label: "Euro", value: "eur" },
    { label: "British Pound", value: "gbp" },
    { label: "Bangladeshi Taka", value: "bdt" },
    { label: "Indian Rupee", value: "inr" },
    { label: "UAE Dirham", value: "aed" },
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
            label: "Monthly Price",
            type: "text",
            placeholder: "Enter announcement title",
            required: true,
            span: 1,
        },
        {
            name: "courseTitle",
            label: "Annual Price",
            type: "text",
            placeholder: "Enter announcement title",
            required: true,
            span: 1,
        },
        {
            name: "courseTitle",
            label: "Trial Period",
            type: "text",
            placeholder: "Enter announcement title",
            required: true,
            span: 1,
        },
        {
            name: "category",
            label: "Currency",
            type: "select",
            options: categoryOptions,
            required: true,
            span: 1,
        },
        {
            name: "courseTitle",
            label: "Founding Company Discount (%)",
            type: "text",
            placeholder: "Enter announcement title",
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
        <div>
            <div className="flex flex-col justify-center">
                {/* Header Section */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-(--color-text-primary) mb-2">
                        Subscription Settings
                    </h1>
                    <p className="text-lg text-(--color-placeholder-text) mb-6">
                        Create a new announcement for your community
                    </p>
                </div>

                <hr className="text-gray-300" />
            </div>

            <div className="flex flex-col md:flex-row gap-5 mt-10">
                <div className="md:flex-1">
                    <UniversalForm<AddCourseFormData>
                    title="Announcement"
                    subtitle=""
                    fields={fields}
                    schema={addCourseSchema}
                    defaultValues={{
                        status: "",
                    }}
                    onSubmit={handleSubmit}
                    submitText="Save Changes"
                    setOpen={setIsOpen}
                />
                </div>

                <div className="">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">
                        Current Pricing
                    </h2>

                    <div className="space-y-3">
                        {pricingData.map((item, index) => (
                            <PricingCard
                                key={index}
                                {...item}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
