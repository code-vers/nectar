import HIWBanner from '@/components/website/howItsWorks/HIWBanner';
import InsideThePlatform from '@/components/website/howItsWorks/InsideThePlatform';
import Step from '@/components/website/howItsWorks/Step';

const page = () => {
  return (
    <div className='bg-main-bg '>
      <HIWBanner/>
      <Step/>
      <InsideThePlatform/>
    </div>
  );
};

export default page;