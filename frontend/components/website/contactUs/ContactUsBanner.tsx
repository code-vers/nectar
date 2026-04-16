import React from "react";
import BannerText from "../typography/BannerText";
import PrimaryButton from "../typography/PrimaryButton";
import SecondaryButton from "../typography/SecondaryButton";

const ContactUsBanner = () => {
    return (
        <section className="relative w-full overflow-hidden min-h-[calc(100vh-80px)] sm:h-[calc(100vh-80px)] sm:min-h-140">
            <video
                className="absolute inset-0 w-full h-full object-cover"
                src="/video/banner_video.mp4"
                autoPlay
                muted
                loop
                playsInline
            />

            <div className="absolute inset-0 bg-black/55" />

            <div className="relative z-10 min-h-[calc(100vh-80px)] sm:h-full max-w-360 mx-auto px-5 sm:px-8 lg:px-10 py-6 sm:py-0 flex flex-col justify-center [&_.heading]:text-[28px] [&_.heading]:leading-[145%] sm:[&_.heading]:text-[36px] sm:[&_.heading]:leading-[160%] [&_.heading-subtitle]:text-[16px] sm:[&_.heading-subtitle]:text-[20px]">
                <BannerText
                    title="Learn Property Management, Life Skills, and Financial Education "
                    secondaryTitle="in One Platform"
                    description="A complete learning platform for property owners, managers, residents, and families — with professional training, downloads, and educational resources."
                />

                <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 mt-4 sm:mt-6 w-full sm:w-auto">
                    <PrimaryButton
                        href="/membership"
                        className="w-full sm:w-auto min-w-0 sm:min-w-45 !px-6 !py-3 !text-[16px] sm:!px-12 sm:!py-4 sm:!text-[20px]"
                        isBanner={true}
                    >
                        Start Membership
                    </PrimaryButton>
                    <SecondaryButton
                        href="/courses"
                        className="w-full sm:w-auto min-w-0 sm:min-w-45 text-white !py-3 sm:!py-4"
                    >
                        Explore Courses
                    </SecondaryButton>
                </div>
            </div>
        </section>
    );
};

export default ContactUsBanner;
