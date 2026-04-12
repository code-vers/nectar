import ChildrensLearningResource from "@/components/website/learning-center/ChildrensLearningResource";
import LearningByAgeGroup from "@/components/website/learning-center/LearningByAgeGroup";
import LearningCenterBanner from "@/components/website/learning-center/LearningCenterBanner";
import PopularResourcesCarousel from "@/components/website/learning-center/PopularResourcesCarousel";
import Stats from "@/components/website/learning-center/Stats";

const page = () => {
  return (
    <div className='bg-main-bg'>
      <LearningCenterBanner />
      <Stats />
      <LearningByAgeGroup />
      <PopularResourcesCarousel />
      <ChildrensLearningResource />
    </div>
  );
};

export default page;
