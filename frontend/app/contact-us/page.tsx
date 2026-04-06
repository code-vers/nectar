import AddressSection from "@/components/website/contactUs/AddressSection";
import ContactUsBanner from "@/components/website/contactUs/ContactUsBanner";
import MessageUsSection from "@/components/website/contactUs/MessageUsSection";

const page = () => {
    return (
        <>
            <ContactUsBanner/>
            <AddressSection/>
            <MessageUsSection/>
        </>
    );
};

export default page;