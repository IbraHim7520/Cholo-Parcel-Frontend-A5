"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "@tanstack/react-form";
import {
    Bell,
    Plus,
    Trash2,
    X,
    Loader2,
    Megaphone,
    Users,
    ShieldCheck,
    Bike,
    Store
} from "lucide-react";
import { toast } from "sonner";
import { env } from "@/Config/env";
import { NotificationTarget } from "@/Interfaces/interfaces";
//next kaj notification get kora

interface INotification {
    id: string;
    title: string;
    content: string;
    target: NotificationTarget;
    createdAt: string;
}

const NotificationManagementPage = () => {
    const [notifications, setNotifications] = useState<INotification[]>([]);
    const [loading, setLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const fetchNotifications = async () => {
        try {
            setLoading(true);
            const res = await fetch(`${env.BACKEND_URL}/admins/notifications`);
            const data = await res.json();
            setNotifications(Array.isArray(data) ? data : data.data || []);
        } catch (error) {
            toast.error("Failed to load notifications");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotifications();
    }, []);

    const form = useForm({
        defaultValues: {
            title: "",
            content: "",
            target: "ALL" as NotificationTarget,
        },
        onSubmit: async ({ value }) => {
            try {
                const notificationData = {
                    title: value.title,
                    message: value.content,
                    target:value.target
                }
                const res = await fetch(`${env.BACKEND_URL}/admins/create-notification`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(notificationData),
                });

                if (!res.ok) throw new Error();

                toast.success("Notification broadcasted!");
                form.reset();
                setIsDialogOpen(false);
                fetchNotifications();
            } catch (err) {
                toast.error("Failed to create notification");
            }
        },
    });

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this notification?")) return;
        setDeletingId(id);
        try {
            const res = await fetch(`${env.BACKEND_URL}/admins/delete-notification/${id}`, {
                method: "DELETE",
            });
            if (res.ok) {
                setNotifications(prev => prev.filter(n => n.id !== id));
                toast.success("Deleted");
            }
        } catch {
            toast.error("Delete failed");
        } finally {
            setDeletingId(null);
        }
    };

    const getTargetIcon = (target: NotificationTarget) => {
        switch (target) {
            case "ADMIN": return <ShieldCheck size={14} className="text-amber-600" />;
            case "MERCHENT": return <Store size={14} className="text-orange-600" />;
            case "RIDER": return <Bike size={14} className="text-orange-500" />;
            case "USER": return <Users size={14} className="text-orange-400" />;
            default: return <Megaphone size={14} className="text-slate-500" />;
        }
    };

    return (
        <div className="min-h-screen p-4 md:p-8 bg-[#fffaf5] space-y-6">
            {/* 🟠 Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-3xl shadow-sm border border-orange-100">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-orange-500 rounded-2xl text-white shadow-lg shadow-orange-200">
                        <Bell size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-800 tracking-tight">Notifications</h1>
                        <p className="text-sm text-slate-500 font-medium">Broadcast alerts to the system</p>
                    </div>
                </div>
                <button
                    onClick={() => setIsDialogOpen(true)}
                    className="flex items-center hover:cursor-pointer gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 btn  rounded-xl font-bold transition-all active:scale-95 shadow-md shadow-orange-100"
                >
                    <Plus size={18} />
                    Create New
                </button>
            </div>

            {/* 📋 Table Container */}
            <div className="bg-white rounded-3xl shadow-sm border border-orange-50 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-orange-50/50 border-b border-orange-100">
                            <tr>
                                <th className="px-6 py-4 text-[11px] font-black text-orange-800/60 uppercase tracking-widest">Target</th>
                                <th className="px-6 py-4 text-[11px] font-black text-orange-800/60 uppercase tracking-widest">Details</th>
                                <th className="px-6 py-4 text-[11px] font-black text-orange-800/60 uppercase tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-orange-50">
                            {loading ? (
                                <tr><td colSpan={3} className="py-20 text-center"><Loader2 className="animate-spin mx-auto text-orange-500" /></td></tr>
                            ) : notifications.length === 0 ? (
                                <tr><td colSpan={3} className="py-20 text-center text-slate-400 italic font-medium">No active broadcasts</td></tr>
                            ) : (
                                notifications.map((notif) => (
                                    <tr key={notif.id} className="hover:bg-orange-50/30 transition-colors group">
                                        <td className="px-6 py-5 align-top">
                                            <div className="flex items-center gap-2 px-3 py-1 bg-orange-50 border border-orange-100 rounded-full w-fit">
                                                {getTargetIcon(notif.target)}
                                                <span className="text-[10px] font-black text-orange-700">{notif.target}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <p className="font-bold text-slate-800 mb-1">{notif.title}</p>
                                            <p className="text-sm text-slate-500 line-clamp-2 max-w-xl">{notif.content}</p>
                                            <p className="text-[10px] text-orange-400 mt-2 font-bold uppercase">
                                                {new Date(notif.createdAt).toLocaleDateString()} • {new Date(notif.createdAt).toLocaleTimeString()}
                                            </p>
                                        </td>
                                        <td className="px-6 py-5 text-right">
                                            <button
                                                disabled={deletingId === notif.id}
                                                onClick={() => handleDelete(notif.id)}
                                                className="p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all"
                                            >
                                                {deletingId === notif.id ? <Loader2 size={18} className="animate-spin" /> : <Trash2 size={18} />}
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 🖼️ Orange Dialog Box */}
            {isDialogOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-orange-950/20 backdrop-blur-sm" onClick={() => setIsDialogOpen(false)} />
                    <div className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden border border-orange-100 animate-in fade-in zoom-in duration-200">
                        <div className="flex items-center justify-between p-6 border-b border-orange-50 bg-orange-50/30">
                            <h2 className="text-xl font-black text-orange-900">New Broadcast</h2>
                            <button onClick={() => setIsDialogOpen(false)} className="p-2 hover:bg-orange-100 text-orange-900 rounded-full transition-colors">
                                <X size={20} />
                            </button>
                        </div>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                form.handleSubmit();
                            }}
                            className="p-6 space-y-4"
                        >
                            <form.Field
                                name="title"
                                validators={{
                                    onChange: ({ value }) => {
                                        if (value.length < 3) return "Too short";
                                        if (value.length > 100) return "Too long";
                                        return undefined;
                                    }
                                }}
                                children={(field) => (
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-black text-orange-800/60 uppercase ml-1">Title</label>
                                        <input
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            className="w-full px-4 py-3 bg-orange-50/30 border border-orange-100 rounded-xl focus:ring-2 focus:ring-orange-200 focus:border-orange-400 outline-none transition-all font-medium"
                                            placeholder="Urgent Update..."
                                        />
                                        {field.state.meta.errors && <p className="text-[10px] text-rose-500 font-bold ml-1">{field.state.meta.errors}</p>}
                                    </div>
                                )}
                            />

                            <form.Field
                                name="content"
                                validators={{
                                    onChange: ({ value }) => value.length > 200 ? "Limit exceeded" : undefined
                                }}
                                children={(field) => (
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-black text-orange-800/60 uppercase ml-1">Content</label>
                                        <textarea
                                            rows={3}
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            className="w-full px-4 py-3 bg-orange-50/30 border border-orange-100 rounded-xl focus:ring-2 focus:ring-orange-200 focus:border-orange-400 outline-none transition-all font-medium resize-none"
                                            placeholder="Write your alert message..."
                                        />
                                        <div className="flex justify-between px-1">
                                            {field.state.meta.errors ? <p className="text-[10px] text-rose-500 font-bold">{field.state.meta.errors}</p> : <div />}
                                            <span className="text-[10px] font-bold text-orange-300">{field.state.value.length}/200</span>
                                        </div>
                                    </div>
                                )}
                            />

                            <form.Field
                                name="target"
                                children={(field) => (
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-black text-orange-800/60 uppercase ml-1">Target Audience</label>
                                        <select
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value as NotificationTarget)}
                                            className="w-full px-4 py-3 bg-orange-50/30 border border-orange-100 rounded-xl outline-none font-bold text-orange-900 cursor-pointer focus:border-orange-400"
                                        >
                                            <option value={NotificationTarget.ALL}>All Users</option>
                                            <option value={NotificationTarget.USER}>Customers</option>
                                            <option value={NotificationTarget.MERCHENT}>Merchants</option>
                                            <option value={NotificationTarget.RIDER}>Riders</option>
                                            <option value={NotificationTarget.ADMIN}>System Admins</option>
                                        </select>
                                    </div>
                                )}
                            />

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => form.reset()}
                                    className="flex-1 py-3 border border-orange-100 rounded-xl font-bold text-orange-400 hover:bg-orange-50 transition-all"
                                >
                                    Clear
                                </button>
                                <form.Subscribe
                                    selector={(state) => [state.canSubmit, state.isSubmitting]}
                                    children={([canSubmit, isSubmitting]) => (
                                        <button
                                            type="submit"
                                            disabled={!canSubmit || isSubmitting}
                                            className="flex-[2] bg-orange-500 hover:bg-orange-600 disabled:bg-slate-200 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-orange-100 flex items-center justify-center gap-2"
                                        >
                                            {isSubmitting && <Loader2 size={16} className="animate-spin" />}
                                            Broadcast Now
                                        </button>
                                    )}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotificationManagementPage;