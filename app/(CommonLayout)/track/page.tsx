import React from "react";
import { Search, Info, Truck, ShieldCheck, Map } from "lucide-react";
import TrackingSearchForm from "@/components/Forms/Others/TrackParcelForm";

const TrackParcelPage = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Search Header Section */}
      <section className="bg-[#0F172A] pt-20 pb-32 px-4 relative overflow-hidden text-center">
        {/* Decorative background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-orange-500/10 via-transparent to-transparent"></div>

        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
            Track Your <span className="text-orange-500">Parcel</span>
          </h1>
          <p className="mt-4 text-slate-400 text-sm md:text-base">
            Enter your unique tracking ID to see real-time updates on your delivery status.
          </p>

          {/* Search Bar Component (Client) */}
          <div className="mt-10 max-w-2xl mx-auto">
             <TrackingSearchForm />
          </div>
          
          <p className="mt-6 text-slate-500 text-xs">
            Format example: <span className="text-slate-300">CP-1234-5678</span>
          </p>
        </div>
      </section>

      {/* Info Section */}
      <section className="max-w-6xl mx-auto px-4 -mt-16 pb-20 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Step 1 */}
          <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 group hover:-translate-y-2 transition-transform duration-300">
            <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-orange-500 group-hover:text-white transition-colors">
              <Search size={24} />
            </div>
            <h3 className="font-bold text-slate-900 text-lg">Enter ID</h3>
            <p className="text-slate-500 text-sm mt-2 leading-relaxed">
              Find the tracking number on your receipt or in the SMS we sent you.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 group hover:-translate-y-2 transition-transform duration-300">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-500 group-hover:text-white transition-colors">
              <Truck size={24} />
            </div>
            <h3 className="font-bold text-slate-900 text-lg">Live Updates</h3>
            <p className="text-slate-500 text-sm mt-2 leading-relaxed">
              See exactly where your parcel is and its current processing stage.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 group hover:-translate-y-2 transition-transform duration-300">
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-green-500 group-hover:text-white transition-colors">
              <ShieldCheck size={24} />
            </div>
            <h3 className="font-bold text-slate-900 text-lg">Safe Delivery</h3>
            <p className="text-slate-500 text-sm mt-2 leading-relaxed">
              Receive your parcel and enjoy our fast, reliable nation-wide service.
            </p>
          </div>

        </div>

        {/* Support Banner */}
        <div className="mt-16 bg-white border border-slate-200 rounded-[2rem] p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
                <div className="bg-slate-100 p-3 rounded-xl text-slate-600">
                    <Info size={20} />
                </div>
                <p className="text-slate-600 text-sm font-medium text-center sm:text-left">
                    Can&apos;t find your tracking ID? Contact our support team for assistance.
                </p>
            </div>
            <button className="btn btn-ghost text-orange-600 hover:bg-orange-50 font-bold decoration-2">
                Get Help →
            </button>
        </div>
      </section>
    </div>
  );
};

export default TrackParcelPage;