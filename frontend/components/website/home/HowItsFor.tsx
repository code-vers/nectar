import SectionHeading from "../typography/SectionHeading";
import FeatureCards from "./FeatureCards";
import WhatYouGet from "./WhatYouGet";

const HowItsFor = () => {
  return (
    <div className='pt-20 '>
      <SectionHeading
        title="Who It's For"
        description='A learning platform designed for everyone in the property ecosystem'
      />
      <FeatureCards />
      <WhatYouGet />
    </div>
  );
};

export default HowItsFor;
