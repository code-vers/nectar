import { subscription_plan } from "@/types/subscription.plan";
import SectionHeading from "../typography/SectionHeading";
import PrimaryButton from "../typography/PrimaryButton";

const subscriptionPlans: subscription_plan[] = [
  {
    id: "1",
    title: "Owner / Landlord Membership",
    description: "Perfect for property owners managing rentals",
    monthly_price: 30,
    annual_price: 300,
    features: [
      "Owner Education Center",
      "Downloads Library",
      "Ability to Invite residents",
      "Workbooks and guides",
      "Mobile App access",
    ],
  },
  {
    id: "2",
    title: "Property Manager Membership",
    description: "Professional training for property managers",
    monthly_price: 30,
    annual_price: 300,
    features: [
      "All Professional Courses",
      "Advanced training modules",
      "Downloads Library",
      "Team collaboration tools",
      "Priority support",
      "Certification programs",
    ],
  },
  {
    id: "3",
    title: "Resident Upgrade",
    description: "Life skills and financial education",
    monthly_price: 30,
    annual_price: 300,
    features: [
      "Resident Success Academy",
      "Children's Learning Center",
      "Financial literacy courses",
      "Life skills training",
      "Downloadable resources",
    ],
  },
];

const CheckIcon = () => (
  <svg
    className='w-4 h-4 text-green shrink-0 mt-0.5'
    viewBox='0 0 16 16'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M3 8L6.5 11.5L13 5'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

const Subscription = () => {
  return (
    <section className='bg-white py-16 md:px-25 px-5'>
      <div className='mx-auto md:w-[95%] max-w-7xl'>
        <SectionHeading
          title='Choose Your Membership'
          description='Select the plan that fits your needs and start learning today'
        />

        <div className='mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 overflow-hidden'>
          {subscriptionPlans.map((plan, index) => (
            <div
              key={plan.id}
              className={`flex border border-stroke rounded-xl ${index === 1 ? "bg-[#EFF9E4]" : ""} flex-col p-8 ${
                index !== subscriptionPlans.length - 1 ? " " : ""
              }`}>
              {/* Title & Description */}
              <div className='mb-6 text-center'>
                <h3 className='text-primary font-semibold text-[17px] leading-snug mb-1'>
                  {plan.title}
                </h3>
                <p className='text-placeholder text-center text-[13px] leading-5'>
                  {plan.description}
                </p>
              </div>

              {/* Price */}
              <div className='mb-6 text-center'>
                <span className='text-primary text-[32px] font-bold leading-none'>
                  ${plan.monthly_price}
                </span>
                <span className='text-placeholder text-sm ml-1'>per month</span>
              </div>

              {/* CTA Button */}
              <PrimaryButton>Get The Plan</PrimaryButton>

              {/* Divider */}
              <div className='border-t border-[#E2E8F0] mb-6' />

              {/* Features */}
              <ul className='flex flex-col gap-3'>
                {plan.features.map((feature, i) => (
                  <li key={i} className='flex items-start gap-2.5'>
                    <CheckIcon />
                    <span className='text-primary text-sm leading-5'>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Subscription;
