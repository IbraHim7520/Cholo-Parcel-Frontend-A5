import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import Link from "next/link";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "Track Parcel", href: "/track" },
    { name: "Pricing", href: "/pricing" },
    { name: "Contact", href: "/contact" },
];

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-200 py-12 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* About / Logo */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">CholoParcel</h2>
          <p className="text-sm text-slate-400">
            Fast, reliable, and transparent delivery services nationwide. 
            From small documents to large parcels, we’ve got you covered.
          </p>
          <div className="flex items-center gap-4 mt-2">
            <a href="#" className="hover:text-orange-500 transition-colors"><Facebook size={20} /></a>
            <a href="#" className="hover:text-orange-500 transition-colors"><Instagram size={20} /></a>
            <a href="#" className="hover:text-orange-500 transition-colors"><Twitter size={20} /></a>
            <a href="#" className="hover:text-orange-500 transition-colors"><Linkedin size={20} /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Quick Links</h3>
          <ul className="space-y-2 text-sm text-slate-400">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-orange-500 transition-colors">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Contact Us</h3>
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <MapPin size={18} className="text-orange-500" />
            <span>123 Business Avenue, Gulshan 1, Dhaka, Bangladesh</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <Phone size={18} className="text-orange-500" />
            <span>+880 1234-567890</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <Mail size={18} className="text-orange-500" />
            <span>support@choloparcel.com</span>
          </div>
        </div>

      </div>

      {/* Divider */}
      <div className="border-t border-slate-700 mt-10 pt-6 text-center text-slate-500 text-sm">
        &copy; {new Date().getFullYear()} CholoParcel. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;