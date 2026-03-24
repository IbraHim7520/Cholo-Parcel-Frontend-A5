"use client";
import React, { useState, useRef } from "react";
import { Camera, User, Mail, Lock, ShieldCheck } from "lucide-react";

const RegisterForm = () => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  return (
    <form className="space-y-6">

      {/* Profile Image */}
      <div className="flex flex-col items-center mb-4">
        <div 
          className="relative group cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          <div className={`w-20 h-20 rounded-xl border-2 flex items-center justify-center overflow-hidden transition
            ${previewUrl ? "border-orange-500" : "border-gray-300 bg-gray-50 hover:border-orange-400"}`}
          >
            {previewUrl ? (
              <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <div className="text-gray-400 group-hover:text-orange-500 text-center text-sm">
                <Camera size={24} className="mx-auto" />
                <span className="mt-1 block">Upload</span>
              </div>
            )}
          </div>
        </div>
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
      </div>

      {/* Full Name */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-600 mb-1">Full Name</label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="John Doe"
            className="input input-bordered w-full pl-10 rounded-lg bg-gray-50 border-gray-200 focus:border-orange-500 focus:bg-white"
            required
          />
        </div>
      </div>

      {/* Email */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-600 mb-1">Email</label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="email"
            placeholder="you@example.com"
            className="input input-bordered w-full pl-10 rounded-lg bg-gray-50 border-gray-200 focus:border-orange-500 focus:bg-white"
            required
          />
        </div>
      </div>

      {/* Password + Confirm */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-600 mb-1">Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="password"
              placeholder="••••••••"
              className="input input-bordered w-full pl-10 rounded-lg bg-gray-50 border-gray-200 focus:border-orange-500 focus:bg-white"
              required
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-600 mb-1">Confirm Password</label>
          <div className="relative">
            <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="password"
              placeholder="••••••••"
              className="input input-bordered w-full pl-10 rounded-lg bg-gray-50 border-gray-200 focus:border-orange-500 focus:bg-white"
              required
            />
          </div>
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
      >
        Create Account
      </button>
    </form>
  );
};

export default RegisterForm;