"use client";
import { IGetParcelData } from "@/Interfaces/parcel.interface";
import { PercelStatus } from "@/Interfaces/interfaces";
import { useState, useMemo } from "react";
import { toast } from "sonner";

const MerchantParcelTable = ({ initialParcels }: { initialParcels: IGetParcelData[] }) => {
    const [searchTerm, setSearchTerm] = useState("");

    // Optimized search: Filters the list whenever searchTerm changes
    const filteredParcels = useMemo(() => {
        return initialParcels.filter((parcel) =>
            parcel.id.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, initialParcels]);

    const copyTrackingId = (id: string) => {
        navigator.clipboard.writeText(id);
        toast.success("Tracking ID copied!");
    };

    return (
        <div className="flex flex-col">
            {/* Search Bar Section */}
            <div className="p-4 border-b border-slate-100 bg-white">
                <div className="relative max-w-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        placeholder="Search by Tracking ID..."
                        className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-200">
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Tracking ID</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Recipient</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Charges</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {filteredParcels.map((parcel) => (
                            <tr key={parcel.id} className="hover:bg-slate-50/50 transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <span className="font-mono text-sm font-medium text-blue-600">
                                            #{parcel.id.slice(-8).toUpperCase()}
                                        </span>
                                        <button
                                            onClick={() => copyTrackingId(parcel.id)}
                                            className="opacity-0 group-hover:opacity-100 p-1 hover:bg-slate-200 rounded transition-all"
                                            title="Copy Full ID"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                                            </svg>
                                        </button>
                                    </div>
                                </td>

                                <td className="px-6 py-4">
                                    <p className="text-sm font-semibold text-slate-800">{parcel.reciverName}</p>
                                    <p className="text-xs text-slate-500">{parcel.reciverContact}</p>
                                </td>

                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${parcel.status === PercelStatus.DELIVERED ? "bg-emerald-100 text-emerald-700" :
                                            parcel.status === "CANCELLED" ? "bg-rose-100 text-rose-700" :
                                                "bg-blue-100 text-blue-700"
                                        }`}>
                                        {parcel.status.replace("_", " ")}
                                    </span>
                                </td>

                                <td className="px-6 py-4">
                                    <p className="text-sm font-bold text-slate-800">৳{parcel.price}</p>
                                    <p className="text-[10px] text-slate-400">COD: {parcel.price}</p>
                                </td>

                                <td className="px-6 py-4 text-right">
                                    <button className="text-xs font-semibold text-blue-600 hover:bg-blue-50 px-3 py-1 rounded-md transition-colors">
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {filteredParcels.length === 0 && (
                    <div className="p-12 text-center">
                        <p className="text-slate-400 italic text-sm">
                            {searchTerm ? `No parcels found matching "${searchTerm}"` : "No parcels available."}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MerchantParcelTable;