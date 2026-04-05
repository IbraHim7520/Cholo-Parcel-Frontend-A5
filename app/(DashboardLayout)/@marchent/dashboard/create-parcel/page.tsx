"use client";

import { useForm } from "@tanstack/react-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Loader2, Package, User, Clock,
    MapPin, Notebook, Weight, DollarSign,
    ChevronRight, StickyNote, Truck, CheckCircle2
} from "lucide-react";
import { toast } from "sonner";
import React from "react";
import { PercelType } from "@/Interfaces/interfaces";
import { env } from "@/Config/env";

export default function CreateParcelForm() {
    const form = useForm({
        defaultValues: {
            name: "",
            notes: "",
            weight: 0,
            price: 0,
            deliveryCharge: 0,
            pickupLocation: "",
            isSelfPickup: false,
            percelType: PercelType.PAKAGE,
            reciverName: "",
            reciverContact: "",
            reciverAddress: "",
            pickupTime: "",
            deliveryTime: "",
        },
        onSubmit: async ({ value }) => {
            try {
                const parcelData = {
                    name: value.name,
                    notes: value.notes,
                    weight: Number(value.weight) as  number,
                    price: Number(value.price) as number,
                    deliveryCharge: Number(value.deliveryCharge) as number,
                    pickupLocation: value.pickupLocation,
                    isSelfPickup: Boolean(value.isSelfPickup),
                    percelType: value.percelType as PercelType,
                    reciverName:value.reciverName,
                    reciverContact: value.reciverContact,
                    reciverAddress: value.reciverAddress,
                    pickupTime: String(value.pickupTime),
                    deliveryTime: String(value.deliveryTime)
                }
                console.log(parcelData)
                const res = await fetch(`${env.BACKEND_URL}/merchent/create-percels`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(parcelData),
                });
                const data = await res.json()
                if (!res.ok) throw new Error(data.message || "Failed");
                toast.success(data.message || "Parcel created successfully!");
                form.reset()
            } catch (error: any) {
                toast.error(error.message || "Submission failed.");
            }
        },
    });

    const FieldError = ({ field }: any) =>
        field.state.meta.touchedErrors ? (
            <p className="text-[10px] font-bold text-rose-500 mt-1 ml-1 uppercase">{field.state.meta.touchedErrors}</p>
        ) : null;

    const inputStyle = "w-full rounded-xl border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 bg-white/50 backdrop-blur-sm transition-all";

    const Label = ({ children, icon: Icon }: { children: React.ReactNode; icon: any }) => (
        <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-tight mb-2 ml-1">
            <Icon size={14} className="text-orange-500" /> {children}
        </label>
    );

    return (
        <form
            onSubmit={(e) => { e.preventDefault(); e.stopPropagation(); form.handleSubmit(); }}
            className="p-6 md:p-10 space-y-10"
        >
            {/* 1. PARCEL BASIC INFO (4 Fields: Name, Type, Weight, Notes) */}
            <section className="space-y-6">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                    <Package className="text-orange-500" size={20} />
                    <h2 className="font-black text-slate-800 uppercase text-sm tracking-widest">Parcel Basics</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                    <form.Field name="name" validators={{ onChange: ({ value }) => !value ? "Required" : undefined }}>
                        {(field) => (
                            <div>
                                <Label icon={Package}>Item Name</Label>
                                <Input className={inputStyle} placeholder="Electronics, Clothes, etc." value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} />
                                <FieldError field={field} />
                            </div>
                        )}
                    </form.Field>

                    <form.Field name="percelType">
                        {(field) => (
                            <div>
                                <Label icon={Package}>Type</Label>
                                <select className={`${inputStyle} h-10 px-3 border rounded-xl text-sm outline-none`} value={field.state.value} onChange={(e) => field.handleChange(e.target.value as PercelType)}>
                                    <option value={PercelType.DOCUMENT}>Document</option>
                                    <option value={PercelType.PAKAGE}>Package</option>
                                    <option value={PercelType.GLASS}>Glass</option>
                                    <option value={PercelType.FOOD}>Food</option>
                                    <option value={PercelType.OTHERS}>Others</option>
                                </select>
                            </div>
                        )}
                    </form.Field>

                    <form.Field name="weight">
                        {(field) => (
                            <div>
                                <Label icon={Weight}>Weight (kg)</Label>
                                <Input type="number" step="0.1" className={inputStyle} value={field.state.value} onChange={(e) => field.handleChange(Number(e.target.value))} />
                            </div>
                        )}
                    </form.Field>

                    <form.Field name="notes">
                        {(field) => (
                            <div>
                                <Label icon={StickyNote}>Internal Notes</Label>
                                <Input className={inputStyle} placeholder="Handle with care..." value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} />
                            </div>
                        )}
                    </form.Field>
                </div>
            </section>

            {/* 2. RECEIVER INFO (3 Fields: Name, Contact, Address) */}
            <section className="space-y-6">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                    <User className="text-blue-500" size={20} />
                    <h2 className="font-black text-slate-800 uppercase text-sm tracking-widest">Receiver Details</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                    <form.Field name="reciverName" validators={{ onChange: ({ value }) => !value ? "Required" : undefined }}>
                        {(field) => (
                            <div>
                                <Label icon={User}>Recipient Name</Label>
                                <Input className={inputStyle} placeholder="Full Name" value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} />
                                <FieldError field={field} />
                            </div>
                        )}
                    </form.Field>
                    <form.Field name="reciverContact" validators={{ onChange: ({ value }) => !value ? "Required" : undefined }}>
                        {(field) => (
                            <div>
                                <Label icon={Clock}>Phone Number</Label>
                                <Input className={inputStyle} placeholder="01XXXXXXXXX" value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} />
                                <FieldError field={field} />
                            </div>
                        )}
                    </form.Field>
                    <div className="md:col-span-2">
                        <form.Field name="reciverAddress" validators={{ onChange: ({ value }) => !value ? "Required" : undefined }}>
                            {(field) => (
                                <div>
                                    <Label icon={MapPin}>Full Delivery Address</Label>
                                    <textarea className={`${inputStyle} min-h-[80px] p-3 text-sm border rounded-xl outline-none`} placeholder="House, Street, Area, City" value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} />
                                    <FieldError field={field} />
                                </div>
                            )}
                        </form.Field>
                    </div>
                </div>
            </section>

            {/* 3. LOGISTICS & TIMING (3 Fields: Pickup Location, Pickup Time, Delivery Time) */}
            <section className="space-y-6">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                    <Truck className="text-emerald-500" size={20} />
                    <h2 className="font-black text-slate-800 uppercase text-sm tracking-widest">Logistics</h2>
                </div>
                <div className="grid md:grid-cols-1 gap-5">
                    <form.Field name="pickupLocation" validators={{ onChange: ({ value }) => !value ? "Required" : undefined }}>
                        {(field) => (
                            <div>
                                <Label icon={MapPin}>Pickup Location</Label>
                                <Input className={inputStyle} placeholder="Enter pickup warehouse/shop address" value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} />
                                <FieldError field={field} />
                            </div>
                        )}
                    </form.Field>
                    <div className="grid md:grid-cols-2 gap-5">
                        <form.Field name="pickupTime">
                            {(field) => (
                                <div>
                                    <Label icon={Clock}>Requested Pickup Time</Label>
                                    <Input type="datetime-local" className={inputStyle} value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} />
                                </div>
                            )}
                        </form.Field>
                        <form.Field name="deliveryTime">
                            {(field) => (
                                <div>
                                    <Label icon={Clock}>Expected Delivery Time</Label>
                                    <Input type="datetime-local" className={inputStyle} value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} />
                                </div>
                            )}
                        </form.Field>
                    </div>
                </div>
            </section>

            {/* 4. FINANCIALS & OPTIONS (3 Fields: Price, Delivery Charge, Self Pickup Toggle) */}
            <section className="space-y-6">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                    <DollarSign className="text-amber-500" size={20} />
                    <h2 className="font-black text-slate-800 uppercase text-sm tracking-widest">Billing & Options</h2>
                </div>
                <div className="grid md:grid-cols-3 gap-5 items-end">
                    <form.Field name="price">
                        {(field) => (
                            <div>
                                <Label icon={DollarSign}>Item Price</Label>
                                <Input type="number" className={inputStyle} value={field.state.value} onChange={(e) => field.handleChange(Number(e.target.value))} />
                            </div>
                        )}
                    </form.Field>
                    <form.Field name="deliveryCharge">
                        {(field) => (
                            <div>
                                <Label icon={Truck}>Delivery Charge</Label>
                                <Input type="number" className={inputStyle} value={field.state.value} onChange={(e) => field.handleChange(Number(e.target.value))} />
                            </div>
                        )}
                    </form.Field>
                    <form.Field name="isSelfPickup">
                        {(field) => (
                            <div className="flex items-center gap-3 h-10 mb-1 ml-2">
                                <input
                                    type="checkbox"
                                    id="selfPickup"
                                    className="w-5 h-5 accent-orange-500"
                                    checked={field.state.value}
                                    onChange={(e) => field.handleChange(e.target.checked)}
                                />
                                <label htmlFor="selfPickup" className="text-sm font-bold text-slate-600 cursor-pointer">Enable Self Pickup</label>
                            </div>
                        )}
                    </form.Field>
                </div>
            </section>

            {/* SUBMIT BUTTON */}
            <div className="pt-6">
                <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
                    {([canSubmit, isSubmitting]) => (
                        <Button
                            type="submit"
                            disabled={!canSubmit || isSubmitting}
                            className="w-full h-14 bg-slate-900 hover:bg-orange-600 text-white rounded-2xl font-bold text-lg shadow-xl transition-all group"
                        >
                            {isSubmitting ? <Loader2 className="animate-spin" /> : <div className="flex items-center gap-2">Confirm & Create <ChevronRight className="group-hover:translate-x-1 transition-transform" /></div>}
                        </Button>
                    )}
                </form.Subscribe>
            </div>
        </form>
    );
}