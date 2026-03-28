"use client";
import { IUser, UserRole, UserStatus } from "@/Interfaces/interfaces";
import { useState } from "react";
import { toast } from "sonner";
import { env } from "@/Config/env";

const AllUsersTable = ({ initialUsers }: { initialUsers: IUser[] }) => {
    const [users, setUsers] = useState<IUser[]>(initialUsers);
    // Track loading per user + field (e.g., "user123-role")
    const [updatingIds, setUpdatingIds] = useState<Set<string>>(new Set());

    const handleUpdate = async (userId: string, field: "role" | "status", value: string) => {
        const loadingKey = `${userId}-${field}`;

        // Add to loading set
        setUpdatingIds((prev) => new Set(prev).add(loadingKey));

        try {
            const res = await fetch(`${env.BACKEND_URL}/admins/update-user/${userId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ [field]: value }),
            });

            if (!res.ok) throw new Error();

            setUsers((prev) =>
                prev.map((u) => (u.id === userId ? { ...u, [field]: value } : u))
            );
            toast.success(`User ${field} updated to ${value}`);
        } catch (error) {
            toast.error(`Failed to update ${field}`);
        } finally {
            // Remove from loading set
            setUpdatingIds((prev) => {
                const newSet = new Set(prev);
                newSet.delete(loadingKey);
                return newSet;
            });
        }
    };

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                        <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">User</th>
                        <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Role</th>
                        <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Joined</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {users.map((user) => {
                        const isRoleLoading = updatingIds.has(`${user.id}-role`);
                        const isStatusLoading = updatingIds.has(`${user.id}-status`);

                        return (
                            <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold overflow-hidden">
                                            {user.image ? <img src={user.image} alt={user.name} className="object-cover h-full w-full" /> : user.name[0]}
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-slate-800">{user.name}</p>
                                            <p className="text-xs text-slate-500">{user.email}</p>
                                        </div>
                                    </div>
                                </td>

                                {/* Role Selection */}
                                <td className="px-6 py-4">
                                    <div className="relative w-max">
                                        <select
                                            disabled={isRoleLoading}
                                            value={user.role}
                                            onChange={(e) => handleUpdate(user.id, "role", e.target.value)}
                                            className={`text-xs font-medium bg-slate-100 border-none rounded-lg px-2 py-1.5 focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all`}
                                        >
                                            <option value={UserRole.USER}>USER</option>
                                            <option value={UserRole.RIDER}>RIDER</option>
                                            <option value={UserRole.MERCHENT}>MERCHANT</option>
                                            <option value={UserRole.ADMIN}>ADMIN</option>
                                        </select>
                                        {isRoleLoading && (
                                            <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
                                                <div className="h-3 w-3 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                                            </div>
                                        )}
                                    </div>
                                </td>

                                {/* Status Selection */}
                                <td className="px-6 py-4">
                                    <div className="relative w-max">
                                        <select
                                            disabled={isStatusLoading}
                                            value={user.status}
                                            onChange={(e) => handleUpdate(user.id, "status", e.target.value)}
                                            className={`text-xs font-bold rounded-full px-3 py-1 border-none outline-none cursor-pointer appearance-none text-center transition-all disabled:opacity-50 ${user.status === "ACTIVE" ? "bg-emerald-100 text-emerald-700" :
                                                    user.status === UserStatus.DEACTIVE ? "bg-amber-100 text-amber-700" :
                                                        "bg-rose-100 text-rose-700"
                                                }`}
                                        >
                                            <option value={UserStatus.ACTIVE}>ACTIVE</option>
                                            <option value={UserStatus.DEACTIVE}>DEACTIVATE</option>
                                            <option value={UserStatus.DELETED}>DELETE</option>
                                        </select>
                                        {isStatusLoading && (
                                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                                <div className="h-4 w-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></div>
                                            </div>
                                        )}
                                    </div>
                                </td>

                                <td className="px-6 py-4 text-sm text-slate-500">
                                    {new Date(user.createdAt).toLocaleDateString()}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default AllUsersTable;