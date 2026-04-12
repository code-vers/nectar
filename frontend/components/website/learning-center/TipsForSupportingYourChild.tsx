import { FaBook, FaHands, FaPaintBrush, FaTrophy } from "react-icons/fa";

const TipsForSupportingYourChild = () => {
  return (
    <section className='px-8 py-10 bg-[#F5F0E8]'>
      <div className='max-w-7xl mx-auto'>
        <h2 className='text-3xl font-semibold text-gray-800 mb-5 text-center'>
          Tips for Supporting Your Child
        </h2>
        <p className='text-lg text-gray-500 mb-10 text-center'>
          Expert advice to help make learning fun and effective at home
        </p>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6'>
          {/* Create a Reading Routine Card */}
          <div className='bg-[#ECFEFF] border border-[#5EEAD4] p-6 rounded-lg shadow-md flex flex-col'>
            <div className='flex items-center space-x-4 mb-4'>
              <FaBook className='text-4xl text-[#00796B]' />
              <h3 className='text-xl font-medium text-gray-800'>
                Create a Reading Routine
              </h3>
            </div>
            <p className='text-[#9CA3AF]'>
              Set aside 15-20 minutes daily for reading together. Let your child
              choose books they enjoy.
            </p>
          </div>

          {/* Encourage Creative Expression Card */}
          <div className='bg-[#EDE9FE] border border-[#C084FC]  p-6 rounded-lg shadow-md flex flex-col'>
            <div className='flex items-center space-x-4 mb-4'>
              <FaPaintBrush className='text-4xl text-[#7B1FA2]' />
              <h3 className='text-xl font-medium text-gray-800'>
                Encourage Creative Expression
              </h3>
            </div>
            <p className='text-[#9CA3AF]'>
              Provide art supplies and let children express themselves freely
              without judgment.
            </p>
          </div>

          {/* Make Learning Hands-On Card */}
          <div className='bg-[#D1FAE5] border border-[#4ADE80]  p-6 rounded-lg shadow-md flex flex-col'>
            <div className='flex items-center space-x-4 mb-4'>
              <FaHands className='text-4xl text-[#388E3C]' />
              <h3 className='text-xl font-medium text-gray-800'>
                Make Learning Hands-On
              </h3>
            </div>
            <p className='text-[#9CA3AF]'>
              Use everyday activities as learning opportunities - cooking for
              math, nature walks for science.
            </p>
          </div>

          {/* Celebrate Small Wins Card */}
          <div className='bg-[#FEFCE8] border border-[#FDE68A]  p-6 rounded-lg shadow-md flex flex-col'>
            <div className='flex items-center space-x-4 mb-4'>
              <FaTrophy className='text-4xl text-[#F9A825]' />
              <h3 className='text-xl font-medium text-gray-800'>
                Celebrate Small Wins
              </h3>
            </div>
            <p className='text-[#9CA3AF]'>
              Use everyday activities as learning opportunities - cooking for
              math, nature walks for science.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TipsForSupportingYourChild;
