import { FiBriefcase, FiHome, FiUsers } from "react-icons/fi";
import { LuUser } from "react-icons/lu";

const featureData = [
  {
    icon: <FiHome size={24} className='text-white' />,
    title: "Owners / Landlords",
    description:
      "Learn how to manage rental properties, understand lease responsibilities, and improve property performance.",
  },
  {
    icon: <FiBriefcase size={24} className='text-white' />,
    title: "Property Managers",
    description:
      "Access professional training on leasing systems, maintenance operations, and property management workflows.",
  },
  {
    icon: <FiUsers size={24} className='text-white' />,
    title: "Residents & Families",
    description:
      "Build better communities with resident support resources, financial education, and success strategies.",
  },
  {
    icon: <LuUser size={24} className='text-white' />,
    title: "Vendor Center",
    description:
      "Build better communities with resident support resources, financial education, and success strategies.",
  },
];

const FeatureCards = () => {
  return (
    <section className='py-10 pb-20 md:mx-10 lg:mx-25 mx-5'>
      <div className='  '>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
          {featureData.map((item) => (
            <div
              key={item.title}
              className='rounded border border-(--color-card-border) bg-white p-6 shadow-sm hover:shadow-md transition-shadow'>
              <div className='w-12 h-12 flex items-center justify-center rounded text-tertiary bg-primary mb-4'>
                {item.icon}
              </div>
              <h3 className='secondary-title font-medium mb-3 text-(--color-text-white)'>
                {item.title}
              </h3>
              <p className='title-subtitle text-(--color-secondary-color)'>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureCards;
