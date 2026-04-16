import NewsLatter from "@/components/website/center/NewsLatter";
import AddressSection from "@/components/website/contactUs/AddressSection";
import ContactFAQ from "@/components/website/contactUs/ContactFAQ";
import ContactUsBanner from "@/components/website/contactUs/ContactUsBanner";
import EmailSupport from "@/components/website/contactUs/EmailSupport";
import MessageUsSection from "@/components/website/contactUs/MessageUsSection";

const page = () => {
  return (
    <>
      <ContactUsBanner />
      <AddressSection />
      <MessageUsSection />
      <EmailSupport />
      <ContactFAQ />
      <NewsLatter />
    </>
  );
};

export default page;
