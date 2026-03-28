"use client";
import React, { useState } from "react";
import { Hammer, Construction, Mail, ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";

const UnderConstruction = () => {
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleNotify = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            toast.success("We'll notify you when we launch!");
            setEmail("");
            setIsSubmitting(false);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
            <div className="max-w-2xl w-full text-center space-y-8">

                {/* Animated Icon Header */}
                <div className="relative inline-block">
                    <div className="bg-blue-600 p-5 rounded-3xl shadow-xl shadow-blue-200 animate-bounce">
                        <Construction className="text-white" size={48} />
                    </div>
                    <div className="absolute -top-2 -right-2 bg-amber-400 p-2 rounded-full border-4 border-slate-50">
                        <Hammer size={20} className="text-amber-900" />
                    </div>
                </div>

                {/* Text Content */}
                <div className="space-y-4">
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                        Something Great is <span className="text-blue-600">Cooking.</span>
                    </h1>
                    <p className="text-lg text-slate-600 max-w-md mx-auto">
                        We're currently working hard to bring you the best experience for your logistics needs. Stay tuned!
                    </p>
                </div>

                {/* Progress Section */}
                <div className="max-w-sm mx-auto space-y-2">
                    <div className="flex justify-between text-sm font-bold text-slate-500">
                        <span>Development Progress</span>
                        <span>75%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                        <div
                            className="bg-blue-600 h-full rounded-full transition-all duration-1000 ease-out"
                            style={{ width: "75%" }}
                        ></div>
                    </div>
                </div>

                {/* Notification Form */}
                <div className="max-w-md mx-auto bg-white p-2 rounded-2xl shadow-sm border border-slate-200">
                    <form onSubmit={handleNotify} className="flex flex-col sm:flex-row gap-2">
                        <div className="relative flex-1">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                type="email"
                                required
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-transparent outline-none text-sm text-slate-700"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-slate-800 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                        >
                            {isSubmitting ? (
                                <Loader2 size={18} className="animate-spin" />
                            ) : (
                                <>
                                    Notify Me <ArrowRight size={18} />
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {/* Footer info */}
                <p className="text-xs text-slate-400 font-medium uppercase tracking-widest">
                    © 2026 Cholo Parcel. All Rights Reserved.
                </p>
            </div>
        </div>
    );
};

export default UnderConstruction;