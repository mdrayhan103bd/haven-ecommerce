'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Package, User, MapPin, CreditCard, LogOut, ShieldCheck } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export default function AccountLayout({ 
  title, 
  subtitle, 
  children 
}: { 
  title: string; 
  subtitle?: string; 
  children: React.ReactNode; 
}) {
  const pathname = usePathname();
  const { user, logout } = useStore();

  const navItems = [
    { label: 'My Orders', href: '/account', icon: Package },
    { label: 'Personal Info', href: '/account/profile', icon: User },
    { label: 'Addresses', href: '/account/addresses', icon: MapPin },
    { label: 'Payment Methods', href: '/account/payments', icon: CreditCard },
  ];

  if (!user) {
    return (
      <div className="container mx-auto px-4 lg:px-8 py-16 font-sans min-h-[70vh] flex items-center justify-center">
        <div className="max-w-md w-full bg-white border border-gray-100 rounded-3xl p-8 shadow-sm text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-600">
            <User className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Sign in to your account</h2>
          <p className="text-xs text-gray-500 mb-6 leading-relaxed">
            Please sign in or create an account to view your orders, track shipments, and manage saved shipping addresses.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link 
              href="/login" 
              className="flex-1 py-2.5 px-6 bg-black text-white rounded-full text-xs font-bold hover:bg-gray-800 transition-colors shadow-sm text-center"
            >
              Sign In
            </Link>
            <Link 
              href="/signup" 
              className="flex-1 py-2.5 px-6 border border-gray-200 text-gray-800 rounded-full text-xs font-bold hover:bg-gray-50 transition-colors text-center"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 lg:px-8 py-10 font-sans min-h-[75vh]">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full lg:w-72 shrink-0">
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm mb-4">
            <div className="flex items-center gap-4 mb-6">
              <img 
                src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`} 
                alt={user.name} 
                className="w-14 h-14 rounded-full object-cover border border-gray-200" 
              />
              <div className="min-w-0">
                <h3 className="font-bold text-gray-900 truncate">{user.name}</h3>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
                <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-wider bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">
                  {user.role === 'admin' ? 'Store Administrator' : 'Customer Member'}
                </span>
              </div>
            </div>

            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                      isActive 
                        ? 'bg-black text-white shadow-sm' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-black'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}

              {user?.role === 'admin' && (
                <Link
                  href="/dashboard"
                  className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-blue-600 hover:bg-blue-50 transition-all mt-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Admin Dashboard</span>
                </Link>
              )}
            </nav>

            <div className="mt-6 pt-4 border-t border-gray-100">
              <button
                onClick={logout}
                className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Main Section */}
        <main className="flex-1 min-w-0">
          <div className="bg-white border border-gray-100 rounded-2xl p-6 lg:p-8 shadow-sm">
            <div className="mb-6 pb-4 border-b border-gray-100">
              <h1 className="text-2xl font-serif font-bold text-gray-900">{title}</h1>
              {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
            </div>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
