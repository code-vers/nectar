import { BsCheckCircle, BsLock } from "react-icons/bs";
import ProgressBar from "../../common/ProgressBar";

type Month = {
  title: string;
  progress: number;
  isLocked: boolean;
};

const months: Month[] = [
  { title: "Month 1", progress: 100, isLocked: false },
  { title: "Month 2", progress: 50, isLocked: false },
  { title: "Month 3", progress: 0, isLocked: true },
  { title: "Month 3", progress: 0, isLocked: true },
];

const VendorSuccessPath = () => {
  return (
    <section className='bg-white mt-16 rounded-xl p-7 '>
      <h2 className='text-[18px] font-bold text-(--color-text-primary) mb-6'>
        Success Path
      </h2>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
        {months.map((month, index) => (
          <div
            key={index}
            className={`bg-[#fdf6ec] border border-[#f0e2c8] rounded-xl p-4 ${
              month.isLocked ? "opacity-70" : ""
            }`}>
            {/* Header */}
            <div className='flex items-center justify-between mb-3'>
              <span
                className={`font-bold text-[15px] ${
                  month.isLocked
                    ? "text-(--color-placeholder-text)"
                    : "text-(--color-text-primary)"
                }`}>
                {month.title}
              </span>
              {month.isLocked ? (
                <BsLock className='text-(--color-placeholder-text)] text-[15px]' />
              ) : (
                <BsCheckCircle className='text-(--color-sidebar-active-text) text-[15px]' />
              )}
            </div>

            {/* Meta */}
            <div className='flex items-center justify-between mb-2'>
              <span className='text-xs text-(--color-placeholder-text)'>
                Completed
              </span>
              <span className='text-xs text-(--color-placeholder-text)'>
                {month.progress}%
              </span>
            </div>

            {/* Progress Bar */}
            <ProgressBar
              value={month.progress}
              height={10}
              showLabel={false}
              color='#D4A017'
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default VendorSuccessPath;
