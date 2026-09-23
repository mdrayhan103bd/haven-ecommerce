import React from 'react';
import { Search, Heart, ShoppingBag, Mic } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 font-sans">
      <div className="container mx-auto px-4 lg:px-8 py-4">
        <div className="flex items-center justify-between gap-8">
          <div className="flex flex-col">
            <Link href="/" className="text-3xl font-bold tracking-tight text-black leading-none">Haven</Link>
            <span className="text-[10px] text-gray-500 font-medium tracking-wide mt-1">Good Things. Brighter Days.</span>
          </div>
          
          <div className="flex-1 max-w-2xl hidden md:flex items-center bg-[#f5f5f5] rounded-full px-4 py-2.5">
            <Search className="w-4 h-4 text-gray-500 mr-2" />
            <input 
              type="text" 
              placeholder="Search for products, brands or inspiration..." 
              className="bg-transparent border-none outline-none flex-1 px-2 text-sm text-gray-700 placeholder-gray-400"
            />
            <Mic className="w-4 h-4 text-gray-500 ml-2 cursor-pointer hover:text-black" />
          </div>

          <div className="flex items-center gap-6">
            <Link href="#" className="hidden lg:block text-sm font-medium text-gray-600 hover:text-black">Help</Link>
            <Link href="/dashboard" className="hidden lg:block text-sm font-medium text-gray-600 hover:text-black">Orders</Link>
            <Link href="#" className="text-gray-600 hover:text-black">
              <Heart className="w-5 h-5" />
            </Link>
            <Link href="#" className="text-gray-600 hover:text-black relative">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-1.5 -right-2 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">2</span>
            </Link>
            <Link href="/dashboard" className="flex items-center gap-2">
              <img src="https://ui-avatars.com/api/?name=Bappy&background=random" className="w-9 h-9 rounded-full object-cover" alt="User" />
              <div className="hidden lg:block leading-tight">
                <div className="text-xs text-gray-500 font-medium">Hello, Bappy</div>
                <div className="text-sm font-bold text-gray-900 flex items-center gap-1">My Account <span className="text-[10px] text-gray-400">▼</span></div>
              </div>
            </Link>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-8 mt-5 text-sm font-medium text-gray-500 overflow-x-auto">
          <Link href="#" className="text-black font-bold border-b-2 border-black pb-1">All Products</Link>
          <Link href="#" className="hover:text-black pb-1">Women</Link>
          <Link href="#" className="hover:text-black pb-1">Men</Link>
          <Link href="#" className="hover:text-black pb-1">Home & Living</Link>
          <Link href="#" className="hover:text-black pb-1">Beauty</Link>
          <Link href="#" className="hover:text-black pb-1">Electronics</Link>
          <Link href="#" className="hover:text-black pb-1">Sports</Link>
          <Link href="#" className="text-red-500 font-bold hover:text-red-600 pb-1">Deals</Link>
        </nav>
      </div>
    </header>
  );
}