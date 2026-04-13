import { MdMenu, MdNotifications, MdSearch } from "react-icons/md";

type TopbarProps = {
  onMenuToggle?: () => void;
};

const Topbar = ({ onMenuToggle }: TopbarProps) => {
  return (
    <header className='h-14 bg-card-bg border-b border-card-border flex items-center justify-between px-4 md:px-6 shrink-0'>
      {/* Left: mobile menu toggle + page title */}
      <div className='flex items-center gap-2'>
        <button
          onClick={onMenuToggle}
          className='lg:hidden w-9 h-9 flex items-center justify-center rounded-lg hover:bg-section-bg transition-colors'
          aria-label='Toggle sidebar'>
          <MdMenu size={22} className='text-text-primary' />
        </button>
        <h1 className='text-[15px] font-semibold text-text-primary'>
          Dashboard
        </h1>
      </div>

      {/* Right: search + notification + avatar */}
      <div className='flex items-center gap-3'>
        {/* Search — hidden on small screens */}
        <div className='hidden sm:flex items-center gap-2 bg-section-bg border border-card-border rounded-lg px-3 py-1.5 w-52'>
          <MdSearch size={16} className='text-placeholder-text shrink-0' />
          <input
            type='text'
            placeholder='Search...'
            className='bg-transparent text-sm text-text-primary placeholder-placeholder-text outline-none w-full'
          />
        </div>

        {/* Notification bell */}
        <button className='relative w-9 h-9 flex items-center justify-center rounded-lg hover:bg-section-bg transition-colors'>
          <MdNotifications size={20} className='text-text-primary' />
          <span className='absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-secondary border-2 border-card-bg' />
        </button>

        {/* User avatar */}
        <div className='w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-semibold shrink-0'>
          EH
        </div>
      </div>
    </header>
  );
};

export default Topbar;
