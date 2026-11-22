'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function StoreLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isDashboard = pathname?.startsWith('/dashboard');
  const isAuth = pathname === '/login' || pathname === '/signup' || pathname === '/forgot-password';

  if (isDashboard || isAuth) {
    return <>{children}</>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
