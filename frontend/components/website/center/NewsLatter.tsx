import PrimaryButton from "../typography/PrimaryButton";
import SectionHeading from "../typography/SectionHeading";

const NewsLatter = () => {
  return (
    <div className='bg-[#EFF9E4] px-4 p-16'>
      <SectionHeading
        title='Grow Your Property Management Skills
'
        description='Access professional training, tools, and guides designed for modern property owners.
'
      />

      <div className='text-center flex gap-8 justify-center pt-8'>
        <PrimaryButton className='py-2'>Start Membership</PrimaryButton>

        <PrimaryButton className='bg-green py-2'>Explore Courses</PrimaryButton>
      </div>
    </div>
  );
};

export default NewsLatter;
