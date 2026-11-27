'use client';

import React, { useState, useMemo } from 'react';
import { useStore } from '@/context/StoreContext';
import ProductCard from '@/components/ui/ProductCard';
import { Flame, Star, Sparkles, Gem, ArrowRight } from 'lucide-react';
import Link from 'next/link';

type TabKey = 'trending' | 'bestsellers' | 'new' | 'premium';

export default function TabbedProducts() {
  const { products } = useStore();
  const [activeTab, setActiveTab] = useState<TabKey>('trending');

  const tabs = [
    { key: 'trending' as TabKey, label: 'Trending Now', icon: Flame, badge: 'Hot' },
    { key: 'bestsellers' as TabKey, label: 'Best Sellers', icon: Star, badge: 'Top' },
    { key: 'new' as TabKey, label: 'New Arrivals', icon: Sparkles, badge: 'New' },
    { key: 'premium' as TabKey, label: 'Premium Picks', icon: Gem, badge: 'Luxe' },
  ];

  const displayedProducts = useMemo(() => {
    switch (activeTab) {
      case 'trending':
        return products.filter(p => p.tag === 'Trending' || p.rating >= 4.8).slice(0, 8);
      case 'bestsellers':
        return products.filter(p => p.tag === 'Best Seller' || p.stock > 25).slice(0, 8);
      case 'new':
        return products.filter(p => p.tag === 'New Arrival' || parseInt(p.id) > 15).slice(0, 8);
      case 'premium':
        return [...products].sort((a, b) => b.price - a.price).slice(0, 8);
      default:
        return products.slice(0, 8);
    }
  }, [products, activeTab]);

  return (
    <section className="container mx-auto px-4 lg:px-8 mb-16 font-sans">
      {/* Section Heading & Subtitle */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
            Curated Collections
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 tracking-tight mt-1">
            Discover Our Favorites
          </h2>
          <p className="text-gray-500 text-xs sm:text-sm mt-0.5">
            Handpicked trends, award-winning essentials, and latest arrivals.
          </p>
        </div>

        <Link
          href="/products"
          className="text-xs sm:text-sm font-bold text-gray-900 hover:text-black flex items-center gap-1 hover:underline"
        >
          View Full Store <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Tabs Navigation Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 no-scrollbar">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold transition-all duration-200 whitespace-nowrap shadow-xs ${
                isActive
                  ? 'bg-black text-white shadow-md scale-102'
                  : 'bg-gray-100/90 text-gray-600 hover:bg-gray-200 hover:text-black'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400' : 'text-gray-400'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Products Grid - Single product view on mobile (grid-cols-1) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 animate-in fade-in duration-300">
        {displayedProducts.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      {/* Bottom link */}
      <div className="mt-10 text-center">
        <Link
          href={`/products?category=All`}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-black border-2 border-black rounded-full px-8 py-3 hover:bg-black hover:text-white transition-all shadow-xs"
        >
          Browse All {products.length}+ Products <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
