import ProgressBar from "@/components/dashboard/common/ProgressBar";
import React from "react";

type Stat = {
  id: string;
  title: string;
  value: number;
  subtitle?: string;
};

type Props = {
  stats?: Stat[];
};

const defaultStats: Stat[] = [
  { id: "s1", title: "Overall Completion", value: 45, subtitle: "" },
  { id: "s2", title: "Lesson Completed", value: 45, subtitle: "" },
  { id: "s3", title: "Monthly Progress", value: 45, subtitle: "" },
];

const ProgressTracking: React.FC<Props> = ({ stats }) => {
  const items = stats ?? defaultStats;

  return (
    <section className='bg-[var(--color-card-bg)] border border-[var(--color-card-border)] rounded-xl p-6'>
      <div className='md:flex md:items-start md:justify-between gap-6'>
        <div className='md:w-1/3'>
          <h3 className='text-lg font-semibold'>Progress Tracking</h3>
          <p className='mt-1 text-sm text-[var(--color-placeholder-text)]'>
            Your Learning journey at a glance...
          </p>
        </div>

        <div className='mt-4 md:mt-0 md:w-2/3 grid grid-cols-1 sm:grid-cols-3 gap-6 items-center'>
          {items.map((s) => (
            <div key={s.id} className='flex flex-col'>
              <div className='text-sm text-[var(--color-placeholder-text)]'>
                {s.title}
              </div>
              <div className='text-base font-semibold mt-1 mb-2'>
                {s.value}%
              </div>
              <ProgressBar value={s.value} height={8} showLabel={false} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgressTracking;
