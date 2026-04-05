"use client";

import { useForm } from "@tanstack/react-form";
import { env } from "@/Config/env";
import { useState } from "react";
import { IAdminCreateMerchent } from "@/Interfaces/admin.interface";
import { ComphanyType } from "@/Interfaces/interfaces";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

// Helper component to display error messages (Consistent with Rider form)
function FieldInfo({ field }: { field: any }) {
    return (
        <div className="h-4">
            {field.state.meta.isTouched && field.state.meta.errors.length ? (
                <em className="text-[10px] text-red-500 font-medium block">
                    {field.state.meta.errors.join(", ")}
                </em>
            ) : null}
        </div>
    );
}

const initialValues: IAdminCreateMerchent = {
    ownerName: "",
    ownerEmail: "",
    ownerImage: "",
    ownerPassword: "",
    comphanyName: "",
    comphanyAddress: "",
    comphanyPhone: "",
    comphanyEmail: "",
    comphanyLogo: "",
    comphanyWebsite: "",
    comphanyDescription: "",
    comphanyType: ComphanyType.PHYSICAL,
};

const AdminCreateMerchentForm = ({ modal }: { modal: string }) => {
    const [loading, setLoading] = useState(false);

    const form = useForm({
        defaultValues: initialValues,
        onSubmit: async ({ value }) => {
            setLoading(true);
            try {
                const response = await fetch(`${env.BACKEND_URL}/admins/create-merchent`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(value),
                    credentials: "include",
                });
                const data = await response.json();
                if (response.ok) {
                    const modalElement = document.getElementById(modal) as HTMLDialogElement;
                    if (modalElement) modalElement.close();
                    toast.success(data.message || "Merchant created successfully!");
                    form.reset();
                } else {
                    toast.error(data.message || "Failed to create merchant");
                }
            } catch (error) {
                console.error(error);
                toast.error("An error occurred.");
            } finally {
                setLoading(false);
            }
        },
    });

    const inputClass = "w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none transition-all focus:border-orange-500 focus:ring-2 focus:ring-orange-100 placeholder:text-slate-400 text-slate-700 bg-slate-50/50";
    const labelClass = "text-[11px] uppercase font-bold text-slate-500 ml-1 mb-1 block";

    return (
        <div className="max-w-5xl mx-auto bg-white p-8 rounded-[2rem] border border-slate-100 shadow-2xl shadow-orange-100/50">
            <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-black text-slate-800 tracking-tight">Register <span className="text-orange-500">Merchant</span></h2>
                    <p className="text-sm text-slate-500 mt-1">Setup merchant account and business profile details</p>
                </div>
                <div className="h-1 w-20 bg-orange-500 rounded-full hidden md:block mb-2"></div>
            </header>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    form.handleSubmit();
                }}
                className="space-y-10"
            >
                {/* Section: Owner Info */}
                <section>
                    <div className="flex items-center gap-2 mb-6">
                        <span className="p-1.5 bg-orange-100 text-orange-600 rounded-lg font-bold text-xs">01</span>
                        <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider">Owner Credentials</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                        <form.Field
                            name="ownerName"
                            validators={{ onChange: ({ value }) => !value ? "Name is required" : undefined }}
                            children={(f) => (
                                <div className="space-y-1">
                                    <label className={labelClass}>Full Name</label>
                                    <input className={inputClass} placeholder="John Doe" value={f.state.value} onBlur={f.handleBlur} onChange={(e) => f.handleChange(e.target.value)} />
                                    <FieldInfo field={f} />
                                </div>
                            )}
                        />
                        <form.Field
                            name="ownerEmail"
                            validators={{ onChange: ({ value }) => !value.includes("@") ? "Invalid email" : undefined }}
                            children={(f) => (
                                <div className="space-y-1">
                                    <label className={labelClass}>Owner Email</label>
                                    <input type="email" className={inputClass} placeholder="owner@example.com" value={f.state.value} onBlur={f.handleBlur} onChange={(e) => f.handleChange(e.target.value)} />
                                    <FieldInfo field={f} />
                                </div>
                            )}
                        />
                        <form.Field
                            name="ownerPassword"
                            validators={{ onChange: ({ value }) => value.length < 6 ? "Min 6 characters" : undefined }}
                            children={(f) => (
                                <div className="space-y-1">
                                    <label className={labelClass}>Password</label>
                                    <input type="password" className={inputClass} placeholder="••••••••" value={f.state.value} onBlur={f.handleBlur} onChange={(e) => f.handleChange(e.target.value)} />
                                    <FieldInfo field={f} />
                                </div>
                            )}
                        />
                        <form.Field
                            name="ownerImage"
                            children={(f) => (
                                <div className="space-y-1">
                                    <label className={labelClass}>Owner Avatar URL</label>
                                    <input className={inputClass} placeholder="https://image-link.com" value={f.state.value} onBlur={f.handleBlur} onChange={(e) => f.handleChange(e.target.value)} />
                                    <FieldInfo field={f} />
                                </div>
                            )}
                        />
                    </div>
                </section>

                {/* Section: Company Profile */}
                <section className="bg-orange-50/50 p-6 rounded-2xl border border-orange-100">
                    <div className="flex items-center gap-2 mb-6">
                        <span className="p-1.5 bg-white text-orange-600 border border-orange-200 rounded-lg font-bold text-xs">02</span>
                        <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider">Business Details</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                        <form.Field
                            name="comphanyName"
                            children={(f) => (
                                <div className="space-y-1">
                                    <label className={labelClass}>Company Name</label>
                                    <input className={inputClass} placeholder="Acme Corp" value={f.state.value} onBlur={f.handleBlur} onChange={(e) => f.handleChange(e.target.value)} />
                                    <FieldInfo field={f} />
                                </div>
                            )}
                        />
                        <form.Field
                            name="comphanyType"
                            children={(f) => (
                                <div className="space-y-1">
                                    <label className={labelClass}>Business Type</label>
                                    <select className={inputClass} value={f.state.value} onChange={(e) => f.handleChange(e.target.value as ComphanyType)}>
                                        <option value={ComphanyType.PHYSICAL}>Physical Store</option>
                                        <option value={ComphanyType.ONLINE}>Online Shop</option>
                                        <option value={ComphanyType.BOTH}>Both (Omnichannel)</option>
                                    </select>
                                    <FieldInfo field={f} />
                                </div>
                            )}
                        />
                        <form.Field
                            name="comphanyEmail"
                            children={(f) => (
                                <div className="space-y-1">
                                    <label className={labelClass}>Support Email</label>
                                    <input type="email" className={inputClass} placeholder="support@acme.com" value={f.state.value} onBlur={f.handleBlur} onChange={(e) => f.handleChange(e.target.value)} />
                                    <FieldInfo field={f} />
                                </div>
                            )}
                        />
                        <form.Field
                            name="comphanyPhone"
                            children={(f) => (
                                <div className="space-y-1">
                                    <label className={labelClass}>Business Phone</label>
                                    <input className={inputClass} placeholder="+123 456 789" value={f.state.value} onBlur={f.handleBlur} onChange={(e) => f.handleChange(e.target.value)} />
                                    <FieldInfo field={f} />
                                </div>
                            )}
                        />
                        <form.Field
                            name="comphanyLogo"
                            children={(f) => (
                                <div className="space-y-1">
                                    <label className={labelClass}>Brand Logo URL</label>
                                    <input className={inputClass} placeholder="https://logo-link.com" value={f.state.value} onBlur={f.handleBlur} onChange={(e) => f.handleChange(e.target.value)} />
                                    <FieldInfo field={f} />
                                </div>
                            )}
                        />
                        <form.Field
                            name="comphanyWebsite"
                            children={(f) => (
                                <div className="space-y-1">
                                    <label className={labelClass}>Website URL</label>
                                    <input className={inputClass} placeholder="www.acme.com" value={f.state.value} onBlur={f.handleBlur} onChange={(e) => f.handleChange(e.target.value)} />
                                    <FieldInfo field={f} />
                                </div>
                            )}
                        />
                        <div className="md:col-span-2">
                            <form.Field
                                name="comphanyAddress"
                                children={(f) => (
                                    <div className="space-y-1">
                                        <label className={labelClass}>Registered Address</label>
                                        <textarea className={`${inputClass} min-h-[80px] resize-none`} placeholder="Enter office/store address" value={f.state.value} onBlur={f.handleBlur} onChange={(e) => f.handleChange(e.target.value)} />
                                        <FieldInfo field={f} />
                                    </div>
                                )}
                            />
                        </div>
                        <div className="md:col-span-2">
                            <form.Field
                                name="comphanyDescription"
                                children={(f) => (
                                    <div className="space-y-1">
                                        <label className={labelClass}>About Business</label>
                                        <textarea className={`${inputClass} min-h-[100px] resize-none`} placeholder="Describe the products or services provided..." value={f.state.value} onBlur={f.handleBlur} onChange={(e) => f.handleChange(e.target.value)} />
                                        <FieldInfo field={f} />
                                    </div>
                                )}
                            />
                        </div>
                    </div>
                </section>

                {/* Footer Actions */}
                <div className="flex flex-col-reverse md:flex-row justify-end gap-4 pt-6 border-t border-slate-100">
                    <button
                        type="button"
                        onClick={() => form.reset()}
                        className="px-6 py-2.5 text-sm font-semibold text-slate-500 hover:text-orange-600 transition-colors bg-slate-100 md:bg-transparent rounded-xl"
                    >
                        Clear Form
                    </button>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`px-10 py-3 rounded-xl text-white font-bold shadow-lg shadow-orange-200 transition-all active:scale-95 flex items-center justify-center gap-2 ${loading ? "bg-slate-300 cursor-not-allowed shadow-none" : "bg-orange-500 hover:bg-orange-600"
                            }`}
                    >
                        {loading ? (
                            <>
                                <Spinner className="size-4" />
                            </>
                        ) : "Register Merchant"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AdminCreateMerchentForm;