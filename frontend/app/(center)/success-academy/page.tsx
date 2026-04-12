import CenterBanner from "@/components/website/center/CenterBanner";
import CenterCategory from "@/components/website/center/CenterCategory";
import NewsLatter from "@/components/website/center/NewsLatter";
import PricingFaq from "@/components/website/pricing/PricingFaq";
import SuccessAcademyFeatureCourse from "@/components/website/success-academy/SuccessAcademyFeatureCourse";

const page = () => {
  return (
    <div>
      <CenterBanner
        heading='Resident Success Academy
'
        description='Courses and resources designed to help residents build life skills, manage their homes responsibly, improve financial wellness, and grow personally.
'
        primaryButton={{
          text: "Browse Course",
          href: "/",
        }}
        secondaryButton={{
          text: "Explore Resources",
          href: "/",
        }}
      />

      <SuccessAcademyFeatureCourse />

      <CenterCategory
        title='Browse by Category'
        description='Browse by category to find the knowledge you need'
        categories={[
          {
            title: "Home Care & Maintenance Basics",
            desc: "Learn how to take care of your home and prevent common problems.",
            icon: "key",
          },
          {
            title: "Financial Wellness",
            desc: "Build budgeting habits and improve financial stability.",
            icon: "bell",
          },
          {
            title: "Personal Growth & Life Skills",
            desc: "Develop skills that improve your life and future opportunities.",
            icon: "tool",
          },
          {
            title: "Entrepreneurship & Side Hustles",
            desc: "Learn ways to build small businesses and additional income.",
            icon: "play",
          },
          {
            title: "Creative Skills & Hobbies",
            desc: "Explore creativity through hobbies and personal interests.",
            icon: "monitor",
          },
          {
            title: "Children's Learning Center",
            desc: "Fun and educational resources for children of all ages.",
            icon: "building",
          },
        ]}
      />

      {/* children learing center */}
      <PricingFaq />

      <div className=''>
        <NewsLatter />
      </div>
    </div>
  );
};

export default page;
