'use client';

import React, { useState, useEffect } from 'react';
import { useStore } from '@/context/StoreContext';
import ProductCard from '@/components/ui/ProductCard';
import { Zap, Flame, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function FlashSaleSection() {
  const { products } = useStore();

  // 12-hour recurring countdown timer
  const [timeLeft, setTimeLeft] = useState({
    hours: 8,
    minutes: 42,
    seconds: 19
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 11, minutes: 59, seconds: 59 }; // reset
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Filter products that have oldPrice (on discount) or high rating
  const flashProducts = products
    .filter(p => p.oldPrice && p.oldPrice > p.price)
    .slice(0, 4);

  if (flashProducts.length === 0) return null;

  const pad = (n: number) => n.toString().padStart(2, '0');

  return (
    <section className="container mx-auto px-4 lg:px-8 mb-16 font-sans">
      <div className="bg-gradient-to-br from-red-500/5 via-orange-500/5 to-amber-500/5 rounded-3xl border border-red-100 p-5 sm:p-8">
        {/* Header with Title and Live Timer */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-red-100 text-red-600 text-xs font-extrabold px-3 py-1 rounded-full mb-2">
              <Flame className="w-4 h-4 fill-current animate-bounce" /> FLASH SALE
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 tracking-tight">
              Deals of the Day
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm mt-1">
              Massive price cuts on selected best-sellers. Cash on Delivery available across Bangladesh.
            </p>
          </div>

          {/* Countdown Clock */}
          <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-2xl border border-gray-200/80 shadow-sm w-fit">
            <Clock className="w-4 h-4 text-red-500 shrink-0" />
            <span className="text-xs font-bold text-gray-600 mr-1">Ends in:</span>
            <div className="flex items-center gap-1.5 font-mono text-xs sm:text-sm font-bold text-gray-900">
              <span className="bg-gray-900 text-white px-2 py-1 rounded-lg">
                {pad(timeLeft.hours)}h
              </span>
              <span>:</span>
              <span className="bg-gray-900 text-white px-2 py-1 rounded-lg">
                {pad(timeLeft.minutes)}m
              </span>
              <span>:</span>
              <span className="bg-red-600 text-white px-2 py-1 rounded-lg animate-pulse">
                {pad(timeLeft.seconds)}s
              </span>
            </div>
          </div>
        </div>

        {/* Product Cards Grid - Single product view on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {flashProducts.map((p, idx) => (
            <div key={p.id} className="flex flex-col">
              <ProductCard product={p} className="h-full" />
              {/* Micro Urgency Stock Claim Bar */}
              <div className="mt-2 px-2">
                <div className="flex items-center justify-between text-[10px] font-bold text-gray-500 mb-1">
                  <span>Sold: {70 + (idx * 7)}%</span>
                  <span className="text-red-500">Only {Math.max(2, p.stock % 8)} left</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-orange-500 to-red-500 h-1.5 rounded-full"
                    style={{ width: `${Math.min(95, 70 + (idx * 7))}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Call to Action */}
        <div className="mt-8 text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-gray-900 bg-white hover:bg-gray-900 hover:text-white px-6 py-3 rounded-full border border-gray-200 shadow-sm transition-all duration-200"
          >
            Explore All Deals <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
