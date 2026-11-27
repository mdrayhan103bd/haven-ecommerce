'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import ProductCard from '@/components/ui/ProductCard';
import Link from 'next/link';

export default function Highlights() {
  const { products, banners } = useStore();
  const hlBanner = banners?.highlightsBanner;

  const displayProducts = products.slice(0, 3);

  return (
    <section className="container mx-auto px-4 lg:px-8 mb-16 font-sans">
      <div className="flex items-end justify-between mb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
            Handpicked For You
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 tracking-tight mt-1">
            Today's Highlights
          </h2>
          <p className="text-gray-500 text-xs sm:text-sm mt-0.5">
            Top quality essentials with fast Cash on Delivery across Bangladesh.
          </p>
        </div>
        <Link 
          href="/products" 
          className="text-xs sm:text-sm font-bold text-black flex items-center gap-1 hover:underline"
        >
          View All <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {displayProducts.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
        
        {/* Curated Editorial Banner Card */}
        <div className="bg-[#2c2a29] rounded-2xl p-7 relative overflow-hidden flex flex-col justify-between text-white min-h-[320px] shadow-sm hover:shadow-xl transition-all duration-300">
          {hlBanner?.image && (
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay transition-all duration-700 hover:scale-105"
              style={{ backgroundImage: `url(${hlBanner.image})` }}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none" />

          <div className="relative z-10">
            <span className="text-[11px] uppercase tracking-widest text-[#BCA38F] font-bold">
              {hlBanner?.tag || 'Curated Space'}
            </span>
            <h3 className="text-2xl font-serif font-bold leading-tight mt-2 mb-2">
              {hlBanner?.title || 'Transform Your Home'}
            </h3>
            <p className="text-xs text-gray-300 line-clamp-3">
              {hlBanner?.description || 'Timeless Scandinavian designs made with sustainable materials.'}
            </p>
          </div>
          
          <div className="relative z-10 pt-4">
            <Link 
              href={hlBanner?.ctaLink || '/products/category/home%20%26%20living'} 
              className="bg-white text-gray-900 px-5 py-2.5 rounded-full text-xs font-bold flex items-center gap-2 w-max hover:bg-gray-100 transition-colors shadow-sm"
            >
              {hlBanner?.ctaText || 'Shop Collection'} <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
