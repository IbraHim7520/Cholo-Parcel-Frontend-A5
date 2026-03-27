"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import NavLogo from "../ui/NavLogo";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useUser } from "@/utils/useUser";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "../ui/button";
import CustomLoading from "./CustomLoading";
import { IUser } from "@/Interfaces/interfaces";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isPending } = useUser();


  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Track Parcel", href: "/track" },
    { name: "Pricing", href: "/pricing" },
    { name: "Contact", href: "/contact" },
  ];

  if (isPending) {
    return (
      <CustomLoading />
    )
  }
  console.log(user)
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

          {/* Right: Auth Section */}
          <div className="hidden md:flex justify-end items-center gap-4 min-w-45">
            {user ? (
              <>
                <span className="text-sm text-gray-700 hidden lg:block">
                  {user.name}
                </span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="cursor-pointer">
                      <AvatarImage
                        src={
                          user.image ||
                          "https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg"
                        }
                      />
                      <AvatarFallback>
                        {user?.name?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuGroup>
                      <DropdownMenuLabel>
                        <Link className="btn btn-sm btn-outline w-full hover:border-none border" href={"/dashboard"}>Dashboard</Link>
                      </DropdownMenuLabel>
                      <p className="text-gray-700 text-sm w-full text-start ml-3">{user.role}</p>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <button className="btn btn-primary btn-sm w-full  cursor-pointer">
                        Logout
                      </button>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="bg-gray-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-500 transition"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="border border-gray-300 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-100 transition"
                >
                  Register
                </Link>
              </>
            )}
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

            {/* Nav Links */}
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

            {/* Auth Section Mobile */}
            {user ? (
              <div className="flex flex-col justify-center   gap-3 pt-2">
                <DropdownMenuSeparator />
                <div className="flex items-center gap-3 pt-2">
                  <Avatar>
                    <AvatarImage src={user.image || "https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg"} />
                    <AvatarFallback>
                      {user?.name?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-gray-700">{user.name}</span>
                </div>
                <p className="text-gray-700 text-sm ml-2 badge bg-orange-500 px-12">{user.role}</p>
                <Link className="btn btn-sm btn-outline w-full hover:border-none border" href={"/dashboard"}>Dashboard</Link>
                <button className="btn bg-orange-500 text-white border-none hover:bg-orange-600 btn-sm w-full  cursor-pointer">
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="block text-center bg-gray-900 text-white py-2 rounded-md text-sm font-medium"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="block text-center border border-gray-300 py-2 rounded-md text-sm font-medium hover:bg-gray-100"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;