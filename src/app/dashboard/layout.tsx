import React from 'react';
import { Home, ShoppingBag, Box, Users, BarChart2, Megaphone, Tag, FileText, MessageSquare, MonitorSmartphone, Settings, HelpCircle, Bell, Search } from 'lucide-react';
import Link from 'next/link';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f5f6f8] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-100 hidden lg:flex flex-col h-screen sticky top-0 overflow-y-auto">
        <div className="p-6">
          <Link href="/" className="text-2xl font-bold tracking-tight">Haven</Link>
          <div className="text-xs text-gray-500">Good Things. Brighter Days.</div>
        </div>
        
        <nav className="flex-1 px-4 space-y-1">
          <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 text-gray-900 font-medium transition-colors">
            <Home className="w-5 h-5" /> Dashboard
          </Link>
          <Link href="/dashboard/orders" className="flex items-center justify-between px-3 py-2.5 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">
            <div className="flex items-center gap-3"><ShoppingBag className="w-5 h-5" /> Orders</div>
            <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">12</span>
          </Link>
          <Link href="/dashboard/products" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"><Box className="w-5 h-5" /> Products</Link>
          <Link href="/dashboard/customers" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"><Users className="w-5 h-5" /> Customers</Link>
          <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"><BarChart2 className="w-5 h-5" /> Analytics</Link>
          <Link href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"><Megaphone className="w-5 h-5" /> Marketing</Link>
          <Link href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"><Tag className="w-5 h-5" /> Discounts</Link>
          <Link href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"><FileText className="w-5 h-5" /> Content</Link>
          <Link href="#" className="flex items-center justify-between px-3 py-2.5 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-gray-900">
            <div className="flex items-center gap-3"><MessageSquare className="w-5 h-5" /> Messages</div>
            <span className="bg-red-50 text-red-500 text-[10px] font-bold px-2 py-0.5 rounded-full">3</span>
          </Link>
          
          <div className="pt-4 pb-2 px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Sales Channels</div>
          <Link href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-gray-900"><Home className="w-5 h-5" /> Online Store</Link>
          <Link href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-gray-900"><MonitorSmartphone className="w-5 h-5" /> Mobile App</Link>
          <Link href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-gray-900"><Box className="w-5 h-5" /> Marketplaces</Link>
        </nav>
        
        <div className="p-4">
          <div className="bg-[#fcfaf5] rounded-2xl p-4 border border-[#f0e8d5]">
            <h4 className="font-bold mb-1">Grow Your Business</h4>
            <p className="text-xs text-gray-600 mb-3">Unlock new sales channels and tools.</p>
            <button className="w-full bg-[#2c2a29] text-white text-sm py-2 rounded-full flex items-center justify-center gap-2 hover:bg-black">
              Upgrade Plan →
            </button>
          </div>
        </div>
        
        <nav className="p-4 border-t border-gray-100">
          <Link href="/dashboard/settings" className="flex items-center gap-3 px-3 py-2 rounded-xl text-gray-600 hover:bg-gray-50"><Settings className="w-5 h-5" /> Settings</Link>
          <Link href="#" className="flex items-center gap-3 px-3 py-2 rounded-xl text-gray-600 hover:bg-gray-50"><HelpCircle className="w-5 h-5" /> Help & Support</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Topbar */}
        <header className="h-16 bg-white flex items-center justify-between px-8 border-b border-gray-100 shrink-0">
          <div className="flex-1 max-w-xl bg-gray-100 rounded-full px-4 py-2 flex items-center">
            <Search className="w-4 h-4 text-gray-400 mr-2" />
            <input type="text" placeholder="Search orders, products, customers..." className="bg-transparent border-none outline-none flex-1 text-sm" />
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-600 hover:text-black">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-3 border-l border-gray-200 pl-4">
              <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                <img src="https://ui-avatars.com/api/?name=Bappy&background=random" alt="Bappy" />
              </div>
              <div className="text-sm leading-tight hidden md:block">
                <div className="font-medium">Hello, Bappy</div>
                <div className="text-gray-500 text-xs">Store Admin</div>
              </div>
            </div>
          </div>
        </header>
        
        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
}