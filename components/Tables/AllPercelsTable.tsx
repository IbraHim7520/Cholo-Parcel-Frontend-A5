"use client";

import { useState } from "react";
import { env } from "@/Config/env";
import { IAdminGetAllPercel } from "@/Interfaces/admin.interface";
import { Search, Trash2, Package, User, MapPin, Loader2, Phone } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

export default function ParcelsTable({ initialData }: { initialData: IAdminGetAllPercel[] }) {
    const [parcels, setParcels] = useState<IAdminGetAllPercel[]>(initialData);
    const [searchTerm, setSearchTerm] = useState("");
    const [deletingId, setDeletingId] = useState<string | null>(null);

    // Filter logic
    const filteredParcels = parcels.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.reciverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.reciverContact.includes(searchTerm)
    );

    const handleDelete = async (parcelId: string) => {
        if (!confirm("Are you sure you want to delete this parcel?")) return;

        setDeletingId(parcelId);
        try {
            const response = await fetch(`${env.BACKEND_URL}/admins/delete-parcel/${parcelId}`, {
                method: "DELETE",
                credentials: "include",
            });
            const result = await response.json();

            if (result.success) {
                toast.success("Parcel deleted successfully");
                setParcels((prev) => prev.filter((p) => p.id !== parcelId));
            } else {
                toast.error(result.message || "Failed to delete");
            }
        } catch (error) {
            toast.error("An error occurred while deleting");
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 size-4" />
                <input
                    type="text"
                    placeholder="Search by parcel name, receiver, or phone..."
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all text-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Table */}
            <div className="bg-white border border-slate-200 rounded-[2rem] overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 text-slate-600 uppercase text-[11px] font-bold tracking-wider">
                            <tr>
                                <th className="px-6 py-4">Parcel Info</th>
                                <th className="px-6 py-4">Receiver</th>
                                <th className="px-6 py-4">Rider</th>
                                <th className="px-6 py-4">Pricing</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredParcels.map((parcel) => (
                                <tr key={parcel.id} className="hover:bg-slate-50/50 transition-colors group">
                                    {/* Parcel Details */}
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-orange-100 text-orange-600 rounded-lg">
                                                <Package size={20} />
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-900 leading-none">{parcel.name}</p>
                                                <p className="text-[11px] text-slate-500 mt-1 capitalize">{parcel.percelType.toLowerCase()} • {parcel.weight}kg</p>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Receiver Details */}
                                    <td className="px-6 py-4">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-1.5 text-slate-700 font-semibold">
                                                <User size={12} className="text-slate-400" />
                                                {parcel.reciverName}
                                            </div>
                                            <div className="flex items-center gap-1.5 text-slate-500 text-xs">
                                                <Phone size={12} className="text-slate-400" />
                                                {parcel.reciverContact}
                                            </div>
                                            <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                                                <MapPin size={12} />
                                                <span className="truncate max-w-[150px]">{parcel.reciverAddress}</span>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Rider Assigned */}
                                    <td className="px-6 py-4">
                                        {parcel.rider ? (
                                            <div className="flex items-center gap-2">
                                                <div className="relative size-7 rounded-full overflow-hidden bg-slate-100">
                                                    {parcel.rider.image ? (
                                                        <Image src={parcel.rider.image} alt={parcel.rider.name} fill className="object-cover" />
                                                    ) : (
                                                        <div className="size-full flex items-center justify-center bg-orange-50 text-orange-600 text-[10px] font-bold">
                                                            {parcel.rider.name.charAt(0)}
                                                        </div>
                                                    )}
                                                </div>
                                                <span className="text-xs font-medium text-slate-700">{parcel.rider.name}</span>
                                            </div>
                                        ) : (
                                            <span className="text-[10px] font-bold py-1 px-2 bg-slate-100 text-slate-400 rounded-md uppercase">Unassigned</span>
                                        )}
                                    </td>

                                    {/* Pricing Info */}
                                    <td className="px-6 py-4">
                                        <div className="text-xs">
                                            <p className="text-slate-900 font-bold">৳{parcel.price}</p>
                                            <p className="text-slate-400 text-[10px]">Fee: ৳{parcel.deliveryCharge}</p>
                                        </div>
                                    </td>

                                    {/* Delete Action */}
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            disabled={deletingId === parcel.id}
                                            onClick={() => handleDelete(parcel.id)}
                                            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all disabled:opacity-50"
                                        >
                                            {deletingId === parcel.id ? (
                                                <Loader2 size={18} className="animate-spin" />
                                            ) : (
                                                <Trash2 size={18} />
                                            )}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {filteredParcels.length === 0 && (
                        <div className="py-20 text-center">
                            <Package className="mx-auto size-12 text-slate-200 mb-3" />
                            <p className="text-slate-500 font-medium">No parcels found</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}