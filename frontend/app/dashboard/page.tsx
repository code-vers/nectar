import ChildrensLearningCenter from "@/components/dashboard/resident/childrensLearningCenter/ChildrensLearningCenter";
import CourseLibrary from "@/components/dashboard/resident/courseLibrary/CourseLibrary";
import ResidentDashboard from "@/components/dashboard/resident/dashboardHome/ResidentDashboard";
import DownloadLibrary from "@/components/dashboard/resident/downloadLibrary/DownloadLibrary";
import MyLearning from "@/components/dashboard/resident/myLearning/MyLearning";
import ResidentAccountSettings from "@/components/dashboard/resident/residentAccountSettings/ResidentAccountSettings";
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
        <div className="space-y-8">
          <ResidentAccountSettings/>
        </div>
    );
};

export default page;
