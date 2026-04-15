import StatCard from "@/components/dashboard/course/StatCard";
import React from "react";
import { AiOutlineClockCircle } from "react-icons/ai";
import { BsCalendar } from "react-icons/bs";
import { PiMedal } from "react-icons/pi";

const stats = [
  { id: "t1", icon: <PiMedal />, value: "1", title: "Certificate" },
  {
    id: "t2",
    icon: <AiOutlineClockCircle />,
    value: "3",
    title: "In Progress",
  },
  { id: "t3", icon: <BsCalendar />, value: "Apr 7", title: "Next expected" },
];

const CetificateStats: React.FC = () => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
      {stats.map((s) => (
        <StatCard key={s.id} icon={s.icon} value={s.value} title={s.title} />
      ))}
    </div>
  );
};

export default CetificateStats;
