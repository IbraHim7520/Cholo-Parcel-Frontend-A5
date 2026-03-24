import heroImage from "@/assets/carosel-1.jpg";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="bg-linear-to-b from-[#F5F7FF] via-[#fffbee] to-[#E6EFFF] min-h-screen flex items-center px-4 sm:px-8">
      
      <div className="max-w-7xl mx-auto w-full text-center">
        <div className="mb-6">
          <span className="badge bg-orange-400 border-none text-white text-xs px-6 py-3">
            Fast & Reliable Parcel Delivery
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight max-w-3xl mx-auto">
          Deliver Your Parcels
          <span className="text-orange-500"> Faster, Safer & Smarter</span>
        </h1>

        <p className="mt-4 text-gray-600 max-w-xl mx-auto text-sm sm:text-base">
          CholoParcel helps merchants and individuals send, track, and manage deliveries easily.
          Real-time tracking, affordable pricing, and nationwide coverage.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          
          <Link href="/track" className="btn btn-sm md:btn bg-orange-500 text-white border-none hover:bg-orange-600">
            Track Parcel
          </Link>

          <Link href="/pricing" className="btn btn-sm md:btn border-orange-500 text-orange-600 hover:bg-orange-50">
            View Pricing
          </Link>

        </div>
        <div className="mt-12">
          <Image
            src={heroImage}
            alt="Parcel Delivery"
            className="rounded-3xl shadow-lg mx-auto max-w-5xl w-full h-72 object-cover"
            priority
          />
        </div>

      </div>
    </section>
  );
};

export default Hero;