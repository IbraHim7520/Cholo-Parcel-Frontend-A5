import ReviewTable from "@/components/Tables/MerchentReviewPage";
import { env } from "@/Config/env";
import { Package, Star, MessageSquare } from "lucide-react";

const MerchentReviewsPage = async () => {
    const reviewRes = await fetch(`${env.BACKEND_URL}/merchent/my-reviews`, {
        cache: 'no-store', // Ensure fresh data on server
        // credentials: "include" // Note: credentials "include" is for client-side fetch. 
        // For server-side, you usually pass cookies/headers manually.
    });

    const response = await reviewRes.json();
    const reviews = response.data || [];

    return (
        <div className="min-h-screen w-full p-4 md:p-8 space-y-6 bg-gradient-to-br from-orange-50 via-white to-orange-100">
            {/* 🔶 Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/80 backdrop-blur-xl p-6 rounded-3xl shadow-lg border border-orange-100">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-orange-500 rounded-2xl shadow-lg shadow-orange-200">
                        <Star className="text-white" size={24} fill="currentColor" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-800 tracking-tight">Merchant Reviews</h1>
                        <p className="text-sm text-slate-500 font-medium">
                            Managing {reviews.length} customer feedbacks
                        </p>
                    </div>
                </div>
            </div>

            {/* 🔶 Table Component (Client Side for Interactivity) */}
            <div className="w-full bg-white/80 backdrop-blur-xl rounded-3xl shadow-lg border border-orange-100 overflow-hidden">
                <ReviewTable initialReviews={reviews} />
            </div>
        </div>
    );
};

export default MerchentReviewsPage;