"use client";
import { IUser, UserRole, UserStatus } from "@/Interfaces/interfaces";
import { useState, useMemo } from "react";
import { toast } from "sonner";
import { env } from "@/Config/env";
import { Search, X } from "lucide-react"; // Added for UI icons

const AllUsersTable = ({ initialUsers }: { initialUsers: IUser[] }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [users, setUsers] = useState<IUser[]>(initialUsers);
    const [updatingIds, setUpdatingIds] = useState<Set<string>>(new Set());

    // Filter Logic: Search by Name or Email
    const filteredUsers = useMemo(() => {
        const query = searchTerm.toLowerCase();
        return users.filter(
            (user) =>
                user.name.toLowerCase().includes(query) ||
                user.email.toLowerCase().includes(query)
        );
    }, [searchTerm, users]);

    const handleUpdate = async (userId: string, field: "role" | "status", value: string) => {
        const loadingKey = `${userId}-${field}`;
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
            setUpdatingIds((prev) => {
                const newSet = new Set(prev);
                newSet.delete(loadingKey);
                return newSet;
            });
        }
    };

    return (
        <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            {/* Search Header */}
            <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="relative w-full md:w-80">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-10 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                    {searchTerm && (
                        <button
                            onClick={() => setSearchTerm("")}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        >
                            <X size={14} />
                        </button>
                    )}
                </div>
                <div className="text-xs font-medium text-slate-500">
                    Showing {filteredUsers.length} of {users.length} users
                </div>
            </div>

            {/* Table Area */}
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
                        {filteredUsers.map((user) => {
                            const isRoleLoading = updatingIds.has(`${user.id}-role`);
                            const isStatusLoading = updatingIds.has(`${user.id}-status`);

                            return (
                                <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold overflow-hidden border border-slate-200">
                                                {user.image ? <img src={user.image} alt={user.name} className="object-cover h-full w-full" /> : user.name[0]}
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-slate-800">{user.name}</p>
                                                <p className="text-xs text-slate-500">{user.email}</p>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-6 py-4">
                                        <div className="relative w-max">
                                            <select
                                                disabled={isRoleLoading}
                                                value={user.role}
                                                onChange={(e) => handleUpdate(user.id, "role", e.target.value)}
                                                className="text-xs font-medium bg-slate-100 border-none rounded-lg px-2 py-1.5 focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer disabled:opacity-50 transition-all"
                                            >
                                                <option value={UserRole.USER}>USER</option>
                                                <option value={UserRole.RIDER}>RIDER</option>
                                                <option value={UserRole.MERCHENT}>MERCHANT</option>
                                                <option value={UserRole.ADMIN}>ADMIN</option>
                                            </select>
                                            {isRoleLoading && (
                                                <div className="absolute inset-y-0 right-2 flex items-center">
                                                    <div className="h-3 w-3 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                                                </div>
                                            )}
                                        </div>
                                    </td>

                                    <td className="px-6 py-4">
                                        <div className="relative w-max">
                                            <select
                                                disabled={isStatusLoading}
                                                value={user.status}
                                                onChange={(e) => handleUpdate(user.id, "status", e.target.value)}
                                                className={`text-xs font-bold rounded-full px-3 py-1 border-none outline-none cursor-pointer appearance-none text-center transition-all disabled:opacity-50 ${user.status === UserStatus.ACTIVE ? "bg-emerald-100 text-emerald-700" :
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

                                    <td className="px-6 py-4 text-xs text-slate-500">
                                        {new Date(user.createdAt).toLocaleDateString()}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

                {/* Empty State */}
                {filteredUsers.length === 0 && (
                    <div className="p-12 text-center text-slate-500">
                        <p className="text-sm font-medium">No users found matching "{searchTerm}"</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllUsersTable;