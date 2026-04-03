import React from 'react';

interface BannerTextProps {
  title: string;
  secondaryTitle?: string;
  description: string;
}

const BannerText: React.FC<BannerTextProps> = ({ title, secondaryTitle, description }) => {
  return (
    <div className="text-white text-center lg:text-left max-w-3xl">

      <h1 className="heading mb-4 ">
        {title}
        <span className='text-[#F1701D]'>{secondaryTitle}</span>
      </h1>
      <p className="heading-subtitle  mb-6">
        {description}
      </p>
    </div>
  );
};

export default BannerText;