'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, Mail, Lock, User } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export default function SignUpPage() {
  const router = useRouter();
  const { signup } = useStore();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) return;

    setLoading(true);
    setTimeout(() => {
      signup(name, email, password);
      setLoading(false);
      router.push('/account');
    }, 600);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50/50 px-4 py-16 font-sans">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
        <div className="text-center mb-8">
          <Link href="/" className="text-3xl font-serif font-bold tracking-tight text-gray-900">
            Haven
          </Link>
          <h2 className="mt-4 text-xl font-bold text-gray-900">Create an Account</h2>
          <p className="text-gray-400 text-xs mt-1">Join Haven to track orders, save favorites, and check out faster</p>
        </div>
        
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Your Full Name</label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-xs outline-none focus:border-black" 
                placeholder="e.g. Sarah Jenkins"
                required
              />
            </div>
          </div>

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
                placeholder="At least 6 characters"
                minLength={6}
                required
              />
            </div>
          </div>

          <div className="text-[11px] text-gray-500 leading-normal">
            By creating an account, you agree to our{' '}
            <Link href="/help" className="underline hover:text-black">Terms of Service</Link>{' '}
            and{' '}
            <Link href="/help" className="underline hover:text-black">Privacy Policy</Link>.
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-full text-xs font-bold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
          >
            {loading ? 'Creating Account...' : 'Create Account'} <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        <p className="text-center text-xs text-gray-500 mt-6">
          Already have an account?{' '}
          <Link href="/login" className="text-black font-bold hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
