import React from "react";
import { FiBookOpen, FiFileText, FiPlayCircle, FiTarget } from "react-icons/fi";
import { FiChevronRight } from "react-icons/fi";
import Image from "next/image";

const ChildrensLearningCenter: React.FC = () => {
    return (
        <div
            className="flex items-center p-8 rounded-lg mt-16"
            style={{ backgroundColor: "rgba(212, 160, 23, 0.15)" }}
        >
            {/* left Section: Content */}
            <div className="flex-1 ml-8">
                <h2 className="text-2xl font-bold mb-2">
                    Children&apos;s Learning Center
                </h2>
                <p className="text-gray-600 mb-6">
                    Discover a world of fun and education for your children with
                    our comprehensive learning programs.
                </p>

                {/* Features */}
                <div className="grid grid-cols-1 md:grid-cols-2 space-y-4 mb-6">
                    <div className="flex items-center">
                        <FiBookOpen
                            className="text-yellow-600 mr-3"
                            size={24}
                        />
                        <span>Interactive Books</span>
                    </div>
                    <div className="flex items-center">
                        <FiFileText
                            className="text-yellow-600 mr-3"
                            size={24}
                        />
                        <span>Workbooks</span>
                    </div>
                    <div className="flex items-center">
                        <FiPlayCircle
                            className="text-yellow-600 mr-3"
                            size={24}
                        />
                        <span>Activities</span>
                    </div>
                    <div className="flex items-center">
                        <FiTarget
                            className="text-yellow-600 mr-3"
                            size={24}
                        />
                        <span>Games</span>
                    </div>
                </div>

                {/* Button */}
                <button className="bg-primary text-white px-6 py-3 rounded-lg flex items-center hover:bg-yellow-700 transition-colors">
                    Start Membership
                    <FiChevronRight
                        className="ml-2"
                        size={20}
                    />
                </button>
            </div>

            {/* right Section: Image */}
            <div className="flex-1">
                <Image
                    src="/images/learning-center/img1.jpg"
                    alt="Children's Learning Center"
                    width={850}
                    height={655}
                    className="rounded-lg"
                />
            </div>
        </div>
    );
};

export default ChildrensLearningCenter;
