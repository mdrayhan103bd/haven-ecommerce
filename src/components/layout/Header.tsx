import React from 'react';
import { Search, HelpCircle, Box, Heart, ShoppingBag, User } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="container mx-auto px-4 lg:px-8 py-4">
        <div className="flex items-center justify-between gap-8">
          <div className="flex items-center gap-2">
            <Link href="/" className="text-2xl font-bold tracking-tight">Haven</Link>
          </div>
          
          <div className="flex-1 max-w-2xl hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2">
            <Search className="w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search for products, brands or inspiration..." 
              className="bg-transparent border-none outline-none flex-1 px-3 text-sm"
            />
            <Search className="w-5 h-5 text-gray-400 invisible" />
          </div>

          <div className="flex items-center gap-6">
            <Link href="#" className="hidden lg:flex items-center gap-2 text-sm text-gray-600 hover:text-black">
              Help
            </Link>
            <Link href="#" className="hidden lg:flex items-center gap-2 text-sm text-gray-600 hover:text-black">
              Orders
            </Link>
            <Link href="#" className="text-gray-600 hover:text-black">
              <Heart className="w-5 h-5" />
            </Link>
            <Link href="#" className="text-gray-600 hover:text-black relative">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">2</span>
            </Link>
            <Link href="/dashboard" className="flex items-center gap-2 text-sm font-medium">
              <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                <img src="https://ui-avatars.com/api/?name=Bappy&background=random" alt="User" />
              </div>
              <div className="hidden lg:block leading-tight">
                <div className="text-xs text-gray-500">Hello, Bappy</div>
                <div>My Account <span className="text-[10px]">▼</span></div>
              </div>
            </Link>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-8 mt-4 text-sm font-medium text-gray-600 overflow-x-auto">
          <Link href="#" className="text-black border-b-2 border-black pb-1">All Products</Link>
          <Link href="#" className="hover:text-black pb-1">Women</Link>
          <Link href="#" className="hover:text-black pb-1">Men</Link>
          <Link href="#" className="hover:text-black pb-1">Home & Living</Link>
          <Link href="#" className="hover:text-black pb-1">Beauty</Link>
          <Link href="#" className="hover:text-black pb-1">Electronics</Link>
          <Link href="#" className="hover:text-black pb-1">Sports</Link>
          <Link href="#" className="text-red-500 hover:text-red-600 pb-1">Deals</Link>
        </nav>
      </div>
    </header>
  );
}