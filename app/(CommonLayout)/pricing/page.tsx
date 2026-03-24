"use client";
import React from "react";
import { FileText, Package, GlassWater, Utensils, Box } from "lucide-react";

const PricingList = [
  {
    name: "Document",
    icon: <FileText className="text-blue-500" size={24} />,
    description: "Letters, legal papers, and small envelopes.",
    prices: [
      { type: "In City", amount: 60 },
      { type: "Upozila Area", amount: 80 },
      { type: "Office Pickup", amount: 80 },
      { type: "Home Delivery", amount: 120 }
    ]
  },
  {
    name: "Package (KG)",
    icon: <Package className="text-orange-500" size={24} />,
    description: "Standard boxed goods and e-commerce parcels.",
    prices: [
      { type: "1-5 KG", amount: 50 },
      { type: "6-10 KG", amount: 80 },
      { type: "11-20 KG", amount: 150 },
      { type: "21+ KG", amount: "Contact Office" }
    ]
  },
  {
    name: "Glass Item",
    icon: <GlassWater className="text-cyan-500" size={24} />,
    description: "Fragile items requiring extra care and padding.",
    prices: [
      { type: "Fragile Small", amount: 100 },
      { type: "Fragile Medium", amount: 200 },
      { type: "Fragile Large", amount: "Contact Office" }
    ]
  },
  {
    name: "Food Item",
    icon: <Utensils className="text-red-500" size={24} />,
    description: "Perishables or restaurant delivery boxes.",
    prices: [
      { type: "Small Parcel", amount: 70 },
      { type: "Medium Parcel", amount: 120 },
      { type: "Large Parcel", amount: "Contact Office" }
    ]
  },
  {
    name: "Others Item",
    icon: <Box className="text-yellow-500" size={24} />,
    description: "Any item not listed above. Custom pricing available.",
    prices: [
      { type: "Custom Item", amount: "Contact Office" }
    ]
  }
];

const PricingSection = () => {
  return (
    <section className="py-16 px-4 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
            Transparent <span className="text-orange-600">Pricing</span>
          </h2>
          <p className="text-slate-500 mt-4 max-w-2xl mx-auto">
            Choose the category that fits your needs. No hidden charges, just straightforward delivery rates.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PricingList.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 hover:shadow-xl hover:border-orange-200 transition-all duration-300 group"
            >
              {/* Icon & Title */}
              <div className="mb-6">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mt-4">{item.name}</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">{item.description}</p>
              </div>

              {/* Price List */}
              <div className="space-y-3">
                {item.prices.map((price, i) => (
                  <div key={i} className="flex justify-between items-center text-sm">
                    <span className="text-slate-500">{price.type}</span>
                    <span className={`font-bold ${price.amount === "Contact Office" ? "text-orange-600 text-[10px] uppercase tracking-wider" : "text-slate-900"}`}>
                      {typeof price.amount === "number" ? `৳${price.amount}` : price.amount}
                    </span>
                  </div>
                ))}
              </div>

              {/* Action */}
              <button className="btn btn-sm btn-block mt-8 rounded-xl bg-slate-900 text-white border-none group-hover:bg-orange-600 transition-colors">
                Book Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;