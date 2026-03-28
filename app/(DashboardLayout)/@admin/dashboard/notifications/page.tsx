"use client";
import React, { useState, useMemo, useEffect } from "react";
import {
    Bell,
    Send,
    Search,
    Users,
    Trash2,
    Calendar,
    Loader2,
    AlertCircle
} from "lucide-react";
import { toast } from "sonner";
import { env } from "@/Config/env";
import { NotificationTarget } from "@/Interfaces/interfaces";

interface INotification {
    id: string;
    title: string;
    message: string;
    target: NotificationTarget;
    createdAt: string;
}

const AdminNotificationsPage = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [notifications, setNotifications] = useState<INotification[]>([]);

    // Form State
    const [newNotify, setNewNotify] = useState({
        title: "",
        message: "",
        target: NotificationTarget.ALL
    });

    // 1. Fetch All Notifications (Based on your commented API)
    const fetchNotifications = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(`${env.BACKEND_URL}/notifications/all-notification`, {
                method: "GET",
                credentials: "include",
            });
            const result = await res.json();

            if (result.success) {
                setNotifications(result.data);
            } else {
                toast.error(result.message || "Failed to fetch notifications");
            }
        } catch (error) {
            toast.error("Error connecting to server");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchNotifications();
    }, []);

    // 2. Filter Logic for Search
    const filteredNotifications = useMemo(() => {
        return notifications.filter(n =>
            n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            n.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
            n.target.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, notifications]);

    // 3. Create Notification Logic
    const handleCreateNotification = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const res = await fetch(`${env.BACKEND_URL}/notifications/create-notification`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newNotify),
            });

            const data = await res.json();

            if (data.success) {
                toast.success("Notification broadcasted successfully!");
                // Response data ke list-er shuru te add kora
                setNotifications((prev) => [data.data, ...prev]);
                setNewNotify({ title: "", message: "", target: NotificationTarget.ALL });
            } else {
                toast.error(data.message || "Failed to send notification");
            }
        } catch (error) {
            toast.error("Network error. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // 4. Delete Notification Logic
    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this notification?")) return;

        try {
            const res = await fetch(`${env.BACKEND_URL}/notifications/${id}`, {
                method: "DELETE",
                credentials: "include",
            });
            const data = await res.json();

            if (data.success) {
                setNotifications((prev) => prev.filter((n) => n.id !== id));
                toast.success("Notification deleted successfully");
            } else {
                toast.error(data.message || "Could not delete");
            }
        } catch (error) {
            toast.error("Server error during deletion");
        }
    };

    return (
        <div className="p-6 bg-slate-50 min-h-screen space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
                    <Bell className="text-blue-600" /> Notification Center
                </h1>
                <p className="text-slate-500 text-sm">Manage announcements for Tutora & Cholo Parcel.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Notification Form */}
                <div className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm sticky top-6">
                        <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                            <Send size={18} className="text-blue-500" /> New Broadcast
                        </h2>

                        <form onSubmit={handleCreateNotification} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">Target Group</label>
                                <select
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                    value={newNotify.target}
                                    onChange={(e) => setNewNotify({ ...newNotify, target: e.target.value as NotificationTarget })}
                                >
                                    <option value={NotificationTarget.ALL}>ALL USERS</option>
                                    <option value={NotificationTarget.USER}>GENERAL USER</option>
                                    <option value={NotificationTarget.MERCHENT}>MERCHANTS</option>
                                    <option value={NotificationTarget.RIDER}>RIDERS</option>
                                    <option value={NotificationTarget.ADMIN}>ADMINS</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">Title</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Announcement Title"
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                    value={newNotify.title}
                                    onChange={(e) => setNewNotify({ ...newNotify, title: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">Message</label>
                                <textarea
                                    required
                                    rows={4}
                                    placeholder="Write your message here..."
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
                                    value={newNotify.message}
                                    onChange={(e) => setNewNotify({ ...newNotify, message: e.target.value })}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 flex items-center justify-center gap-2 disabled:opacity-70"
                            >
                                {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : "Broadcast Now"}
                            </button>
                        </form>
                    </div>
                </div>

                {/* History Table */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                            <div className="relative w-full max-w-xs">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                <input
                                    type="text"
                                    placeholder="Search history..."
                                    className="pl-10 pr-4 py-2 w-full bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest hidden sm:block">History Log</span>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="text-slate-500 text-[10px] font-bold uppercase tracking-widest border-b border-slate-100">
                                        <th className="px-6 py-4">Notification Details</th>
                                        <th className="px-6 py-4">Target</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {isLoading ? (
                                        <tr>
                                            <td colSpan={3} className="text-center py-20">
                                                <Loader2 className="animate-spin mx-auto text-blue-600 mb-2" size={32} />
                                                <p className="text-slate-400 text-sm">Fetching history...</p>
                                            </td>
                                        </tr>
                                    ) : filteredNotifications.length > 0 ? (
                                        filteredNotifications.map((n) => (
                                            <tr key={n.id} className="hover:bg-slate-50/30 transition-colors">
                                                <td className="px-6 py-4">
                                                    <p className="font-bold text-slate-700 text-sm">{n.title}</p>
                                                    <p className="text-xs text-slate-500 line-clamp-1 mb-2">{n.message}</p>
                                                    <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                                                        <Calendar size={12} /> {new Date(n.createdAt).toLocaleDateString()}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-tight ${n.target === NotificationTarget.ALL ? "bg-purple-100 text-purple-700" :
                                                            n.target === NotificationTarget.ADMIN ? "bg-rose-100 text-rose-700" :
                                                                "bg-blue-100 text-blue-700"
                                                        }`}>
                                                        <Users size={12} /> {n.target}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <button
                                                        onClick={() => handleDelete(n.id)}
                                                        className="p-2 text-slate-300 hover:text-rose-500 transition-all hover:bg-rose-50 rounded-lg"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={3} className="text-center py-20">
                                                <AlertCircle className="mx-auto text-slate-200 mb-2" size={40} />
                                                <p className="text-slate-400 text-sm">No notification records found.</p>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminNotificationsPage;