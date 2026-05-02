import React from "react";
import ProgressBar from "../../common/ProgressBar";

const ContinueLearning = () => {
    return (
        <div className="p-0">
            <div className="flex flex-col md:flex-row justify-between items-center">
                <h2 className="text-2xl font-bold mb-4">Continue Learning</h2>
                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="Search courses..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Card 1 */}
                <div className="relative bg-white rounded-lg shadow-md overflow-hidden p-6">
                    <div className="relative">
                        <img
                            src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&h=220&fit=crop" // Replace with actual image path
                            alt="Course 1"
                            className="w-full h-96 object-cover rounded-xl"
                        />
                        <div className="absolute top-6 left-6 bg-white text-gray-600 px-6 py-3 rounded-full text-2xl border border-gray-500">
                            40% Done
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 py-8">
                        <p>Property Management Foundations</p>
                        <ProgressBar
                            value={40}
                            showLabel={true}
                        />
                    </div>
                    <div className="py-4">
                        <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200">
                            Continue Learning
                        </button>
                    </div>
                </div>
                {/* Card 2 */}
                <div className="relative bg-white rounded-lg shadow-md overflow-hidden p-6">
                    <div className="relative">
                        <img
                            src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&h=220&fit=crop" // Replace with actual image path
                            alt="Course 1"
                            className="w-full h-96 object-cover rounded-xl"
                        />
                        <div className="absolute top-6 left-6 bg-white text-gray-600 px-6 py-3 rounded-full text-2xl border border-gray-500">
                            40% Done
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 py-8">
                        <p>Property Management Foundations</p>
                        <ProgressBar
                            value={40}
                            showLabel={true}
                        />
                    </div>
                    <div className="py-4">
                        <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200">
                            Continue Learning
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContinueLearning;
