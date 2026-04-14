import React from "react";
import { FaRegUser } from "react-icons/fa";
import { FaRegCopy } from "react-icons/fa6";

export default function InviteLinks() {
    // Sample user data - replace with actual data fetching
    const invitations = [
        {
            code: "NECTAR2025A",
            link: "https://nectarpro.com/invite/NECTAR2025A	",
            users: 6,
        },
        {
            code: "NECTAR2025A",
            link: "https://nectarpro.com/invite/NECTAR2025A	",
            users: 4,
        },
        {
            code: "NECTAR2025A",
            link: "https://nectarpro.com/invite/NECTAR2025A	",
            users: 3,
        },
        {
            code: "NECTAR2025A",
            link: "https://nectarpro.com/invite/NECTAR2025A	",
            users: 7,
        },
        {
            code: "NECTAR2025A",
            link: "https://nectarpro.com/invite/NECTAR2025A	",
            users: 2,
        },
    ];

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Role & link
                    </h1>
                    <p className="text-gray-600">Manage user roles and links</p>
                </div>
            </div>

            <hr className="w-full" />

            <div className="flex justify-end py-10">
                <input
                    type="text"
                    placeholder="Search users..."
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="overflow-x-auto">
                <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
                    <table className="w-full table-auto border-collapse">
                        <thead className="bg-white">
                            <tr className="border-b border-gray-200">
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                                    Code
                                </th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                                    Invite Link
                                </th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                                    Users
                                </th>
                                <th className="px-4 py-3 text-center text-sm font-medium text-gray-700">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {invitations.map((invitation, index) => (
                                <tr
                                    key={index}
                                    className="border-b border-gray-200 hover:bg-gray-50"
                                >
                                    <td className="flex items-center gap-2 px-4 py-3 text-sm text-gray-900">
                                        {invitation.code}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-900">
                                        {invitation.link}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-900">
                                        {invitation.users}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-900 flex items-center justify-center gap-2">
                                        <button className="text-gray-500 hover:text-gray-700 text-lg flex items-center gap-1">
                                            <FaRegCopy />
                                            <span>Copy Link</span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot className="bg-white">
                            <tr>
                                {/* Result Info */}
                                <td
                                    colSpan={2}
                                    className="px-4 py-3"
                                >
                                    <p className="text-sm text-gray-600">
                                        Showing{" "}
                                        <span className="font-medium">1–5</span>{" "}
                                        of{" "}
                                        <span className="font-medium">100</span>{" "}
                                        results
                                    </p>
                                </td>

                                {/* Pagination */}
                                <td
                                    colSpan={2}
                                    className="px-4 py-3"
                                >
                                    <div className="flex justify-end items-center gap-2">
                                        <button
                                            aria-label="Go to previous page"
                                            disabled
                                            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            Previous
                                        </button>

                                        <button
                                            aria-label="Go to next page"
                                            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 
                     hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed 
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            Next
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    );
}
