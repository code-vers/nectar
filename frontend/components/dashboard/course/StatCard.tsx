import React from "react";

const StatCard = ({ icon, value, title }) => {
    return (
        <div className="flex flex-col gap-4 bg-white p-5 rounded-lg shadow-md">
            <div className="bg-[#F0D080] p-2 rounded-sm w-10 h-10 flex items-center justify-center text-white text-2xl">
                {icon}
            </div>
            <div>
                <div className="text-4xl font-bold">{value}</div>
                <div className="text-sm">{title}</div>
            </div>
        </div>
    );
};

export default StatCard;
