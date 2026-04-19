"use client";

import Image from "next/image";
import { useState } from "react";
import {
  HiOutlineBookOpen,
  HiOutlineHome,
  HiOutlineStar,
  HiOutlineUserGroup,
} from "react-icons/hi";
import arrow from "../../../public/images/shared/arrow.png";
import SectionHeading from "../typography/SectionHeading";

const steps = [
  {
    id: 1,
    icon: HiOutlineUserGroup,
    title: "Subscribe as an Owner or Property Manager",
    description:
      "Property owners and managers start by subscribing to the platform to gain full access to training courses, tools, and downloadable resources.",
  },
  {
    id: 2,
    icon: HiOutlineBookOpen,
    title: "Access Courses & Resources",
    description:
      "Members can explore professional training courses and download practical guides, templates, and management resources.",
  },
  {
    id: 3,
    icon: HiOutlineHome,
    title: "Invite Your Residents",
    description:
      "Owners and managers can invite residents to join the Resident Success Academy, giving them access to learning programs that support better community living.",
  },
  {
    id: 4,
    icon: HiOutlineStar,
    title: "Residents Can Upgrade (Optional)",
    description:
      "Residents can choose to upgrade their access to unlock additional courses, resources, and learning opportunities if available.",
  },
];

const Step = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <div className='pt-16  bg-tertiary py-28 px-5 md:px-25 '>
      <SectionHeading
        title='Simple 4-Step Process'
        description='Get started in minutes and build better communities'
      />

      {/* Outer dashed border container */}
      <div className='mx-auto max-w-480  mt-12 rounded-2xl  max-w-360`'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 relative'>
          {steps.map((step, index) => {
            const isActive = hoveredId === step.id;
            const IconComponent = step.icon;

            return (
              <div
                key={step.id}
                className='relative flex items-stretch'
                onMouseEnter={() => setHoveredId(step.id)}
                onMouseLeave={() => setHoveredId(null)}>
                {/* Step Card */}
                <div
                  className={`flex flex-col shadow-lg items-center text-center px-6 py-6 rounded-2xl flex-1 transition-colors duration-300 cursor-pointer ${
                    isActive ? "bg-(--color-primary)" : "bg-white"
                  }`}>
                  {/* Icon circle — normal: primary bg + white icon, hover: white bg + primary icon */}
                  <div
                    className={`w-16 -mt-12 h-16 rounded-full flex items-center justify-center mb-5 shrink-0 transition-colors duration-300 shadow-[0_2px_8px_rgba(0,0,0,0.10)] ${
                      isActive ? "bg-white" : "bg-(--color-primary)"
                    }`}>
                    <IconComponent
                      className={`w-7 h-7 ${isActive ? "text-(--color-primary)" : "text-white"}`}
                    />
                  </div>

                  {/* Title */}
                  <h3
                    className={`font-medium text-[18px] leading-normal mb-3 transition-colors duration-300 ${
                      isActive ? "text-white" : "text-(--color-text-primary)"
                    }`}>
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p
                    className={`text-[13px] pt-4 leading-[1.65] transition-colors duration-300 ${
                      isActive ? "text-white/85" : "text-secondary-color"
                    }`}>
                    {step.description}
                  </p>
                </div>

                {/* Arrow between cards */}
                {index < steps.length - 1 && (
                  <div className='absolute hidden  -right-6 top-1/2 z-10 lg:flex items-center justify-center translate-x-[60%] -translate-y-1/2'>
                    <Image src={arrow} alt='arrow' />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Step;
