import Image from "next/image";
import { FaCheck } from "react-icons/fa";
import image from "../../../public/images/howitsfor/howItsFor.png";

const features = [
  {
    id: 1,
    title: "Children's Learning Center",
    description:
      "Educational books, activities, and downloadable learning materials for children.",
  },
  {
    id: 2,
    title: "Downloads Library",
    description: "Access templates, forms, checklists, and workbooks.",
  },
  {
    id: 3,
    title: "Resident Success Academy",
    description:
      "Courses that teach life skills, financial education, and personal development.",
  },
  {
    id: 4,
    title: "Property Managers",
    description:
      "Access training courses designed for owners, property managers, and residents.",
  },
];

const WhatYouGet = () => {
  return (
    <section className='bg-[#F8FAFC]  mx-auto py-20 pb-[156px]'>
      <div className=' px-5 max-w-405 mx-auto md:px-10 lg:px-20'>
        <div className='flex flex-col justify-between lg:flex-row items-center gap-15'>
          {/* Left: Image */}
          <div className='shrink-0 w-full  flex-1 rounded-xl overflow-hidden shadow-md'>
            <Image
              src={image}
              alt='What You Get'
              className='w-full h-full object-cover'
            />
          </div>

          {/* Right: Content */}
          <div className='flex-1'>
            {/* Title */}
            <h2 className='text-3xl font-semibold text-gray-900 mb-3'>
              What You Get
            </h2>

            {/* Subtitle */}
            <p className='text-gray-500 mb-7 leading-relaxed'>
              Everything you need to succeed in property management and everyday
              life is available in one place.
            </p>

            {/* Feature List */}
            <ul className='flex flex-col gap-5'>
              {features.map((feature) => (
                <li key={feature.id} className='flex items-start gap-4'>
                  {/* Icon */}
                  <div className='shrink-0 w-7 h-7 rounded-md bg-[#F0D080] flex items-center justify-center mt-1'>
                    <FaCheck size={12} className='text-white' />
                  </div>

                  {/* Text */}
                  <div>
                    <p className='font-semibold text-gray-900 mb-1'>
                      {feature.title}
                    </p>
                    <p className='text-sm leading-relaxed text-gray-500'>
                      {feature.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatYouGet;
