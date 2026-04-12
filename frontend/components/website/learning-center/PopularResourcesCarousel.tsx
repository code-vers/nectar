// PopularResourcesCarousel.tsx
"use client";

import Image from "next/image";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

const resources = [
  {
    title: "Interactive Science Adventures",
    time: "30 min",
    activities: 8,
    rating: 4.9,
    category: "Science",
    img: "/images/science.jpg",
  },
  {
    title: "Story Time Favorites",
    time: "30 min",
    activities: 8,
    rating: 4.9,
    category: "Reading",
    img: "/images/storytime.jpg",
  },
  {
    title: "Math Fun Zone",
    time: "30 min",
    activities: 8,
    rating: 4.9,
    category: "Math",
    img: "/images/math.jpg",
  },
  {
    title: "Creative Arts Workshop",
    time: "30 min",
    activities: 8,
    rating: 4.9,
    category: "Art",
    img: "/images/arts.jpg",
  },
  {
    title: "Interactive World Adventures",
    time: "30 min",
    activities: 8,
    rating: 4.9,
    category: "All",
    img: "/images/world.jpg",
  },
];

export default function PopularResourcesCarousel() {
  return (
    <section className='py-16 bg-gray-50'>
      <div className='max-w-7xl mx-auto px-4'>
        <h2 className='text-3xl font-bold text-gray-900 mb-2'>
          Most Popular Resources
        </h2>
        <p className='text-gray-600 mb-8'>
          Top-rated activities loved by kids and parents
        </p>

        <Swiper
          spaceBetween={20}
          slidesPerView={1.1}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20 },
            768: { slidesPerView: 3, spaceBetween: 20 },
            1024: { slidesPerView: 4, spaceBetween: 20 },
          }}>
          {resources.map((resource, idx) => (
            <SwiperSlide key={idx}>
              <div className='bg-white rounded-lg shadow-md overflow-hidden'>
                <div className='relative w-full h-48'>
                  <Image
                    src={resource.img}
                    alt={resource.title}
                    fill
                    className='object-cover'
                  />
                  <span className='absolute top-3 left-3 bg-green-100 text-green-800 text-xs px-2 py-1 rounded'>
                    {resource.category}
                  </span>
                  <span className='absolute top-3 right-3 bg-white px-2 py-1 rounded flex items-center text-sm font-medium shadow'>
                    ⭐ {resource.rating}
                  </span>
                </div>
                <div className='p-4'>
                  <h3 className='font-semibold text-gray-900 mb-1'>
                    {resource.title}
                  </h3>
                  <div className='flex items-center text-gray-500 text-sm mb-4 gap-4'>
                    <span>{resource.time}</span>
                    <span>{resource.activities} activities</span>
                  </div>
                  <button className='w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition'>
                    Start Courses
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
