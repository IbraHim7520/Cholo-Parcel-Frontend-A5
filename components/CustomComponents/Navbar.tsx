"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Truck } from "lucide-react";
import NavLogo from "../ui/NavLogo";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Track", href: "/track" },
    { name: "Pricing", href: "/pricing" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-['Inter']">
        
        {/* 3 Column Layout */}
        <div className="grid grid-cols-3 items-center h-16">

          {/* Left: Logo */}
          <NavLogo />

          {/* Center: Nav Links */}
          <div className="hidden md:flex justify-center items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm text-gray-600 hover:text-gray-900 transition"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right: Login Button */}
          <div className="hidden md:flex gap-4 justify-end items-center">
            <Link
              href="/login"
              className="bg-gray-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-500 transition"
            >
              Merchant Login
            </Link>
              <Link
              href="/register"
              className="bg-gray-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-500 transition"
            >
              Register
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex justify-end col-span-2">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block text-sm text-gray-700 hover:text-orange-500"
              >
                {link.name}
              </Link>
            ))}

            <Link
              href="/login"
              className="block text-center bg-gray-900 text-white py-2 rounded-md text-sm font-medium"
            >
              Merchant Login
            </Link>
            <Link
              href="/register"
              className="bg-gray-900 w-full text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-500 transition"
            >
              Register
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;