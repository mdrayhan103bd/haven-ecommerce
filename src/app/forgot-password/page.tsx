'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, CheckCircle, ArrowLeft, ArrowRight } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50/50 px-4 py-16 font-sans">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-center">
        {submitted ? (
          <div>
            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Check Your Inbox</h2>
            <p className="text-xs text-gray-500 mb-6 leading-relaxed">
              We have sent a secure password recovery link to <strong className="text-gray-900">{email}</strong>. Follow the instructions in the email to reset your credentials.
            </p>
            <Link 
              href="/login" 
              className="inline-flex items-center justify-center gap-2 bg-black text-white px-6 py-2.5 rounded-full text-xs font-bold hover:bg-gray-800 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Return to Login
            </Link>
          </div>
        ) : (
          <div>
            <div className="w-12 h-12 bg-gray-100 text-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold text-gray-900 mb-1">Reset Password</h1>
            <p className="text-xs text-gray-400 mb-6">
              Enter your registered email address and we'll send you a password recovery link.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address</label>
                <input 
                  type="email" 
                  required
                  placeholder="name@example.com" 
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-xs outline-none focus:border-black" 
                />
              </div>

              <button 
                type="submit" 
                className="w-full bg-black text-white py-3 rounded-full text-xs font-bold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
              >
                Send Reset Link <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>

            <div className="mt-6 pt-4 border-t border-gray-100">
              <Link href="/login" className="text-xs font-semibold text-gray-500 hover:text-black">
                ← Back to Login
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
