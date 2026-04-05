"use client";

import { useState } from "react";
import {
    User,
    Mail,
    ShieldCheck,
    Lock,
    LogOut,
    ChevronRight,
    Camera,
    IdCard,
    Loader2,
    Settings2
} from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

interface IAdminUser {
    id: string;
    name: string;
    email: string;
    role: string;
    image?: string;
}

const AdminSettings = ({ user }: { user: IAdminUser }) => {
    const [isUpdating, setIsUpdating] = useState(false);

    const handleLogout = () => {
        toast.loading("Signing out...");
        console.log("Logged out");
    };

    return (
        <div className="w-full mx-auto  sm:px-6 lg:px-2 py-2 space-y-6 pb-5">

            {/* Profile Card */}
            <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
                <div className="h-36 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900" />

                <div className="relative px-6 pb-8">
                    <div className="flex flex-col md:flex-row md:items-end gap-4 -mt-14">

                        {/* Avatar */}
                        <div className="relative mx-auto md:mx-0">
                            <div className="size-28 rounded-2xl border-4 border-white bg-slate-100 overflow-hidden shadow-lg">
                                {user.image ? (
                                    <Image src={user.image} alt={user.name} fill className="object-cover" />
                                ) : (
                                    <div className="size-full flex items-center justify-center bg-orange-100 text-orange-600 text-3xl font-black">
                                        {user.name.charAt(0)}
                                    </div>
                                )}
                            </div>
                            <button className="absolute -bottom-1 -right-1 p-2 bg-white rounded-xl shadow border text-slate-600 hover:text-orange-500 transition">
                                <Camera size={16} />
                            </button>
                        </div>

                        {/* Info */}
                        <div className="flex-1 text-center md:text-left ">
                            <h2 className="text-2xl font-black text-slate-900">
                                {user.name}
                            </h2>

                            <div className="inline-flex items-center gap-2 text-xs font-bold text-orange-600 bg-orange-50 px-3 py-1 rounded-lg border border-orange-100">
                                <ShieldCheck size={14} /> {user.role}
                            </div>
                        </div>
                    </div>

                    {/* Info Row */}
                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <InfoItem icon={<Mail size={16} />} label="Email" value={user.email} />
                        <InfoItem icon={<IdCard size={16} />} label="Admin ID" value={`#${user.id.slice(-8)}`} />
                    </div>
                </div>
            </div>

            {/* Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                <Section title="Security" icon={<Lock size={16} />}>
                    <SettingActionBtn label="Change Password" sub="Update credentials" />
                    <SettingActionBtn label="Update Email" sub="Change email address" />
                </Section>

                <Section title="Account" icon={<Settings2 size={16} />}>
                    <SettingActionBtn label="Personal Info" sub="Edit your profile" />

                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-between p-4 rounded-xl bg-rose-50 border border-rose-100 hover:bg-rose-100 transition"
                    >
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-white rounded-lg text-rose-600">
                                <LogOut size={16} />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-rose-900">Sign Out</p>
                                <p className="text-xs text-rose-500">End session</p>
                            </div>
                        </div>
                        <ChevronRight size={16} className="text-rose-300" />
                    </button>
                </Section>
            </div>

            {/* Footer */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-3 px-6 py-4 bg-slate-50 border rounded-xl">
                <p className="text-xs text-slate-400">
                    Last activity: Dhaka, Bangladesh
                </p>
                {isUpdating && (
                    <div className="flex items-center gap-2 text-blue-600 text-xs">
                        <Loader2 size={14} className="animate-spin" /> Updating...
                    </div>
                )}
            </div>
        </div>
    );
};

const Section = ({ title, icon, children }: any) => (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
        <h3 className="flex items-center gap-2 font-bold text-slate-800">
            {icon} {title}
        </h3>
        <div className="space-y-3">{children}</div>
    </div>
);

const InfoItem = ({ icon, label, value }: any) => (
    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
        <div className="p-2 bg-white rounded-lg text-slate-400">{icon}</div>
        <div>
            <p className="text-xs text-slate-400">{label}</p>
            <p className="text-sm font-semibold text-slate-900">{value}</p>
        </div>
    </div>
);

const SettingActionBtn = ({ label, sub }: { label: string; sub: string }) => (
    <button className="w-full flex items-center justify-between p-4 rounded-xl bg-slate-50 border hover:bg-white transition">
        <div>
            <p className="text-sm font-bold text-slate-900">{label}</p>
            <p className="text-xs text-slate-400">{sub}</p>
        </div>
        <ChevronRight size={16} className="text-slate-300" />
    </button>
);

export default AdminSettings;