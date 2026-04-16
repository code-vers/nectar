import { LuFacebook, LuInstagram, LuLinkedin, LuTwitter } from "react-icons/lu";
import PrimaryButton from "../typography/PrimaryButton";

const MessageUsSection = () => {
    return (
        <section className="max-w-360 mx-auto px-5 sm:px-8 lg:px-10 py-10 lg:py-20 flex flex-col xl:flex-row gap-10 lg:gap-20">
            <div className="flex flex-col gap-7">
                <div className="flex flex-col gap-4 lg:gap-6">
                    <h1 className="text-5xl lg:text-[64px] font-bold">
                        Write Us a Message
                    </h1>
                    <p className="text-xl text-secondary-color">
                        Everything you need to succeed in property management
                        and everyday life is available in one place.
                    </p>
                </div>
                <div className="flex gap-3">
                    <div className="text-secondary-color border border-card-border rounded-full p-2.5 text-2xl">
                        <LuFacebook className="" />
                    </div>
                    <div className="text-secondary-color border border-card-border rounded-full p-2.5 text-2xl">
                        <LuTwitter />
                    </div>
                    <div className="text-secondary-color border border-card-border rounded-full p-2.5 text-2xl">
                        <LuInstagram />
                    </div>
                    <div className="text-secondary-color border border-card-border rounded-full p-2.5 text-2xl">
                        <LuLinkedin />
                    </div>
                </div>
            </div>
            <div className="w-full flex flex-col gap-6">
                <div className="flex flex-col gap-5">
                    <div className="flex flex-col xl:flex-row gap-5">
                        <input
                            className="w-full border border-secondary-color p-2 lg:pl-6 lg:py-3 rounded-sm"
                            type="text"
                            name="firstname"
                            id=""
                            placeholder="First Name"
                        />
                        <input
                            className="w-full border border-secondary-color p-2 lg:pl-6 lg:py-3 rounded-sm"
                            type="text"
                            name="lastname"
                            id=""
                            placeholder="Last Name"
                        />
                    </div>
                    <div className="flex gap-5 flex-col xl:flex-row">
                        <input
                            className="w-full border border-secondary-color p-2 lg:pl-6 lg:py-3 rounded-sm"
                            type="text"
                            name="firstname"
                            id=""
                            placeholder="Email"
                        />
                        <input
                            className="w-full border border-secondary-color p-2 lg:pl-6 lg:py-3 rounded-sm"
                            type="text"
                            name="lastname"
                            id=""
                            placeholder="Subject"
                        />
                    </div>
                    <textarea
                        className="w-full border border-secondary-color p-2 lg:pl-6 lg:pt-3 lg:pb-40 rounded-sm resize-none"
                        name="message"
                        id=""
                        placeholder="Message"
                    ></textarea>
                </div>
                <div>
                    <PrimaryButton className="w-full lg:w-52">{"Submit"}</PrimaryButton>
                </div>
            </div>
        </section>
    );
};

export default MessageUsSection;
