import NotificationCard from "@/components/dashboard/maintanance/NotificationCard";
import PrimaryButton from "@/components/website/typography/PrimaryButton";
import React from "react";

const notifications = [
    {
        title: "Rent Payment Reminder",
        description:
            "Friendly reminder that rent is due on the 1st of each month. Please ensure timely payment to avoid late fees.",
        date: "Mar 8, 2026",
        author: "Property Management",
        tag: "Reminder",
    },
    {
        title: "Maintenance Scheduled",
        description:
            "Routine maintenance work will be carried out in your building this weekend. Please cooperate with the staff.",
        date: "Mar 10, 2026",
        author: "Maintenance Team",
        tag: "Update",
    },
    {
        title: "Water Supply Interruption",
        description:
            "Water supply will be temporarily unavailable due to pipeline repairs from 10 AM to 2 PM.",
        date: "Mar 12, 2026",
        author: "City Utilities",
        tag: "Alert",
    },
    {
        title: "Community Meeting",
        description:
            "Join us for the monthly community meeting to discuss important updates and upcoming events.",
        date: "Mar 15, 2026",
        author: "Community Board",
        tag: "Event",
    },
    {
        title: "Parking Notice",
        description:
            "Please ensure your vehicles are parked in designated areas to avoid fines or towing.",
        date: "Mar 18, 2026",
        author: "Security Office",
        tag: "Notice",
    },
];

const page = () => {
    return (
        <section>
            <div className="flex justify-end">
                <PrimaryButton>{"Post Announcement"}</PrimaryButton>
            </div>

            <div className="bg-white flex flex-col gap-4 mt-6 p-6 rounded-lg shadow-lg">
                {notifications.map((notification, indeex) => (
                    <NotificationCard
                        key={indeex}
                        title={notification.title}
                        description={notification.description}
                        date={notification.date}
                        author={notification.author}
                        tag={notification.tag}
                    />
                ))}
            </div>
        </section>
    );
};

export default page;
