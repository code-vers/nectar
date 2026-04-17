"use client";

import { useState } from "react";
import {
  HiOutlineAcademicCap,
  HiOutlineClipboardList,
  HiOutlineDownload,
  HiOutlineHome,
  HiOutlineLightBulb,
  HiOutlineViewGrid,
} from "react-icons/hi";
import SectionHeading from "../typography/SectionHeading";

const features = [
  {
    id: 1,
    icon: HiOutlineViewGrid,
    title: "Professional Training Courses",
    description:
      "Learn step-by-step property management strategies, best practices, and real-world solutions designed to help you manage properties with confidence.",
  },
  {
    id: 2,
    icon: HiOutlineDownload,
    title: "Downloadable Resources & Templates",
    description:
      "Access ready-made checklists, templates, and documents that simplify daily property management tasks.",
  },
  {
    id: 3,
    icon: HiOutlineHome,
    title: "Community Development Programs",
    description:
      "Build stronger communities with programs focused on cooperation, respect, and positive neighborhood engagement.",
  },
  {
    id: 4,
    icon: HiOutlineAcademicCap,
    title: "Resident Success Academy",
    description:
      "Provide residents with personal development courses that promote responsibility, life skills, and stronger community living.",
  },
  {
    id: 5,
    icon: HiOutlineLightBulb,
    title: "Children's Learning Center",
    description:
      "Give families access to engaging educational resources designed to support children's learning, growth, and future success.",
  },
  {
    id: 6,
    icon: HiOutlineClipboardList,
    title: "Practical Tools for Property Management",
    description:
      "Use simple yet powerful tools that help you organize tasks, communicate better, and manage properties more efficiently.",
  },
];

const PowerFullFeature = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <div className='bg-tertiary md:px-25 px-5 pt-24 pb-16'>
      <SectionHeading
        title='Powerful Features for Every Role'
        description='Everything you need to manage properties effectively and build thriving communities.'
      />

      {/* Outer border container */}
      <div
        className='mx-auto mt-12 rounded-2xl '
        style={{
          maxWidth: "1100px",
        }}>
        <div
          className='grid grid-cols-1 md:grid-cols-3 gap-4'
          style={{ background: "" }}>
          {features.map((feature) => {
            const IconComponent = feature.icon;
            const isActive = hoveredId === feature.id;

            return (
              <div
                key={feature.id}
                className='flex flex-col rounded bg-white items-center text-center px-8 py-8 cursor-pointer'
                style={{
                  backgroundColor: isActive ? "#F0D080" : "white",
                  transition: "background-color 0.3s ease",
                }}
                onMouseEnter={() => setHoveredId(feature.id)}
                onMouseLeave={() => setHoveredId(null)}>
                {/* Icon */}
                <div className='mb-4' style={{ transition: "color 0.3s ease" }}>
                  <IconComponent
                    size={30}
                    color={
                      isActive ? "var(--color-primary)" : "var(--color-primary)"
                    }
                  />
                </div>

                {/* Title */}
                <h3
                  className='font-semibold text-[15px] leading-normal mb-3'
                  style={{
                    color: isActive ? "#1F2937" : "var(--color-text-primary)",
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
  );
};

export default PowerFullFeature;
