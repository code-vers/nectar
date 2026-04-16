import { FaRegUser } from "react-icons/fa";

export default function AllUsers() {
    // Sample user data - replace with actual data fetching
    const users = [
        {
            name: "John Doe",
            email: "john@example.com",
            role: "Admin",
            status: "Active",
        },
        {
            name: "Jane Smith",
            email: "jane@example.com",
            role: "User",
            status: "Active",
        },
        {
            name: "Bob Johnson",
            email: "bob@example.com",
            role: "Moderator",
            status: "Inactive",
        },
        {
            name: "Alice Brown",
            email: "alice@example.com",
            role: "User",
            status: "Active",
        },
        {
            name: "Charlie Wilson",
            email: "charlie@example.com",
            role: "Admin",
            status: "Active",
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
                                    Name
                                </th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                                    Email
                                </th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                                    Role
                                </th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                                    Status
                                </th>
                                <th className="px-4 py-3 text-center text-sm font-medium text-gray-700">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {users.map((user, index) => (
                                <tr
                                    key={index}
                                    className="border-b border-gray-200 hover:bg-gray-50"
                                >
                                    <td className="flex items-center gap-2 px-4 py-3 text-sm text-gray-900 ">
                                        <FaRegUser className="text-lg" />
                                        {user.name}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-900">
                                        {user.email}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-900">
                                        {user.role}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-900">
                                        <span
                                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                user.status === "Active"
                                                    ? "bg-green-100 text-green-800"
                                                    : "bg-red-100 text-red-800"
                                            }`}
                                        >
                                            {user.status}
                                        </span>
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
                                    colSpan={3}
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
