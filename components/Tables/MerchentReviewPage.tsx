"use client";

import { useState } from "react";
import { Trash2, Loader2, User, MapPin, Calendar, Star } from "lucide-react";
import { toast } from "sonner";
import { env } from "@/Config/env";

interface ReviewTableProps {
    initialReviews: any[];
}

const ReviewTable = ({ initialReviews }: ReviewTableProps) => {
    const [reviews, setReviews] = useState(initialReviews);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this review?")) return;

        setDeletingId(id);
        try {
            const res = await fetch(`${env.BACKEND_URL}/merchent/delete-review/${id}`, {
                credentials:"include",
                method: "DELETE",
            });

            if (res.ok) {
                setReviews((prev) => prev.filter((r) => r.id !== id));
                toast.success("Review deleted successfully");
            } else {
                throw new Error("Failed to delete");
            }
        } catch (error) {
            toast.error("Could not delete review");
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead>
                    <tr className="bg-orange-50/50 border-b border-orange-100">
                        <th className="px-6 py-4 text-[11px] font-black text-slate-500 uppercase">Customer</th>
                        <th className="px-6 py-4 text-[11px] font-black text-slate-500 uppercase">Parcel Details</th>
                        <th className="px-6 py-4 text-[11px] font-black text-slate-500 uppercase">Review</th>
                        <th className="px-6 py-4 text-[11px] font-black text-slate-500 uppercase text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-orange-50">
                    {reviews.length === 0 ? (
                        <tr>
                            <td colSpan={4} className="py-20 text-center text-slate-400 italic">
                                No reviews found yet.
                            </td>
                        </tr>
                    ) : (
                        reviews.map((review) => (
                            <tr key={review.id} className="hover:bg-orange-50/30 transition-colors group">
                                {/* Customer Info */}
                                <td className="px-6 py-5">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-full bg-slate-200 overflow-hidden border-2 border-white shadow-sm">
                                            {review.user?.image ? (
                                                <img src={review.user.image} alt="" className="h-full w-full object-cover" />
                                            ) : (
                                                <div className="h-full w-full flex items-center justify-center bg-orange-100 text-orange-500">
                                                    <User size={20} />
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-800 text-sm">{review.user?.name}</p>
                                            <p className="text-[10px] text-slate-400 font-medium lowercase italic">{review.user?.email}</p>
                                        </div>
                                    </div>
                                </td>

                                {/* Parcel Info */}
                                <td className="px-6 py-5">
                                    <p className="font-bold text-slate-700 text-sm leading-tight">{review.percel?.name}</p>
                                    <div className="flex items-center gap-1.5 mt-1 text-slate-400">
                                        <MapPin size={10} className="text-orange-400" />
                                        <p className="text-[10px] font-medium">{review.percel?.reciverAddress}</p>
                                    </div>
                                </td>

                                {/* Rating & Comment */}
                                <td className="px-6 py-5 max-w-xs">
                                    <div className="flex items-center gap-1 mb-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                size={12}
                                                className={i < review.rating ? "text-amber-400" : "text-slate-200"}
                                                fill={i < review.rating ? "currentColor" : "none"}
                                            />
                                        ))}
                                    </div>
                                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                                        "{review.comment}"
                                    </p>
                                    <p className="text-[9px] text-slate-400 mt-2 flex items-center gap-1">
                                        <Calendar size={10} /> {new Date(review.createdAt).toLocaleDateString()}
                                    </p>
                                </td>

                                {/* Actions */}
                                <td className="px-6 py-5 text-right">
                                    <button
                                        disabled={deletingId === review.id}
                                        onClick={() => handleDelete(review.id)}
                                        className="p-2.5 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all disabled:opacity-50"
                                    >
                                        {deletingId === review.id ? (
                                            <Loader2 size={18} className="animate-spin text-rose-500" />
                                        ) : (
                                            <Trash2 size={18} />
                                        )}
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ReviewTable;