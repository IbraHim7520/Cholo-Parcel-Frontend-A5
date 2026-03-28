"use client";
import { IGetAllMarchentData, MarchentStatus } from "@/Interfaces/interfaces";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { env } from "@/Config/env";
import { Loader2 } from "lucide-react";

const AllMarchentTable = ({ initialData }: { initialData: IGetAllMarchentData[] }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [merchants, setMerchants] = useState<IGetAllMarchentData[]>(initialData);
    const [updatingId, setUpdatingId] = useState<string | null>(null);

    const filteredData = useMemo(() => {
        const search = searchTerm.toLowerCase();
        return merchants.filter((merchant) =>
            merchant.ComphanyName?.toLowerCase().includes(search) ||
            merchant.ComphanyEmail?.toLowerCase().includes(search) ||
            merchant.user?.name?.toLowerCase().includes(search)
        );
    }, [searchTerm, merchants]);

    const handleStatusChange = async (merchantId: string, newStatus: string) => {
        setUpdatingId(merchantId);
        try {
            const res = await fetch(`${env.BACKEND_URL}/admins/marchent-status/${merchantId}`, {
                method: "PATCH",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus }),
            });
            const data = await res.json();

            if (data.success) {
                toast.success(`Merchant ${newStatus.toLowerCase()} successfully`);
                // Update local state
                setMerchants((prev) =>
                    prev.map((m) => (m.id === merchantId ? { ...m, status: newStatus as MarchentStatus } : m))
                );
            } else {
                toast.error(data.message || "Failed to update status");
            }
        } catch (error) {
            toast.error("Connection error");
        } finally {
            setUpdatingId(null);
        }
    };

    return (
        <div className="w-full bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                <input
                    type="text"
                    placeholder="Search merchants..."
                    className="w-full max-w-sm px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm outline-none"
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <p className="text-xs text-gray-500 font-medium">{filteredData.length} Merchants</p>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 text-gray-600 uppercase text-[10px] tracking-wider font-bold">
                            <th className="px-6 py-4">Merchant Info</th>
                            <th className="px-6 py-4">Contact</th>
                            <th className="px-6 py-4">Status Update</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {filteredData.map((merchant) => (
                            <tr key={merchant.id} className="hover:bg-gray-50/50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="font-bold text-gray-800">{merchant.ComphanyName}</div>
                                    <div className="text-xs text-gray-500">Owner: {merchant.user?.name}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm text-gray-600">{merchant.ComphanyEmail}</div>
                                    <div className="text-xs text-gray-400">{merchant.ComphanyPhone}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="relative w-fit">
                                        {updatingId === merchant.id && (
                                            <div className="absolute -left-6 top-1/2 -translate-y-1/2">
                                                <Loader2 size={14} className="animate-spin text-blue-500" />
                                            </div>
                                        )}
                                        <select
                                            value={merchant.status}
                                            disabled={updatingId === merchant.id}
                                            onChange={(e) => handleStatusChange(merchant.id, e.target.value)}
                                            className={`text-xs font-bold px-3 py-1.5 rounded-lg border outline-none cursor-pointer transition-all ${merchant.status === MarchentStatus.APPROVED
                                                    ? "bg-green-50 text-green-700 border-green-200"
                                                    : merchant.status === MarchentStatus.PENDING
                                                        ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                                                        : "bg-red-50 text-red-700 border-red-200"
                                                }`}
                                        >
                                            <option value={MarchentStatus.PENDING}>PENDING</option>
                                            <option value={MarchentStatus.APPROVED}>APPROVE</option>
                                            <option value={MarchentStatus.REJECTED}>REJECT</option>
                                        </select>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-blue-600 hover:underline text-sm font-semibold">View</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllMarchentTable;