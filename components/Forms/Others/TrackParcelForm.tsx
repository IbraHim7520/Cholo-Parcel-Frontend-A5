"use client";

import React, { useState } from "react";
import { Search, Loader2, PackageCheck } from "lucide-react";
import { env } from "@/Config/env";
import { toast } from "sonner";

const TrackingSearchForm = () => {
  const [trackingId, setTrackingId] = useState("");
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<any>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!trackingId.trim()) {
      toast.error("Please enter a tracking ID");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        `${env.BACKEND_URL}/users/percel-status/${trackingId}`
      );
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed");

      setStats(data.data);
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
      setStats(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-4">

      {/* 🔶 Search Card */}
      <div className="w-full max-w-2xl bg-white/80 backdrop-blur-xl border border-orange-100 rounded-3xl shadow-xl p-6 md:p-8 space-y-6">

        <div className="text-center space-y-2">
          <h1 className="text-2xl font-black text-slate-800 flex items-center justify-center gap-2">
            <PackageCheck className="text-orange-500" />
            Track Parcel
          </h1>
          <p className="text-sm text-slate-500">
            Enter your parcel ID to check delivery status
          </p>
        </div>

        {/* 🔍 Form */}
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-3">
          <input
            type="text"
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
            placeholder="Enter your parcel ID..."
            className="flex-1 px-4 py-3 rounded-xl border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm"
          />

          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition disabled:opacity-70"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <>
                <Search size={18} />
                Search
              </>
            )}
          </button>
        </form>
      </div>

      {/* 🔶 Result */}
      {stats && (
        <div className="mt-6 w-full max-w-2xl bg-white border border-orange-100 rounded-2xl shadow-md p-6">
          <h2 className="text-lg font-bold text-orange-600 mb-3">
            📦 Parcel Status
          </h2>

          <div className="space-y-2 text-sm text-slate-700">
            <p><span className="font-semibold">Status:</span> {stats.status}</p>
            <p><span className="font-semibold">Receiver:</span> {stats.reciverName}</p>
            <p><span className="font-semibold">Contact:</span> {stats.reciverContact}</p>
            <p><span className="font-semibold">Address:</span> {stats.reciverAddress}</p>
            <p><span className="font-semibold">Pickup:</span> {stats.isSelfPickup ? "Self Pickup" : "Home Delivery"}</p>
            <p><span className="font-semibold">Delivery:</span> {new Date(stats.deliveryTime).toLocaleDateString()}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackingSearchForm;