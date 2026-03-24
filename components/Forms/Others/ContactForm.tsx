"use client";
import React from "react";
import { Send } from "lucide-react";

const ContactForm = () => {
  return (
    <form className="grid  grid-cols-1 md:grid-cols-2 gap-6">
      {/* Name */}
      <div className="form-control">
        <label className="label py-1">
          <span className="label-text font-semibold text-slate-700">Your Name</span>
        </label>
        <input
          type="text"
          placeholder="John Doe"
          className="input w-full rounded-xl bg-white border border-slate-300 px-4 py-3 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all placeholder:text-slate-400"
        />
      </div>

      {/* Email */}
      <div className="form-control">
        <label className="label py-1">
          <span className="label-text font-semibold text-slate-700">Email Address</span>
        </label>
        <input
          type="email"
          placeholder="john@example.com"
          className="input w-full rounded-xl bg-white border border-slate-300 px-4 py-3 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all placeholder:text-slate-400"
        />
      </div>

      {/* Subject */}
      <div className="form-control md:col-span-2">
        <label className="label py-1">
          <span className="label-text font-semibold text-slate-700">Subject</span>
        </label>
        <select className="select w-full rounded-xl bg-white border border-slate-300 px-4 py-3 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all">
          <option disabled selected>How can we help?</option>
          <option>Parcel Tracking Issue</option>
          <option>Merchant Partnership</option>
          <option>Payment Inquiry</option>
          <option>General Feedback</option>
        </select>
      </div>

      {/* Message */}
      <div className="form-control md:col-span-2">
        <label className="label py-1">
          <span className="label-text font-semibold text-slate-700">Message</span>
        </label>
        <textarea
          placeholder="Tell us more about your inquiry..."
          className="textarea w-full h-32 rounded-xl bg-white border border-slate-300 px-4 py-3 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all placeholder:text-slate-400 resize-none"
        ></textarea>
      </div>

      {/* Submit Button */}
      <div className="md:col-span-2 pt-4">
        <button
          type="submit"
          className="btn w-full bg-orange-500 rounded-lg border text-white"
        >
          <Send size={20} />
          Send Message
        </button>
      </div>
    </form>
  );
};

export default ContactForm;