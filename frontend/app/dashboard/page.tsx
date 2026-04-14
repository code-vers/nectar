import TeastForm from "@/components/testing/TeastForm";
import TestCard from "@/components/testing/TestCard";
import TestDocument from "@/components/testing/TestDocument";

const page = () => {
  return (
    <div className='space-y-8'>
      <TeastForm />
      <TestCard />
      <TestDocument />
    </div>
  );
};

export default page;
