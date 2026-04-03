import Subscription from '@/components/website/home/Subscription';
import Invite from '@/components/website/pricing/Invite';
import PowerFullFeature from '@/components/website/pricing/PowerFullFeature';
import PricingBanner from './PricingBanner';

const page = () => {
  return (
    <div>
      <PricingBanner/>
      <Subscription/>
      <Invite/>
      <PowerFullFeature/>
      
    </div>
  );
};

export default page;