"use client";

import { useState } from "react";
import type { IconType } from "react-icons";
import { GiGraduateCap } from "react-icons/gi";
import { IoBookOutline } from "react-icons/io5";
import { RiTodoLine } from "react-icons/ri";
import SectionHeading from "../typography/SectionHeading";

interface FeatureItem {
  id: number;
  icon: IconType;
  title: string;
  description: string;
}

const features: FeatureItem[] = [
  {
    id: 1,
    icon: GiGraduateCap,
    title: "Courses",
    description:
      "Structured video lessons covering essential property management skills.",
  },
  {
    id: 2,
    icon: IoBookOutline,
    title: "Workbooks",
    description: "Interactive exercises to apply what you learn.",
  },
  {
    id: 3,
    icon: RiTodoLine,
    title: "Checklists",
    description:
      "Ready-to-use checklists for inspections, turnovers, and maintenance.",
  },
  {
    id: 4,
    icon: RiTodoLine,
    title: "Process Templates",
    description:
      "Operational templates for property workflows and team systems.",
  },
];

const ManagementLearningResource = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section className='bg-tertiary py-24'>
      <div className='md:mx-25 mx-5 mt-16'>
        <SectionHeading
          title='Learning Resources'
          description='Access a variety of resources to support your learning journey.'
        />

        <div className=' pt-6 pb-16'>
          {/* Outer border container */}
          <div className='mx-auto mt-12 rounded-2xl'>
            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4'>
              {features.map((feature) => {
                const IconComponent = feature.icon;
                const isActive = hoveredId === feature.id;

                return (
                  <div
                    key={feature.id}
                    className='flex shadow  flex-col items-center text-center px-8 py-8 cursor-pointer'
                    style={{
                      backgroundColor: isActive
                        ? "#F0D080"
                        : "white",
                      transition: "background-color 0.3s ease",
                    }}
                    onMouseEnter={() => setHoveredId(feature.id)}
                    onMouseLeave={() => setHoveredId(null)}>
                    {/* Icon */}
                    <div
                      className='mb-4'
                      style={{ transition: "color 0.3s ease" }}>
                      <IconComponent
                        size={30}
                        color={isActive ? "#F0D080" : "var(--color-primary)"}
                      />
                    </div>

                    {/* Title */}
                    <h3
                      className='font-semibold text-[15px] leading-normal mb-3'
                      style={{
                        color: isActive
                          ? "#1F2937"
                          : "var(--color-text-primary)",
                        transition: "color 0.3s ease",
                      }}>
                      {feature.title}
                    </h3>

                    {/* Description */}
                    <p
                      className='text-[13px] leading-[1.7]'
                      style={{
                        color: isActive
                          ? "#4A5568"
                          : "var(--color-placeholder-text)",
                        transition: "color 0.3s ease",
                      }}>
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManagementLearningResource;
