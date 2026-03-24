import React from "react";
import Link from "next/link";
import NavLogo from "@/components/ui/NavLogo";
import RegisterForm from "@/components/Forms/Auth/RegisterForm";

const RegisterPage = () => {
  return (
    <div className="min-h-screen flex overflow-hidden bg-white">

      {/* Left Side */}
      <div className="hidden lg:flex lg:w-5/12 relative bg-[#0F172A] flex-col justify-between px-14 py-16 text-white">
        
        {/* Glow Effects */}
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-orange-500/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-5%] right-[-5%] w-64 h-64 bg-blue-500/10 rounded-full blur-[100px]" />

        {/* Logo */}
        <div className="relative z-10">
          <NavLogo />
        </div>

        {/* Content */}
        <div className="relative z-10">
          <h1 className="text-4xl xl:text-5xl font-extrabold leading-tight tracking-tight">
            Scale your <br />
            <span className="text-orange-500">Business</span> with <br />
            smart logistics.
          </h1>

          <p className="mt-5 text-slate-400 text-base max-w-sm leading-relaxed">
            The all-in-one delivery partner for modern Bangladeshi merchants.
          </p>

          {/* Features */}
          <div className="mt-10 space-y-4">
            {[
              { icon: "🚚", text: "Nationwide instant coverage" },
              { icon: "💰", text: "Next-day payment processing" },
              { icon: "🛡️", text: "Secure parcel insurance" },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 bg-white/5 p-3.5 rounded-xl border border-white/10 hover:bg-white/10 transition"
              >
                <span className="text-xl">{item.icon}</span>
                <span className="text-sm text-slate-200 font-medium">
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 text-xs text-slate-500 font-medium">
          © 2026 CholoParcel Technologies Ltd.
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full lg:w-7/12 flex flex-col justify-center items-center px-6 py-12 bg-[#F8FAFC]">

        <div className="w-full max-w-md bg-white p-8 sm:p-10 rounded-3xl shadow-lg border border-slate-100">
          
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Create Account
            </h2>
            <p className="text-slate-500 mt-2 text-sm">
              Start managing your parcels in minutes.
            </p>
          </div>

          {/* Form Slot */}
          <div className="min-h-70 flex flex-col justify-center">
                <RegisterForm />
          </div>

          {/* Footer */}
          <div className="mt-6 pt-6 border-t border-slate-100 text-center">
            <p className="text-sm text-slate-600">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-orange-600 font-semibold hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>

        </div>

        {/* Mobile Footer */}
        <div className="lg:hidden mt-6">
          <p className="text-slate-400 text-xs font-semibold tracking-widest uppercase">
            Powered by CholoParcel
          </p>
        </div>

      </div>
    </div>
  );
};

export default RegisterPage;