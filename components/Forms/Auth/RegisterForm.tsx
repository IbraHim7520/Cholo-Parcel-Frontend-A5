"use client";

import React, { useState, useRef } from "react";
import { Camera, User, Mail, Lock, ShieldCheck } from "lucide-react";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { env } from "@/Config/env";
import { Trykker } from "next/font/google";

const RegisterForm = () => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      image: null as File | null,
    },
    onSubmit: async ({ value }) => {
      if (value.password !== value.confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }

      let imageURL = '';
      if(value.image && value.image !== null) {
        const formData = new FormData();
        formData.append("image", value.image);
        try {
          const response = await fetch(`${env.BACKEND_URL}/users/upload-image`, {
            method: "POST",
            body: formData
          })
          const data = await response.json();
          imageURL = data.data.secure_url;
        } catch (error) {
         if(env.NODE_ENV === 'development') {
          console.error("Image upload failed:", error);
         }
        }
      }

      try {
        const sigupData = {
          name:value.name,
          email: value.email,
          password: value.password,
          image: imageURL
        }
      const sigupPromise = await fetch(`${env.BACKEND_URL}/users/sign-up`, {
          method: "POST",
          headers:{
            "Content-Type": "application/json"
          },
          body: JSON.stringify(sigupData)
          })
          const data = await sigupPromise.json();
          if(data.success){
            toast.success(data.message);
          }

    } catch (error) {
      if(env.NODE_ENV === 'development') {
        console.error("Signup failed:", error);
      }
      toast.error("Signup failed. Please try again.");
    }
  


      
      form.reset();
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="space-y-8"
    >
      {/* Profile Image */}
      <div className="flex flex-col items-center">
        <div
          onClick={() => fileInputRef.current?.click()}
          className="relative group cursor-pointer"
        >
          <div
            className={`w-24 h-24 rounded-2xl border-2 flex items-center justify-center overflow-hidden transition-all duration-300
            ${
              previewUrl
                ? "border-orange-500"
                : "border-gray-300 bg-gray-50 hover:border-orange-500"
            }`}
          >
            {previewUrl ? (
              <img
                src={previewUrl}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-gray-400 group-hover:text-orange-500 text-center text-xs">
                <Camera size={22} className="mx-auto mb-1" />
                Upload
              </div>
            )}
          </div>

          {/* Small edit badge */}
          <div className="absolute bottom-0 right-0 bg-orange-500 text-white p-1 rounded-full shadow">
            <Camera size={14} />
          </div>
        </div>

        <form.Field name="image">
          {(field) => (
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  field.handleChange(file);
                  setPreviewUrl(URL.createObjectURL(file));
                }
              }}
            />
          )}
        </form.Field>
      </div>

      {/* Input Fields */}
      <div className="space-y-5">

        {/* Name */}
        <form.Field
          name="name"
          validators={{
            onChange: ({ value }) => {
              if (!value) return "Name is required";
              if (value.length < 3) return "Minimum 3 characters";
              if (value.length > 20) return "Max 20 characters";
            },
          }}
        >
          {(field) => (
            <div>
              <label className="text-sm font-medium text-gray-600 mb-1 block">
                Full Name
              </label>

              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="John Doe"
                  className="w-full h-12 pl-10 pr-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:border-orange-500 outline-none transition"
                />
              </div>

              {field.state.meta.errors?.[0] && (
                <p className="text-red-500 text-xs mt-1">
                  {field.state.meta.errors[0]}
                </p>
              )}
            </div>
          )}
        </form.Field>

        {/* Email */}
        <form.Field
          name="email"
          validators={{
            onChange: ({ value }) => {
              if (!value) return "Email is required";
              if (!value.includes("@")) return "Invalid email";
            },
          }}
        >
          {(field) => (
            <div>
              <label className="text-sm font-medium text-gray-600 mb-1 block">
                Email
              </label>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                type="email"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full h-12 pl-10 pr-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:border-orange-500 outline-none transition"
                />
              </div>

              {field.state.meta.errors?.[0] && (
                <p className="text-red-500 text-xs mt-1">
                  {field.state.meta.errors[0]}
                </p>
              )}
            </div>
          )}
        </form.Field>

        {/* Password Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          {/* Password */}
          <form.Field
            name="password"
            validators={{
              onChange: ({ value }) => {
                if (!value) return "Password required";
                if (value.length < 6) return "Min 6 characters";
              },
            }}
          >
            {(field) => (
              <div>
                <label className="text-sm font-medium text-gray-600 mb-1 block">
                  Password
                </label>

                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="password"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="••••••••"
                    className="w-full h-12 pl-10 pr-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:border-orange-500 outline-none transition"
                  />
                </div>

                {field.state.meta.errors?.[0] && (
                  <p className="text-red-500 text-xs mt-1">
                    {field.state.meta.errors[0]}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          {/* Confirm Password */}
          <form.Field
            name="confirmPassword"
            validators={{
              onChange: ({ value, fieldApi }) => {
                if (!value) return "Confirm password";
                if (value !== fieldApi.form.getFieldValue("password")) {
                  return "Passwords do not match";
                }
              },
            }}
          >
            {(field) => (
              <div>
                <label className="text-sm font-medium text-gray-600 mb-1 block">
                  Confirm Password
                </label>

                <div className="relative">
                  <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="password"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="••••••••"
                    className="w-full h-12 pl-10 pr-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:border-orange-500 outline-none transition"
                  />
                </div>

                {field.state.meta.errors?.[0] && (
                  <p className="text-red-500 text-xs mt-1">
                    {field.state.meta.errors[0]}
                  </p>
                )}
              </div>
            )}
          </form.Field>

        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full h-12 bg-orange-500 text-white font-semibold rounded-xl hover:bg-orange-600 transition-all active:scale-[0.98] shadow-md shadow-orange-500/20"
      >
        Create Account
      </button>
    </form>
  );
};

export default RegisterForm;