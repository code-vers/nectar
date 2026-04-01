import React from 'react';

interface BannerTextProps {
  title: string;
  description: string;
}

const BannerText: React.FC<BannerTextProps> = ({ title,  description }) => {
  return (
    <div className="text-white text-center lg:text-left max-w-3xl">

      <h1 className="heading mb-4 ">
        {title}
      </h1>
      <p className="heading-subtitle  mb-6">
        {description}
      </p>
    </div>
  );
};

export default BannerText;