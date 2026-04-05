"use client";

import { useForm } from "@tanstack/react-form";
import { env } from "@/Config/env";
import { useState } from "react";
import { toast } from "sonner";
import { VehicleType } from "@/Interfaces/interfaces";
import { Spinner } from "../ui/spinner";

// Helper component to display error messages
function FieldInfo({ field }: { field: any }) {
    return (
        <div className="h-4"> {/* Fixed height prevents layout shift */}
            {field.state.meta.isTouched && field.state.meta.errors.length ? (
                <em className="text-[10px] text-red-500 font-medium block">
                    {field.state.meta.errors.join(", ")}
                </em>
            ) : null}
        </div>
    );
}

const initialValues = {
    username: "",
    useremail: "",
    userpassword: "",
    userimage: "",
    nid: "",
    dob: "",
    bloodGrouph: "",
    contact: "",
    address: "",
    deliveryArea: "",
    vehicleType: VehicleType.BIKE,
    experience: "",
    vehicleNumber: "",
};

const AdminCreateRiderForm = ({ modal }: { modal: string }) => {
    const [loading, setLoading] = useState(false);

    const form = useForm({
        defaultValues: initialValues,
        onSubmit: async ({ value }) => {
            setLoading(true);
            try {
                const res = await fetch(`${env.BACKEND_URL}/admins/create-rider`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(value),
                    credentials: "include",
                });

                const data = await res.json();
            
                if (res.ok) {
                    const modalElement = document.getElementById(modal) as HTMLDialogElement;
                    if (modalElement) modalElement.close();
                    toast.success(data.message || "Rider created successfully");
                    form.reset();
                } else {    
                    toast.error(data.message || "Failed to create rider");
                }
            } catch (err) {
                console.error(err);
                toast.error("Something went wrong");
            } finally {
                setLoading(false);
            }
        },
    });

    // Consistent input styling
    const inputClass = "w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none transition-all focus:border-orange-500 focus:ring-2 focus:ring-orange-100 placeholder:text-slate-400 text-slate-700 bg-slate-50/50";

    return (
        <div className="max-w-5xl mx-auto bg-white p-8 rounded-[2rem] border border-slate-100 shadow-2xl shadow-orange-100/50">
        
            <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-black text-slate-800 tracking-tight">Add New <span className="text-orange-500">Rider</span></h2>
                    <p className="text-sm text-slate-500 mt-1">Register personal credentials and vehicle details</p>
                </div>
                <div className="h-1 w-20 bg-orange-500 rounded-full hidden md:block mb-2"></div>
            </header>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    form.handleSubmit();
                }}
                className="space-y-8"
            >
                {/* Section: User Info */}
                <section>
                    <div className="flex items-center gap-2 mb-4">
                        <span className="p-1.5 bg-orange-100 text-orange-600 rounded-lg font-bold text-xs">01</span>
                        <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider">Account Credentials</h3>
                    </div>
                    <div className="grid md:grid-cols-2 gap-x-6 gap-y-2">
                        <form.Field
                            name="username"
                            validators={{ onChange: ({ value }) => !value ? "Username is required" : value.length < 3 ? "Minimum 3 chars" : undefined }}
                            children={(f) => (
                                <div className="space-y-1">
                                    <input className={inputClass} type="text" placeholder="Full Name" value={f.state.value} onBlur={f.handleBlur} onChange={(e) => f.handleChange(e.target.value)} />
                                    <FieldInfo field={f} />
                                </div>
                            )}
                        />
                        <form.Field
                            name="useremail"
                            validators={{ onChange: ({ value }) => !value ? "Email is required" : !/^\S+@\S+\.\S+$/.test(value) ? "Invalid email" : undefined }}
                            children={(f) => (
                                <div className="space-y-1">
                                    <input type="email" className={inputClass} placeholder="Email Address" value={f.state.value} onBlur={f.handleBlur} onChange={(e) => f.handleChange(e.target.value)} />
                                    <FieldInfo field={f} />
                                </div>
                            )}
                        />
                        <form.Field
                            name="userpassword"
                            validators={{ onChange: ({ value }) => !value ? "Password required" : value.length < 6 ? "Min 6 chars" : undefined }}
                            children={(f) => (
                                <div className="space-y-1">
                                    <input type="password" className={inputClass} placeholder="Password" value={f.state.value} onBlur={f.handleBlur} onChange={(e) => f.handleChange(e.target.value)} />
                                    <FieldInfo field={f} />
                                </div>
                            )}
                        />
                        <form.Field
                            name="userimage"
                            children={(f) => (
                                <div className="space-y-1">
                                    <input className={inputClass} type="url" placeholder="Profile Image URL" value={f.state.value} onBlur={f.handleBlur} onChange={(e) => f.handleChange(e.target.value)} />
                                    <FieldInfo field={f} />
                                </div>
                            )}
                        />
                    </div>
                </section>

                {/* Section: Personal Info */}
                <section>
                    <div className="flex items-center gap-2 mb-4">
                        <span className="p-1.5 bg-orange-100 text-orange-600 rounded-lg font-bold text-xs">02</span>
                        <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider">Personal Identity</h3>
                    </div>
                    <div className="grid md:grid-cols-2 gap-x-6 gap-y-2">
                        <form.Field
                            name="nid"
                            validators={{ onChange: ({ value }) => value.length !== 10 ? "Must be 10 digits" : undefined }}
                            children={(f) => (
                                <div className="space-y-1">
                                    <input className={inputClass} type="number" placeholder="National ID Number" value={f.state.value} onBlur={f.handleBlur} onChange={(e) => f.handleChange(e.target.value)} />
                                    <FieldInfo field={f} />
                                </div>
                            )}
                        />
                        <form.Field
                            name="dob"
                            validators={{ onChange: ({ value }) => !value ? "DOB required" : undefined }}
                            children={(f) => (
                                <div className="space-y-1">
                                    <input type="date" className={inputClass} value={f.state.value} onBlur={f.handleBlur} onChange={(e) => f.handleChange(e.target.value)} />
                                    <FieldInfo field={f} />
                                </div>
                            )}
                        />
                        <form.Field
                            name="experience"
                            validators={{
                                onChange: ({ value }) => !value ? "Experience is required" : undefined,
                            }}
                            children={(f) => (
                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase font-bold text-slate-400 ml-1">Work Experience</label>
                                    <select
                                        className={inputClass}
                                        value={f.state.value}
                                        onBlur={f.handleBlur}
                                        onChange={(e) => f.handleChange(e.target.value)}
                                    >
                                        <option value="" disabled>Select Experience Level</option>
                                        <option value="fresher">Fresher / No Experience</option>
                                        <option value="1_year">1 Year</option>
                                        <option value="2_years">2 Years</option>
                                        <option value="3_years">3 Years</option>
                                        <option value="5_plus_years">5+ Years</option>
                                    </select>
                                    <FieldInfo field={f} />
                                </div>
                            )}
                        />
                        <form.Field
                            name="contact"
                            validators={{ onChange: ({ value }) => value.length !== 11 ? "Must be 11 digits" : undefined }}
                            children={(f) => (
                                <div className="space-y-1">
                                    <input className={inputClass} type="number" placeholder="Phone Number" value={f.state.value} onBlur={f.handleBlur} onChange={(e) => f.handleChange(e.target.value)} />
                                    <FieldInfo field={f} />
                                </div>
                            )}
                        />
                        <form.Field
                            name="bloodGrouph"
                            validators={{
                                onChange: ({ value }) => !value ? "Blood group is required" : undefined,
                            }}
                            children={(f) => (
                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase font-bold text-slate-400 ml-1">Blood Group</label>
                                    <select
                                        className={inputClass}
                                        value={f.state.value}
                                        onBlur={f.handleBlur}
                                        onChange={(e) => f.handleChange(e.target.value)}
                                    >
                                        <option value="" disabled>Select Blood Group</option>
                                        <option value="A+">A+</option>
                                        <option value="A-">A-</option>
                                        <option value="B+">B+</option>
                                        <option value="B-">B-</option>
                                        <option value="AB+">AB+</option>
                                        <option value="AB-">AB-</option>
                                        <option value="O+">O+</option>
                                        <option value="O-">O-</option>
                                    </select>
                                    <FieldInfo field={f} />
                                </div>
                            )}
                        />
                        <form.Field
                            name="address"
                            children={(f) => (
                                <div className="md:col-span-2 space-y-1">
                                    <input className={inputClass} placeholder="Full Home Address" value={f.state.value} onBlur={f.handleBlur} onChange={(e) => f.handleChange(e.target.value)} />
                                    <FieldInfo field={f} />
                                </div>
                            )}
                        />
                    </div>
                </section>

                {/* Section: Logistics */}
                <section className="bg-orange-50/50 p-6 rounded-2xl border border-orange-100">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="p-1.5 bg-white text-orange-600 border border-orange-200 rounded-lg font-bold text-xs">03</span>
                        <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider">Vehicle & Zone</h3>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        <form.Field
                            name="vehicleType"
                            children={(f) => (
                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase font-bold text-slate-400 ml-1">Type</label>
                                    <select className={inputClass} value={f.state.value} onChange={(e) => f.handleChange(e.target.value as VehicleType)}>
                                        <option value={VehicleType.BIKE}>Motorbike</option>
                                        <option value={VehicleType.CYCLE}>Bicycle</option>
                                        <option value={VehicleType.VAN}>Delivery Van</option>
                                    </select>
                                </div>
                            )}
                        />
                        <form.Field
                            name="vehicleNumber"
                            validators={{ onChange: ({ value }) => !value ? "Required" : undefined }}
                            children={(f) => (
                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase font-bold text-slate-400 ml-1">Plate Number</label>
                                    <input className={inputClass} placeholder="DHAKA-METRO-..." value={f.state.value} onBlur={f.handleBlur} onChange={(e) => f.handleChange(e.target.value)} />
                                    <FieldInfo field={f} />
                                </div>
                            )}
                        />
                        <form.Field
                            name="deliveryArea"
                            validators={{ onChange: ({ value }) => !value ? "Required" : undefined }}
                            children={(f) => (
                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase font-bold text-slate-400 ml-1">Assigned Area</label>
                                    <input className={inputClass} placeholder="e.g. Gulshan" value={f.state.value} onBlur={f.handleBlur} onChange={(e) => f.handleChange(e.target.value)} />
                                    <FieldInfo field={f} />
                                </div>
                            )}
                        />
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

                    <form.Subscribe
                        selector={(state) => [state.canSubmit, state.isSubmitting]}
                        children={([canSubmit, isSubmitting]) => (
                            <button
                                type="submit"
                                disabled={!canSubmit || loading}
                                className={`px-10 py-3 rounded-xl text-white font-bold shadow-lg shadow-orange-200 transition-all active:scale-95 ${!canSubmit
                                        ? "bg-slate-300 cursor-not-allowed shadow-none"
                                        : "bg-orange-500 hover:bg-orange-600"
                                    }`}
                            >
                                {loading || isSubmitting ? (
                                    <span className="flex items-center gap-2">
                                        <Spinner className="size-4" />
                                    </span>
                                ) : "Register Rider"}
                            </button>
                        )}
                    />
                </div>
            </form>
        </div>
    );
};

export default AdminCreateRiderForm;