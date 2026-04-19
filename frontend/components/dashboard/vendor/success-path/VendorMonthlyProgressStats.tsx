import ProgressBar from "@/components/dashboard/common/ProgressBar";
import StatCard from "@/components/dashboard/course/StatCard";
import { FaChartLine } from "react-icons/fa";
import {
  LuCircleDotDashed,
  LuClock5,
  LuLock,
  LuTouchpad,
} from "react-icons/lu";

const VendorMonthlyProgressStats = () => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3'>
      <StatCard
        icon={<LuTouchpad className='text-[15px] text-[#D4A017]' />}
        value='Month 2'
        title='Current Month'
        subtitle='Active Learning Path'
        cardClassName='bg-[#F3F5F9] border border-[#E3E7EE] shadow-none rounded-[4px] p-3.5 gap-2.5'
        iconWrapperClassName='bg-[#F6E7BA] text-[#D4A017] w-5 h-5 p-0 rounded-[3px] text-base'
        valueClassName='text-[32px] leading-none font-semibold text-[#273248]'
        titleClassName='text-[11px] leading-[1.25] text-[#5A6577]'
        subtitleClassName='text-[10px] leading-[1.2] text-[#8A93A3] mt-0.5'
      />

      <StatCard
        icon={<FaChartLine className='text-[15px] text-[#D4A017]' />}
        value='60%'
        title='completion Rate'
        cardClassName='bg-[#F3F5F9] border border-[#E3E7EE] shadow-none rounded-[4px] p-3.5 gap-2.5'
        iconWrapperClassName='bg-[#F6E7BA] text-[#D4A017] w-5 h-5 p-0 rounded-[3px] text-base'
        valueClassName='text-[32px] leading-none font-semibold text-[#273248]'
        titleClassName='text-[11px] leading-[1.25] text-[#5A6577]'
        footer={
          <ProgressBar
            value={60}
            height={6}
            color='#D4A017'
            className='pt-0.5'
          />
        }
      />

      <StatCard
        icon={<LuCircleDotDashed className='text-[15px] text-[#D4A017]' />}
        value='4/8'
        title='Task Completed'
        subtitle='4 remaining'
        cardClassName='bg-[#F3F5F9] border border-[#E3E7EE] shadow-none rounded-[4px] p-3.5 gap-2.5'
        iconWrapperClassName='bg-[#F6E7BA] text-[#D4A017] w-5 h-5 p-0 rounded-[3px] text-base'
        valueClassName='text-[32px] leading-none font-semibold text-[#273248]'
        titleClassName='text-[11px] leading-[1.25] text-[#5A6577]'
        subtitleClassName='text-[10px] leading-[1.2] text-[#8A93A3] mt-0.5'
      />

      <StatCard
        icon={<LuClock5 className='text-[15px] text-[#D4A017]' />}
        value='12.5h'
        title='Time Invested'
        subtitle='This month'
        cardClassName='bg-[#F3F5F9] border border-[#E3E7EE] shadow-none rounded-[4px] p-3.5 gap-2.5'
        iconWrapperClassName='bg-[#F6E7BA] text-[#D4A017] w-5 h-5 p-0 rounded-[3px] text-base'
        valueClassName='text-[32px] leading-none font-semibold text-[#273248]'
        titleClassName='text-[11px] leading-[1.25] text-[#5A6577]'
        subtitleClassName='text-[10px] leading-[1.2] text-[#8A93A3] mt-0.5'
      />
    </div>
  );
};

export default VendorMonthlyProgressStats;
