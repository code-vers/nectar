import HIWBanner from '@/components/website/howItsWorks/HIWBanner';
import Step from '@/components/website/howItsWorks/Step';

const page = () => {
  return (
    <div className='bg-main-bg '>
      <HIWBanner/>
      <Step/>
    </div>
  );
};

export default page;