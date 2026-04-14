import { TbTrendingUp } from "react-icons/tb";
import { BsCalendar } from "react-icons/bs";
import { BiBook } from "react-icons/bi";
import { PiMedal } from "react-icons/pi";
import StatCard from "../../course/StatCard";
import ProgressBar from "../../common/ProgressBar";

const stats = [
  {
    icon: <TbTrendingUp />,
    value: "45%",
    title: "Progress Percentage",
  },
  {
    icon: <BsCalendar />,
    value: "Month 2",
    title: "Current Month",
  },
  {
    icon: <BiBook />,
    value: "12/24",
    title: "Completed Lessons",
  },
  {
    icon: <PiMedal />,
    value: 1,
    title: "Certification Earned",
  },
];

const VendorStats = () => {
  return (
    <div className='grid mt-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          icon={stat.icon}
          value={stat.value}
          title={stat.title}
        />
      ))}

      <ProgressBar value={90} />
    </div>
  );
};

export default VendorStats;
