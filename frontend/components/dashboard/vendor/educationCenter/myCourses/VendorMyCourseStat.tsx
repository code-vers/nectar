import StatCard from "@/components/dashboard/course/StatCard";
import { AiOutlineLogin } from "react-icons/ai";
import { FiBookOpen, FiUsers } from "react-icons/fi";

const VendorMyCourseStat = () => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
      {stats.map((s) => (
        <StatCard key={s.id} icon={s.icon} value={s.value} title={s.title} />
      ))}
    </div>
  );
};

export default VendorMyCourseStat;

const stats = [
  { id: "c1", icon: <FiBookOpen />, value: "24", title: "Total Courses" },
  { id: "c2", icon: <AiOutlineLogin />, value: "2", title: "Enrolled Courses" },
  { id: "c3", icon: <FiUsers />, value: "12.5K", title: "Active Students" },
];
