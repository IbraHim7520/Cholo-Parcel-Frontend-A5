"use client";

import { env } from "@/Config/env";
import { IMerchentGetOwnPercels } from "@/Interfaces/merchent.interface";
import { useUser } from "@/utils/useUser";
import { useEffect, useState, useMemo } from "react";
import {
    Package,
    Trash2,
    RefreshCcw,
    MapPin,
    ChevronRight,
    Loader2,
    Phone,
    Search,
    X,
} from "lucide-react";
import { toast } from "sonner";
import { PercelStatus } from "@/Interfaces/interfaces";

const AllParcelPage = () => {
    const { user } = useUser();
    const [percelsData, setPercelsData] = useState<IMerchentGetOwnPercels[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchPercelData = async () => {
        if (!user?.id) return;
        try {
            setLoading(true);
            const res = await fetch(
                `${env.BACKEND_URL}/merchent/my-percels/${user.id}`
            );
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Failed");
            setPercelsData(Array.isArray(data) ? data : data.data || []);
        } catch (err) {
            toast.error("Could not load parcels");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPercelData();
    }, [user]);

    // ✅ Search Logic: Filters by Name, Receiver, or Contact
    const filteredParcels = useMemo(() => {
        return percelsData.filter((parcel) => {
            const searchStr = searchTerm.toLowerCase();
            return (
                parcel.name?.toLowerCase().includes(searchStr) ||
                parcel.reciverName?.toLowerCase().includes(searchStr) ||
                parcel.reciverContact?.includes(searchStr)
            );
        });
    }, [searchTerm, percelsData]);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this parcel?")) return;
        try {
            const res = await fetch(`${env.BACKEND_URL}/merchent/delete-percel/${id}`, {
                method: "DELETE",
            });
            if (res.ok) {
                setPercelsData((prev) => prev.filter((p) => p.id !== id));
                toast.success("Parcel deleted");
            }
        } catch {
            toast.error("Delete failed");
        }
    };

    const handleUpdateStatus = async (id: string, newStatus: string) => {
        try {
            const res = await fetch(
                `${env.BACKEND_URL}/merchent/update-status/${id}`,
                {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ status: newStatus }),
                }
            );
            if (res.ok) {
                setPercelsData((prev) =>
                    prev.map((p) =>
                        p.id === id ? { ...p, status: newStatus as any } : p
                    )
                );
                toast.success(`Status updated to ${newStatus}`);
            }
        } catch {
            toast.error("Update failed");
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "REQUESTED": return "bg-amber-100 text-amber-700 border-amber-200";
            case "DELIVERED": return "bg-emerald-100 text-emerald-700 border-emerald-200";
            case "CANCELLED": return "bg-rose-100 text-rose-700 border-rose-200";
            case "IN_TRANSIT": return "bg-blue-100 text-blue-700 border-blue-200";
            default: return "bg-orange-100 text-orange-700 border-orange-200";
        }
    };

    return (
        <div className="min-h-screen w-full p-4 md:p-8 space-y-6 bg-gradient-to-br from-orange-50 via-white to-orange-100">
            {/* 🔶 Header & Search Bar */}
            <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 bg-white/80 backdrop-blur-xl p-6 rounded-3xl shadow-lg border border-orange-100">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-orange-500 rounded-2xl shadow-lg shadow-orange-200">
                        <Package className="text-white" size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-800 tracking-tight">All Parcels</h1>
                        <p className="text-sm text-slate-500 font-medium">
                            {filteredParcels.length} of {percelsData.length} shipments
                        </p>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-3">
                    {/* 🔎 Search Input */}
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-colors" size={18} />
                        <input
                            type="text"
                            placeholder="Search by name, receiver, or phone..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full md:w-80 pl-11 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-500 transition-all text-sm font-medium"
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

                    <button
                        onClick={fetchPercelData}
                        className="flex items-center justify-center gap-2 px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl shadow-md shadow-orange-100 font-bold text-sm transition-all active:scale-95"
                    >
                        <RefreshCcw size={16} className={loading ? "animate-spin" : ""} />
                        Refresh
                    </button>
                </div>
            </div>

            {/* 🔶 Table */}
            <div className="w-full bg-white/80 backdrop-blur-xl rounded-3xl shadow-lg border border-orange-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-orange-50/50 border-b border-orange-100">
                                <th className="px-6 py-4 text-[11px] font-black text-slate-500 uppercase tracking-wider">Parcel Details</th>
                                <th className="px-6 py-4 text-[11px] font-black text-slate-500 uppercase tracking-wider">Recipient</th>
                                <th className="px-6 py-4 text-[11px] font-black text-slate-500 uppercase tracking-wider">Billing</th>
                                <th className="px-6 py-4 text-[11px] font-black text-slate-500 uppercase tracking-wider">Status Control</th>
                                <th className="px-6 py-4 text-right text-[11px] font-black text-slate-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-orange-50">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="py-24 text-center">
                                        <div className="flex flex-col items-center gap-3">
                                            <Loader2 className="animate-spin text-orange-500" size={40} />
                                            <p className="text-slate-400 font-bold text-sm">Syncing Database...</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : filteredParcels.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="py-24 text-center">
                                        <div className="flex flex-col items-center gap-2 opacity-40">
                                            <Search size={48} className="text-slate-300" />
                                            <p className="text-slate-500 font-bold italic">No matching parcels found</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                filteredParcels.map((parcel) => (
                                    <tr key={parcel.id} className="hover:bg-orange-50/30 transition-colors group">
                                        <td className="px-6 py-5">
                                            <p className="font-black text-slate-700 leading-tight">{parcel.name}</p>
                                            <div className="flex items-center gap-2 mt-1.5">
                                                <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded uppercase tracking-tighter">
                                                    {parcel.percelType}
                                                </span>
                                                <span className="text-[10px] font-bold text-slate-400 italic">
                                                    {parcel.weight}kg
                                                </span>
                                            </div>
                                        </td>

                                        <td className="px-6 py-5 text-sm">
                                            <p className="font-bold text-slate-800">{parcel.reciverName}</p>
                                            <div className="flex flex-col gap-1 mt-1">
                                                <p className="text-[11px] flex items-center gap-1.5 text-slate-500 font-medium">
                                                    <Phone size={12} className="text-orange-400" /> {parcel.reciverContact}
                                                </p>
                                                <p className="text-[11px] flex items-center gap-1.5 text-slate-400">
                                                    <MapPin size={12} className="text-orange-300" /> {parcel.reciverAddress}
                                                </p>
                                            </div>
                                        </td>

                                        <td className="px-6 py-5">
                                            <p className="font-black text-slate-800">৳{parcel.price + parcel.deliveryPrice}</p>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">COD Included</p>
                                        </td>

                                        <td className="px-6 py-5">
                                            <div className="flex flex-col gap-2">
                                                <span className={`w-fit px-3 py-0.5 text-[10px] font-black rounded-full border shadow-sm uppercase tracking-wider ${getStatusColor(parcel.status)}`}>
                                                    {parcel.status}
                                                </span>
                                                <select
                                                    value={parcel.status}
                                                    onChange={(e) => handleUpdateStatus(parcel.id, e.target.value)}
                                                    className="w-full max-w-[140px] text-[11px] font-bold border border-slate-200 rounded-lg px-2 py-1 bg-white focus:ring-2 focus:ring-orange-100 outline-none transition-all"
                                                >
                                                    {Object.values(PercelStatus).map((status) => (
                                                        <option key={status} value={status}>{status}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </td>

                                        <td className="px-6 py-5 text-right">
                                            <div className="flex justify-end gap-1 translate-x-2 group-hover:translate-x-0 transition-transform">
                                                <button
                                                    onClick={() => handleDelete(parcel.id)}
                                                    className="p-2.5 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
                                                    title="Delete Permanent"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                                <button className="p-2.5 text-slate-300 hover:text-orange-500 hover:bg-orange-50 rounded-xl transition-all">
                                                    <ChevronRight size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AllParcelPage;