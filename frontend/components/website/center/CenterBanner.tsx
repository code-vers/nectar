import React from 'react';
import BannerText from '../typography/BannerText';
import PrimaryButton from '../typography/PrimaryButton';
import SecondaryButton from '../typography/SecondaryButton';

interface CenterBannerProps {
  heading: string;
  description: string;
  primaryButton: {
    text: string;
    href: string;
  };
  secondaryButton?: {
    text: string;
    href: string;
  };
}

const CenterBanner: React.FC<CenterBannerProps> = ({
  heading,
  description,
  primaryButton,
  secondaryButton,
}) => {
  return (
    <section className="relative w-full overflow-hidden h-[calc(100vh-80px)] min-h-140">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/video/banner_video.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      <div className="absolute inset-0 bg-black/55" />

      <div className="relative z-10 h-full max-w-360 mx-auto px-6 sm:px-8 lg:px-10 flex flex-col justify-center">
        <BannerText
          title={heading}
          description={description}
        />

        <div className="mt-8 w-full pb-16 max-w-3xl">
          <div className="relative">
            <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-slate-300">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search courses, guides, resources"
              className="w-full rounded-lg  border border-stroke bg-black/50 py-4 pl-14 pr-5 text-white placeholder:text-slate-300 focus:border-[#F1701D] focus:outline-none focus:ring-2 focus:ring-[#F1701D]/20"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <PrimaryButton href={primaryButton.href} className="min-w-45" isBanner={true}>
            {primaryButton.text}
          </PrimaryButton>
          {secondaryButton && (
            <SecondaryButton href={secondaryButton.href} className="min-w-45 text-white">
              {secondaryButton.text}
            </SecondaryButton>
          )}
        </div>
      </div>
    </section>
  );
};

export default CenterBanner;