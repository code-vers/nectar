import Faq from '@/components/website/home/Faq';
import HIWBanner from '@/components/website/howItsWorks/HIWBanner';
import InsideThePlatform from '@/components/website/howItsWorks/InsideThePlatform';
import Step from '@/components/website/howItsWorks/Step';

const page = () => {
  return (
    <div className='bg-main-bg '>
      <HIWBanner/>
      <Step/>
      <InsideThePlatform/>
      <Faq/>
    </div>
  );
};

export default page;