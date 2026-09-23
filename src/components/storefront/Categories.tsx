import React from 'react';
import { Shirt, ShoppingBag, Monitor, Search, Coffee, Gift, Dumbbell, Sparkles } from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const categories = [
  { name: 'Women', icon: Shirt, color: 'bg-[#FDF3F3] text-red-400 border border-[#F8E3E3]' },
  { name: 'Men', icon: Shirt, color: 'bg-[#F2F7FD] text-blue-400 border border-[#E3EDF8]' },
  { name: 'Home & Living', icon: Coffee, color: 'bg-[#FDF6ED] text-orange-400 border border-[#F8E9D5]' },
  { name: 'Electronics', icon: Monitor, color: 'bg-[#F0FAFA] text-teal-400 border border-[#DEF1F1]' },
  { name: 'Beauty', icon: Sparkles, color: 'bg-[#FDF2F7] text-pink-400 border border-[#F8E0EC]' },
  { name: 'Sports', icon: Dumbbell, color: 'bg-[#F6F4FB] text-purple-400 border border-[#EBE6F6]' },
  { name: 'Bags & Accessories', icon: ShoppingBag, color: 'bg-[#FCF9F0] text-yellow-500 border border-[#F5EED9]' },
  { name: 'Gifts', icon: Gift, color: 'bg-[#F0F5FC] text-blue-400 border border-[#DFEBF7]' },
];

export default function Categories() {
  return (
    <section className="container mx-auto px-4 lg:px-8 py-8 font-sans">
      <div className="flex items-center justify-between overflow-x-auto gap-4 pb-4 scrollbar-hide">
        {categories.map((c, i) => (
          <Link href="/products" key={i} className="flex flex-col items-center gap-3 min-w-[80px] cursor-pointer group">
            <div className={`w-[72px] h-[72px] rounded-full flex items-center justify-center transition-transform group-hover:scale-105 ${c.color}`}>
              <c.icon className="w-6 h-6 stroke-[1.5]" />
            </div>
            <span className="text-xs font-medium text-gray-700 whitespace-nowrap">{c.name}</span>
          </Link>
        ))}
        
        <div className="flex-1 min-w-[220px] ml-4">
          <div className="bg-[#FEF5F5] border border-[#FCE8E8] rounded-full p-2.5 flex items-center justify-between cursor-pointer group hover:bg-[#FCE8E8] transition-colors">
            <div className="flex items-center gap-3 pl-2">
              <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-red-500">
                <span className="text-xl">🔥</span>
              </div>
              <div>
                <div className="font-bold text-gray-900 leading-tight text-sm">Deals</div>
                <div className="text-xs text-gray-500">Of The Day</div>
              </div>
            </div>
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-gray-400 group-hover:text-red-500 transition-colors">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}