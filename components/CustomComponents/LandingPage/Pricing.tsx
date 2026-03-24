import React from "react";
import { Truck, ArrowRight, Calculator } from "lucide-react";
import Link from "next/link";

const PricingBanner = () => {
  return (
    <section className="relative h-fit py-12 max-w-7xl mx-auto px-4 sm:mt-20">
      
      <div className="relative bg-slate-900 rounded-[2.5rem] md:p-10 flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 shadow-2xl shadow-orange-100 transition-all duration-500 hover:shadow-orange-200/50 overflow-hidden">
        
        {/* Decorative Blurs */}
        <div className="absolute top-0 right-0 w-36 sm:w-64 h-36 sm:h-64 bg-orange-500/10 rounded-full blur-3xl -mr-16 sm:-mr-32 -mt-16 sm:-mt-32 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-28 sm:w-48 h-28 sm:h-48 bg-blue-500/10 rounded-full blur-2xl -ml-12 sm:-ml-24 -mb-12 sm:-mb-24 pointer-events-none"></div>

        {/* Text + Icon */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6 relative z-10 w-full lg:w-2/3 text-center md:text-left">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-orange-500 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/20 shrink-0 group-hover:rotate-6 transition-transform">
            <Truck size={28} className="text-white sm:text-white" />
          </div>
          
          <div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-snug">
              Transparent Pricing for <br className="hidden md:block" />
              <span className="text-orange-500">Every Delivery</span> Need
            </h3>
            <p className="text-slate-400 mt-2 sm:mt-3 text-sm sm:text-base md:text-base leading-relaxed">
              From small documents to heavy bulk packages, we offer nationwide delivery 
              with zero hidden costs. Not sure about the cost? 
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 relative z-10 w-full lg:w-auto justify-center sm:justify-start mt-4 pb-3 px-5 md:px-0 md:pb-0 lg:mt-0">
          <Link href={"/pricing"} className="btn h-10 sm:h-12 px-5 sm:px-8 bg-orange-500 hover:bg-orange-600 text-white border-none rounded-2xl shadow-lg shadow-orange-500/20 transition-all active:scale-95 flex items-center gap-2 text-sm sm:text-base font-bold justify-center">
            View Price List
            <ArrowRight size={16} />
          </Link>
        </div>

      </div>
    </section>
  );
};

export default PricingBanner;