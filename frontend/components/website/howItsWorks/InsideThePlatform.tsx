import Image from 'next/image';
import { FaCheck } from 'react-icons/fa';
import image from '../../../public/images/howitsfor/howItsFor.png';
import { RiCheckboxCircleLine } from 'react-icons/ri';


const features = [
  {
    id: 1,
    title: "Easy-to-follow training courses",
    description: 'Educational books, activities, and downloadable learning materials for children.',
  },
  {
    id: 2,
    title: 'Downloadable resources and template',
    description: 'Access templates, forms, checklists, and workbooks.',
  },
  {
    id: 3,
    title: 'Resident Success Academy access',
    description: 'Courses that teach life skills, financial education, and personal development.',
  },
  {
    id: 4,
    title: 'Organized learning dashboard',
    description: 'Access training courses designed for owners, property managers, and residents.',
  },
];

const InsideThePlatform = () => {
  return (
    <section className="bg-(--color-section-bg) mb-16 py-16 px-6">
      <div className="max-w-360 mx-auto flex flex-col md:flex-row items-center gap-10">

        {/* ── Left: Image ── */}
        <div className="shrink-0 w-full md:w-100 rounded-xl overflow-hidden shadow-md">
          <Image
            src={image}
            alt="What You Get"
            className="w-full h-full object-cover"
          />
        </div>

        {/* ── Right: Content Card ── */}
        <div className="flex-1">

          {/* Title */}
          <h2 className="section-title font-semibold text-(--color-text-primary) mb-3">
Inside the Platform
          </h2>

          {/* Subtitle */}
          <p className="title-subtitle text-(--color-placeholder-text) mb-7 leading-relaxed">
Everything you need to manage properties effectively and build thriving communities.

          </p>

        

          {/* Feature List */}
          <ul className="flex flex-col gap-5 list-none p-0 m-0">
            {features.map((feature) => (
              <li key={feature.id} className="flex items-start gap-4">

                {/* Green Check Icon */}
                <div className="shrink-0 w-7 h-7 rounded-md   flex items-center justify-center mt-0.5">
                  <RiCheckboxCircleLine size={28} className="text-green" />
                </div>

                {/* Text */}
                <div>
                  <p className="title-subtitle font-semibold text-(--color-text-primary) mb-0.5">
                    {feature.title}
                  </p>
                  {/* <p className="text-[14px] leading-[160%] text-(--color-placeholder-text)">
                    {feature.description}
                  </p> */}
                </div>

              </li>
            ))}
          </ul>

        </div>
      </div>
    </section>
  );
};

export default InsideThePlatform;