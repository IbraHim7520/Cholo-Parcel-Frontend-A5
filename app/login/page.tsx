import LoginForm from '@/components/Forms/Auth/LoginForm';
import Link from 'next/link';
import React from 'react';

const LoginPage = () => {
    return (
            <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-[#F5F7FF] via-[#fffbee] to-[#E6EFFF] px-4">

      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">

        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-gray-900">
          Merchant Login
        </h2>

        <p className="text-sm text-gray-500 text-center mt-2">
          Access your dashboard to manage parcels
        </p>


        <LoginForm />

                {/* Divider */}
        <div className="divider text-sm">OR</div>
        {/* Signup */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have an account?{" "}
          <Link href="/register" className="text-orange-500 font-medium hover:underline">
             Sign up
          </Link>
        </p>

      </div>

    </div>
    );
};

export default LoginPage;