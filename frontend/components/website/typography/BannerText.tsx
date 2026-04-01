import React from 'react';

interface BannerTextProps {
  title: string;
  subtitle: string;
  description: string;
}

const BannerText: React.FC<BannerTextProps> = ({ title, subtitle, description }) => {
  return (
    <div className="text-white text-center lg:text-left max-w-3xl">
      <p className="text-[18px] sm:text-[20px] font-medium text-orange-400 mb-3">{subtitle}</p>
      <h1 className="text-[2rem] sm:text-[3rem] md:text-[4rem] leading-[1.1] font-bold mb-4 tracking-tight">
        {title}
      </h1>
      <p className="text-[14px] sm:text-[16px] md:text-[18px] text-white/85 mb-6">
        {description}
      </p>
    </div>
  );
};

export default BannerText;