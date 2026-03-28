"use client";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { env } from "@/Config/env";
import { VehicleType } from "@/Interfaces/interfaces";
import { X, User, Phone, MapPin, Calendar, Truck, Droplets, Hash } from "lucide-react";

interface AddRiderModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AddRiderForm = ({ isOpen, onClose }: AddRiderModalProps) => {
    const form = useForm({
        defaultValues: {
            nid: "",
            dob: "",
            contact: "",
            address: "",
            deliveryArea: "",
            experience: "No Experience",
            vehicleType: "BIKE" as keyof typeof VehicleType,
            vehicleNumber: "",
            bloodGrouph: "",
            isAvailable: true,
            userId: "",
        },
        onSubmit: async ({ value }) => {
            try {
                const response = await fetch(`${env.BACKEND_URL}/riders/create-rider`, {
                    method: "POST",
                    credentials: "include",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(value),
                });

                if (!response.ok) throw new Error();

                const data = await response.json();
                if (data.success) {
                    toast.success(data.message || "Rider profile created!");
                    form.reset();
                    onClose();
                } else {
                    toast.error(data.message || "Failed to create rider");
                }
            } catch (err: any) {
                toast.error(env.NODE_ENV === "development" ? err.message : "Something went wrong");
            }
        },
    });

    if (!isOpen) return null;

    // Helper component to display error messages consistently
    const FieldError = ({ errors }: { errors: any[] }) => {
        if (!errors.length) return null;
        return <p className="text-[10px] font-medium text-red-500 mt-1 ml-1">{errors[0]}</p>;
    };

    return (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-2xl max-h-[90vh] flex flex-col rounded-3xl shadow-2xl border border-slate-200 overflow-hidden scale-in-center">

                {/* Header */}
                <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-white">
                    <div>
                        <h2 className="text-xl font-bold text-slate-800">Register New Rider</h2>
                        <p className="text-sm text-slate-500">Official details for Cholo Parcel delivery partners.</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        form.handleSubmit();
                    }}
                    className="p-8 overflow-y-auto space-y-6 bg-slate-50/30"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">

                        {/* User ID */}
                        <form.Field
                            name="userId"
                            validators={{ onChange: ({ value }) => !value ? "User ID is required" : undefined }}
                        >
                            {(field) => (
                                <div className="space-y-1.5">
                                    <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                        <Hash size={14} className="text-slate-400" /> User ID
                                    </label>
                                    <input
                                        placeholder="Enter User ID"
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        className={`w-full px-4 py-2.5 bg-white border rounded-xl outline-none focus:ring-4 transition-all ${field.state.meta.errors.length ? "border-red-300 focus:ring-red-50" : "border-slate-200 focus:ring-blue-50 focus:border-blue-500"
                                            }`}
                                    />
                                    <FieldError errors={field.state.meta.errors} />
                                </div>
                            )}
                        </form.Field>

                        {/* NID Number */}
                        <form.Field
                            name="nid"
                            validators={{
                                onChange: ({ value }) => {
                                    if (!value) return "NID is required";
                                    if (value.length < 9) return "NID must be at least 9 digits";
                                    if (value.length > 17) return "NID must be at most 17 digits";
                                    return undefined;
                                }
                            }}
                        >
                            {(field) => (
                                <div className="space-y-1.5">
                                    <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                        <User size={14} className="text-slate-400" /> NID Number
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="123 456 7890"
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        className={`w-full px-4 py-2.5 bg-white border rounded-xl outline-none focus:ring-4 transition-all ${field.state.meta.errors.length ? "border-red-300 focus:ring-red-50" : "border-slate-200 focus:ring-blue-50 focus:border-blue-500"
                                            }`}
                                    />
                                    <FieldError errors={field.state.meta.errors} />
                                </div>
                            )}
                        </form.Field>

                        {/* DOB with Age Validation */}
                        <form.Field
                            name="dob"
                            validators={{
                                onChange: ({ value }) => {
                                    if (!value) return "Date of Birth is required";
                                    const date = new Date(value);
                                    const today = new Date();
                                    let age = today.getFullYear() - date.getFullYear();
                                    const m = today.getMonth() - date.getMonth();
                                    if (m < 0 || (m === 0 && today.getDate() < date.getDate())) age--;
                                    return age < 18 ? "You must be at least 18 years old" : undefined;
                                }
                            }}
                        >
                            {(field) => (
                                <div className="space-y-1.5">
                                    <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                        <Calendar size={14} className="text-slate-400" /> Date of Birth
                                    </label>
                                    <input
                                        type="date"
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        className={`w-full px-4 py-2.5 bg-white border rounded-xl outline-none focus:ring-4 transition-all ${field.state.meta.errors.length ? "border-red-300 focus:ring-red-50" : "border-slate-200 focus:ring-blue-50 focus:border-blue-500"
                                            }`}
                                    />
                                    <FieldError errors={field.state.meta.errors} />
                                </div>
                            )}
                        </form.Field>

                        {/* Contact */}
                        <form.Field
                            name="contact"
                            validators={{
                                onChange: ({ value }) => {
                                    if (!value) return "Contact Number is required";
                                    if (value.length !== 11) return "Must be exactly 11 digits";
                                    return undefined;
                                }
                            }}
                        >
                            {(field) => (
                                <div className="space-y-1.5">
                                    <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                        <Phone size={14} className="text-slate-400" /> Phone Number
                                    </label>
                                    <input
                                        placeholder="017XXXXXXXX"
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        className={`w-full px-4 py-2.5 bg-white border rounded-xl outline-none focus:ring-4 transition-all ${field.state.meta.errors.length ? "border-red-300 focus:ring-red-50" : "border-slate-200 focus:ring-blue-50 focus:border-blue-500"
                                            }`}
                                    />
                                    <FieldError errors={field.state.meta.errors} />
                                </div>
                            )}
                        </form.Field>

                        {/* Blood Group */}
                        <form.Field
                            name="bloodGrouph"
                            validators={{ onChange: ({ value }) => !value ? "Blood group is required" : undefined }}
                        >
                            {(field) => (
                                <div className="space-y-1.5">
                                    <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                        <Droplets size={14} className="text-slate-400" /> Blood Group
                                    </label>
                                    <select
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        className={`w-full px-4 py-2.5 bg-white border rounded-xl outline-none appearance-none focus:ring-4 transition-all ${field.state.meta.errors.length ? "border-red-300 focus:ring-red-50" : "border-slate-200 focus:ring-blue-50 focus:border-blue-500"
                                            }`}
                                    >
                                        <option value="">Select Group</option>
                                        <option value="A+">A+</option>
                                        <option value="A-">A-</option>
                                        <option value="B+">B+</option>
                                        <option value="B-">B-</option>
                                        <option value="O+">O+</option>
                                        <option value="O-">O-</option>
                                        <option value="AB+">AB+</option>
                                        <option value="AB-">AB-</option>
                                    </select>
                                    <FieldError errors={field.state.meta.errors} />
                                </div>
                            )}
                        </form.Field>

                        {/* Address */}
                        <form.Field
                            name="address"
                            validators={{ onChange: ({ value }) => !value ? "Permanent address is required" : undefined }}
                        >
                            {(field) => (
                                <div className="space-y-1.5">
                                    <label className="text-sm font-semibold text-slate-700">Permanent Address</label>
                                    <input
                                        placeholder="Village, Post, Thana"
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        className={`w-full px-4 py-2.5 bg-white border rounded-xl outline-none focus:ring-4 transition-all ${field.state.meta.errors.length ? "border-red-300 focus:ring-red-50" : "border-slate-200 focus:ring-blue-50 focus:border-blue-500"
                                            }`}
                                    />
                                    <FieldError errors={field.state.meta.errors} />
                                </div>
                            )}
                        </form.Field>

                        {/* Delivery Area */}
                        <form.Field
                            name="deliveryArea"
                            validators={{ onChange: ({ value }) => !value ? "Delivery area is required" : undefined }}
                        >
                            {(field) => (
                                <div className="space-y-1.5 md:col-span-2">
                                    <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                        <MapPin size={14} className="text-slate-400" /> Assigned Delivery Area
                                    </label>
                                    <input
                                        placeholder="e.g. Dhanmondi, Dhaka"
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        className={`w-full px-4 py-2.5 bg-white border rounded-xl outline-none focus:ring-4 transition-all ${field.state.meta.errors.length ? "border-red-300 focus:ring-red-50" : "border-slate-200 focus:ring-blue-50 focus:border-blue-500"
                                            }`}
                                    />
                                    <FieldError errors={field.state.meta.errors} />
                                </div>
                            )}
                        </form.Field>

                        {/* Vehicle Type */}
                        <form.Field name="vehicleType">
                            {(field) => (
                                <div className="space-y-1.5">
                                    <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                        <Truck size={14} className="text-slate-400" /> Vehicle Type
                                    </label>
                                    <select
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.value as any)}
                                        className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-500 transition-all"
                                    >
                                        <option value={VehicleType.BIKE}>Motorbike</option>
                                        <option value={VehicleType.CYCLE}>Bicycle</option>
                                        <option value={VehicleType.VAN}>Van/Car</option>
                                    </select>
                                </div>
                            )}
                        </form.Field>

                        {/* Vehicle Number */}
                        <form.Field
                            name="vehicleNumber"
                            validators={{ onChange: ({ value }) => !value ? "Vehicle number is required" : undefined }}
                        >
                            {(field) => (
                                <div className="space-y-1.5">
                                    <label className="text-sm font-semibold text-slate-700">Vehicle Plate Number</label>
                                    <input
                                        placeholder="DHAKA-METRO-1234"
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        className={`w-full px-4 py-2.5 bg-white border rounded-xl outline-none focus:ring-4 transition-all ${field.state.meta.errors.length ? "border-red-300 focus:ring-red-50" : "border-slate-200 focus:ring-blue-50 focus:border-blue-500"
                                            }`}
                                    />
                                    <FieldError errors={field.state.meta.errors} />
                                </div>
                            )}
                        </form.Field>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
                        <button type="button" onClick={onClose} className="flex-1 px-6 py-3 rounded-xl font-bold text-slate-600 hover:bg-slate-100 transition-all">
                            Discard
                        </button>
                        <form.Subscribe
                            selector={(state) => [state.canSubmit, state.isSubmitting]}
                            children={([canSubmit, isSubmitting]) => (
                                <button
                                    type="submit"
                                    disabled={!canSubmit || isSubmitting}
                                    className="flex-[2] px-6 py-3 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
                                >
                                    {isSubmitting ? "Processing..." : "Confirm Registration"}
                                </button>
                            )}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddRiderForm;