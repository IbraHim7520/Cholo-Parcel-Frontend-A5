"use client";

import { env } from "@/Config/env";
import { IPendingRiderData } from "@/Interfaces/admin.interface";
import { useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";

// Assuming these enums exist based on your backend logic
enum RiderRequestStatus {
    APPROVED = "APPROVED",
    REJECTED = "REJECTED"
}

const RiderRequestBox = () => {
    const [pendingRiders, setPendingRiders] = useState<IPendingRiderData[]>([]);
    const [loading, setLoading] = useState(true);
    const [actionId, setActionId] = useState<string | null>(null); // Track which specific item is loading

    useEffect(() => {
        const fetchRiders = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${env.BACKEND_URL}/admins/riders-by-request`, {
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                    method: 'GET',
                });
                const result = await response.json();
                setPendingRiders(result.data || []);
            } catch (error) {
                console.error("Failed to fetch riders:", error);
                toast.error("Failed to load rider requests");
            } finally {
                setLoading(false);
            }
        };
        fetchRiders();
    }, []);

    const handleAction = async (id: string, status: RiderRequestStatus) => {
        setActionId(id);
        try {
            const response = await fetch(`${env.BACKEND_URL}/admins/update-rider-status/${id}`, {
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                method: 'PATCH',
                body: JSON.stringify({ status }),
            });
            const result = await response.json();
            if (result.success) {
                toast.success(result.message || `Rider ${status.toLowerCase()} successfully`);
                setPendingRiders(prev => prev.filter((rider) => rider.id !== id));
            } else {
                toast.error(result.message || "Failed to update status");
            }
        } catch (error: any) {
            toast.error("An error occurred during the update");
        } finally {
            setActionId(null);
        }
    };

    if (loading) return <RequestSkeleton />;

    if (pendingRiders.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-16 text-center bg-white rounded-[2.5rem] border border-slate-100 shadow-sm">
                <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center mb-6">
                    <svg className="w-12 h-12 text-orange-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold text-slate-800">No Pending Riders</h2>
                <p className="text-slate-500 max-w-xs mx-auto mt-2">All delivery partner applications have been processed.</p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <header className="flex items-center justify-between px-2">
                <div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">Rider <span className="text-orange-500">Applications</span></h2>
                    <p className="text-slate-500 text-sm font-medium mt-1">
                        <span className="inline-block w-2 h-2 bg-orange-500 rounded-full mr-2 animate-pulse"></span>
                        {pendingRiders.length} candidates awaiting verification
                    </p>
                </div>
            </header>

            <div className="grid gap-6">
                {pendingRiders.map((rider) => (
                    <div
                        key={rider.id}
                        className="group bg-white border border-slate-200 rounded-[2rem] p-6 hover:shadow-xl hover:shadow-orange-100/50 hover:border-orange-200 transition-all duration-300"
                    >
                        <div className="flex flex-col lg:flex-row gap-6">
                            {/* 1. Profile Photo & Basic Info */}
                            <div className="flex gap-4 min-w-[250px]">
                                <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 border-2 border-white shadow-md flex-shrink-0">
                                    {rider.user.image ? (
                                        <Image src={rider.user.image} alt={rider.user.name} fill className="object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-orange-100 text-orange-600 font-bold text-xl">
                                            {rider.user.name.charAt(0)}
                                        </div>
                                    )}
                                </div>
                                <div className="space-y-1">
                                    <h3 className="font-bold text-slate-900 text-lg group-hover:text-orange-600 transition-colors leading-tight">
                                        {rider.user.name}
                                    </h3>
                                    <p className="text-xs font-medium text-slate-500">{rider.user.email}</p>
                                    <div className="flex gap-2 mt-2">
                                        <span className="px-2 py-0.5 bg-orange-50 text-orange-600 text-[10px] font-bold rounded-md border border-orange-100 uppercase">
                                            {rider.experience}
                                        </span>
                                        <span className="px-2 py-0.5 bg-red-50 text-red-600 text-[10px] font-bold rounded-md border border-red-100 uppercase">
                                            {rider.bloodGrouph}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* 2. Vehicle & Verification Details */}
                            <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-4 border-l border-r border-slate-50 px-6">
                                <div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Vehicle</p>
                                    <p className="text-sm font-semibold text-slate-700 capitalize">{rider.vehicleType.toLowerCase()}</p>
                                    <p className="text-[11px] text-slate-500 font-mono mt-0.5">{rider.vehicleNumber}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Zone</p>
                                    <p className="text-sm font-semibold text-slate-700">{rider.deliveryArea}</p>
                                    <p className="text-[11px] text-slate-500 mt-0.5 truncate">{rider.address}</p>
                                </div>
                                <div className="hidden sm:block">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Verification</p>
                                    <p className="text-sm font-semibold text-slate-700">NID: {rider.nid}</p>
                                    <p className="text-[11px] text-slate-500 mt-0.5">Contact: {rider.contact}</p>
                                </div>
                            </div>

                            {/* 3. Action Buttons */}
                            <div className="flex flex-row lg:flex-col justify-center gap-3 min-w-[140px]">
                                <button
                                    disabled={actionId === rider.id}
                                    onClick={() => handleAction(rider.id, RiderRequestStatus.APPROVED)}
                                    className="flex-1 py-3 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-orange-600 transition-all active:scale-95 disabled:opacity-50"
                                >
                                    {actionId === rider.id ? <Spinner className="size-4 mx-auto" /> : "APPROVE"}
                                </button>
                                <button
                                    disabled={actionId === rider.id}
                                    onClick={() => handleAction(rider.id, RiderRequestStatus.REJECTED)}
                                    className="flex-1 py-3 bg-white border border-slate-200 text-rose-500 text-xs font-bold rounded-xl hover:bg-rose-50 hover:border-rose-200 transition-all disabled:opacity-50"
                                >
                                    DECLINE
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const RequestSkeleton = () => (
    <div className="space-y-6 animate-pulse p-4">
        <div className="h-10 bg-slate-100 rounded-lg w-1/4 mb-8" />
        {[...Array(3)].map((_, i) => (
            <div key={i} className="h-40 bg-slate-50 rounded-[2rem] w-full border border-slate-100" />
        ))}
    </div>
);

export default RiderRequestBox;