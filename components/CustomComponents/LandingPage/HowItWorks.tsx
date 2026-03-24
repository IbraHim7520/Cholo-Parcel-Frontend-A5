import React from "react";

const HowItWorks = () => {
  return (
    <section className="py-16 bg-base-200">
      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800">
            How <span className="text-orange-500">Cholo Parcel</span> Works
          </h2>
          <p className="text-slate-500 mt-3 max-w-xl mx-auto">
            Simple and fast process to send your parcel anywhere.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-4 gap-6">

          {/* Step 1 */}
          <div className="bg-white rounded-xl p-6 text-center shadow hover:shadow-lg transition">
            <div className="text-3xl font-bold text-orange-500 mb-3">1</div>
            <h3 className="font-semibold mb-2">Create Order</h3>
            <p className="text-sm text-slate-500">
              Enter parcel details and destination easily from your dashboard.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-xl p-6 text-center shadow hover:shadow-lg transition">
            <div className="text-3xl font-bold text-orange-500 mb-3">2</div>
            <h3 className="font-semibold mb-2">Pickup Parcel</h3>
            <p className="text-sm text-slate-500">
              Our rider collects the parcel from your location.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-xl p-6 text-center shadow hover:shadow-lg transition">
            <div className="text-3xl font-bold text-orange-500 mb-3">3</div>
            <h3 className="font-semibold mb-2">In Transit</h3>
            <p className="text-sm text-slate-500">
              Track your parcel in real-time as it moves to destination.
            </p>
          </div>

          {/* Step 4 */}
          <div className="bg-white rounded-xl p-6 text-center shadow hover:shadow-lg transition">
            <div className="text-3xl font-bold text-orange-500 mb-3">4</div>
            <h3 className="font-semibold mb-2">Delivered</h3>
            <p className="text-sm text-slate-500">
              Parcel delivered safely to the customer with confirmation.
            </p>
          </div>

        </div>

        {/* CTA */}
        <div className="mt-14 text-center">
          <button className="btn bg-orange-500 hover:bg-orange-600 text-white border-none px-8">
            Start Shipping Now
          </button>
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;