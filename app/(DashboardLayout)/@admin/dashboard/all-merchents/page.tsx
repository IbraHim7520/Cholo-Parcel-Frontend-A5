"use client";

import { useEffect, useState } from "react";
import MerchantTable from "@/components/Tables/AllMerchentTable";
import { env } from "@/Config/env";
import { IGetMerchantData } from "@/Interfaces/admin.interface";
import MerchentRequestBox from "@/components/DialogueBox/MerchentRequestBox";
import AdminCreateMerchentForm from "@/components/Forms/Others/AdminCreateMerchentForm";

export default function AllMerchantsPage() {
    const [merchants, setMerchants] = useState<IGetMerchantData[]>([]);
    const [loading, setLoading] = useState(true);

    // Fetching data on the client side
    useEffect(() => {
        const fetchMerchants = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${env.BACKEND_URL}/admins/get-all-merchent`, {
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                    method: 'GET',
                });
                const result = await response.json();
                setMerchants(result.data || []);
            } catch (error) {
                console.error("Failed to fetch merchants:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMerchants();
    }, []);

    // Button Handlers
    const handleCreateMerchant = () => {
        const  modal = document.getElementById("createMerchentModal") as HTMLDialogElement;
        modal.showModal()
    };

    const handleViewRequests = () => {
        const modal = document.getElementById("merchentRequestModal") as HTMLDialogElement;
        modal.showModal()
    };

    return (
        <div className="min-h-screen bg-[#FBFBFB] p-6 lg:p-12">
            <dialog id="merchentRequestModal" className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                    <MerchentRequestBox/>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button, it will close the modal */}
                            <button className="btn btn-ghost">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
            <dialog id="createMerchentModal" className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                    <AdminCreateMerchentForm modal={"createMerchentModal"}/>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button, it will close the modal */}
                            <button className="btn btn-ghost">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
            <div className="max-w-6xl mx-auto">
                <header className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div className="space-y-1">
                        <h1 className="text-4xl font-light tracking-tight text-slate-900">Merchants Management</h1>
                        <p className="text-slate-500 font-medium text-sm uppercase tracking-widest">Directory / 2026</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleViewRequests}
                            className="px-5 py-2.5 text-sm font-medium border border-slate-200 rounded-full hover:bg-white hover:shadow-sm transition-all text-slate-600 active:scale-95"
                        >
                            Merchant Requests
                        </button>
                        <button
                            onClick={handleCreateMerchant}
                            className="px-5 py-2.5 text-sm font-medium bg-slate-900 text-white rounded-full hover:bg-slate-800 shadow-lg shadow-slate-200 transition-all active:scale-95"
                        >
                            + New Merchant
                        </button>
                    </div>
                </header>

                {loading ? (
                    <TableSkeleton />
                ) : (
                    <MerchantTable initialData={merchants} />
                )}
            </div>
        </div>
    );
}

// Minimal Skeleton Loader
function TableSkeleton() {
    return (
        <div className="w-full space-y-4 animate-pulse">
            {[...Array(6)].map((_, i) => (
                <div key={i} className="h-[72px] bg-slate-100/50 rounded-2xl border border-slate-50" />
            ))}
        </div>
    );
}