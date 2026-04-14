import StatCard from "@/components/dashboard/course/StatCard";
import { LuAward, LuBookOpen, LuCircleCheck } from "react-icons/lu";

const courseLibraryStat = [
    {
        icon: <LuBookOpen />,
        value: "1,224",
        title: "Total Users",
    },
    {
        icon: <LuCircleCheck />,
        value: "16",
        title: "Course Uploaded",
    },
    {
        icon: <LuAward />,
        value: "12.5k",
        title: "Active Refferals",
    },
];

const activities = [
    {
        title: "New User Registered - John Smith ",
        subtitle: "2 hours ago",
    },
    {
        title: "New User Registered - John Smith ",
        subtitle: "2 hours ago",
    },
    {
        title: "New User Registered - John Smith ",
        subtitle: "2 hours ago",
    },
];

const page = () => {
    return (
        <div>
            {/* Header Section */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-(--color-text-primary) mb-2">
                    Dashboard Overview
                </h1>
                <p className="text-lg text-(--color-placeholder-text) mb-6">
                    Continue managing your properties and access professional
                    training resources.
                </p>
            </div>

            <hr className="text-gray-300" />

            {/* Featured Courses Section */}
            <div className="mt-20">
                {/* 3 Course Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courseLibraryStat.map((course, i) => (
                        <StatCard
                            key={i}
                            icon={course.icon}
                            value={course.value}
                            title={course.title}
                        />
                    ))}
                </div>
            </div>

            {/* Recent activity section */}
            <section className="bg-white py-10 px-5 mt-10 rounded-lg shadow-lg">
                <div className="mx-auto">
                    <ul className="space-y-6">
                        {activities.map((item, index) => (
                            <li
                                key={index}
                                className="flex items-start gap-4"
                            >
                                {/* Bullet */}
                                <div className="w-3 h-3 mt-2 rounded-full bg-[#D4A017]"></div>

                                {/* Content */}
                                <div>
                                    <h3 className="font-medium text-gray-500">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        {item.subtitle}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </div>
    );
};

export default page;
