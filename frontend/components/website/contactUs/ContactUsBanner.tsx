import React from "react";
import BannerText from "../typography/BannerText";
import PrimaryButton from "../typography/PrimaryButton";
import SecondaryButton from "../typography/SecondaryButton";

const ContactUsBanner = () => {
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
                    title="Learn Property Management, Life Skills, and Financial Education "
                    secondaryTitle="in One Platform"
                    description="A complete learning platform for property owners, managers, residents, and families — with professional training, downloads, and educational resources."
                />

                <div className="flex flex-col sm:flex-row gap-3 mt-6">
                    <PrimaryButton
                        href="/membership"
                        className="min-w-45"
                        isBanner={true}
                    >
                        Start Membership
                    </PrimaryButton>
                    <SecondaryButton
                        href="/courses"
                        className="min-w-45"
                    >
                        Explore Courses
                    </SecondaryButton>
                </div>
            </div>
        </section>
    );
};

export default ContactUsBanner;
