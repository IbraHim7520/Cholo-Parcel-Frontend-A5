"use client";
import { IGetParcelData } from "@/Interfaces/parcel.interface";
import { PercelStatus } from "@/Interfaces/interfaces";
import { useState, useMemo, useEffect } from "react";
import { toast } from "sonner";
import { env } from "@/Config/env";
import { Search, Copy, Eye, Package, Loader2, XCircle } from "lucide-react";

const MerchantParcelTable = ({ initialParcels = [] }: { initialParcels?: IGetParcelData[] }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [parcels, setParcels] = useState<IGetParcelData[]>(initialParcels);
    const [isLoading, setIsLoading] = useState(false);

    // API to fetch parcels
    const fetchAllParcels = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(`${env.BACKEND_URL}/parcels/marchent-parcel`, {
                method: "GET",
                credentials: "include",
            });
            const data = await res.json();

            if (data.success) {
                setParcels(data.data);
            } else {
                toast.error(data.message || "Failed to load parcels");
            }
        } catch (error) {
            console.error("Fetch error:", error);
            toast.error("Network error. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    // Load data on mount if initialParcels is empty
    useEffect(() => {
        if (initialParcels.length === 0) {
            fetchAllParcels();
        }
    }, []);

    // Optimized Search Filter
    const filteredParcels = useMemo(() => {
        return parcels.filter((parcel) =>
            parcel.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            parcel.reciverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            parcel.reciverContact.includes(searchTerm)
        );
    }, [searchTerm, parcels]);

    const copyTrackingId = (id: string) => {
        navigator.clipboard.writeText(id);
        toast.success("Tracking ID copied to clipboard!");
    };

    // Helper for Status Styles
    const getStatusStyle = (status: PercelStatus) => {
        switch (status) {
            case PercelStatus.DELIVERED: return "bg-emerald-100 text-emerald-700";
            case PercelStatus.CANCELLED: return "bg-rose-100 text-rose-700";
            case PercelStatus.IN_TRANSIT: return "bg-amber-100 text-amber-700";
            default: return "bg-blue-100 text-blue-700";
        }
    };

    return (
        <div className="flex flex-col bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            {/* Search Bar Section */}
            <div className="p-4 border-b border-slate-100 flex items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search by Tracking ID, Name or Contact..."
                        className="block w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    {searchTerm && (
                        <button
                            onClick={() => setSearchTerm("")}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                        >
                            <XCircle className="h-4 w-4" />
                        </button>
                    )}
                </div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest hidden sm:block">
                    Total: {filteredParcels.length}
                </div>
            </div>

            {/* Table Area */}
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50/50 border-b border-slate-100">
                            <th className="px-6 py-4 text-[11px] font-black text-slate-500 uppercase tracking-widest">Parcel Info</th>
                            <th className="px-6 py-4 text-[11px] font-black text-slate-500 uppercase tracking-widest">Recipient</th>
                            <th className="px-6 py-4 text-[11px] font-black text-slate-500 uppercase tracking-widest">Status</th>
                            <th className="px-6 py-4 text-[11px] font-black text-slate-500 uppercase tracking-widest">Amount</th>
                            <th className="px-6 py-4 text-[11px] font-black text-slate-500 uppercase tracking-widest text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {isLoading ? (
                            <tr>
                                <td colSpan={5} className="py-20">
                                    <div className="flex flex-col items-center justify-center text-slate-400">
                                        <Loader2 className="h-8 w-8 animate-spin text-blue-500 mb-2" />
                                        <p className="text-sm font-medium">Fetching parcels...</p>
                                    </div>
                                </td>
                            </tr>
                        ) : filteredParcels.map((parcel) => (
                            <tr key={parcel.id} className="hover:bg-slate-50/50 transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                                            <Package size={18} />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span className="font-mono text-sm font-bold text-slate-700">
                                                    #{parcel.id.slice(-8).toUpperCase()}
                                                </span>
                                                <button
                                                    onClick={() => copyTrackingId(parcel.id)}
                                                    className="opacity-0 group-hover:opacity-100 p-1 hover:bg-slate-200 rounded text-slate-400 transition-all"
                                                    title="Copy Tracking ID"
                                                >
                                                    <Copy size={12} />
                                                </button>
                                            </div>
                                            <p className="text-[10px] text-slate-400 font-medium uppercase mt-0.5">{parcel.percelType}</p>
                                        </div>
                                    </div>
                                </td>

                                <td className="px-6 py-4">
                                    <p className="text-sm font-bold text-slate-800">{parcel.reciverName}</p>
                                    <p className="text-xs text-slate-500">{parcel.reciverContact}</p>
                                </td>

                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${getStatusStyle(parcel.status)}`}>
                                        {parcel.status.replace("_", " ")}
                                    </span>
                                </td>

                                <td className="px-6 py-4">
                                    <p className="text-sm font-black text-slate-800">৳{parcel.price}</p>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase">Deliv: ৳{parcel.deliveryPrice}</p>
                                </td>

                                <td className="px-6 py-4 text-right">
                                    <button className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-xl transition-all border border-transparent hover:border-blue-100">
                                        <Eye size={14} /> View
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Empty State */}
                {!isLoading && filteredParcels.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
                        <div className="bg-slate-50 p-6 rounded-3xl mb-4 text-slate-300">
                            <Package size={48} strokeWidth={1.5} />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900">
                            {searchTerm ? "No matching parcels" : "No parcel found"}
                        </h3>
                        <p className="text-slate-500 text-sm mt-1 max-w-xs mx-auto">
                            {searchTerm
                                ? `We couldn't find anything matching "${searchTerm}". Try a different ID or name.`
                                : "Your shipment list is empty. Create your first parcel to see it here."}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MerchantParcelTable;