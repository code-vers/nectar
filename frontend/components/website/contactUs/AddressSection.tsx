import { FaRegEnvelope } from "react-icons/fa6";
import { GoPeople } from "react-icons/go";
import { LuMapPin } from "react-icons/lu";

const AddressSection = () => {
  return (
    <section className='max-w-360 mx-auto px-5 sm:px-8 lg:px-10 py-10 lg:py-20 flex flex-col xl:flex-row justify-between gap-5'>
      <div className='w-full xl:w-auto flex items-center shadow-lg shadow-card-border lg:px-6 lg:py-3 gap-6 rounded-lg p-4 lg:pr-20'>
        <div className='bg-primary p-4 rounded-full'>
          <GoPeople className='text-2xl text-primary-btn-text' />
        </div>
        <div className='w-50.75'>
          <h1 className='title'>Our Phone</h1>
          <p className='title-subtitle text-secondary-color'>(316) 555-0116</p>
        </div>
      </div>
      <div className='w-full xl:w-auto flex items-center shadow-lg shadow-card-border lg:px-6 lg:py-3 gap-6 rounded-lg p-4 lg:pr-20'>
        <div className='bg-primary p-4 rounded-full'>
          <FaRegEnvelope className='text-2xl text-primary-btn-text' />
        </div>
        <div className='w-50.75'>
          <h1 className='title'>Our Email</h1>
          <p className='title-subtitle text-secondary-color'>
            bill.sanders@example.com
          </p>
        </div>
      </div>
      <div className='w-full xl:w-auto flex items-center shadow-lg shadow-card-border lg:px-6 lg:py-3 gap-6 rounded-lg p-4 lg:pr-20'>
        <div className='bg-primary p-4 rounded-full'>
          <LuMapPin className='text-2xl text-primary-btn-text' />
        </div>
        <div className='w-50.75'>
          <h1 className='title'>Our Address</h1>
          <p className='title-subtitle text-secondary-color'>
            6391 Elgin St. Celina, Delaware 10299
          </p>
        </div>
      </div>
    </section>
  );
};

export default AddressSection;
