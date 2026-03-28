"use client";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { env } from "@/Config/env";
import { ComphanyType } from "@/Interfaces/interfaces";

interface AddMerchantModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AddMerchantFormModal = ({ isOpen, onClose }: AddMerchantModalProps) => {
    const form = useForm({
        defaultValues: {
            ComphanyName: "",
            ComphanyAddress: "",
            ComphanyPhone: "",
            ComphanyEmail: "",
            ComphanyLogo: "",
            ComphanyWebsite: "",
            ComphanyDescription: "",
            ComphanyType: ComphanyType.ONLINE || ComphanyType.BOTH || ComphanyType.PHYSICAL,
            ownerId: "",
        },
        onSubmit: async ({ value }) => {
            try {
                const response = await fetch(`${env.BACKEND_URL}/marchents/create-marchent`, {
                    method: "POST",
                    credentials:"include",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(value),
                });

                if (!response.ok) return toast.error("Failed to create merchant");
                const data = await response.json();
                if(data.success){
                    toast.success(data.message || "Merchant created successfully");
                    form.reset();
                    onClose();
                }else{
                    toast.error(data.message || "Failed to create merchant");
                }
            } catch {
                toast.error("Failed to create merchant");
            }
        },
    });

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm transition-opacity">
            {/* Modal Container: Set to max-w-4xl for a comfortable two-column spread */}
            <div className="bg-white w-full max-w-4xl max-h-[90vh] flex flex-col rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">

                {/* STICKY HEADER */}
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-10">
                    <div>
                        <h2 className="text-xl font-bold text-slate-800">Add New Merchant</h2>
                        <p className="text-xs text-slate-500">Enter the business details below</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 text-gray-400 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-all"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* SCROLLABLE FORM BODY */}
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        form.handleSubmit();
                    }}
                    className="flex-1 overflow-y-auto p-6 custom-scrollbar"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
                        {/* Company Name */}
                        <form.Field
                            name="ComphanyName"
                            validators={{ onChange: ({ value }) => (!value ? "Company name is required" : undefined) }}
                        >
                            {(field) => (
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-[13px] font-semibold text-slate-700 uppercase tracking-wide">Company Name</label>
                                    <input
                                        name={field.name}
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all outline-none text-sm placeholder:text-slate-400"
                                        placeholder="Acme Corp Ltd."
                                    />
                                    {field.state.meta.errors && <span className="text-[11px] font-medium text-rose-500">{field.state.meta.errors}</span>}
                                </div>
                            )}
                        </form.Field>

                        {/* Email */}
                        <form.Field
                            name="ComphanyEmail"
                            validators={{ onChange: ({ value }) => (!value.includes("@") ? "Invalid email address" : undefined) }}
                        >
                            {(field) => (
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-[13px] font-semibold text-slate-700 uppercase tracking-wide">Business Email</label>
                                    <input
                                        type="email"
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all outline-none text-sm placeholder:text-slate-400"
                                        placeholder="merchant@cholo-parcel.com"
                                    />
                                    {field.state.meta.errors && <span className="text-[11px] font-medium text-rose-500">{field.state.meta.errors}</span>}
                                </div>
                            )}
                        </form.Field>

                        {/* Phone */}
                        <form.Field
                            name="ComphanyPhone"
                            validators={{ onChange: ({ value }) => (value.length < 11 ? "Phone must be at least 11 digits" : undefined) }}
                        >
                            {(field) => (
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-[13px] font-semibold text-slate-700 uppercase tracking-wide">Contact Number</label>
                                    <input
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all outline-none text-sm placeholder:text-slate-400"
                                        placeholder="017XXXXXXXX"
                                    />
                                    {field.state.meta.errors && <span className="text-[11px] font-medium text-rose-500">{field.state.meta.errors}</span>}
                                </div>
                            )}
                        </form.Field>

                        {/* Business Type */}
                        <form.Field
                            name="ComphanyType"
                            validators={{ onChange: ({ value }) => (!value ? "Select a type" : undefined) }}
                        >
                            {(field) => (
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-[13px] font-semibold text-slate-700 uppercase tracking-wide">Business Category</label>
                                    <select
                                        value={field.state.value }
                                        onChange={(e) => field.handleChange(e.target.value as ComphanyType)}
                                        className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all outline-none text-sm cursor-pointer"
                                    >
                                        <option value="">Select Category</option>
                                        <option value="ONLINE">Online</option>
                                        <option value="PHYSICAL">Physical</option>
                                        <option value="BOTH">Both</option>
                                    </select>
                                    {field.state.meta.errors && <span className="text-[11px] font-medium text-rose-500">{field.state.meta.errors}</span>}
                                </div>
                            )}
                        </form.Field>

                        {/* Owner ID */}
                        <form.Field
                            name="ownerId"
                            validators={{ onChange: ({ value }) => (!value ? "Owner ID is required" : undefined) }}
                        >
                            {(field) => (
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-[13px] font-semibold text-slate-700 uppercase tracking-wide">Merchant UID</label>
                                    <input
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all outline-none text-sm placeholder:text-slate-400"
                                        placeholder="e.g. USER-9921"
                                    />
                                    {field.state.meta.errors && <span className="text-[11px] font-medium text-rose-500">{field.state.meta.errors}</span>}
                                </div>
                            )}
                        </form.Field>

                        {/* Logo Link */}
                        <form.Field name="ComphanyLogo">
                            {(field) => (
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-[13px] font-semibold text-slate-700 uppercase tracking-wide">Logo URL</label>
                                    <input
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all outline-none text-sm placeholder:text-slate-400"
                                        placeholder="https://imgur.com/logo.png"
                                    />
                                </div>
                            )}
                        </form.Field>
                    </div>

                    {/* Full Width Fields */}
                    <div className="mt-5 space-y-5">
                        <form.Field name="ComphanyAddress">
                            {(field) => (
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-[13px] font-semibold text-slate-700 uppercase tracking-wide">Headquarters Address</label>
                                    <input
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all outline-none text-sm placeholder:text-slate-400"
                                        placeholder="123 Dhaka North, Road 7..."
                                    />
                                </div>
                            )}
                        </form.Field>

                        <form.Field name="ComphanyDescription">
                            {(field) => (
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-[13px] font-semibold text-slate-700 uppercase tracking-wide">Business Overview</label>
                                    <textarea
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all outline-none text-sm min-h-[100px] resize-none"
                                        placeholder="Briefly describe the business and operations..."
                                    />
                                </div>
                            )}
                        </form.Field>
                    </div>

                    {/* STICKY FOOTER ACTIONS */}
                    <div className="flex items-center gap-3 pt-6 mt-4 border-t border-slate-100 sticky bottom-0 bg-white">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-3 border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 transition-all font-semibold text-sm shadow-sm active:scale-[0.98]"
                        >
                            Cancel
                        </button>
                        <form.Subscribe
                            selector={(state) => [state.canSubmit, state.isSubmitting]}
                        >
                            {([canSubmit, isSubmitting]) => (
                                <button
                                    type="submit"
                                    disabled={!canSubmit || isSubmitting}
                                    className="flex-[2] px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 transition-all font-bold text-sm shadow-md shadow-blue-200 active:scale-[0.98]"
                                >
                                    {isSubmitting ? "Onboarding Merchant..." : "Confirm & Save Merchant"}
                                </button>
                            )}
                        </form.Subscribe>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddMerchantFormModal;