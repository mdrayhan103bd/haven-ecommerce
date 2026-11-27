'use client';

import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useStore } from '@/context/StoreContext';

export default function Lifestyle() {
  const { banners } = useStore();
  const lifestyles = banners?.lifestyles || [];

  return (
    <section className="container mx-auto px-4 lg:px-8 mb-20 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
            Inspiring Daily Living
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 tracking-tight mt-1">
            Shop by Lifestyle
          </h2>
          <p className="text-gray-500 text-xs sm:text-sm mt-0.5">
            Thoughtfully curated picks made for work, wellness, active moments, and home.
          </p>
        </div>
        <Link 
          href="/products" 
          className="text-xs sm:text-sm font-bold text-black flex items-center gap-1 hover:underline"
        >
          View All Aesthetics <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4">
        {lifestyles.map((l, i) => (
          <Link 
            href={l.link || '/products'} 
            key={l.id || i} 
            className="group relative rounded-2xl overflow-hidden aspect-[4/5] cursor-pointer block shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <img 
              src={l.img} 
              alt={l.title} 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-112" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent transition-opacity group-hover:from-black/90"></div>
            
            <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white">
              <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider block mb-0.5">
                Collection
              </span>
              <h3 className="font-bold text-sm leading-tight mb-2">
                {l.title}
              </h3>
              <div className="inline-flex items-center gap-1 text-[11px] font-bold bg-white/20 backdrop-blur-xs px-2.5 py-1 rounded-full text-white group-hover:bg-white group-hover:text-black transition-all">
                Shop <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
