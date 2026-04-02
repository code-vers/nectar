import Banner from '@/components/website/home/Banner';
import FeaturedCourse from '@/components/website/home/FeaturedCourse';
import HowItsFor from '@/components/website/home/HowItsFor';
import Tastimonial from '@/components/website/home/Tastimonial';

export default function Home() {
  return (
    <div className="bg-main-bg min-h-screen">
      <Banner />
<HowItsFor/>
<FeaturedCourse/>
<Tastimonial/>
    </div>
  );
}


