import Image from "next/image";
import image from "../../../public/images/howitsfor/howItsFor.png";
import PrimaryButton from "../typography/PrimaryButton";

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

const Invite = () => {
  return (
    <section className='bg-[#F8FAFC] py-16 px-6'>
      <div className='max-w-360 mx-auto flex flex-col md:flex-row items-center gap-10'>
        {/* ── Left: Image ── */}
        <div className='shrink-0 w-full md:w-100 rounded-xl overflow-hidden shadow-md'>
          <Image
            src={image}
            alt='What You Get'
            className='w-full h-full object-cover'
          />
        </div>

        {/* ── Right: Content Card ── */}
        <div className='flex-1'>
          {/* Title */}
          <h2 className='section-title font-semibold text-(--color-text-primary) mb-3'>
            Invite Your Residents
          </h2>

          {/* Subtitle */}
          <p className='title-subtitle text-(--color-placeholder-text) mb-7 leading-relaxed'>
            Property owners and managers can invite residents to join the
            Resident Success Academy. Residents gain access to valuable learning
            programs designed to help them become better neighbors, build
            stronger communities, and improve everyday living. Residents may
            also choose to upgrade their membership to unlock additional courses
            and resources.
          </p>

          <PrimaryButton>Start Membership</PrimaryButton>
        </div>
      </div>
    </section>
  );
};

export default Invite;
