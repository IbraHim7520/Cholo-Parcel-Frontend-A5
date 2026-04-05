"use client";

import { env } from "@/Config/env";
import { IPendingMerchentData } from "@/Interfaces/admin.interface";
import { useEffect, useState } from "react";
import Image from "next/image";
import { MarchentStatus } from "@/Interfaces/interfaces";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";

const MerchentRequestBox = () => {
    const [pendingMerchents, setPendingMerchents] = useState<IPendingMerchentData[]>([]);
    const [loading, setLoading] = useState(true);
    const [btnClickLoading , setBtnClickLoading] = useState(false)
    useEffect(() => {
        const fetchMerchants = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${env.BACKEND_URL}/admins/get-merchent-by-request`, {
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                    method: 'GET',
                });
                const result = await response.json();
                setPendingMerchents(result.data || []);
            } catch (error) {
                console.error("Failed to fetch merchants:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchMerchants();
    }, []);

    const handleAction = async (id: string, type: MarchentStatus) => {
        setBtnClickLoading(true)
        try {
            const response = await fetch(`${env.BACKEND_URL}/admins/update-merchent-status/${id}`, {
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                method: 'PATCH',
                body: JSON.stringify({ status: type }),
            });
            const result = await response.json();
            if (result.success) {
                toast.success(result.message || "Merchant status updated successfully")
                setPendingMerchents(pendingMerchents.filter((merchant) => merchant.id !== id));
                setBtnClickLoading(false)
            }
        } catch (error: any) {
            toast.error(error.message || "Failed to update merchant status")
            console.error("Failed to update merchant status:", error);
            setBtnClickLoading(false)
        }
    };

    if (loading) return <RequestSkeleton />;

    if (pendingMerchents.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-12 text-center bg-white rounded-3xl border border-slate-100 shadow-sm">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-10 h-10 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <h2 className="text-xl font-semibold text-slate-800">Inbox Cleared</h2>
                <p className="text-slate-500 max-w-xs mx-auto mt-2">There are no new merchant applications to review at this moment.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <header className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Review Requests</h2>
                    <p className="text-slate-500 text-sm italic">{pendingMerchents.length} applications pending</p>
                </div>
            </header>

            <div className="grid gap-4">
                {pendingMerchents.map((merchant, index) => (
                    <div
                        key={index}
                        className="group flex flex-col md:flex-row md:items-center justify-between p-5 bg-white border border-slate-200 rounded-2xl hover:border-indigo-200 hover:shadow-md transition-all duration-300"
                    >
                        {/* Left Section: Company Info */}
                        <div className="flex items-center gap-4">
                            <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-slate-100 border border-slate-100 flex-shrink-0">
                                {merchant.ComphanyLogo ? (
                                    <Image
                                        src={merchant.ComphanyLogo}
                                        alt={merchant.ComphanyName}
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-slate-400 font-bold text-xl">
                                        {merchant.ComphanyName.charAt(0)}
                                    </div>
                                )}
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                                    {merchant.ComphanyName}
                                </h3>
                                <p className="text-sm text-slate-500">{merchant.ComphanyEmail}</p>
                            </div>
                        </div>

                        {/* Middle Section: Applicant Info */}
                        <div className="mt-4 md:mt-0 flex items-center gap-3 px-4 py-2 bg-slate-50 rounded-lg border border-slate-100">
                            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-[10px] font-bold text-indigo-600 uppercase overflow-hidden">
                                {merchant.user.image ? (
                                    <img src={merchant.user.image} alt="User" className="w-full h-full object-cover" />
                                ) : (
                                    merchant.user.name.charAt(0)
                                )}
                            </div>
                            <div className="text-xs">
                                <p className="font-semibold text-slate-700 leading-none">{merchant.user.name}</p>
                                <p className="text-slate-400 text-[10px] mt-1 italic leading-none">Applicant</p>
                            </div>
                        </div>

                        {/* Right Section: Actions */}
                        <div className="mt-6 md:mt-0 flex items-center gap-2">
                            <button
                                onClick={() => handleAction(merchant.id, MarchentStatus.REJECTED)}
                                className="px-4 py-2 text-xs text-center font-bold text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                            >
                                {btnClickLoading ? <Spinner className="size-4"/> : "DECLINE"}
                            </button>
                            <button
                                onClick={() => handleAction(merchant.id, MarchentStatus.APPROVED)}
                                className="px-6 py-2 text-xs text-center font-bold bg-slate-900 text-white rounded-lg hover:bg-indigo-600 shadow-sm transition-all active:scale-95"
                            >
                                {btnClickLoading ? <Spinner className="size-4"/> : "APPROVE"}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const RequestSkeleton = () => (
    <div className="space-y-4 animate-pulse">
        {[...Array(3)].map((_, i) => (
            <div key={i} className="h-24 bg-slate-100 rounded-2xl w-full" />
        ))}
    </div>
);

export default MerchentRequestBox;