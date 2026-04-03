import Subscription from '@/components/website/home/Subscription';
import PricingBanner from './PricingBanner';
import Invite from '@/components/website/pricing/Invite';

const page = () => {
  return (
    <div>
      <PricingBanner/>
      <Subscription/>
      <Invite/>
      
    </div>
  );
};

export default page;