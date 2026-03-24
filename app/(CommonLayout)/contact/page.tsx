"use client";
import ContactForm from "@/components/Forms/Others/ContactForm";
import { Mail, MapPin, Phone } from "lucide-react";

const ContactPage = () => {
  return (
    <div className="min-h-screen  relative">

      {/* Header Section */}
      <section className="bg-[#0F172A] py-16 px-4 text-center text-white relative overflow-hidden">
        {/* Background Shapes */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="w-96 h-96 bg-orange-500/10 rounded-full blur-3xl absolute -top-24 -left-24"></div>
          <div className="w-72 h-72 bg-blue-500/5 rounded-full blur-2xl absolute -bottom-12 -right-16"></div>
        </div>

        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Get in Touch</h1>
          <p className="mt-4 text-slate-400 text-lg">
            Have questions about your delivery or want to partner with us? 
            Our team is here to help you 24/7.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Contact Info Cards */}
          <div className="lg:col-span-1 space-y-4">
            {[
              {
                icon: <MapPin size={24} />,
                title: "Our Office",
                text1: "123 Business Avenue, Gulshan 1, Dhaka, Bangladesh",
                bg: "bg-orange-100",
                color: "text-orange-600"
              },
              {
                icon: <Phone size={24} />,
                title: "Phone",
                text1: "+880 1234-567890",
                text2: "Sun - Thu, 9am - 6pm",
                bg: "bg-blue-100",
                color: "text-blue-600"
              },
              {
                icon: <Mail size={24} />,
                title: "Email",
                text1: "support@choloparcel.com",
                text2: "info@choloparcel.com",
                bg: "bg-purple-100",
                color: "text-purple-600"
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-start gap-4 hover:shadow-md hover:scale-[1.02] transition-all">
                <div className={`w-12 h-12 ${item.bg} rounded-2xl flex items-center justify-center ${item.color} shrink-0`}>
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">{item.title}</h3>
                  <p className="text-slate-500 text-sm mt-1">{item.text1}</p>
                  {item.text2 && <p className="text-slate-400 text-xs italic">{item.text2}</p>}
                </div>
              </div>
            ))}
          </div>

          {/* Contact Form Card */}
          <div className="lg:col-span-2 bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 p-8 md:p-12">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900">Send us a message</h2>
              <p className="text-slate-500 text-sm mt-1">We typically respond within 2 hours.</p>
            </div>
            
            <ContactForm />
          </div>

        </div>
      </section>

      {/* Map Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Find Us Here</h2>
        <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-100">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.902690678883!2d90.42390831537728!3d23.810332184587992!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8570d55d0c5%3A0x9f3e6a9d7b0f9fdf!2sGulshan%201%2C%20Dhaka%2C%20Bangladesh!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
            className="w-full h-72 md:h-96"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>

    </div>
  );
};

export default ContactPage;