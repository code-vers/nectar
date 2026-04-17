import PrimaryButton from "../typography/PrimaryButton";
import SectionHeading from "../typography/SectionHeading";
import TertiaryButton from "../typography/TertiaryButton";

const NewsLatter = () => {
  return (
    <div className='bg-[#F0E4C9] px-4 p-16'>
      <SectionHeading
        title='Grow Your Property Management Skills
'
        description='Access professional training, tools, and guides designed for modern property owners.
'
      />

      <div className='text-center flex gap-8 justify-center pt-8'>
        <PrimaryButton className='py-2'>Start Membership</PrimaryButton>

        <TertiaryButton className='bg-green py-2'>
          Explore Courses
        </TertiaryButton>
      </div>
    </div>
  );
};

export default NewsLatter;
