'use client';

import React from 'react';
import { Shirt, ShoppingBag, Monitor, Coffee, Gift, Dumbbell, Sparkles, Flame, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useStore } from '@/context/StoreContext';

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
  const { products } = useStore();

  return (
    <section className="container mx-auto px-4 lg:px-8 py-5 sm:py-6 mb-6 font-sans">
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

      {/* Multi-line Responsive Grid: 4 columns on mobile (2 lines), 8 columns on desktop (1 line) */}
      <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-8 gap-2 sm:gap-3">
        {categories.map((c, i) => {
          const matchedCount = products?.filter(
            p => p.category?.toLowerCase().includes(c.name.toLowerCase().split(' ')[0]) || 
                 c.name.toLowerCase().includes(p.category?.toLowerCase() || '')
          ).length;
          const displayCount = matchedCount && matchedCount > 0 ? `${matchedCount} Items` : c.count;

          return (
            <Link
              href={`/products/category/${encodeURIComponent(c.name.toLowerCase())}`}
              key={i}
              className="flex flex-col items-center justify-between p-2 sm:p-3 rounded-2xl bg-white border border-gray-100 hover:border-gray-300 hover:shadow-md transition-all duration-200 group text-center min-h-[105px] sm:min-h-[120px]"
            >
              <div
                className={`w-11 h-11 sm:w-13 sm:h-13 rounded-2xl border flex items-center justify-center transition-all duration-200 group-hover:scale-108 mb-1.5 shrink-0 ${c.color}`}
              >
                <c.icon className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.8] transition-colors" />
              </div>
              <div className="flex flex-col items-center justify-center flex-1 w-full">
                <span className="text-[10px] sm:text-xs font-bold text-gray-900 group-hover:text-black line-clamp-2 leading-tight text-center px-0.5">
                  {c.name}
                </span>
                <span className="text-[9px] sm:text-[10px] text-gray-400 font-medium mt-0.5">
                  {displayCount}
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Deals Zone Prominent Full-Width Banner */}
      <div className="mt-3 sm:mt-4">
        <Link
          href="/products"
          className="relative overflow-hidden bg-gradient-to-r from-red-600 via-rose-600 to-amber-500 text-white rounded-2xl p-3.5 sm:p-4 flex items-center justify-between group hover:shadow-lg transition-all duration-200 shadow-xs"
        >
          <div className="flex items-center gap-3 z-10">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-white shrink-0">
              <Flame className="w-5 h-5 fill-current animate-pulse text-amber-200" />
            </div>
            <div>
              <div className="font-extrabold text-sm sm:text-base leading-tight flex items-center gap-2">
                Deals Zone
                <span className="bg-white/25 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Up to 40% OFF
                </span>
              </div>
              <div className="text-[11px] sm:text-xs text-white/90 mt-0.5">
                Massive discounts across top categories • Cash on Delivery available
              </div>
            </div>
          </div>
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white group-hover:translate-x-1 transition-transform shrink-0 z-10">
            <ArrowRight className="w-4 h-4" />
          </div>
        </Link>
      </div>
    </section>
  );
}
