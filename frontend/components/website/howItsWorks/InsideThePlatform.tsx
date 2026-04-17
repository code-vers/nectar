import Image from "next/image";
import { RiCheckboxCircleLine } from "react-icons/ri";
import image from "../../../public/images/howitsfor/howItsFor.png";

const features = [
  {
    id: 1,
    title: "Easy-to-follow training courses",
  },
  {
    id: 2,
    title: "Downloadable resources and template",
  },
  {
    id: 3,
    title: "Resident Success Academy access",
  },
  {
    id: 4,
    title: "Organized learning dashboard",
  },
];

const InsideThePlatform = () => {
  return (
    <section className='bg-[#F8FAFC] py-24'>
      <div className='max-w-480 mx-auto px-6'>
        <div className='flex flex-col md:flex-row items-center justify-center gap-12'>
          {/* Left: Image */}
          <div className='w-full md:w-105 rounded-xl overflow-hidden shadow-md'>
            <Image
              src={image}
              alt='Inside the Platform'
              className='w-full h-full object-cover'
            />
          </div>

          {/* Right: Content */}
          <div className='max-w-xl text-center md:text-left'>
            {/* Title */}
            <h2 className='text-3xl font-semibold text-gray-900 mb-3'>
              Inside the Platform
            </h2>

            {/* Subtitle */}
            <p className='text-gray-500 mb-7 leading-relaxed'>
              Everything you need to manage properties effectively and build
              thriving communities.
            </p>

            {/* Feature List */}
            <ul className='flex flex-col gap-5'>
              {features.map((feature) => (
                <li
                  key={feature.id}
                  className='flex items-start gap-4 justify-center md:justify-start'>
                  {/* Icon */}
                  <div className='w-7 h-7 flex items-center justify-center mt-1'>
                    <RiCheckboxCircleLine
                      size={26}
                      className='text-[#D4A017]'
                    />
                  </div>

                  {/* Text */}
                  <p className='font-semibold text-gray-900'>{feature.title}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InsideThePlatform;
