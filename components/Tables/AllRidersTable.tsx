"use client";

import { env } from "@/Config/env";
import { IAdminGetAllRider } from "@/Interfaces/admin.interface";
import { RiderRequestStatus } from "@/Interfaces/interfaces";
import {
    MoreVertical,
    MapPin,
    Bike,
    ShieldAlert,
    Calendar,
    CheckCircle2,
    XCircle,
    Loader2
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function AllRidersTable({ initialData }: { initialData: IAdminGetAllRider[] }) {
    // 1. Local state to allow immediate UI updates
    const [riders, setRiders] = useState<IAdminGetAllRider[]>(initialData);
    // 2. Track which rider is currently being updated
    const [updatingId, setUpdatingId] = useState<string | null>(null);

    const handleStatusChange = async (riderId: string, newStatus: string) => {
        setUpdatingId(riderId);

        try {
            const response = await fetch(`${env.BACKEND_URL}/admins/update-rider-status/${riderId}`, {
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                method: 'PATCH',
                body: JSON.stringify({ status: newStatus }),
            });

            const result = await response.json();

            if (result.success) {
                // 3. Immediate State Update
                setRiders((prev) =>
                    prev.map((r) =>
                        r.id === riderId ? { ...r, status: newStatus as any } : r
                    )
                );
                toast.success(result.message || `Status updated to ${newStatus}`);
            } else {
                toast.error(result.message || "Failed to update status");
            }
        } catch (error: any) {
            toast.error("An error occurred during the update");
        } finally {
            setUpdatingId(null);
        }
    };

    return (
        <div className="w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-500">
                    <thead className="bg-gray-50 text-xs uppercase text-gray-700">
                        <tr>
                            <th className="px-6 py-4 font-semibold">Rider</th>
                            <th className="px-6 py-4 font-semibold">Vehicle & Area</th>
                            <th className="px-6 py-4 font-semibold">Contact & Bio</th>
                            <th className="px-6 py-4 font-semibold">Status</th>
                            <th className="px-6 py-4 font-semibold">Availability</th>
                            <th className="px-6 py-4 font-semibold text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {riders.map((rider) => (
                            <tr key={rider.id} className="hover:bg-gray-50 transition-colors">
                                {/* Rider Identity */}
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={rider.user.image}
                                            alt={rider.user.name}
                                            className="h-10 w-10 rounded-full object-cover bg-gray-100"
                                        />
                                        <div>
                                            <div className="font-medium text-gray-900">{rider.user.name}</div>
                                            <div className="text-xs text-gray-400">{rider.user.email}</div>
                                        </div>
                                    </div>
                                </td>

                                {/* Vehicle & Area */}
                                <td className="px-6 py-4">
                                    <div className="flex flex-col gap-1 text-gray-700">
                                        <div className="flex items-center gap-1">
                                            <Bike size={14} className="text-blue-500" />
                                            <span className="capitalize">{rider.vehicleType.toLowerCase()}</span>
                                            <span className="text-xs text-gray-400">({rider.vehicleNumber})</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-xs text-gray-500">
                                            <MapPin size={12} />
                                            {rider.deliveryArea}
                                        </div>
                                    </div>
                                </td>

                                {/* Contact & Bio */}
                                <td className="px-6 py-4">
                                    <div className="text-xs space-y-1">
                                        <p><span className="font-semibold">Contact:</span> {rider.contact}</p>
                                        <p><span className="font-semibold">Blood:</span> {rider.bloodGrouph}</p>
                                        <p className="flex items-center gap-1 text-gray-400">
                                            <Calendar size={12} />
                                            Joined {new Date(rider.joinDate).toLocaleDateString()}
                                        </p>
                                    </div>
                                </td>

                                {/* Selectable Status with Loading */}
                                <td className="px-6 py-4">
                                    <div className="relative flex items-center gap-2">
                                        {rider.isBanned ? (
                                            <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-700">
                                                <ShieldAlert size={12} /> Banned
                                            </span>
                                        ) : (
                                            <div className="relative w-32">
                                                <select
                                                    disabled={updatingId === rider.id}
                                                    value={rider.status}
                                                    onChange={(e) => handleStatusChange(rider.id, e.target.value)}
                                                    className={`block w-full rounded-md border-0 py-1.5 pl-2 pr-8 text-xs font-semibold ring-1 ring-inset focus:ring-2 sm:text-xs transition-all cursor-pointer disabled:opacity-50
                                                        ${rider.status === 'APPROVED'
                                                            ? 'bg-green-50 text-green-700 ring-green-600/20 focus:ring-green-500'
                                                            : 'bg-yellow-50 text-yellow-700 ring-yellow-600/20 focus:ring-yellow-500'
                                                        }`}
                                                >
                                                    <option value={RiderRequestStatus.APPROVED}>APPROVE</option>
                                                    <option value={RiderRequestStatus.REJECTED}>REJECT</option>
                                                </select>
                                                {updatingId === rider.id && (
                                                    <div className="absolute right-2 top-1/2 -translate-y-1/2">
                                                        <Loader2 size={14} className="animate-spin text-gray-500" />
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </td>

                                {/* Availability */}
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        {rider.isAvailable ? (
                                            <div className="flex items-center text-green-600 gap-1">
                                                <CheckCircle2 size={16} />
                                                <span className="text-xs font-medium">Available</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center text-gray-400 gap-1">
                                                <XCircle size={16} />
                                                <span className="text-xs font-medium">Busy</span>
                                            </div>
                                        )}
                                    </div>
                                </td>

                                {/* Actions */}
                                <td className="px-6 py-4 text-right">
                                    <button className="text-gray-400 hover:text-gray-900 transition-colors">
                                        <MoreVertical size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}