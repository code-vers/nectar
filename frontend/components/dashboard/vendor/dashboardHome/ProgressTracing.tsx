import ProgressBar from "../../common/ProgressBar";

type ProgressItem = {
  label: string;
  value: number;
};

const progressData: ProgressItem[] = [
  { label: "Overall Completion", value: 45 },
  { label: "Lesson Completed", value: 45 },
  { label: "Monthly Progress", value: 45 },
];

const ProgressTracing = () => {
  return (
    <section className='bg-white rounded-xl p-6 mt-12'>
      {/* Header */}
      <h2 className='text-[15px] font-bold text-(--color-text-primary)'>
        Progress Tracking
      </h2>
      <p className='text-xs text-(--color-placeholder-text) mt-0.5 mb-4'>
        Your Learning journey at a glance...
      </p>

      {/* Stats Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-8'>
        {progressData.map((item, index) => (
          <div key={index}>
            <p className='text-xs `text-(--color-placeholder-text) mb-1'>
              {item.label}
            </p>
            <p className='text-[28px] font-bold text-(--color-text-primary) mb-2'>
              {item.value}%
            </p>
            <ProgressBar
              value={item.value}
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

export default ProgressTracing;
