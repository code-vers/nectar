import Banner from '@/components/website/home/Banner';
import FeaturedCourse from '@/components/website/home/FeaturedCourse';
import HowItsFor from '@/components/website/home/HowItsFor';

export default function Home() {
  return (
    <div className="bg-main-bg min-h-screen">
      <Banner />
<HowItsFor/>
<FeaturedCourse/>
    </div>
  );
}


