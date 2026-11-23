'use client';

import React from 'react';
import { Heart, ShoppingCart, ArrowRight, Check } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useStore } from '@/context/StoreContext';
import { Product } from '@/types';
import Link from 'next/link';

export default function Highlights() {
  const { addToCart } = useCart();
  const { products, toggleWishlist, isInWishlist, banners } = useStore();
  const [added, setAdded] = React.useState<Record<string, boolean>>({});
  const hlBanner = banners?.highlightsBanner;

  const displayProducts = products.slice(0, 3);

  const handleAdd = (p: Product) => {
    addToCart(p);
    setAdded({ ...added, [p.id]: true });
    setTimeout(() => setAdded(prev => ({ ...prev, [p.id]: false })), 2000);
  };

  return (
    <section className="container mx-auto px-4 lg:px-8 mb-16 font-sans">
      <div className="flex items-end justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Today's Highlights</h2>
          <p className="text-gray-500 text-sm">Handpicked top quality items just for you</p>
        </div>
        <Link href="/products" className="text-sm font-bold text-black flex items-center gap-1 hover:underline">
          View All <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {displayProducts.map(p => {
          const inWish = isInWishlist(p.id);
          return (
            <div key={p.id} className="group flex flex-col bg-white rounded-2xl border border-gray-100 p-4 transition-all hover:shadow-md">
              <div className="relative bg-[#F5F5F5] rounded-xl aspect-[4/3] mb-4 overflow-hidden flex items-center justify-center">
                <Link href={`/products/${p.id}`} className="w-full h-full flex items-center justify-center">
                  <img 
                    src={p.image} 
                    alt={p.name} 
                    className="w-4/5 h-4/5 object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500" 
                  />
                </Link>
                {p.tag && (
                  <div className={`absolute top-2.5 left-2.5 ${p.tagColor || 'bg-black'} text-white text-[10px] font-bold px-2 py-0.5 rounded-full`}>
                    {p.tag}
                  </div>
                )}
                {/* Wishlist Button */}
                <button 
                  onClick={() => toggleWishlist(p)}
                  aria-label="Toggle wishlist"
                  className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                    inWish ? 'bg-red-50 text-red-500' : 'bg-white/80 text-gray-500 hover:text-black hover:bg-white'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${inWish ? 'fill-current' : ''}`} />
                </button>
              </div>

              <Link href={`/products/${p.id}`} className="font-bold text-gray-900 text-sm mb-1 line-clamp-1 hover:underline">
                {p.name}
              </Link>
              
              <div className="flex items-center gap-1 mb-2">
                <div className="flex text-yellow-400 text-xs">★★★★★</div>
                <span className="text-xs font-bold text-gray-900">{p.rating}</span>
                <span className="text-xs text-gray-400">({p.reviews})</span>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <span className="font-bold text-red-600 text-lg">৳{p.price}</span>
                {p.oldPrice && <span className="text-xs text-gray-400 line-through font-medium">৳{p.oldPrice}</span>}
              </div>

              <button 
                onClick={() => handleAdd(p)}
                disabled={added[p.id]}
                className={`mt-auto w-full border-2 rounded-full py-2 flex items-center justify-center gap-2 text-xs font-bold transition-all ${
                  added[p.id] 
                    ? 'bg-green-600 border-green-600 text-white' 
                    : 'border-gray-200 text-gray-900 hover:border-black hover:bg-black hover:text-white'
                }`}
              >
                {added[p.id] ? <><Check className="w-3.5 h-3.5" /> Added</> : <><ShoppingCart className="w-3.5 h-3.5" /> Add to Cart</>}
              </button>
            </div>
          );
        })}
        
        {/* Banner card */}
        <div className="bg-[#2c2a29] rounded-2xl p-7 relative overflow-hidden flex flex-col justify-between text-white min-h-[300px]">
          {hlBanner?.image && (
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay transition-all duration-700"
              style={{ backgroundImage: `url(${hlBanner.image})` }}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />

          <div className="relative z-10">
            <span className="text-xs uppercase tracking-widest text-[#BCA38F] font-bold">
              {hlBanner?.tag || 'Curated Space'}
            </span>
            <h3 className="text-2xl font-serif font-bold leading-tight mt-2 mb-2">
              {hlBanner?.title || 'Transform Your Home'}
            </h3>
            <p className="text-xs text-gray-300">
              {hlBanner?.description || 'Timeless Scandinavian designs made with sustainable materials.'}
            </p>
          </div>
          
          <div className="relative z-10 pt-4">
            <Link 
              href={hlBanner?.ctaLink || '/products/category/home%20%26%20living'} 
              className="bg-white text-gray-900 px-5 py-2.5 rounded-full text-xs font-bold flex items-center gap-2 w-max hover:bg-gray-100 transition-colors"
            >
              {hlBanner?.ctaText || 'Shop Collection'} <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
