import MutedButton from "@/components/website/typography/MutedButton";
import SectionHeading from "@/components/website/typography/SectionHeading";
import Image from "next/image";
import img from "../../../../public/images/vendor/welcome.jpg";

const Welcome = () => {
  return (
    <div>
      <section className='bg-white p-7 rounded-xl shadow-sm'>
        <div className='flex gap-8 items-center'>
          {/* Image with play button overlay */}
          <div className='relative flex-none w-[340px] h-[210px] rounded-lg overflow-hidden'>
            <Image
              src={img}
              alt='Welcome'
              fill
              className='object-cover brightness-[0.82]'
            />
            {/* Play button */}
            <div className='absolute inset-0 flex items-center justify-center'>
              <div className='w-11 h-11 rounded-full bg-white/90 flex items-center justify-center shadow-md'>
                <svg width='16' height='16' viewBox='0 0 16 16' fill='none'>
                  <polygon points='5,3 13,8 5,13' fill='#1a1a2e' />
                </svg>
              </div>
            </div>
          </div>

          {/* Text content */}
          <div className='flex-1'>
            <SectionHeading
              title='Welcome back, Sarah'
              description='Continue your property management success journey. Follow the monthly path to mastery.'
              align='left'
            />
            <div className='mt-6'>
              <MutedButton>Start Month 1</MutedButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Welcome;
