import Image from "next/image";
import emailImg from "../../../public/images/contact/email-support.png";
import { FaRegEnvelope } from "react-icons/fa";
import PrimaryButton from "../typography/PrimaryButton";

const EmailSupport = () => {
    return (
        <section className="flex flex-col lg:flex-row p-4 xl:px-20 xl:py-24 justify-center items-center gap-16">
            <div>
                <Image
                    src={emailImg}
                    alt="email support image"
                />
            </div>
            <div className="flex flex-col gap-6 items-center lg:items-start justify-between">
                <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                        <FaRegEnvelope className="text-base text-3xl" />
                        <h3 className="title">Email Support</h3>
                    </div>
                    <p className="text-lg text-secondary-color">
                        bill.sanders@example.com
                    </p>
                </div>
                <p className="lg:title text-secondary-color mr-10">
                    If ou prefer, you can email our support team <br /> directly
                    and we will respond as soon as <br /> possible.
                </p>

                <PrimaryButton className="w-full">{"Send Email"}</PrimaryButton>
            </div>
        </section>
    );
};

export default EmailSupport;
