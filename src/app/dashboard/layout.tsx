'use client';

import React, { useState, useEffect } from 'react';
import { 
  Home, 
  ShoppingBag, 
  Box, 
  Users, 
  BarChart2, 
  Megaphone, 
  Tag, 
  FileText, 
  MessageSquare, 
  MonitorSmartphone, 
  Settings, 
  HelpCircle, 
  Bell, 
  Search, 
  Menu, 
  X, 
  ExternalLink,
  LogOut,
  ShieldCheck
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useStore } from '@/context/StoreContext';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { orders, messages, user, settings, isAdminAuthenticated, adminLogout } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  // Guard: Protect dashboard routes from unauthorized public visitors
  useEffect(() => {
    const storedAuth = typeof window !== 'undefined' ? localStorage.getItem('cavrozone_admin_auth') : null;
    if (!isAdminAuthenticated && storedAuth !== 'true') {
      router.replace('/admin');
    } else {
      setAuthChecked(true);
    }
  }, [isAdminAuthenticated, router]);

  if (!authChecked) {
    return (
      <div className="min-h-screen bg-[#f8f9fa] flex flex-col items-center justify-center p-4 font-sans">
        <div className="w-10 h-10 border-3 border-black border-t-transparent rounded-full animate-spin mb-4" />
        <div className="text-sm font-bold text-gray-800">Verifying Admin Access...</div>
        <div className="text-xs text-gray-500 mt-1">Redirecting to secure login if unauthorized</div>
      </div>
    );
  }

  const unreadMessagesCount = messages.filter(m => m.status === 'unread').length;
  const pendingOrdersCount = orders.filter(o => o.status === 'Pending' || o.status === 'Processing').length;

  const navLinks = [
    { label: 'Dashboard', href: '/dashboard', icon: Home },
    { label: 'Orders', href: '/dashboard/orders', icon: ShoppingBag, badge: pendingOrdersCount > 0 ? pendingOrdersCount : undefined, badgeColor: 'bg-red-500 text-white' },
    { label: 'Products', href: '/dashboard/products', icon: Box },
    { label: 'Customers', href: '/dashboard/customers', icon: Users },
    { label: 'Marketing', href: '/dashboard/marketing', icon: Megaphone },
    { label: 'Discounts', href: '/dashboard/discounts', icon: Tag },
    { label: 'Banners & Content', href: '/dashboard/content', icon: FileText },
    { label: 'Messages', href: '/dashboard/messages', icon: MessageSquare, badge: unreadMessagesCount > 0 ? unreadMessagesCount : undefined, badgeColor: 'bg-blue-600 text-white' },
  ];

  return (
    <div className="min-h-screen bg-[#f7f8fa] flex font-sans">
      {/* Desktop Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-100 hidden lg:flex flex-col h-screen sticky top-0 overflow-y-auto">
        <div className="p-6">
          <Link href="/" className="text-2xl font-bold tracking-tight text-gray-900 flex items-center gap-1.5">
            {settings.storeName || 'Cavrozone'} <span className="text-[10px] bg-black text-white px-1.5 py-0.5 rounded font-mono font-normal">ADMIN</span>
          </Link>
          <div className="text-[11px] text-gray-400 mt-0.5">{settings.tagline}</div>
        </div>
        
        <nav className="flex-1 px-4 space-y-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.href}
                href={link.href} 
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isActive 
                    ? 'bg-black text-white shadow-sm' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-black'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span>{link.label}</span>
                </div>
                {link.badge !== undefined && (
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${link.badgeColor}`}>
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
          
          <div className="pt-5 pb-2 px-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Storefront</div>
          <Link href="/" className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium text-gray-600 hover:bg-gray-50 hover:text-black">
            <span className="flex items-center gap-2.5"><ExternalLink className="w-3.5 h-3.5" /> View Live Store</span>
          </Link>
          <Link href="/products" className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium text-gray-600 hover:bg-gray-50 hover:text-black">
            <span className="flex items-center gap-2.5"><Box className="w-3.5 h-3.5" /> Store Catalog</span>
          </Link>
        </nav>
        
        <div className="p-4 border-t border-gray-100 space-y-1">
          <Link 
            href="/dashboard/settings" 
            className={`flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              pathname === '/dashboard/settings' ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Settings className="w-4 h-4" /> Settings
          </Link>
          <Link 
            href="/help" 
            className="flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50"
          >
            <HelpCircle className="w-4 h-4" /> Help Center
          </Link>
          <button 
            onClick={() => {
              adminLogout();
              router.replace('/admin');
            }}
            className="flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 w-full text-left transition-colors"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div onClick={() => setMobileMenuOpen(false)} className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
          <div className="relative w-4/5 max-w-xs bg-white h-full p-6 flex flex-col overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
              <span className="font-bold text-lg">Admin Panel</span>
              <button onClick={() => setMobileMenuOpen(false)} className="p-1 rounded-full text-gray-400">
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="space-y-1 flex-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link 
                    key={link.href}
                    href={link.href} 
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold ${
                      isActive ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4" />
                      <span>{link.label}</span>
                    </div>
                    {link.badge !== undefined && (
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${link.badgeColor}`}>
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
              <div className="pt-4 border-t border-gray-100 space-y-2">
                <Link href="/" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-xs font-bold text-gray-700">
                  ← Back to Storefront
                </Link>
                <button 
                  onClick={() => {
                    adminLogout();
                    router.replace('/admin');
                  }}
                  className="block w-full py-2 text-left text-xs font-bold text-red-600"
                >
                  Sign Out
                </button>
              </div>
            </nav>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Topbar */}
        <header className="h-16 bg-white flex items-center justify-between px-4 lg:px-8 border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 text-gray-600 hover:text-black rounded-lg"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden sm:flex items-center bg-gray-100 rounded-full px-4 py-2 w-72 lg:w-96">
              <Search className="w-4 h-4 text-gray-400 mr-2 shrink-0" />
              <input 
                type="text" 
                placeholder="Search orders, products, customers..." 
                className="bg-transparent border-none outline-none flex-1 text-xs text-gray-700" 
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link 
              href="/" 
              className="text-xs font-bold bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-full transition-colors flex items-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5" /> View Store
            </Link>

            <Link href="/dashboard/messages" className="relative p-2 text-gray-500 hover:text-black">
              <Bell className="w-4 h-4" />
              {unreadMessagesCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </Link>

            <div className="flex items-center gap-2.5 border-l border-gray-100 pl-4">
              <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold text-xs shadow-sm">
                C
              </div>
              <div className="text-xs leading-tight hidden md:block">
                <div className="font-bold text-gray-900">Cavrozone Admin</div>
                <div className="text-gray-400 text-[10px]">Store Manager</div>
              </div>
              <button 
                onClick={() => {
                  adminLogout();
                  router.replace('/admin');
                }}
                className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors ml-1"
                title="Sign Out from Admin"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </header>
        
        {/* Page Content Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
