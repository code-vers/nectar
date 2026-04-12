import NewsLatter from "@/components/website/center/NewsLatter";
import ChildrensLearningResource from "@/components/website/learning-center/ChildrensLearningResource";
import LearningByAgeGroup from "@/components/website/learning-center/LearningByAgeGroup";
import LearningCenterBanner from "@/components/website/learning-center/LearningCenterBanner";
import PopularResourcesCarousel from "@/components/website/learning-center/PopularResourcesCarousel";
import Stats from "@/components/website/learning-center/Stats";
import TipsForSupportingYourChild from "@/components/website/learning-center/TipsForSupportingYourChild";

const page = () => {
  return (
    <div className='bg-main-bg'>
      <LearningCenterBanner />
      <Stats />
      <LearningByAgeGroup />
      <PopularResourcesCarousel />
      <ChildrensLearningResource />
      <TipsForSupportingYourChild />
      <NewsLatter />
    </div>
  );
};

export default page;
