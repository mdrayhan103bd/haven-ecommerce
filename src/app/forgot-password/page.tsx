import React from 'react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 font-sans">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
        <h1 className="text-2xl font-bold mb-4">Reset Password</h1>
        <p className="text-gray-500 mb-6 text-sm">Enter your email address to receive a password reset link.</p>
        <div className="text-left mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input type="email" placeholder="john@example.com" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-black" />
        </div>
        <button className="w-full bg-black text-white px-4 py-2 rounded-lg mb-4 hover:bg-gray-800 transition-colors">Send Reset Link</button>
        <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-black">Return to Login</Link>
      </div>
    </div>
  );
}
