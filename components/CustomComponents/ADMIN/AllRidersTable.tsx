"use client";
import { useState, useMemo } from "react";
import { IGetRiderData } from "@/Interfaces/rider.interface";
import {
    Search,
    UserPlus,
    UserMinus,
    MoreVertical,
    ShieldCheck,
    ShieldAlert,
    Truck,
    MapPin,
    Loader2,
    X
} from "lucide-react";
import { toast } from "sonner";
import { env } from "@/Config/env";

const AllRidersTable = ({ initialData }: { initialData: IGetRiderData[] }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [riders, setRiders] = useState<IGetRiderData[]>(initialData);
    const [loadingId, setLoadingId] = useState<string | null>(null);

    // Optimized Search: Filters by Name, Email, Area, or Vehicle Number
    const filteredRiders = useMemo(() => {
        return riders.filter((rider) => {
            const searchStr = searchTerm.toLowerCase();
            return (
                rider.user.name.toLowerCase().includes(searchStr) ||
                rider.user.email.toLowerCase().includes(searchStr) ||
                rider.deliveryArea.toLowerCase().includes(searchStr) ||
                rider.vehicleNumber.toLowerCase().includes(searchStr)
            );
        });
    }, [searchTerm, riders]);

    const handleToggleRiderStatus = async (riderId: string) => {
        setLoadingId(riderId);
        try {
            const res = await fetch(`${env.BACKEND_URL}/admins/assign/${riderId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
            });
            const data = await res.json();

            if (data.success) {
                toast.success(data.message || "Status updated successfully!");
                setRiders((prev) =>
                    prev.map((r) =>
                        r.id === riderId ? { ...r, isAvailable: !r.isAvailable } : r
                    )
                );
            } else {
                toast.error(data.message || "Action failed");
            }
        } catch (error) {
            toast.error("Network error. Please try again.");
        } finally {
            setLoadingId(null);
        }
    };

    return (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            {/* Table Header & Search Bar */}
            <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/50">
                <div>
                    <h2 className="text-xl font-bold text-slate-800">Fleet Management</h2>
                    <p className="text-sm text-slate-500">
                        Displaying {filteredRiders.length} of {riders.length} riders
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                        <input
                            type="text"
                            placeholder="Search name, email, area..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-10 py-2.5 bg-white border border-slate-200 rounded-xl outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-500 transition-all w-full md:w-72 text-sm shadow-sm"
                        />
                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm("")}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                            >
                                <X size={16} />
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Table Body */}
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50/50">
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Rider Details</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Vehicle & Area</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {filteredRiders.map((rider) => (
                            <tr key={rider.id} className="hover:bg-slate-50/80 transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-full bg-slate-100 border border-slate-200 overflow-hidden flex-shrink-0">
                                            {rider.user.image ? (
                                                <img src={rider.user.image} alt="" className="h-full w-full object-cover" />
                                            ) : (
                                                <div className="h-full w-full flex items-center justify-center text-slate-400 font-bold">
                                                    {rider.user.name.charAt(0)}
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-700 text-sm">{rider.user.name}</p>
                                            <p className="text-xs text-slate-500">{rider.user.email}</p>
                                        </div>
                                    </div>
                                </td>

                                <td className="px-6 py-4">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-1.5 text-xs text-slate-600">
                                            <Truck size={14} className="text-blue-500" />
                                            <span className="font-medium capitalize">{rider.vehicleType.toLowerCase()}</span>
                                            <span className="text-slate-300">|</span>
                                            <span>{rider.vehicleNumber}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-xs text-slate-500">
                                            <MapPin size={14} />
                                            <span>{rider.deliveryArea}</span>
                                        </div>
                                    </div>
                                </td>

                                <td className="px-6 py-4">
                                    <div className="flex flex-col gap-1.5">
                                        {rider.isBanned ? (
                                            <span className="w-fit inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-50 text-red-600 text-[10px] font-bold uppercase tracking-tight border border-red-100">
                                                <ShieldAlert size={12} /> Banned
                                            </span>
                                        ) : (
                                            <span className="w-fit inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase tracking-tight border border-emerald-100">
                                                <ShieldCheck size={12} /> Active
                                            </span>
                                        )}
                                        <div className="flex items-center gap-1.5 ml-1">
                                            <div className={`h-1.5 w-1.5 rounded-full ${rider.isAvailable ? "bg-emerald-500" : "bg-slate-300"}`} />
                                            <span className="text-[10px] font-medium text-slate-500">
                                                {rider.isAvailable ? "Available" : "On Duty"}
                                            </span>
                                        </div>
                                    </div>
                                </td>

                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button
                                            disabled={loadingId === rider.id || rider.isBanned}
                                            onClick={() => handleToggleRiderStatus(rider.id)}
                                            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 text-xs font-bold disabled:opacity-50 ${rider.isAvailable
                                                    ? "text-blue-600 hover:bg-blue-50"
                                                    : "text-amber-600 hover:bg-amber-50"
                                                }`}
                                        >
                                            {loadingId === rider.id ? (
                                                <Loader2 size={14} className="animate-spin" />
                                            ) : rider.isAvailable ? (
                                                <UserPlus size={14} />
                                            ) : (
                                                <UserMinus size={14} />
                                            )}
                                            <span>{rider.isAvailable ? "Assign" : "Unassign"}</span>
                                        </button>
                                        <button className="p-2 text-slate-400 hover:bg-slate-100 rounded-lg transition-all">
                                            <MoreVertical size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Empty State */}
                {filteredRiders.length === 0 && (
                    <div className="p-20 text-center">
                        <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-50 text-slate-300 mb-4">
                            <Search size={32} />
                        </div>
                        <h3 className="text-slate-800 font-bold">No results found</h3>
                        <p className="text-slate-500 text-sm max-w-xs mx-auto mt-1">
                            We couldn't find any rider matching <span className="font-semibold text-slate-700">"{searchTerm}"</span>
                        </p>
                        <button
                            onClick={() => setSearchTerm("")}
                            className="mt-4 text-sm font-bold text-blue-600 hover:underline"
                        >
                            Clear search filter
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllRidersTable;