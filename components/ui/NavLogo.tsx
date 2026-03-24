import { Truck } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const NavLogo = () => {
    return (
        <Link href={"/"} className="flex items-center gap-2">
            <div className="bg-orange-500 p-2 rounded-md">
              <Truck className="text-white w-5 h-5" />
            </div>
            <span className="text-lg font-semibold text-gray-900">
              Cholo<span className="text-orange-500">Parcel</span>
            </span>
          </Link>
    );
};

export default NavLogo;