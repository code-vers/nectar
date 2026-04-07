import { FiBookOpen } from "react-icons/fi";
import { GoPeople } from "react-icons/go";
import { IoGameControllerOutline } from "react-icons/io5";
import { LuFileSpreadsheet } from "react-icons/lu";

const statsData = [
  {
    icon: <FiBookOpen size={32} className='text-orange-400' />,
    number: "150+",
    label: "Books and Stories",
  },
  {
    icon: <LuFileSpreadsheet size={32} className='text-orange-400' />,
    number: "200+",
    label: "Worksheets",
  },
  {
    icon: <IoGameControllerOutline size={32} className='text-orange-400' />,
    number: "200+",
    label: "Activities",
  },
  {
    icon: <GoPeople size={32} className='text-orange-400' />,
    number: "10K+",
    label: "Happy Kids",
  },
];

const Stats = () => {
  return (
    <div className='flex flex-wrap justify-center gap-6 mt-10 py-10'>
      {statsData.map((item, index) => (
        <div
          key={index}
          className='bg-white w-[306px] h-[243px] p-6 rounded-[4px] border border-stroke hover:translate-y-1 transition-transform'>
          <div className='mb-3 bg-[#FFE4BE] rounded-full p-2 h-13.75 flex items-center justify-center w-13.75'>
            {item.icon}
          </div>
          <div className='flex flex-col items-center '>
            <div className='text-[36px] text-text-primary font-bold mb-1'>
              {item.number}
            </div>
            <div className='text-[16px] text-placeholder-text text-center'>
              {item.label}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Stats;
