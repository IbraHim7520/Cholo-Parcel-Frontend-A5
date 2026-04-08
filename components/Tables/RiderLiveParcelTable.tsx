"use client";

import { useState, useMemo, useEffect } from "react";
import {
    Search,
    X,
    MapPin,
    Phone,
    Package,
    Loader2,
  
    Clock
} from "lucide-react";
import { IRiderGetRequestedPercel } from "@/Interfaces/riders.interface";
import { PercelStatus } from "@/Interfaces/interfaces";
import { env } from "@/Config/env";
import { toast } from "sonner";

interface Props {
    initialData: IRiderGetRequestedPercel[];
    isStatSelect:boolean
}

    //id:string
    // name: string,
    // notes: string,
    // weight: number,
    // price: number,
    // deliveryCharge: number,
    // status: PercelStatus,
    // pickupLocation: string,
    // isSelfPickup: boolean,
    // percelType: PercelType,
    // reciverName: string,
    // reciverContact: string,
    // reciverAddress: string,
    // pickupTime: string,
    // deliveryTime: string,
    // merchentId: string,
    // riderId: string | null

const LiveParcelTable = ({ initialData,isStatSelect }: Props) => {
    const [parcels, setParcels] = useState(initialData || []);
    const [searchTerm, setSearchTerm] = useState("");
    const [updatingId, setUpdatingId] = useState<string | null>(null);

    useEffect(() => {
        setParcels(initialData || [])
    }, [initialData])

    const filteredData = useMemo(() => {
        return parcels.filter(p =>
            p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.reciverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.reciverAddress.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, parcels]);

    // ⚙️ Status Update Logic
    const handleStatusUpdate = async (id: string, newStatus: string) => {
        if(newStatus === PercelStatus.REQUESTED){
            toast.error("You can't update status to requested")
            return;
        }
        setUpdatingId(id);
        try {
            const res = await fetch(`${env.BACKEND_URL}/riders/accept-percel/${id}`, {
                method: "PATCH",
                credentials:"include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus }),
            });

            if (res.ok) {
                setParcels(prev => prev.map(p => p.id === id ? { ...p, status: newStatus as any } : p));
                toast.success(`Parcel marked as ${newStatus}`);
            } else {
                throw new Error();
            }
        } catch (error) {
            toast.error("Failed to update status");
        } finally {
            setUpdatingId(null);
        }
    };

    return (
        <div className="w-full">
            {/* Search Bar */}
            <div className="p-6 border-b border-slate-100 bg-slate-50/30">
                <div className="relative max-w-md">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search by area, receiver, or item..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-11 pr-10 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-200 outline-none transition-all text-sm font-medium"
                    />
                    {searchTerm && (
                        <button onClick={() => setSearchTerm("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                            <X size={16} />
                        </button>
                    )}
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-slate-50/50 border-b border-slate-100">
                            <th className="px-6 py-4 text-[11px] font-black text-slate-500 uppercase">Item & Weight</th>
                            <th className="px-6 py-4 text-[11px] font-black text-slate-500 uppercase">Destination</th>
                            <th className="px-6 py-4 text-[11px] font-black text-slate-500 uppercase">To Collect</th>
                            <th className="px-6 py-4 text-[11px] font-black text-slate-500 uppercase">Status Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {filteredData.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="py-20 text-center text-slate-400 italic font-medium">
                                    No live parcels match your search
                                </td>
                            </tr>
                        ) : (
                            filteredData.map((parcel) => (
                                <tr key={parcel.id} className="hover:bg-indigo-50/20 transition-colors group">
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-slate-100 rounded-lg text-slate-500 group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors">
                                                <Package size={18} />
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-800 text-sm">{parcel.name}</p>
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-tight">{parcel.weight} KG • {parcel.percelType}</p>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-6 py-5">
                                        <p className="text-sm font-bold text-slate-700">{parcel.reciverName}</p>
                                        <div className="flex flex-col gap-1 mt-1">
                                            <p className="text-[11px] flex items-center gap-1.5 text-slate-500 font-medium">
                                                <MapPin size={12} className="text-indigo-400" /> {parcel.reciverAddress}
                                            </p>
                                            <p className="text-[11px] flex items-center gap-1.5 text-slate-400">
                                                <Phone size={12} /> {parcel.reciverContact}
                                            </p>
                                        </div>
                                    </td>

                                    <td className="px-6 py-5 font-black text-indigo-600">
                                        ৳{parcel.deliveryCharge + parcel.price}
                                    </td>

                                    <td className="px-6 py-5">
                                        <div className="flex flex-col gap-2 min-w-[140px]">
                                            <div className="relative">
                                                <select
                                                    disabled={updatingId === parcel.id ||  isStatSelect === false }
                                                    value={parcel.status}
                                                    onChange={(e) => handleStatusUpdate(parcel.id, e.target.value)}
                                                    className="w-full text-[11px] font-bold border border-slate-200 rounded-lg px-3 py-2 bg-white appearance-none outline-none focus:border-indigo-500 disabled:opacity-50 transition-all cursor-pointer"
                                                >
                                                    {Object.values(PercelStatus).map((status) => (
                                                        <option key={status} value={status}>{status.toLocaleLowerCase()}</option>
                                                    ))}
                                                </select>
                                                {updatingId === parcel.id ? (
                                                    <Loader2 size={14} className="animate-spin absolute right-2 top-2.5 text-indigo-500" />
                                                ) : (
                                                    <Clock size={14} className="absolute right-2 top-2.5 text-slate-400 pointer-events-none" />
                                                )}
                                            </div>
                                            <span className="text-[9px] font-bold text-slate-400 text-center uppercase tracking-widest">
                                                Current: {parcel.status}
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default LiveParcelTable;