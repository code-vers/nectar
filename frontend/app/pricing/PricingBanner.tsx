import BannerText from "@/components/website/typography/BannerText";
import PrimaryButton from "@/components/website/typography/PrimaryButton";
import SecondaryButton from "@/components/website/typography/SecondaryButton";


const PricingBanner = () => {
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
       
          title="Build Stronger Communities Together"
          description="Empower property managers and residents with the tools, training, and resources they need to create thriving communities.
."
        />

        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <PrimaryButton href="/membership" className="min-w-45" isBanner={true}>
            Start Membership
          </PrimaryButton>
  
        </div>
      </div>
    </section>
  );
};

export default PricingBanner;