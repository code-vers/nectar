import React from "react";

const ResidentNotification = () => {
    const notificationItems = [
        {
            key: "courseUpdates",
            label: "Course Updates",
            description: "Get notified about new courses and content",
            time: '12:10 PM'
        },
        {
            key: "learningReminders",
            label: "Learning Reminders",
            description: "Get notified about new courses and content",
            time: '12:10 PM'
        },
        {
            key: "achievementNotifications",
            label: "Achievement Notifications",
            description: "Get notified about new courses and content",
            time: '12:10 PM'
        },
        {
            key: "emailNewsletter",
            label: "Email Newsletter",
            description: "Get notified about new courses and content",
            time: '12:10 PM'
        },
        {
            key: "communityUpdates",
            label: "Community Updates",
            description: "Get notified about new courses and content",
            time: '12:10 PM'
        },
        {
            key: "pushNotifications",
            label: "Push Notifications",
            description: "Get notified about new courses and content",
            time: '12:10 PM'
        },
    ] as const;

    return (
        <div className="rounded-[16px] border border-slate-200 bg-white p-6 shadow-sm">
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
                        <div>
                            <p className="text-sm">{item.time}</p>
                        </div>
                    </label>
                ))}
            </div>
        </div>
    );
};

export default ResidentNotification;
