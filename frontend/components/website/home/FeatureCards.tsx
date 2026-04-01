import { FiBriefcase, FiHome, FiUsers } from 'react-icons/fi';

const featureData = [
  {
    icon: <FiHome size={24} className="text-(--color-green)" />,
    title: 'Owners / Landlords',
    description:
      'Learn how to manage rental properties, understand lease responsibilities, and improve property performance.',
  },
  {
    icon: <FiBriefcase size={24} className="text-(--color-green)" />,
    title: 'Property Managers',
    description:
      'Access professional training on leasing systems, maintenance operations, and property management workflows.',
  },
  {
    icon: <FiUsers size={24} className="text-(--color-green)" />,
    title: 'Residents & Families',
    description:
      'Build better communities with resident support resources, financial education, and success strategies.',
  },
];

const FeatureCards = () => {
  return (
    <section className="py-10 ">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-10">
    

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {featureData.map((item) => (
            <div
              key={item.title}
              className="rounded border border-(--color-card-border) bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-(--color-hover-surface) mb-4">
                {item.icon}
              </div>
              <h3 className="secondary-title font-medium mb-3 text-(--color-text-primary)">{item.title}</h3>
              <p className="title-subtitle text-(--color-secondary-color)">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureCards;
