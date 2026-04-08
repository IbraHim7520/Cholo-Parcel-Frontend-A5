
import MerchentSettings from "@/components/CustomComponents/RoleBasedSettingsPages/MerchentSettings";
import RidersSetting from "@/components/CustomComponents/RoleBasedSettingsPages/RidersSetting";
import { Settings as SettingsIcon } from "lucide-react";
const SettingsPage = () => {


    return (
        <div className="min-h-screen bg-[#F8FAFC] pb-5">
            {/* Minimalist Top Header */}
            <div className="bg-white border-b border-slate-200 mb-8">
                <div className="max-w-6xl mx-auto px-6 py-8">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-orange-100 text-orange-600 rounded-lg">
                            <SettingsIcon size={20} />
                        </div>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Control Center</span>
                    </div>
                    <h1 className="text-3xl font-black text-slate-900">Account Settings</h1>
                    <p className="text-slate-500 text-sm mt-1">Manage your identity, security, and credentials.</p>
                </div>
            </div>

            <div className="max-w-full mx-auto px-6">

                {/* Left Info Column (Server Side) */}
                <aside className="w-full">
                    <div className="w-full">
                        <RidersSetting />
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default SettingsPage;