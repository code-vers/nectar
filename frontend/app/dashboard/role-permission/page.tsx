import React from "react";
import { FaRegUser } from "react-icons/fa";

export default function RolePermission() {
    // Sample user data - replace with actual data fetching
    const roles = [
        {
            role: "Admin",
            permission: "Full Access",
            users: 6,
        },
        {
            role: "Vendor",
            permission: "Full Access",
            users: 4,
        },
        {
            role: "Resident",
            permission: "Full Access",
            users: 3,
        },
        {
            role: "Manager",
            permission: "Full Access",
            users: 7,
        },
        {
            role: "Owner",
            permission: "Full Access",
            users: 2,
        },
    ];

    return (
        <div className="p-6">
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
                                    Role
                                </th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                                    Permission
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
                            {roles.map((user, index) => (
                                <tr
                                    key={index}
                                    className="border-b border-gray-200 hover:bg-gray-50"
                                >
                                    <td className="flex items-center gap-2 px-4 py-3 text-sm text-gray-900 ">
                                        <FaRegUser className="text-lg" />
                                        {user.role}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-900">
                                        {user.permission}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-900">
                                        {user.users}
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                        <button className="text-gray-500 hover:text-gray-700 text-lg">
                                            ⋮
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
