import React from "react";

const OnboardingSection = () => {
  return (
    <section className="py-16 bg-base-100">
      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800">
            Join <span className="text-orange-500">Cholo Parcel</span>
          </h2>
          <p className="text-slate-500 mt-3 max-w-xl mx-auto">
            Whether you're a business owner or a delivery rider, start your journey with us today.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-8">

          {/* Merchant Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition">
            <h3 className="text-2xl font-bold text-slate-800 mb-3">
              Become a Merchant
            </h3>

            <p className="text-slate-500 mb-6">
              Grow your business by delivering products faster and reaching more customers across the country.
            </p>

            <ul className="space-y-3 mb-6 text-sm text-slate-600">
              <li>✅ Easy parcel booking</li>
              <li>✅ Real-time tracking</li>
              <li>✅ Cash on delivery support</li>
              <li>✅ Business dashboard</li>
            </ul>

            <button className="btn bg-orange-500 hover:bg-orange-600 text-white border-none w-full">
              Register as Merchant
            </button>
          </div>

          {/* Rider Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition">
            <h3 className="text-2xl font-bold text-slate-800 mb-3">
              Become a Rider
            </h3>

            <p className="text-slate-500 mb-6">
              Earn money by delivering parcels in your area with flexible working hours.
            </p>

            <ul className="space-y-3 mb-6 text-sm text-slate-600">
              <li>✅ Flexible schedule</li>
              <li>✅ Weekly payments</li>
              <li>✅ Easy task management</li>
              <li>✅ Route optimization</li>
            </ul>

            <button className="btn bg-orange-500 hover:bg-orange-600 text-white border-none w-full">
              Apply as Rider
            </button>
          </div>

        </div>

        {/* Bottom Banner */}
        <div className="mt-16 bg-linear-to-r from-orange-500 to-orange-600 text-white rounded-2xl p-8 md:p-10 text-center shadow-lg">
          <h3 className="text-2xl md:text-3xl font-bold mb-3">
            Start Your Journey Today 🚀
          </h3>
          <p className="text-orange-100 mb-6">
            Join thousands of merchants and riders growing with Cholo Parcel.
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button className="btn bg-white text-orange-500 border-none px-6">
              Join as Merchant
            </button>
            <button className="btn bg-white text-orange-500 border-none px-6">
              Join as Rider
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default OnboardingSection;