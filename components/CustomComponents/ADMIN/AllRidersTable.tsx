"use client";
import { useState } from "react";
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
    Loader2
} from "lucide-react";
import { toast } from "sonner";
import { env } from "@/Config/env";

const AllRidersTable = ({ initialData }: { initialData: IGetRiderData[] }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [riders, setRiders] = useState<IGetRiderData[]>(initialData);
    const [loadingId, setLoadingId] = useState<string | null>(null);

    // Filter riders based on name, email, or delivery area
    const filteredRiders = riders.filter((rider) =>
        rider.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rider.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rider.deliveryArea.toLowerCase().includes(searchTerm.toLowerCase())
    );

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

                // Update local state to toggle availability
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
            {/* Table Header / Actions */}
            <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/50">
                <div>
                    <h2 className="text-xl font-bold text-slate-800">Fleet Management</h2>
                    <p className="text-sm text-slate-500">Manage and monitor {riders.length} active delivery partners.</p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search by name, email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-500 transition-all w-full md:w-64 text-sm"
                        />
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
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Availability</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {filteredRiders.map((rider) => (
                            <tr key={rider.id} className="hover:bg-slate-50/80 transition-colors group">
                                {/* Rider Info */}
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-full bg-slate-100 border border-slate-200 overflow-hidden flex-shrink-0">
                                            {rider.user.image ? (
                                                <img src={rider.user.image} alt={rider.user.name} className="h-full w-full object-cover" />
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

                                {/* Vehicle & Area */}
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

                                {/* Banned/Active Status */}
                                <td className="px-6 py-4">
                                    {rider.isBanned ? (
                                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-50 text-red-600 text-[10px] font-bold uppercase tracking-tight border border-red-100">
                                            <ShieldAlert size={12} /> Banned
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase tracking-tight border border-emerald-100">
                                            <ShieldCheck size={12} /> Active
                                        </span>
                                    )}
                                </td>

                                {/* Live Availability Dot */}
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <div className={`h-2 w-2 rounded-full ${rider.isAvailable ? "bg-emerald-500 animate-pulse" : "bg-slate-300"}`} />
                                        <span className={`text-xs font-medium ${rider.isAvailable ? "text-emerald-700" : "text-slate-500"}`}>
                                            {rider.isAvailable ? "Available" : "On Duty"}
                                        </span>
                                    </div>
                                </td>

                                {/* Actions Toggle */}
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button
                                            disabled={loadingId === rider.id || rider.isBanned}
                                            onClick={() => handleToggleRiderStatus(rider.id)}
                                            className={`p-2 rounded-lg transition-all flex items-center gap-1.5 text-xs font-bold disabled:opacity-50 disabled:cursor-not-allowed ${rider.isAvailable
                                                    ? "text-blue-600 hover:bg-blue-50"
                                                    : "text-amber-600 hover:bg-amber-50"
                                                }`}
                                        >
                                            {loadingId === rider.id ? (
                                                <Loader2 size={16} className="animate-spin" />
                                            ) : rider.isAvailable ? (
                                                <UserPlus size={16} />
                                            ) : (
                                                <UserMinus size={16} />
                                            )}
                                            <span className="hidden lg:inline">
                                                {rider.isAvailable ? "Assign" : "Unassign"}
                                            </span>
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

                {filteredRiders.length === 0 && (
                    <div className="p-12 text-center">
                        <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-slate-50 text-slate-400 mb-4">
                            <Search size={24} />
                        </div>
                        <p className="text-slate-600 font-medium">No riders found matching "{searchTerm}"</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllRidersTable;