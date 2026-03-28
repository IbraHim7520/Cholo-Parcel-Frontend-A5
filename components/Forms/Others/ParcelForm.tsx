"use client"

import { useMemo } from "react"
import {
    Package, User ,Truck, Send, CheckCircle2,
    Scale
} from "lucide-react"
import { ICreateParcel } from "@/Interfaces/parcel.interface"
import { PercelStatus, PercelType } from "@/Interfaces/interfaces"
import { useForm } from "@tanstack/react-form"
import { env } from "@/Config/env"
import { toast } from "sonner"

// Simple Spinner Component for the loading state
const Spinner = ({ className }: { className?: string }) => (
    <svg className={`animate-spin ${className}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
)


//Problem: console.log() korle delivery location null ase

export default function CreateParcelForm() {
    const RATES: Record<string, number> = {
        PAKAGE: 100,
        DOCUMENT: 50,
        FOOD: 75,
        GLASS: 120,
        OTHERS: 100,
    };

    const createParcelValue: ICreateParcel = {
        name: "",
        notes: "",
        weight: 0,
        price: 0,
        status: PercelStatus.REQUESTED,
        pickupLocation: "",
        isSelfPickup: false,
        deliveryPrice: 0,
        percelType: PercelType.PAKAGE,
        reciverName: "",
        reciverContact: "",
        reciverAddress: "",
        pickupTime: "",
        deliveryTime: "",
    }

    const form = useForm({
        defaultValues: createParcelValue,
        onSubmit: async ({ value }) => {
            // ✅ Recalculate here (source of truth)
            const rate = RATES[value.percelType as keyof typeof RATES] || RATES.OTHERS;
            const deliveryCharge = (value.weight || 0) * rate;

            const parcelData = {
                name: value.name,
                notes: value.notes,
                weight: value.weight,
                price: value.price,
                status: value.status,
                deliveryPrice: deliveryCharge, // ✅ correct now
                pickupLocation: value.pickupLocation,
                isSelfPickup: value.isSelfPickup,
                percelType: value.percelType,
                reciverName: value.reciverName,
                reciverContact: value.reciverContact,
                reciverAddress: value.reciverAddress,
                pickupTime: value.pickupTime,
                deliveryTime: value.deliveryTime,
            };

            const res = await fetch(`${env.BACKEND_URL}/parcels/create-parcel`, {
                method: "POST",
                credentials: "include",
                cache: "no-store",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(parcelData),
            });

            const data = await res.json();

            if (data.success) {
                toast.success(data.message);
                form.reset();
            } else {
                toast.error(data.message || "Failed to make parcel request");
            }
        }
    })

    const inputClasses = "w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 focus:bg-white dark:focus:bg-slate-900 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all duration-200 text-sm dark:text-white"
    const labelClasses = "text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5 block"

    const deliveryCharge = useMemo(() => {
        const type = form.state.values.percelType;
        const weight = form.state.values.weight || 0;
        const rate = RATES[type as keyof typeof RATES] || RATES.OTHERS;
        return weight * rate;
    }, [form.state.values.percelType, form.state.values.weight])


    return (
        <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-8">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-600 text-white rounded-2xl shadow-lg shadow-blue-500/20">
                        <Package className="h-7 w-7" />
                    </div>
                    <div>
                        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Create New Parcel</h1>
                        <p className="text-slate-500 text-sm md:text-base">Register a new delivery shipment in your merchant portal.</p>
                    </div>
                </div>
            </div>

            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    form.handleSubmit()
                }}
                className="space-y-12"
            >
                {/* Section 1: Parcel Details */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-4">
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                            <Scale className="h-5 w-5 text-blue-500" /> Item Specifications
                        </h2>
                        <p className="text-sm text-slate-500 mt-2">Provide the dimensions and value of the package for insurance and logistics.</p>
                    </div>

                    <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-5 bg-white dark:bg-slate-950 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
                        <div className="md:col-span-2">
                            <label className={labelClasses}>Parcel Name</label>
                            <form.Field
                                name="name"
                                validators={{
                                    onChange: ({ value }) => {
                                        if (!value) return "Parcel name is required";
                                        if (value.length < 3) return "Too short";
                                        if (value.length > 50) return "Too long";
                                        return undefined;
                                    }
                                }}
                            >
                                {(field) => (
                                    <>
                                        <input
                                            type="text"
                                            placeholder="e.g. Premium Tech Bundle"
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            className={inputClasses}
                                        />
                                        {field.state.meta.errors && <p className="text-xs text-red-500 mt-1">{field.state.meta.errors[0]}</p>}
                                    </>
                                )}
                            </form.Field>
                        </div>

                        <div>
                            <label className={labelClasses}>Type</label>
                            <form.Field name="percelType">
                                {(field) => (
                                    <select
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.value as PercelType)}
                                        className={inputClasses}
                                    >
                                        <option value="PAKAGE">📦 Package</option>
                                        <option value="DOCUMENT">📄 Document</option>
                                        <option value="GLASS">🍷 Glass/Fragile</option>
                                        <option value="FOOD">🍕 Food/Perishable</option>
                                        <option value="OTHERS">🏷️ Others</option>
                                    </select>
                                )}
                            </form.Field>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className={labelClasses}>Weight (kg)</label>
                                <form.Field
                                    name="weight"
                                    validators={{
                                        onChange: ({ value }) => (value <= 0 ? "Must be > 0" : undefined)
                                    }}
                                >
                                    {(field) => (
                                        <>
                                            <input
                                                type="number"
                                                step="0.1"
                                                value={field.state.value}
                                                onChange={(e) => field.handleChange(Number(e.target.value))}
                                                className={inputClasses}
                                            />
                                            {field.state.meta.errors && <p className="text-xs text-red-500 mt-1">{field.state.meta.errors[0]}</p>}
                                        </>
                                    )}
                                </form.Field>
                            </div>
                            <div>
                                <label className={labelClasses}>Price ($)</label>
                                <form.Field
                                    name="price"
                                    validators={{
                                        onChange: ({ value }) => (value < 0 ? "Cannot be negative" : undefined)
                                    }}
                                >
                                    {(field) => (
                                        <>
                                            <input
                                                type="number"
                                                value={field.state.value}
                                                onChange={(e) => field.handleChange(Number(e.target.value))}
                                                className={inputClasses}
                                            />
                                            {field.state.meta.errors && <p className="text-xs text-red-500 mt-1">{field.state.meta.errors[0]}</p>}
                                        </>
                                    )}
                                </form.Field>
                            </div>
                        </div>

                        <div className="md:col-span-2">
                            <label className={labelClasses}>Internal Notes</label>
                            <form.Field
                                name="notes"
                                validators={{
                                    onChange: ({ value }) => (value.length > 100 ? "Max 100 chars" : undefined)
                                }}
                            >
                                {(field) => (
                                    <>
                                        <textarea
                                            rows={2}
                                            placeholder="Any special handling instructions..."
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            className={inputClasses}
                                        />
                                        {field.state.meta.errors && <p className="text-xs text-red-500 mt-1">{field.state.meta.errors[0]}</p>}
                                    </>
                                )}
                            </form.Field>
                        </div>
                    </div>
                </div>

                {/* Section 2: Recipient */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-4">
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                            <User className="h-5 w-5 text-green-500" /> Recipient details
                        </h2>
                        <p className="text-sm text-slate-500 mt-2">The person who will be receiving and signing for the parcel.</p>
                    </div>

                    <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-5 bg-white dark:bg-slate-950 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
                        <div>
                            <label className={labelClasses}>Receiver Full Name</label>
                            <form.Field
                                name="reciverName"
                                validators={{
                                    onChange: ({ value }) => (!value ? "Required" : value.length < 3 ? "Too short" : undefined)
                                }}
                            >
                                {(field) => (
                                    <>
                                        <input
                                            placeholder="John Doe"
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            className={inputClasses}
                                        />
                                        {field.state.meta.errors && <p className="text-xs text-red-500 mt-1">{field.state.meta.errors[0]}</p>}
                                    </>
                                )}
                            </form.Field>
                        </div>

                        <div>
                            <label className={labelClasses}>Contact Number</label>
                            <form.Field
                                name="reciverContact"
                                validators={{
                                    onChange: ({ value }) => (value.length !== 11 ? "Must be 11 digits" : undefined)
                                }}
                            >
                                {(field) => (
                                    <>
                                        <input
                                        type="number"
                                            placeholder="01XXXXXXXXX"
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            className={inputClasses}
                                        />
                                        {field.state.meta.errors && <p className="text-xs text-red-500 mt-1">{field.state.meta.errors[0]}</p>}
                                    </>
                                )}
                            </form.Field>
                        </div>

                        <div className="md:col-span-2">
                            <label className={labelClasses}>Delivery Address</label>
                            <form.Field
                                name="reciverAddress"
                                validators={{
                                    onChange: ({ value }) => (!value ? "Required" : value.length < 10 ? "Too short" : undefined)
                                }}
                            >
                                {(field) => (
                                    <>
                                        <textarea
                                            rows={3}
                                            placeholder="Complete street address, apartment, and city"
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            className={inputClasses}
                                        />
                                        {field.state.meta.errors && <p className="text-xs text-red-500 mt-1">{field.state.meta.errors[0]}</p>}
                                    </>
                                )}
                            </form.Field>
                        </div>
                    </div>
                </div>

                {/* Section 3: Logistics */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-4">
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                            <Truck className="h-5 w-5 text-orange-500" /> Logistics Schedule
                        </h2>
                        <p className="text-sm text-slate-500 mt-2">When and where should our riders pick up and deliver?</p>
                    </div>

                    <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-5 bg-white dark:bg-slate-950 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
                        <div className="md:col-span-2">
                            <label className={labelClasses}>Pickup Point</label>
                            <form.Field
                                name="pickupLocation"
                                validators={{
                                    onChange: ({ value }) => (!value ? "Required" : value.length < 10 ? "Too short" : undefined)
                                }}
                            >
                                {(field) => (
                                    <>
                                        <input
                                            placeholder="Merchant Warehouse / Store Address"
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            className={inputClasses}
                                        />
                                        {field.state.meta.errors && <p className="text-xs text-red-500 mt-1">{field.state.meta.errors[0]}</p>}
                                    </>
                                )}
                            </form.Field>
                        </div>

                        <div>
                            <label className={labelClasses}>Preferred Pickup</label>
                            <form.Field
                                name="pickupTime"
                                validators={{
                                    onChange: ({ value }) => (new Date(value).getTime() < Date.now() ? "Must be in the future" : undefined)
                                }}
                            >
                                {(field) => (
                                    <>
                                        <input
                                            type="datetime-local"
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            className={inputClasses}
                                        />
                                        {field.state.meta.errors && <p className="text-xs text-red-500 mt-1">{field.state.meta.errors[0]}</p>}
                                    </>
                                )}
                            </form.Field>
                        </div>

                        <div>
                            <label className={labelClasses}>Estimated Delivery</label>
                            <form.Field
                                name="deliveryTime"
                                validators={{
                                    onChange: ({ value }) => (new Date(value).getTime() < Date.now() ? "Must be in the future" : undefined)
                                }}
                            >
                                {(field) => (
                                    <>
                                        <input
                                            type="datetime-local"
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            className={inputClasses}
                                        />
                                        {field.state.meta.errors && <p className="text-xs text-red-500 mt-1">{field.state.meta.errors[0]}</p>}
                                    </>
                                )}
                            </form.Field>
                        </div>

                        <div className="md:col-span-2 pt-2">
                            <form.Field name="isSelfPickup">
                                {(field) => (
                                    <label className="flex items-center gap-3 p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-900/30 cursor-pointer group hover:bg-white dark:hover:bg-slate-900 transition-all">
                                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${field.state.value ? 'bg-blue-600 border-blue-600' : 'border-slate-300'}`}>
                                            {field.state.value && <CheckCircle2 className="h-4 w-4 text-white" />}
                                        </div>
                                        <input
                                            type="checkbox"
                                            className="hidden"
                                            checked={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.checked)}
                                        />
                                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Customer Self Pickup</span>
                                    </label>
                                )}
                            </form.Field>
                        </div>
                    </div>
                </div>

                {/* Submit Actions */}
                <div className="flex items-center justify-end gap-4 pt-6 border-t border-slate-100 dark:border-slate-800">
                    <button
                        onClick={() => form.reset()}
                        type="button"
                        className="px-6 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm font-bold transition-all"
                    >
                        Discard
                    </button>
                    <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
                        {([canSubmit, isSubmitting]) => (
                            <button
                                type="submit"
                                disabled={!canSubmit || isSubmitting}
                                className="flex items-center gap-2 px-10 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold shadow-xl shadow-blue-500/20 active:scale-95 transition-all disabled:opacity-50"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Spinner className="h-4 w-4 text-white" />
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        <Send className="h-4 w-4" />
                                        Pay ${deliveryCharge} to Confirm Order
                                    </>
                                )}
                            </button>
                        )}
                    </form.Subscribe>
                </div>
            </form>
        </div>
    )
}