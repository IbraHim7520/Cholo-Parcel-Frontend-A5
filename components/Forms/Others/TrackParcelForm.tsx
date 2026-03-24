"use client";
import React, { useState } from "react";
import { Search, Loader2 } from "lucide-react";

const TrackingSearchForm = () => {
  const [trackingId, setTrackingId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => setLoading(false), 2000);
  };

  return (
        <form className="flex flex-col items-center gap-4">
            <input type="text"
            placeholder="Enter you parcel Id"
            className="input max-w-2/4 min-w-3/4"
            />
    <button className="btn w-1/4 bg-orange-500 border-none shadow-none text-white">Search</button>
        </form>
  );
};

export default TrackingSearchForm;