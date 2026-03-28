"use client";
import React, { useState } from "react";

interface Parcel {
    trackingId: string;
    senderName: string;
    recipientCity: string;
    weight: string;
    status: "pending" | "in-transit" | "delivered" | "returned";
    createdAt: string;
}

const AllParcelsTable = ({ initialParcels }: { initialParcels: Parcel[] }) => {
    console.log(initialParcels)
    const [filter, setFilter] = useState("");

    const filteredParcels = initialParcels.filter((p) =>
        p.trackingId.toLowerCase().includes(filter.toLowerCase()) ||
        p.senderName.toLowerCase().includes(filter.toLowerCase())
    );

    const getStatusStyle = (status: string) => {
        switch (status) {
            case "delivered": return "bg-emerald-100 text-emerald-700 border-emerald-200";
            case "in-transit": return "bg-blue-100 text-blue-700 border-blue-200";
            case "returned": return "bg-rose-100 text-rose-700 border-rose-200";
            default: return "bg-amber-100 text-amber-700 border-amber-200";
        }
    };

    return (
        <div className="flex flex-col">
            {/* Search Bar & Stats Summary */}
            <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                <input
                    type="text"
                    placeholder="Search Tracking ID or Sender..."
                    className="w-full sm:max-w-md px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-sm outline-none"
                    onChange={(e) => setFilter(e.target.value)}
                />
                <div className="text-sm text-slate-500 font-medium">
                    Total Parcels: <span className="text-slate-800">{filteredParcels.length}</span>
                </div>
            </div>

            {/* Table Content */}
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50/50 text-slate-500 text-[11px] uppercase tracking-wider font-bold">
                            <th className="px-6 py-4">Tracking ID</th>
                            <th className="px-6 py-4">Sender</th>
                            <th className="px-6 py-4">Destination</th>
                            <th className="px-6 py-4">Weight</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-center">Manage</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {filteredParcels.map((parcel) => (
                            <tr key={parcel.trackingId} className="hover:bg-slate-50/80 transition-all group">
                                <td className="px-6 py-4">
                                    <span className="font-mono text-blue-600 font-semibold group-hover:underline cursor-pointer">
                                        #{parcel.trackingId}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-700 font-medium">
                                    {parcel.senderName}
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-600">
                                    {parcel.recipientCity}
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-500">
                                    {parcel.weight}kg
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-3 py-1 rounded-lg border text-[11px] font-bold uppercase tracking-tight ${getStatusStyle(parcel.status)}`}>
                                        {parcel.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <button className="text-slate-400 hover:text-blue-600 transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {filteredParcels.length === 0 && (
                    <div className="py-20 flex flex-col items-center justify-center text-slate-400 bg-white">
                        <p>No parcels match your criteria.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllParcelsTable;