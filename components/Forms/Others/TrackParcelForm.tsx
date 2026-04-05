"use client";

import React, { useState } from "react";
import { Search, Loader2, PackageCheck, Star } from "lucide-react";
import { env } from "@/Config/env";
import { toast } from "sonner";
import { PercelStatus } from "@/Interfaces/interfaces";
import { useUser } from "@/utils/useUser";
import Link from "next/link";

const TrackingSearchForm = () => {
  const [trackingId, setTrackingId] = useState("");
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<any>(null);

  // ⭐ Review states
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [reviewLoading, setReviewLoading] = useState(false);

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

  const openModal = () => {
    const modal = document.getElementById("review_modal") as HTMLDialogElement;
    modal?.showModal();
  };

  const closeModal = () => {
    const modal = document.getElementById("review_modal") as HTMLDialogElement;
    modal?.close();
    setRating(0);
    setComment("");
  };

  const handleSubmitReview = async () => {
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    if (comment.length > 200) {
      toast.error("Comment max 200 characters");
      return;
    }

    try {
      setReviewLoading(true);

      const reviewData = {
          rating: rating,
          comment: comment,
        userId: String(user?.id),
        percelId: String(trackingId)
      }
      console.log(reviewData)
      const res = await fetch(`${env.BACKEND_URL}/users/create-reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed");

      toast.success(data.message || "Review submitted successfully");
      closeModal();
    } catch (err: any) {
      toast.error(err.message || "Failed to submit review");
    } finally {
      setReviewLoading(false);
    }
  };
  const {user} = useUser()

  return (
    <div className="flex flex-col items-center justify-center px-4">

      {/* ⭐ Modal */}
      <dialog id="review_modal" className="modal modal-middle">
        <div className="modal-box space-y-4">
          <h3 className="font-bold text-lg text-center">⭐ Give Review</h3>

          {/* ⭐ Star Rating */}
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={28}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
                className={`cursor-pointer transition ${(hover || rating) >= star
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                  }`}
              />
            ))}
          </div>

          {/* ✍️ Comment */}
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            maxLength={200}
            placeholder="Write your feedback (max 200 chars)..."
            className="w-full p-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
          />

          <p className="text-xs text-right text-gray-400">
            {comment.length}/200
          </p>

          {/* 🔘 Actions */}
          <div className="flex justify-end gap-3">
            <button onClick={closeModal} className="btn">
              Cancel
            </button>

            <button
              onClick={handleSubmitReview}
              disabled={reviewLoading}
              className="px-5 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white flex items-center gap-2"
            >
              {reviewLoading && <Loader2 className="animate-spin" size={16} />}
              Submit
            </button>
          </div>
        </div>
      </dialog>

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

          {[
            PercelStatus.DELIVERED,
            PercelStatus.CANCELLED,
            PercelStatus.RETURNED,
          ].includes(stats.status) && (
              <div className="mt-6 flex justify-center">
                {user ?
                <button
                  onClick={openModal}
                  className="px-8 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold shadow-md transition"
                >
                  ⭐ Give Review
                </button>
                :
                <Link
                  href={"/login"}
                  className="px-8 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold shadow-md transition"
                >
                  Login to Give Review
                </Link>
                }
              </div>
            )}
        </div>
      )}
    </div>
  );
};

export default TrackingSearchForm;