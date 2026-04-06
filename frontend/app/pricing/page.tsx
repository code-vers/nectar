import Subscription from '@/components/website/home/Subscription';
import Invite from '@/components/website/pricing/Invite';
import PowerFullFeature from '@/components/website/pricing/PowerFullFeature';
import PricingFaq from '@/components/website/pricing/PricingFaq';
import PricingBanner from './PricingBanner';

const page = () => {
  return (
    <div>
      <PricingBanner/>
      <Subscription/>
      <Invite/>
      <PowerFullFeature/>
      <PricingFaq/>
      
    </div>
  );
};

export default page;