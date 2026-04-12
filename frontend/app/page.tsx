import Banner from "@/components/website/home/Banner";
import Faq from "@/components/website/home/Faq";
import FeaturedCourse from "@/components/website/home/FeaturedCourse";
import HowItsFor from "@/components/website/home/HowItsFor";
import Subscription from "@/components/website/home/Subscription";
import Tastimonial from "@/components/website/home/Tastimonial";

export default function Home() {
    return (
        <div className="bg-main-bg min-h-screen">
            <Banner />
            <HowItsFor />
            <FeaturedCourse />
            <Tastimonial />
            <Subscription />
            <Faq />
        </div>
    );
}
