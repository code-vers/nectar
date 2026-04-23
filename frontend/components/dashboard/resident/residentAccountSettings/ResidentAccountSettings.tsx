"use client";

import React, { useState } from "react";
import UniversalForm from "../../../universal-form/UniversalForm";
import { z } from "zod";

const ResidentAccountSettings = () => {
    const [activeTab, setActiveTab] = useState<
        "profile" | "notification" | "security"
    >("profile");

    const tabButton = [
        {
            title: "Profile",
            link: "profile",
        },
        {
            title: "Notification",
            link: "notification",
        },
        {
            title: "Security",
            link: "security",
        },
    ] as const;

    const profileSchema = z.object({
        profilePic: z.instanceof(File).optional(),
        firstName: z.string().min(1, "First name is required"),
        lastName: z.string().min(1, "Last name is required"),
        email: z.string().email("Invalid email address"),
        phoneNumber: z.string().min(1, "Phone number is required"),
        unitNumber: z.string().min(1, "Unit number is required"),
    });

    type ProfileFormData = z.infer<typeof profileSchema>;

    const profileFields = [
        {
            name: "profilePic" as const,
            label: "Profile Picture",
            type: "profile-pic" as const,
        },
        {
            name: "firstName" as const,
            label: "First Name",
            type: "text" as const,
            line: 1,
            span: 2,
            lineColumns: 2,
            required: true,
        },
        {
            name: "lastName" as const,
            label: "Last Name",
            type: "text" as const,
            line: 1,
            span: 2,
            lineColumns: 2,
            required: true,
        },
        {
            name: "email" as const,
            label: "Email",
            type: "email" as const,
            line: 2,
            required: true,
        },
        {
            name: "phoneNumber" as const,
            label: "Phone Number",
            type: "text" as const,
            line: 3,
            required: true,
        },
        {
            name: "unitNumber" as const,
            label: "Unit Number",
            type: "text" as const,
            line: 4,
            required: true,
        },
    ];

    const notificationItems = [
        {
            key: "courseUpdates",
            label: "Course Updates",
            description: "Get notified about new courses and content",
        },
        {
            key: "learningReminders",
            label: "Learning Reminders",
            description: "Get notified about new courses and content",
        },
        {
            key: "achievementNotifications",
            label: "Achievement Notifications",
            description: "Get notified about new courses and content",
        },
        {
            key: "emailNewsletter",
            label: "Email Newsletter",
            description: "Get notified about new courses and content",
        },
        {
            key: "communityUpdates",
            label: "Community Updates",
            description: "Get notified about new courses and content",
        },
        {
            key: "pushNotifications",
            label: "Push Notifications",
            description: "Get notified about new courses and content",
        },
    ] as const;

    const [notifications, setNotifications] = useState<Record<string, boolean>>({
        courseUpdates: false,
        learningReminders: false,
        achievementNotifications: false,
        emailNewsletter: true,
        communityUpdates: false,
        pushNotifications: true,
    });

    const handleNotificationChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, checked } = event.target;
        setNotifications((prev) => ({
            ...prev,
            [name]: checked,
        }));
    };

    const securitySchema = z
        .object({
            currentPassword: z.string().min(1, "Current password is required"),
            newPassword: z.string().min(8, "Password must be at least 8 characters"),
            confirmNewPassword: z.string().min(1, "Confirm password is required"),
        })
        .refine((data) => data.newPassword === data.confirmNewPassword, {
            path: ["confirmNewPassword"],
            message: "Passwords do not match",
        });

    type SecurityFormData = z.infer<typeof securitySchema>;

    const securityFields = [
        {
            name: "currentPassword" as const,
            label: "Current Password",
            type: "password" as const,
            required: true,
        },
        {
            name: "newPassword" as const,
            label: "New Password",
            type: "password" as const,
            required: true,
        },
        {
            name: "confirmNewPassword" as const,
            label: "Confirm New Password",
            type: "password" as const,
            required: true,
        },
    ];

    const handleProfileSubmit = (data: ProfileFormData) => {
        console.log("Profile data:", data);
        // Handle save logic here
    };

    return (
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

            <div className="grid grid-cols-1">
                {activeTab === "profile" && (
                    <UniversalForm
                        title="Profile Settings"
                        subtitle="Update your personal information and profile picture"
                        fields={profileFields}
                        schema={profileSchema}
                        defaultValues={{}}
                        onSubmit={handleProfileSubmit}
                        submitText="Save Changes"
                        setOpen={() => {}}
                    />
                )}
            </div>
            <div className="grid grid-cols-1">
                {activeTab === "notification" && (
                    <div className="rounded-[16px] border border-slate-200 bg-white p-6 shadow-sm">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <p className="text-lg font-semibold text-slate-900">
                                    Notification Preferences
                                </p>
                                <p className="mt-1 text-sm text-slate-500">
                                    Choose how you want to receive updates
                                </p>
                            </div>
                        </div>

                        <div className="mt-6 space-y-3">
                            {notificationItems.map((item) => (
                                <label
                                    key={item.key}
                                    className="group flex items-center justify-between gap-4 border-b-2 border-[#DCE3EA] px-5 py-4 transition hover:border-slate-300"
                                >
                                    <div>
                                        <p className="text-sm font-semibold text-slate-900">
                                            {item.label}
                                        </p>
                                        <p className="mt-1 text-sm text-slate-500">
                                            {item.description}
                                        </p>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            id={item.key}
                                            name={item.key}
                                            type="checkbox"
                                            checked={notifications[item.key]}
                                            onChange={handleNotificationChange}
                                            className="peer sr-only"
                                        />
                                        <div className="inline-flex h-9 w-16 items-center rounded-full bg-slate-300 transition peer-checked:bg-amber-500">
                                            <span className="ml-1 h-7 w-7 rounded-full bg-white shadow transition peer-checked:ml-8" />
                                        </div>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <div className="grid grid-cols-1">
                {activeTab === "security" && (
                    <UniversalForm
                        title="Password & Security"
                        subtitle="Manage your account preference and settings"
                        fields={securityFields}
                        schema={securitySchema}
                        defaultValues={{}}
                        onSubmit={(data: SecurityFormData) => {
                            console.log("Security data:", data);
                        }}
                        submitText="Update Password"
                        setOpen={() => {}}
                    />
                )}
            </div>
        </div>
    );
};

export default ResidentAccountSettings;
