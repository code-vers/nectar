import SectionHeading from '../typography/SectionHeading';

import type { IconType } from 'react-icons';
import { FaChartBar, FaKey, FaPlay, FaUniversity } from 'react-icons/fa';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { MdBuild, MdMonitor } from 'react-icons/md';

const iconMap = {
  key: FaKey,
  bell: IoMdNotificationsOutline,
  tool: MdBuild,
  play: FaPlay,
  monitor: MdMonitor,
  building: FaUniversity,
  chart: FaChartBar
} satisfies Record<string, IconType>;

type IconName = keyof typeof iconMap;

interface CenterCategoryItem {
  icon: IconName;
  title: string;
  desc: string;
}

interface CenterCategoryProps {
  title: string;
  description: string;
  categories: CenterCategoryItem[];
}

const CenterCategory = ({
  title,
  description,
  categories
}: CenterCategoryProps) => {
  return (
    <div className="py-16">
      {/* Heading */}
      <SectionHeading title={title} description={description} />

      {/* Container */}
      <div className="mt-10   p-8 rounded-lg">
        
        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {categories.map((item, index) => {
            const Icon = iconMap[item.icon];

            return (
              <div
                key={index}
                className="flex items-start gap-4 bg-white rounded-lg py-4 px-3 shadow-sm hover:shadow-md transition"
              >
                {/* Icon */}
                <div className="bg-green p-3 rounded-md text-white shrink-0">
                  {Icon && <Icon size={18} />}
                </div>

                {/* Text */}
                <div>
                  <h3 className="font-semibold text-gray-900 text-base">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default CenterCategory;
