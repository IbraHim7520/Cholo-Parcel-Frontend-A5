import LiveParcelTable from "@/components/Tables/RiderLiveParcelTable";
import { env } from "@/Config/env";
import { PercelStatus } from "@/Interfaces/interfaces";
import { IRiderGetRequestedPercel } from "@/Interfaces/riders.interface";
import { Bike, Zap } from "lucide-react"

const DeliveredPage = async() => {
     const res = await fetch(`${env.BACKEND_URL}/riders/my-percels`);
    const result = await res.json();
    const data:IRiderGetRequestedPercel[] = result.data;
    const deliveredPercels = data.filter((percel)=> percel.status === PercelStatus.DELIVERED);
    return (
        <div className="min-h-screen w-full p-4 md:p-8 space-y-6 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
            {/* 🟦 Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white/80 backdrop-blur-xl p-6 rounded-3xl shadow-lg border border-blue-100">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-200">
                        <Zap className="text-white" size={24} fill="currentColor" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-800 tracking-tight">Delivered Percels</h1>
                        <p className="text-sm text-slate-500 font-medium">
                            {deliveredPercels?.length || 0} parcels delivered
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
                <LiveParcelTable initialData={deliveredPercels} isStatSelect={false} />
            </div>
        </div>
    )
}

export default DeliveredPage