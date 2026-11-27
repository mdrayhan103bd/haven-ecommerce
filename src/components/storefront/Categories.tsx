'use client';

import React from 'react';
import { Shirt, ShoppingBag, Monitor, Coffee, Gift, Dumbbell, Sparkles, Flame, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const categories = [
  { name: 'Women', icon: Shirt, color: 'bg-rose-50 text-rose-500 border-rose-100 group-hover:bg-rose-500 group-hover:text-white', count: '14 Items' },
  { name: 'Men', icon: Shirt, color: 'bg-blue-50 text-blue-500 border-blue-100 group-hover:bg-blue-500 group-hover:text-white', count: '18 Items' },
  { name: 'Electronics', icon: Monitor, color: 'bg-teal-50 text-teal-600 border-teal-100 group-hover:bg-teal-600 group-hover:text-white', count: '24 Items' },
  { name: 'Home & Living', icon: Coffee, color: 'bg-amber-50 text-amber-600 border-amber-100 group-hover:bg-amber-600 group-hover:text-white', count: '16 Items' },
  { name: 'Beauty', icon: Sparkles, color: 'bg-pink-50 text-pink-500 border-pink-100 group-hover:bg-pink-500 group-hover:text-white', count: '12 Items' },
  { name: 'Sports', icon: Dumbbell, color: 'bg-indigo-50 text-indigo-500 border-indigo-100 group-hover:bg-indigo-500 group-hover:text-white', count: '9 Items' },
  { name: 'Bags & Accessories', icon: ShoppingBag, color: 'bg-yellow-50 text-yellow-600 border-yellow-100 group-hover:bg-yellow-600 group-hover:text-white', count: '15 Items' },
  { name: 'Gifts', icon: Gift, color: 'bg-sky-50 text-sky-500 border-sky-100 group-hover:bg-sky-500 group-hover:text-white', count: '8 Items' },
];

export default function Categories() {
  return (
    <section className="container mx-auto px-4 lg:px-8 py-6 mb-8 font-sans">
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
            Browse By Department
          </span>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-gray-900">
            Top Categories
          </h2>
        </div>
        <Link
          href="/products"
          className="text-xs sm:text-sm font-bold text-gray-900 hover:underline flex items-center gap-1"
        >
          All Categories <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="flex items-center gap-3.5 overflow-x-auto pb-3 pt-1 no-scrollbar scroll-smooth">
        {categories.map((c, i) => (
          <Link
            href={`/products/category/${encodeURIComponent(c.name.toLowerCase())}`}
            key={i}
            className="flex flex-col items-center min-w-[90px] sm:min-w-[105px] p-3 rounded-2xl bg-white border border-gray-100 hover:border-gray-300 hover:shadow-md transition-all duration-200 group text-center"
          >
            <div
              className={`w-14 h-14 rounded-2xl border flex items-center justify-center transition-all duration-200 group-hover:scale-108 mb-2 ${c.color}`}
            >
              <c.icon className="w-6 h-6 stroke-[1.8] transition-colors" />
            </div>
            <span className="text-xs font-bold text-gray-900 group-hover:text-black line-clamp-1">
              {c.name}
            </span>
            <span className="text-[10px] text-gray-400 font-medium mt-0.5">
              {c.count}
            </span>
          </Link>
        ))}

        {/* Hot Deals Card */}
        <div className="min-w-[200px] shrink-0">
          <Link
            href="/products"
            className="bg-gradient-to-br from-red-500 to-orange-500 text-white rounded-2xl p-4 flex items-center justify-between group hover:shadow-lg transition-all duration-200 h-full min-h-[110px]"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-white shrink-0">
                <Flame className="w-5 h-5 fill-current animate-pulse" />
              </div>
              <div>
                <div className="font-extrabold text-sm leading-tight">Deals Zone</div>
                <div className="text-[11px] text-white/80">Up to 40% OFF</div>
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white group-hover:translate-x-1 transition-transform">
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
