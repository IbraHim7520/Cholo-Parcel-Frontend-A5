"use client";

import { useForm } from "@tanstack/react-form";
import { Loader2, Send, Box, User, Calendar, MapPin, Weight } from "lucide-react";
import { toast } from "sonner";

export default function CreateParcelForm({ merchentId }: { merchentId: string }) {
    const form = useForm({
        defaultValues: {
            name: "",
            notes: "",
            weight: 0.5,
            percelType: "DOCUMENT",
            reciverName: "",
            reciverContact: "",
            reciverAddress: "",
            pickupLocation: "",
            pickupTime: "",
            deliveryTime: "",
            isSelfPickup: true,
        },
        onSubmit: async ({ value }) => {
            try {
                const payload = {
                    ...value,
                    merchentId,
                    price: 300,
                    deliveryCharge: 50,
                };

                const res = await fetch("/api/parcels", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                });

                if (!res.ok) throw new Error();
                toast.success("Parcel created successfully!");
            } catch (err) {
                toast.error("Failed to create parcel.");
            }
        },
    });

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
            }}
            className="p-6 md:p-10 space-y-8"
        >
            {/* Section: Basic Info */}
            <div className="space-y-6">
                <h3 className="flex items-center gap-2 font-black text-slate-800 uppercase tracking-tight text-sm">
                    <Box size={18} className="text-orange-500" /> General Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Parcel Name */}
                    <form.Field
                        name="name"
                        validators={{
                            onChange: ({ value }) =>
                                !value ? "Name is required" : value.length < 3 ? "Name must be at least 3 characters" : undefined,
                        }}
                    >
                        {(field) => (
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase">Parcel Name</label>
                                <input
                                    name={field.name}
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    className={`w-full px-4 py-3 bg-slate-50 border ${field.state.meta.errors.length ? 'border-rose-500' : 'border-slate-200'} rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all`}
                                    placeholder="e.g. Document Delivery"
                                />
                                {field.state.meta.errors && <p className="text-rose-500 text-[10px] font-bold">{field.state.meta.errors.join(", ")}</p>}
                            </div>
                        )}
                    </form.Field>

                    {/* Weight */}
                    <form.Field
                        name="weight"
                        validators={{
                            onChange: ({ value }) =>
                                Number(value) <= 0 ? "Weight must be greater than 0" : undefined,
                        }}
                    >
                        {(field) => (
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase">Weight (kg)</label>
                                <input
                                    type="number"
                                    step="0.1"
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(Number(e.target.value))}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                                />
                                {field.state.meta.errors && <p className="text-rose-500 text-[10px] font-bold">{field.state.meta.errors.join(", ")}</p>}
                            </div>
                        )}
                    </form.Field>
                </div>
            </div>

            {/* Section: Receiver Details */}
            <div className="space-y-6 pt-6 border-t border-slate-100">
                <h3 className="flex items-center gap-2 font-black text-slate-800 uppercase tracking-tight text-sm">
                    <User size={18} className="text-blue-500" /> Receiver Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <form.Field
                        name="reciverName"
                        validators={{
                            onChange: ({ value }) => !value ? "Receiver name is required" : undefined,
                        }}
                    >
                        {(field) => (
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase">Receiver Name</label>
                                <input
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                                />
                                {field.state.meta.errors && <p className="text-rose-500 text-[10px] font-bold">{field.state.meta.errors.join(", ")}</p>}
                            </div>
                        )}
                    </form.Field>

                    <form.Field
                        name="reciverContact"
                        validators={{
                            onChange: ({ value }) => {
                                const bdPhoneRegex = /^01[3-9]\d{8}$/;
                                return !bdPhoneRegex.test(value) ? "Invalid Bangladeshi number (e.g. 017xxxxxxxx)" : undefined;
                            }
                        }}
                    >
                        {(field) => (
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase">Contact Number</label>
                                <input
                                    type="tel"
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                                    placeholder="01xxxxxxxxx"
                                />
                                {field.state.meta.errors && <p className="text-rose-500 text-[10px] font-bold">{field.state.meta.errors.join(", ")}</p>}
                            </div>
                        )}
                    </form.Field>
                </div>

                <form.Field
                    name="reciverAddress"
                    validators={{
                        onChange: ({ value }) => !value || value.length < 10 ? "Full address is required (min 10 chars)" : undefined,
                    }}
                >
                    {(field) => (
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase">Delivery Address</label>
                            <textarea
                                value={field.state.value}
                                onChange={(e) => field.handleChange(e.target.value)}
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none min-h-[80px]"
                            />
                            {field.state.meta.errors && <p className="text-rose-500 text-[10px] font-bold">{field.state.meta.errors.join(", ")}</p>}
                        </div>
                    )}
                </form.Field>
            </div>

            {/* Section: Logistics */}
            <div className="space-y-6 pt-6 border-t border-slate-100">
                <h3 className="flex items-center gap-2 font-black text-slate-800 uppercase tracking-tight text-sm">
                    <MapPin size={18} className="text-emerald-500" /> Pickup Details
                </h3>

                <form.Field
                    name="pickupLocation"
                    validators={{
                        onChange: ({ value }) => !value ? "Pickup location is required" : undefined,
                    }}
                >
                    {(field) => (
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase">Pickup Location</label>
                            <input
                                value={field.state.value}
                                onChange={(e) => field.handleChange(e.target.value)}
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                                placeholder="Sector 10, Uttara, Dhaka"
                            />
                            {field.state.meta.errors && <p className="text-rose-500 text-[10px] font-bold">{field.state.meta.errors.join(", ")}</p>}
                        </div>
                    )}
                </form.Field>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <form.Field
                        name="pickupTime"
                        validators={{ onChange: ({ value }) => !value ? "Required" : undefined }}
                    >
                        {(field) => (
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase">Pickup Time</label>
                                <input
                                    type="datetime-local"
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                                />
                                {field.state.meta.errors && <p className="text-rose-500 text-[10px] font-bold">{field.state.meta.errors.join(", ")}</p>}
                            </div>
                        )}
                    </form.Field>

                    <form.Field
                        name="deliveryTime"
                        validators={{ onChange: ({ value }) => !value ? "Required" : undefined }}
                    >
                        {(field) => (
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase">Delivery Time</label>
                                <input
                                    type="datetime-local"
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                                />
                                {field.state.meta.errors && <p className="text-rose-500 text-[10px] font-bold">{field.state.meta.errors.join(", ")}</p>}
                            </div>
                        )}
                    </form.Field>
                </div>
            </div>

            {/* Submit Button */}
            <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
                {([canSubmit, isSubmitting]) => (
                    <div className="pt-6 border-t border-slate-100 flex justify-end">
                        <button
                            type="submit"
                            disabled={!canSubmit || isSubmitting}
                            className="flex items-center gap-2 px-10 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-orange-600 transition-all disabled:opacity-50"
                        >
                            {isSubmitting ? (
                                <><Loader2 className="animate-spin" size={20} /> Sending...</>
                            ) : (
                                <><Send size={20} /> Create Parcel</>
                            )}
                        </button>
                    </div>
                )}
            </form.Subscribe>
        </form>
    );
}