import SectionHeading from "../typography/SectionHeading";
import FeatureCards from "./FeatureCards";
import WhatYouGet from "./WhatYouGet";

const HowItsFor = () => {
  return (
    <div className='py-20 bg-tertiary '>
      <section className='md:mx-25 mx-5'>
        <SectionHeading
          title="Who It's For"
          description='A learning platform designed for everyone in the property ecosystem'
        />
      </section>
      <FeatureCards />
      <WhatYouGet />
    </div>
  );
};

export default HowItsFor;
