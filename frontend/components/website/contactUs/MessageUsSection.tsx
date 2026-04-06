import { LuFacebook, LuInstagram, LuLinkedin, LuTwitter } from "react-icons/lu";

const MessageUsSection = () => {
    return (
        <section className="flex px-20 py-24 gap-40">
            <div className="flex flex-col gap-7">
                <div>
                    <h1 className="text-[64px] font-bold">
                        Write Us a Message
                    </h1>
                    <p className="text-xl text-secondary-color">
                        Everything you need to succeed in property management
                        and everyday life is available in one place.
                    </p>
                </div>
                <div className="flex gap-3">
                    <div className="text-secondary-color border border-card-border rounded-full p-2.5 text-2xl">
                        <LuFacebook className=""/>
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
            <div>
                <div className="flex flex-col gap-5">
                    <div className="flex gap-5">
                        <input
                            className="border border-secondary-color pl-6 pr-91.5 py-3 rounded-sm"
                            type="text"
                            name="firstname"
                            id=""
                            placeholder="First Name"
                        />
                        <input
                            className="border border-secondary-color pl-6 pr-91.5 py-3 rounded-sm"
                            type="text"
                            name="lastname"
                            id=""
                            placeholder="Last Name"
                        />
                    </div>
                    <div className="flex gap-5">
                        <input
                            className="border border-secondary-color pl-6 pr-91.5 py-3 rounded-sm"
                            type="text"
                            name="firstname"
                            id=""
                            placeholder="Email"
                        />
                        <input
                            className="border border-secondary-color pl-6 pr-91.5 py-3 rounded-sm"
                            type="text"
                            name="lastname"
                            id=""
                            placeholder="Subject"
                        />
                    </div>
                    <textarea
                        className="border border-secondary-color pl-6 pr-91.5 pt-3 pb-40 rounded-sm"
                        name="message"
                        id=""
                        placeholder="Message"
                    ></textarea>
                </div>
            </div>
        </section>
    );
};

export default MessageUsSection;
