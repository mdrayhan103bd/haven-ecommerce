'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/context/StoreContext';
import { ShieldCheck, Lock, Mail, Eye, EyeOff, ArrowRight, AlertCircle, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function AdminLoginPage() {
  const router = useRouter();
  const { isAdminAuthenticated, adminLogin, adminLogout, settings } = useStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // If already authenticated, redirect to dashboard
  useEffect(() => {
    if (isAdminAuthenticated) {
      router.replace('/dashboard');
    }
  }, [isAdminAuthenticated, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      const success = adminLogin(email, password);
      if (success) {
        router.replace('/dashboard');
      } else {
        setError('ভুল ইমেইল অথবা পাসওয়ার্ড! দয়া করে সঠিক অ্যাডমিন তথ্য দিন।');
        setLoading(false);
      }
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col justify-center items-center px-4 py-12 font-sans">
      <div className="w-full max-w-md">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block text-3xl font-serif font-bold text-gray-900 tracking-tight mb-2 hover:opacity-80 transition-opacity">
            {settings.storeName || 'Cavrozone'}
          </Link>
          <div className="flex items-center justify-center gap-1.5 mt-1">
            <span className="inline-flex items-center gap-1 bg-black text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider font-mono">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              Secure Admin Portal
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            অ্যাডমিন প্যানেলে প্রবেশ করতে আপনার অনুমোদিত ইমেইল ও পাসওয়ার্ড প্রদান করুন।
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-3xl border border-gray-200/80 p-8 shadow-xl shadow-gray-200/50">
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200/80 text-xs text-red-700 flex items-start gap-2.5 animate-shake">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block">লগইন ব্যর্থ হয়েছে</span>
                <span>{error}</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                Admin Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input 
                  type="email" 
                  required
                  autoFocus
                  value={email}
                  onChange={e => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="admin@example.com"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl text-xs outline-none focus:border-black focus:bg-white transition-all font-medium text-gray-900"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                Admin Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  required
                  value={password}
                  onChange={e => {
                    setPassword(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-3 bg-gray-50/50 border border-gray-200 rounded-xl text-xs outline-none focus:border-black focus:bg-white transition-all font-medium text-gray-900"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 p-1"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 cursor-pointer select-none text-gray-600">
                <input 
                  type="checkbox"
                  checked={rememberMe}
                  onChange={e => setRememberMe(e.target.checked)}
                  className="rounded border-gray-300 text-black focus:ring-black w-3.5 h-3.5"
                />
                <span>Remember this session</span>
              </label>
              <span className="text-[11px] text-gray-400">Internal Use Only</span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1c1a19] text-white py-3.5 rounded-xl text-xs font-bold hover:bg-black transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-60 cursor-pointer"
            >
              {loading ? (
                <span>লগইন হচ্ছে...</span>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5" /> Sign In to Admin Panel <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>

          {/* Security Notice */}
          <div className="mt-6 pt-5 border-t border-gray-100 text-center">
            <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-400">
              <Lock className="w-3 h-3 text-emerald-500" />
              <span>Protected portal with session verification</span>
            </div>
          </div>
        </div>

        {/* Back to Storefront Link */}
        <div className="text-center mt-6">
          <Link 
            href="/" 
            className="text-xs text-gray-500 hover:text-black font-semibold transition-colors inline-flex items-center gap-1"
          >
            ← Back to Storefront (cavrozone.com)
          </Link>
        </div>
      </div>
    </div>
  );
}
