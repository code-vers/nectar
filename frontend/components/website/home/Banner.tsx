import BannerText from "../typography/BannerText";
import PrimaryButton from "../typography/PrimaryButton";
import SecondaryButton from "../typography/SecondaryButton";

const Banner = () => {
  return (
    <section className="relative w-full overflow-hidden h-[calc(100vh-80px)] min-h-[560px]">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="https://cdn.coverr.co/videos/coverr-young-woman-reviewing-an-apartment-13205/1080p.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      <div className="absolute inset-0 bg-black/55" />

      <div className="relative z-10 h-full max-w-[1200px] mx-auto px-6 sm:px-8 lg:px-10 flex flex-col justify-center">
        <BannerText
          subtitle="Learn Property Management, Life Skills, & Financial Education"
          title="Learn Property Management, Life Skills, and Financial Education in One Platform"
          description="A complete learning platform for property owners, managers, residents, and families — with professional training, downloads, and educational resources."
        />

        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <PrimaryButton href="/membership" className="min-w-[180px]">
            Start Membership
          </PrimaryButton>
          <SecondaryButton href="/courses" className="min-w-[180px]">
            Explore Courses
          </SecondaryButton>
        </div>
      </div>
    </section>
  );
};

export default Banner;