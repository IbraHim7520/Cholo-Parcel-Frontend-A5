"use client";
import { IGetAllMarchentData, MarchentStatus } from "@/Interfaces/interfaces";
import React, { useMemo, useState } from "react";

const AllMarchentTable = ({ initialData }: { initialData: IGetAllMarchentData[] }) => {
    const [searchTerm, setSearchTerm] = useState("");

    // ✅ FIXED: using correct field names
    const filteredData = useMemo(() => {
        return initialData.filter((merchant) =>
            merchant.ComphanyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            merchant.ComphanyEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            merchant.user?.name?.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, initialData]);

    return (
        <div className="w-full">
            {/* Search Bar */}
            <div className="p-4 border-b border-gray-100">
                <input
                    type="text"
                    placeholder="Search by name or email..."
                    className="w-full max-w-sm px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 text-gray-600 uppercase text-xs font-semibold">
                            <th className="px-6 py-4">Merchant Info</th>
                            <th className="px-6 py-4">Contact</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100">
                        {filteredData.map((merchant) => (
                            <tr key={merchant.id} className="hover:bg-gray-50 transition-colors">

                                {/* Merchant Info */}
                                <td className="px-6 py-4">
                                    <div className="font-medium text-gray-900">
                                        {merchant.ComphanyName}
                                    </div>

                                    <div className="text-xs text-gray-500">
                                        Owner: {merchant.user?.name}
                                    </div>

                                    <div className="text-xs text-gray-400">
                                        {merchant.ComphanyType}
                                    </div>
                                </td>

                                {/* Contact */}
                                <td className="px-6 py-4">
                                    <div className="text-sm text-gray-700">
                                        {merchant.ComphanyEmail}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        {merchant.ComphanyPhone}
                                    </div>
                                </td>

                                {/* Status */}
                                <td className="px-6 py-4">
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs font-medium ${merchant.status === MarchentStatus.APPROVED
                                                ? "bg-green-100 text-green-700"
                                                : merchant.status === MarchentStatus.PENDING
                                                    ? "bg-yellow-100 text-yellow-700"
                                                    : "bg-red-100 text-red-700"
                                            }`}
                                    >
                                        {merchant.status}
                                    </span>
                                </td>

                                {/* Actions */}
                                <td className="px-6 py-4 text-right">
                                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium mr-4">
                                        View
                                    </button>
                                    <button className="text-gray-400 hover:text-gray-600 text-sm">
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {filteredData.length === 0 && (
                    <div className="p-10 text-center text-gray-500 italic">
                        No merchants found matching your search.
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllMarchentTable;