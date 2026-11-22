'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, Mail, Lock, ShieldCheck } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setLoading(true);
    setTimeout(() => {
      login(email, password);
      setLoading(false);
      if (email.includes('admin')) {
        router.push('/dashboard');
      } else {
        router.push('/account');
      }
    }, 600);
  };

  const handleDemoAdmin = () => {
    setEmail('admin@haven.com');
    setPassword('admin123');
    login('admin@haven.com', 'admin123');
    router.push('/dashboard');
  };

  const handleDemoCustomer = () => {
    setEmail('customer@haven.com');
    setPassword('customer123');
    login('customer@haven.com', 'customer123');
    router.push('/account');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50/50 px-4 py-16 font-sans">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
        <div className="text-center mb-8">
          <Link href="/" className="text-3xl font-serif font-bold tracking-tight text-gray-900">
            Haven
          </Link>
          <h2 className="mt-4 text-xl font-bold text-gray-900">Welcome Back</h2>
          <p className="text-gray-400 text-xs mt-1">Sign in to your account to manage orders and profile</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="email" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-xs outline-none focus:border-black" 
                placeholder="name@example.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-xs outline-none focus:border-black" 
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded border-gray-300" /> 
              <span>Remember me</span>
            </label>
            <Link href="/forgot-password" className="text-gray-500 hover:text-black font-semibold">
              Forgot password?
            </Link>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-full text-xs font-bold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'} <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        {/* Quick Demo Logins for Testing */}
        <div className="mt-6 pt-5 border-t border-gray-100">
          <div className="text-[11px] font-bold text-gray-400 uppercase text-center mb-3">
            Quick 1-Click Demo Login
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleDemoAdmin}
              type="button"
              className="flex-1 py-2 rounded-xl border border-gray-200 hover:border-black text-[11px] font-bold text-gray-800 bg-gray-50 hover:bg-white transition-all flex items-center justify-center gap-1.5"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" /> Demo Admin
            </button>
            <button
              onClick={handleDemoCustomer}
              type="button"
              className="flex-1 py-2 rounded-xl border border-gray-200 hover:border-black text-[11px] font-bold text-gray-800 bg-gray-50 hover:bg-white transition-all flex items-center justify-center gap-1.5"
            >
              Demo Customer
            </button>
          </div>
        </div>

        <p className="text-center text-xs text-gray-500 mt-6">
          Don't have an account?{' '}
          <Link href="/signup" className="text-black font-bold hover:underline">
            Sign up now
          </Link>
        </p>
      </div>
    </div>
  );
}
