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
  return <div className='space-y-8'></div>;
};

export default page;
