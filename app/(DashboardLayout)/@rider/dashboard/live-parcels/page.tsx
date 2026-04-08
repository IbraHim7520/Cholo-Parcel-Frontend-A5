import LiveParcelTable from "@/components/Tables/RiderLiveParcelTable";
import { env } from "@/Config/env";
import { IRiderGetRequestedPercel } from "@/Interfaces/riders.interface";
import { Zap, Bike } from "lucide-react";

const LiveParcelsPage = async () => {
    const percelsRes = await fetch(`${env.BACKEND_URL}/riders/requested-percels`, {
        cache: "no-store",
    });

    const data = await percelsRes.json();
    const percelData: IRiderGetRequestedPercel[] = data.data;

    return (
        <div className="min-h-screen w-full p-4 md:p-8 space-y-6 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
            {/* 🟦 Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white/80 backdrop-blur-xl p-6 rounded-3xl shadow-lg border border-blue-100">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-200">
                        <Zap className="text-white" size={24} fill="currentColor" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-800 tracking-tight">Live Requests</h1>
                        <p className="text-sm text-slate-500 font-medium">
                            {percelData?.length || 0} parcels waiting for pickup
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-2xl border border-indigo-100">
                    <Bike size={20} className="text-indigo-600" />
                    <span className="text-sm font-bold text-indigo-700">Rider Mode Active</span>
                </div>
            </div>

            {/* 🟦 Interactive Table */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-blue-100 overflow-hidden">
                <LiveParcelTable initialData={percelData } isStatSelect={true} />
            </div>
        </div>
    );
};

export default LiveParcelsPage;