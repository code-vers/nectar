import { testimonial } from '@/types/tastimonial.types';
import SectionHeading from '../typography/SectionHeading';
import Image from 'next/image';

const testimonialData: testimonial[] = [
  {
    id: '1',
    user: {
      first_name: 'Sarah',
      last_name: 'L.',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&w=100&q=80',
    },
    rating: 5,
    comment:
      'Learn how to manage rental properties, understand lease responsibilities, and improve property performance.',
  },
  {
    id: '2',
    user: {
      first_name: 'Mark',
      last_name: 'B.',
      image: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?ixlib=rb-4.0.3&w=100&q=80',
    },
    rating: 5,
    comment:
      'Quickly rolled out systems for faster onboarding and maintenance tracking. Absolutely worth it.',
  },
  {
    id: '3',
    user: {
      first_name: 'Ayesha',
      last_name: 'K.',
      image: 'https://images.unsplash.com/photo-1488722796624-0aa6f1bb6399?ixlib=rb-4.0.3&w=100&q=80',
    },
    rating: 5,
    comment:
      'The dashboard and notifications make it easy to never miss a renewal date. Game changer for our team.',
  },
];

const renderStars = (rating: number) => {
  return Array.from({ length: 5 }, (_, i) => (
    <span key={i} className={i < rating ? 'text-amber-400' : 'text-gray-300'} style={{ fontSize: '18px', lineHeight: 1 }}>
      ★
    </span>
  ));
};

const Tastimonial = () => {
  return (
    <section className='bg-[#F8FAFC] py-16'>
      <div className='mx-auto w-[95%] max-w-7xl'>
        <SectionHeading
          title='What Our Members Say'
          description='Real feedback from property owners, managers, and residents'
        />

        <div className='mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3'>
          {testimonialData.map((item) => (
            <article
              key={item.id}
              className='bg-white border border-[#E2E8F0] rounded-xl  p-6 shadow-sm '
            >
              {/* Stars Row */}
              <div className='flex items-center gap-0.5 mb-4'>
                {renderStars(item.rating)}
              </div>

              {/* Comment with opening quote */}
              <p className='text-sm text-[#334155] leading-6 mb-6'>
                <span className='text-text-primary font-semibold'>&quot;</span>
                {item.comment}
              </p>

              {/* Avatar + Name */}
              <div className='flex items-center gap-3'>
                <Image
                  src={item.user.image}
                  alt={`${item.user.first_name} ${item.user.last_name}`}
                  width={40}
                  height={40}
                  className='w-10 h-10 rounded-full object-cover border border-[#E2E8F0]'
                />
                <p className='text-sm font-semibold text-text-primary'>
                  {item.user.first_name} {item.user.last_name}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tastimonial;