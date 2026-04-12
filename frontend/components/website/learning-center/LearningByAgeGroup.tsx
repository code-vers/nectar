// components/LearningByAgeGroup.jsx
import Image from "next/image";

const ageGroups = [
  {
    title: "Toddlers",
    age: "2-3 Years",
    description:
      "Simple activities to develop motor skills, colors, and basic concepts.",
    img: "/images/learning-center/img1.jpg",
  },
  {
    title: "Preschool",
    age: "4-5 Years",
    description:
      "Interactive lessons for letters, numbers, shapes, and creative play.",
    img: "/images/learning-center/img3.jpg",
  },
  {
    title: "Elementary",
    age: "6-10 Years",
    description:
      "Reading, writing, math, and science curriculum for early learners.",
    img: "/images/learning-center/img2.jpg",
  },
];

export default function LearningByAgeGroup() {
  return (
    <section className='py-16'>
      <div className='max-w-7xl mx-auto px-4'>
        <h2 className='text-3xl font-bold text-gray-900 mb-2'>
          Learning by Age Group
        </h2>
        <p className='text-gray-600 mb-12'>
          Age-appropriate content designed for every stage of development
        </p>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {ageGroups.map((group) => (
            <div
              key={group.title}
              className='bg-white border border-[#DCE3EA] rounded-lg shadow-md overflow-hidden flex flex-col p-5'>
              <div className='w-full h-56 relative mb-4'>
                <Image
                  src={group.img}
                  alt={group.title}
                  fill
                  className='object-cover rounded-[12px]'
                />
              </div>
              <div>
                <div className='flex justify-between'>
                  <h3 className='text-xl text-gray-900 mb-1'>{group.title}</h3>
                  <p className='text-[12px] flex justify-center text-[#1B2A4A] items-center font-semibold px-[10px] py-[8px] rounded-[7px] h-[25px] bg-[#FFE4BE] mb-2 block'>
                    {group.age}
                  </p>
                </div>

                <p className='text-[#666666] my-4'>{group.description}</p>
                <button className='bg-primary w-full p-[6px] rounded-[4px] text-white font-bold'>
                  Explore Resources
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
