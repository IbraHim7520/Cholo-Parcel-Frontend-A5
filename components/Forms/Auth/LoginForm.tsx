"use client";
import { Eye, EyeClosed } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form className="mt-6 space-y-5 font-normal">

      {/* Email */}
      <div className="flex flex-col">
        <label className="text-sm font-semibold text-gray-600 mb-1">
          Email Address
        </label>
        <input
          type="email"
          name="email"
          placeholder="name@company.com"
          className="input w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 focus:border-orange-500 focus:bg-white focus:outline-none transition"
          required
        />
      </div>

      {/* Password */}
      <div className="flex flex-col relative">
        <div className="flex justify-between items-center mb-1">
          <label className="text-sm font-semibold text-gray-600">
            Password
          </label>
          <Link
            href="/forgot-password"
            className="text-xs font-medium text-orange-600 hover:text-orange-700 hover:underline"
          >
            Forgot password?
          </Link>
        </div>
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="••••••••"
          className="input w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 pr-10 focus:border-orange-500 focus:bg-white focus:outline-none transition"
          required
        />
        {/* Eye Toggle */}
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-500 transition"
        >
          {showPassword ? <EyeClosed size={20} /> : <Eye size={20} />}
        </button>
      </div>

      {/* Login Button */}
      <button
        type="submit"
        className="w-full py-3 rounded-lg bg-orange-500 text-white font-medium hover:bg-orange-600 transition"
      >
        Login to Account
      </button>

      {/* Google Login */}
      <button
        type="button"
        className="w-full py-3 rounded-lg border border-gray-300 text-gray-700 flex items-center justify-center gap-2 hover:bg-gray-50 transition"
      >
        <svg
          aria-label="Google logo"
          width="16"
          height="16"
          viewBox="0 0 512 512"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g>
            <path d="M0 0H512V512H0" fill="#fff"></path>
            <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path>
            <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path>
            <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path>
            <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path>
          </g>
        </svg>
        Login with Google
      </button>
    </form>
  );
};

export default LoginForm;