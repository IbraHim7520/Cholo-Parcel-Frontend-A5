"use client";

import  { useState, useEffect, useMemo } from "react";
import {
    Bell,
    Search,
    X,
    Clock,
    Inbox,
    Loader2,
    ChevronRight,
    Circle
} from "lucide-react";
import { env } from "@/Config/env";
import { toast } from "sonner";
import { NotificationTarget } from "@/Interfaces/interfaces";

interface IGetNotificationData {
    title: string;
    message: string;
    id: string;
    target: NotificationTarget;
    createdAt: string;
    updatedAt: string;
}

const MyNotificationPage = () => {
    const [notifications, setNotifications] = useState<IGetNotificationData[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    // 1. Fetch User Notifications
    const fetchMyNotifications = async () => {
        try {
            setLoading(true);
            const res = await fetch(`${env.BACKEND_URL}/users/notifications`, {
                method: "GET",
                // @ts-ignore - Including credentials as per your requirement
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            });

            if (!res.ok) throw new Error("Failed to fetch");
            const data = await res.json();

            // Adjust based on your API response structure
            const finalData = Array.isArray(data) ? data : data.data || [];
            setNotifications(finalData);
        } catch (error) {
            toast.error("Could not load your notifications");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMyNotifications();
    }, []);

    // 2. Filter Logic
    const filteredNotifications = useMemo(() => {
        return notifications.filter((n) =>
            n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            n.message.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, notifications]);

    return (
        <div className="min-h-screen bg-[#fffaf5] p-4 md:p-8">
            <div className="max-w-4xl mx-auto space-y-6">

                {/* 🟠 Header & Search Section */}
                <div className="bg-white p-6 rounded-3xl border border-orange-100 shadow-sm space-y-4">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-orange-500 rounded-2xl text-white shadow-lg shadow-orange-100">
                            <Bell size={24} />
                        </div>
                        <div>
                            <h1 className="text-2xl font-black text-slate-800">My Feed</h1>
                            <p className="text-sm text-slate-500 font-medium">Stay updated with your latest alerts</p>
                        </div>
                    </div>

                    <div className="relative group">
                        {/* Search Icon */}
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Search
                                className="text-orange-300 group-focus-within:text-orange-500 transition-colors"
                                size={20}
                            />
                        </div>

                        {/* Input Field */}
                        <input
                            type="text"
                            placeholder="Search in notifications..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-12 py-4 bg-orange-50/50 border border-orange-100 rounded-2xl 
                   focus:ring-4 focus:ring-orange-100 focus:border-orange-300 outline-none 
                   transition-all font-medium text-slate-700 placeholder:text-orange-300 
                   shadow-inner shadow-orange-100/20"
                        />

                        {/* Clear Button (X) */}
                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm("")}
                                className="absolute inset-y-0 right-0 pr-4 flex items-center text-orange-400 
                       hover:text-rose-500 transition-colors active:scale-90"
                                type="button"
                            >
                                <X size={18} />
                            </button>
                        )}
                    </div>
                </div>

                {/* 📋 Notifications List */}
                <div className="space-y-3">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20 gap-4">
                            <Loader2 className="animate-spin text-orange-500" size={40} />
                            <p className="text-orange-900/40 font-bold animate-pulse">Loading your feed...</p>
                        </div>
                    ) : filteredNotifications.length === 0 ? (
                        <div className="bg-white rounded-3xl p-16 text-center border border-dashed border-orange-200">
                            <div className="inline-flex p-4 bg-orange-50 rounded-full text-orange-300 mb-4">
                                <Inbox size={48} />
                            </div>
                            <h3 className="text-lg font-bold text-slate-700">No notifications found</h3>
                            <p className="text-sm text-slate-400">Try adjusting your search or check back later.</p>
                        </div>
                    ) : (
                        filteredNotifications.map((notif) => (
                            <div
                                key={notif.id}
                                className="group bg-white p-5 rounded-2xl border border-orange-50 hover:border-orange-200 hover:shadow-md hover:shadow-orange-100/50 transition-all cursor-pointer flex gap-4"
                            >
                                <div className="mt-1">
                                    <Circle size={10} className="fill-orange-500 text-orange-500" />
                                </div>

                                <div className="flex-1 space-y-1">
                                    <div className="flex justify-between items-start">
                                        <h3 className="font-bold text-slate-800 group-hover:text-orange-600 transition-colors">
                                            {notif.title}
                                        </h3>
                                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-orange-400 uppercase tracking-wider">
                                            <Clock size={12} />
                                            {new Date(notif.createdAt).toLocaleDateString()}
                                        </div>
                                    </div>
                                    <p className="text-sm text-slate-600 leading-relaxed">
                                        {notif.message}
                                    </p>
                                    <div className="pt-2 flex items-center gap-2 text-[10px] font-black text-orange-800/40 uppercase">
                                        <span>ID: {notif.id.slice(-6)}</span>
                                        <span>•</span>
                                        <span>{notif.target} Broadcast</span>
                                    </div>
                                </div>

                                <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <ChevronRight className="text-orange-300" />
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* 📊 Footer Stats */}
                {!loading && filteredNotifications.length > 0 && (
                    <p className="text-center text-[11px] font-bold text-orange-900/30 uppercase tracking-[0.2em]">
                        Showing {filteredNotifications.length} of {notifications.length} notifications
                    </p>
                )}
            </div>
        </div>
    );
};

export default MyNotificationPage;