import AddressSection from "@/components/website/contactUs/AddressSection";
import ContactUsBanner from "@/components/website/contactUs/ContactUsBanner";
import EmailSupport from "@/components/website/contactUs/EmailSupport";
import MessageUsSection from "@/components/website/contactUs/MessageUsSection";

const page = () => {
    return (
        <>
            <ContactUsBanner/>
            <AddressSection/>
            <MessageUsSection/>
            <EmailSupport/>
        </>
    );
};

export default page;