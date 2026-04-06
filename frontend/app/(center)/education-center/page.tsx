import CenterBanner from '@/components/website/center/CenterBanner';
import CenterCategory from '@/components/website/center/CenterCategory';
import CenterFeatureCategory from '@/components/website/center/CenterFeatureCategory';
import CenterResource from '@/components/website/center/CenterResource';
import NewsLatter from '@/components/website/center/NewsLatter';

const page = () => {
  return (
    <div>
      <CenterBanner
        heading="Owner / Landlord Education Center Professional courses, practical"
        description="Professional courses, practical tools, and expert guidance designed to help property owners manage properties, support residents, and grow their portfolio."
        primaryButton={{
          text: "Start Membership",
          href: "/membership"
        }}
        secondaryButton={{
          text: "Explore More",
          href: "/courses"
        }}
      />
      <CenterFeatureCategory/>
      <CenterCategory/>
      <CenterResource/>
      <NewsLatter/>
    </div>
  );
};

export default page;