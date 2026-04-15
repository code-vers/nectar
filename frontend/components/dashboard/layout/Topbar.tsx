import { MdMenu } from "react-icons/md";

type TopbarProps = {
  onMenuToggle?: () => void;
  title: string;
  subtitle?: string;
};

const Topbar = ({ onMenuToggle, title, subtitle }: TopbarProps) => {
  return (
    <header className='bg-[#ECE9E1] border-b border-[#D8D2C7] px-4 md:px-6 py-5 shrink-0'>
      <div className='flex items-start gap-3'>
        <button
          onClick={onMenuToggle}
          className='lg:hidden mt-0.5 w-9 h-9 flex items-center justify-center rounded-lg hover:bg-[#E2DDD1] transition-colors'
          aria-label='Toggle sidebar'>
          <MdMenu size={22} className='text-[#2F3A4A]' />
        </button>
        <div>
          <h1 className='text-[26px] leading-[1.2] font-semibold text-[#2F3A4A]'>
            {title}
          </h1>
          {subtitle ? (
            <p className='mt-1 text-[12px] leading-[1.35] text-[#6F7785]'>
              {subtitle}
            </p>
          ) : null}
        </div>
      </div>
    </header>
  );
};

export default Topbar;
