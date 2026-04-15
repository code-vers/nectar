import ProgressBar from "@/components/dashboard/common/ProgressBar";

const MONTHLY_PROGRESS_DATA = [
  { label: "Month 1 - Foundation", value: 100 },
  { label: "Month 2 - Foundation", value: 50 },
  { label: "Month 3 - Advanced", value: 100 },
  { label: "Month 4 - Advanced", value: 100 },
  { label: "Month 4 - Advanced", value: 100 },
];

const VendorMonthlyProgressVar = () => {
  return (
    <section className='bg-white mt-24 border border-[#E3E7EE] rounded-[4px] p-4 sm:p-6'>
      <h2 className='text-[30px] font-semibold leading-[1.2] text-[#273248] mb-4'>
        Monthly Progress
      </h2>

      <div className='space-y-3.5'>
        {MONTHLY_PROGRESS_DATA.map((item, index) => (
          <div key={`${item.label}-${index}`}>
            <div className='flex items-center justify-between gap-3 mb-1.5'>
              <p className='text-[11px] leading-[1.2] text-[#6B7280]'>
                {item.label}
              </p>
              <p className='text-[11px] leading-[1.2] text-[#4B5563]'>
                {item.value}%
              </p>
            </div>
            <ProgressBar value={item.value} height={6} color='#D4A017' />
          </div>
        ))}
      </div>
    </section>
  );
};

export default VendorMonthlyProgressVar;
