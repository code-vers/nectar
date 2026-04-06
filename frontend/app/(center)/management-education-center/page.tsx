import CenterBanner from "@/components/website/center/CenterBanner";
import CenterCategory from "@/components/website/center/CenterCategory";
import NewsLatter from "@/components/website/center/NewsLatter";
import ManagementFeatureCourse from "@/components/website/management-center/ManagementFeatureCourse";
import ManagementLearningResource from "@/components/website/management-center/ManagementLearningResource";

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
          href: "/courses",
  
        }}
      />

      <ManagementFeatureCourse/>

         <CenterCategory
  title="Browse by Category
"
  description="Browse by category to find the knowledge you need"
  categories={[
    {
      title: "Property Management Foundations",
      desc: "Core knowledge and systems every property manager should understand.",
      icon: "key"
    },
    {
      title: "Rehab & Turn Management",
      desc: "Learn how to manage property turnovers and renovations efficiently.",
      icon: "bell"
    },
    {
      title: "Maintenance Management",
      desc: "Learn how to handle maintenance requests, repairs, and vendor coordination.",
      icon: "tool"
    },
    {
      title: "Property Operations & Systems",
      desc: "Operational workflows, property management systems, and team coordination.",
      icon: "play"
    },
    {
      title: "Maintenance Technician Training",
      desc: "Training for maintenance staff to improve repair and service skills.",
      icon: "monitor"
    },
    {
      title: "Lease Education",
      desc: "Understand lease agreements and legal requirements.",
      icon: "building"
    },
    {
      title: "Business & Portfolio Management",
      desc: "Managing multiple properties, scaling operations, and improving performance.",
      icon: "chart"
    }
  ]}
/>

<ManagementLearningResource/>

<NewsLatter/>
    </div>
  );
};

export default page;