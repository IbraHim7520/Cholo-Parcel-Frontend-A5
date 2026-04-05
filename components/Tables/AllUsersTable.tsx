"use client";

import { useState } from "react";
import { env } from "@/Config/env";
import { IAdminGetAllUsers } from "@/Interfaces/admin.interface";
import { Search, Trash2, Mail, ShieldCheck, User as UserIcon, Loader2, Calendar } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

export default function UsersTable({ initialData }: { initialData: IAdminGetAllUsers[] }) {
    const [users, setUsers] = useState<IAdminGetAllUsers[]>(initialData);
    const [searchTerm, setSearchTerm] = useState("");
    const [deletingId, setDeletingId] = useState<string | null>(null);

    // Filtering logic
    const filteredUsers = users.filter((u) =>
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDeleteUser = async (userId: string) => {
        if (!confirm("Are you sure you want to permanently delete this user?")) return;

        setDeletingId(userId);
        try {
            const response = await fetch(`${env.BACKEND_URL}/admins/delete-user/${userId}`, {
                method: "DELETE",
                credentials: "include",
            });
            const result = await response.json();

            if (result.success) {
                toast.success("User deleted successfully");
                setUsers((prev) => prev.filter((u) => u.id !== userId));
            } else {
                toast.error(result.message || "Failed to delete user");
            }
        } catch (error) {
            toast.error("An error occurred during deletion");
        } finally {
            setDeletingId(null);
        }
    };

    const getRoleBadge = (role: string) => {
        const styles: Record<string, string> = {
            ADMIN: "bg-purple-50 text-purple-600 border-purple-100",
            MERCHANT: "bg-blue-50 text-blue-600 border-blue-100",
            RIDER: "bg-orange-50 text-orange-600 border-orange-100",
            USER: "bg-slate-50 text-slate-600 border-slate-100",
        };
        return (
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider ${styles[role] || styles.USER}`}>
                {role}
            </span>
        );
    };

    return (
        <div className="space-y-4">
            {/* Search Controls */}
            <div className="relative max-w-md group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-colors size-4" />
                <input
                    type="text"
                    placeholder="Search by name or email address..."
                    className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 outline-none transition-all text-sm shadow-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Table Container */}
            <div className="bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50/50 text-slate-500 uppercase text-[11px] font-bold tracking-widest border-b border-slate-100">
                            <tr>
                                <th className="px-8 py-5">Profile</th>
                                <th className="px-6 py-5">Role & Security</th>
                                <th className="px-6 py-5">Activity</th>
                                <th className="px-8 py-5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {filteredUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-slate-50/80 transition-all group">
                                    {/* Profile Column */}
                                    <td className="px-8 py-4">
                                        <div className="flex items-center gap-4">
                                          
                                            <div className="relative size-11 rounded-2xl overflow-hidden bg-slate-100">
                                                {/* CHECK: Only render Image if user.image exists and is a valid-looking URL */}
                                                {user.image && user.image.startsWith('http') ? (
                                                    <Image
                                                        src={user.image}
                                                        alt={user.name}
                                                        fill
                                                        className="object-cover"
                                                    // Optional: add unoptimized if you're having trouble with local dev domains
                                                    // unoptimized 
                                                    />
                                                ) : (
                                                    <div className="size-full flex items-center justify-center bg-orange-100 text-orange-600 font-black text-lg">
                                                        {user.name?.charAt(0) || "U"}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="space-y-0.5">
                                                <p className="font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                                                    {user.name}
                                                </p>
                                                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                                                    <Mail size={12} />
                                                    {user.email}
                                                </div>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Role Column */}
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col gap-2 items-start">
                                            {getRoleBadge(user.role)}
                                            {user.emailVerified && (
                                                <div className="flex items-center gap-1 text-[10px] text-emerald-600 font-medium">
                                                    <ShieldCheck size={12} /> Verified Account
                                                </div>
                                            )}
                                        </div>
                                    </td>

                                    {/* Date Column */}
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 text-slate-500 text-xs font-medium">
                                            <Calendar size={14} className="text-slate-300" />
                                            Joined {new Date(user.createdAt).toLocaleDateString()}
                                        </div>
                                    </td>

                                    {/* Actions Column */}
                                    <td className="px-8 py-4 text-right">
                                        <button
                                            disabled={deletingId === user.id}
                                            onClick={() => handleDeleteUser(user.id)}
                                            className="p-3 text-slate-300 hover:text-rose-600 hover:bg-rose-50 rounded-2xl transition-all disabled:opacity-50"
                                            title="Delete User"
                                        >
                                            {deletingId === user.id ? (
                                                <Loader2 size={20} className="animate-spin" />
                                            ) : (
                                                <Trash2 size={20} />
                                            )}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Empty State */}
                    {filteredUsers.length === 0 && (
                        <div className="py-24 text-center">
                            <div className="size-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100">
                                <UserIcon className="size-10 text-slate-200" />
                            </div>
                            <h3 className="text-slate-900 font-bold">No Users Found</h3>
                            <p className="text-slate-400 text-sm max-w-[200px] mx-auto mt-1">Try adjusting your search filters.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}