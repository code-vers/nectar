import LearningCenterBanner from "@/components/website/learning-center/LearningCenterBanner";
import Stats from "@/components/website/learning-center/Stats";

const page = () => {
  return (
    <div className='bg-main-bg'>
      <LearningCenterBanner />
      <Stats />
    </div>
  );
};

export default page;
