import CenterBanner from '@/components/website/center/CenterBanner';
import CenterCategory from '@/components/website/center/CenterCategory';
import CenterFeaturedCourses from '@/components/website/center/CenterFeaturedCourses';

import CenterResource from '@/components/website/center/CenterResource';
import NewsLatter from '@/components/website/center/NewsLatter';

const page = () => {
  return (
    <div className='bg-main-bg '>
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
<div className='max-w-370 mx-auto'>

  <CenterFeaturedCourses/>
      <CenterCategory/>
      <CenterResource/>
      <NewsLatter/>
</div>
    </div>
  );
};

export default page;