import React from 'react';
import { Shirt, ShoppingBag, Monitor, Search, Coffee, Gift, Dumbbell, Sparkles } from 'lucide-react';
import { ArrowRight } from 'lucide-react';

const categories = [
  { name: 'Women', icon: Shirt, color: 'bg-red-50 text-red-500' },
  { name: 'Men', icon: Shirt, color: 'bg-blue-50 text-blue-500' },
  { name: 'Home & Living', icon: Coffee, color: 'bg-orange-50 text-orange-500' },
  { name: 'Electronics', icon: Monitor, color: 'bg-teal-50 text-teal-500' },
  { name: 'Beauty', icon: Sparkles, color: 'bg-pink-50 text-pink-500' },
  { name: 'Sports', icon: Dumbbell, color: 'bg-purple-50 text-purple-500' },
  { name: 'Bags & Accessories', icon: ShoppingBag, color: 'bg-yellow-50 text-yellow-600' },
  { name: 'Gifts', icon: Gift, color: 'bg-blue-50 text-blue-500' },
];

export default function Categories() {
  return (
    <section className="container mx-auto px-4 lg:px-8 py-8">
      <div className="flex items-center justify-between overflow-x-auto gap-4 pb-4 scrollbar-hide">
        {categories.map((c, i) => (
          <div key={i} className="flex flex-col items-center gap-3 min-w-[80px] cursor-pointer group">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-transform group-hover:scale-110 ${c.color}`}>
              <c.icon className="w-6 h-6" />
            </div>
            <span className="text-xs font-medium text-gray-700 whitespace-nowrap">{c.name}</span>
          </div>
        ))}
        
        <div className="flex-1 min-w-[200px] ml-4">
          <div className="bg-red-50 rounded-2xl p-4 flex items-center justify-between cursor-pointer group">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-500">
                <span className="text-xl">🔥</span>
              </div>
              <div>
                <div className="font-bold text-red-600">Deals</div>
                <div className="text-xs text-red-500">Of The Day</div>
              </div>
            </div>
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:bg-red-500 group-hover:text-white transition-colors">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}