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
   <CenterCategory
  title="Explore Learning Topics"
  description="Browse by category to find the knowledge you need"
  categories={[
    {
      title: "Portfolio Growth",
      desc: "Strategies for expanding your property investments.",
      icon: "key"
    },
    {
      title: "Notices & Compliance",
      desc: "Navigate notices, regulations, and compliance matters.",
      icon: "bell"
    },
    {
      title: "Maintenance Oversight",
      desc: "Understand property maintenance planning and repairs.",
      icon: "tool"
    },
    {
      title: "Landlord Foundations",
      desc: "Essential knowledge for new and experienced landlords.",
      icon: "play"
    },
    {
      title: "Leasing & Screening",
      desc: "Learn the leasing process and how to evaluate applications.",
      icon: "monitor"
    },
    {
      title: "Lease Education",
      desc: "Understand lease agreements and legal requirements.",
      icon: "building"
    },
    {
      title: "Budget & Performance",
      desc: "Track expenses and optimize rental income.",
      icon: "chart"
    }
  ]}
/>
      <CenterResource/>
      <NewsLatter/>
</div>
    </div>
  );
};

export default page;