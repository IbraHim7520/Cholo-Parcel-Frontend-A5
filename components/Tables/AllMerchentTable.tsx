"use client";

import { useState } from "react";
import { IGetMerchantData } from "@/Interfaces/admin.interface";
import { MarchentStatus } from "@/Interfaces/interfaces";

export default function MerchantTable({ initialData }: { initialData: IGetMerchantData[] }  ) {
    const [merchants, setMerchants] = useState(initialData || []);
 
    const handleStatusChange = (id: string, newStatus: string) => {
        alert(id)
    };

    // 1. UNIQUE EMPTY STATE
    if (merchants.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-slate-200 rounded-3xl bg-white/50">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg>
                </div>
                <h3 className="text-lg font-medium text-slate-900">Vault is empty</h3>
                <p className="text-slate-500 text-sm">No merchant records found in the database.</p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full border-separate border-spacing-y-3">
                <thead>
                    <tr className="text-left text-slate-400 text-[11px] uppercase tracking-[0.2em] font-semibold">
                        <th className="px-6 pb-2">Company</th>
                        <th className="px-6 pb-2">Primary Contact</th>
                        <th className="px-6 pb-2">Current Status</th>
                        <th className="px-6 pb-2 text-right">Activity</th>
                    </tr>
                </thead>
                <tbody>
                    {merchants.map((merchant) => (
                        <tr
                            key={merchant.id}
                            className="group bg-white hover:bg-slate-50 transition-all duration-300 shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
                        >
                            {/* Company Info */}
                            <td className="px-6 py-5 rounded-l-2xl border-y border-l border-slate-100">
                                <p className="font-semibold text-slate-900">{merchant.ComphanyName}</p>
                                <p className="text-xs text-slate-400 mt-0.5 tracking-tight">{merchant.ComphanyEmail}</p>
                            </td>

                            {/* Owner */}
                            <td className="px-6 py-5 border-y border-slate-100">
                                <span className="text-sm text-slate-600 font-medium">{merchant.user.name}</span>
                            </td>

                            {/* Selective Status Button */}
                            <td className="px-6 py-5 border-y border-slate-100">
                                <div className="relative inline-block">
                                    <select
                                        value={merchant.status}
                                        onChange={(e) => handleStatusChange(merchant.id, e.target.value)}
                                        className={`appearance-none text-[10px] font-bold py-1 pl-3 pr-8 rounded-full border transition-all cursor-pointer focus:outline-none ${merchant.status === MarchentStatus.APPROVED ? "bg-emerald-50 border-emerald-100 text-emerald-600 hover:bg-emerald-100" : merchant.status === MarchentStatus.REJECTED ? "bg-rose-50 border-rose-100 text-rose-600 hover:bg-rose-100" : "bg-amber-50 border-amber-100 text-amber-600 hover:bg-amber-100"}`}
                                    >
                                        <option value={MarchentStatus.PENDING}>PENDING</option>
                                        <option value={MarchentStatus.APPROVED}>APPROVE</option>
                                        <option value={MarchentStatus.REJECTED}>REJECT</option>
                                    </select>
                                    <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2">
                                        <svg className="w-3 h-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                    </div>
                                </div>
                            </td>

                            {/* Action Button */}
                            <td className="px-6 py-5 rounded-r-2xl border-y border-r border-slate-100 text-right">
                                <button className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-slate-900 transition-colors">
                                    VIEW
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

// function getStatusStyles(status) {
//     switch (status) {
//         case "APPROVE":
//             return "bg-emerald-50 border-emerald-100 text-emerald-600 hover:bg-emerald-100";
//         case "REJECT":
//             return "bg-rose-50 border-rose-100 text-rose-600 hover:bg-rose-100";
//         default:
//             return "bg-amber-50 border-amber-100 text-amber-600 hover:bg-amber-100";
//     }
// }