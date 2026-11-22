'use client';

import React, { use, useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Heart, Check, ArrowLeft } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { useCart } from '@/context/CartContext';
import { Product } from '@/types';

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const decodedSlug = decodeURIComponent(resolvedParams.slug).toLowerCase();
  
  const { products, toggleWishlist, isInWishlist } = useStore();
  const { addToCart } = useCart();
  const [added, setAdded] = useState<Record<string, boolean>>({});

  // Match category with slug (handles "home & living", "home", etc.)
  const categoryProducts = products.filter(p => {
    const cat = p.category.toLowerCase();
    if (decodedSlug === 'home & living' || decodedSlug === 'home') {
      return cat.includes('home') || cat.includes('living');
    }
    return cat === decodedSlug || cat.includes(decodedSlug);
  });

  const handleAdd = (p: Product) => {
    addToCart(p);
    setAdded({ ...added, [p.id]: true });
    setTimeout(() => setAdded(prev => ({ ...prev, [p.id]: false })), 2000);
  };

  return (
    <div className="container mx-auto px-4 lg:px-8 py-10 font-sans min-h-[70vh]">
      {/* Back Link & Title */}
      <div className="mb-8">
        <Link href="/products" className="inline-flex items-center text-xs font-semibold text-gray-500 hover:text-black mb-3">
          <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to all products
        </Link>
        <h1 className="text-3xl lg:text-4xl font-serif font-bold text-gray-900 capitalize mb-1">
          {decodedSlug} Collection
        </h1>
        <p className="text-gray-500 text-sm">
          Discover our curated selection of {decodedSlug} essentials ({categoryProducts.length} items)
        </p>
      </div>

      {categoryProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categoryProducts.map(p => {
            const inWish = isInWishlist(p.id);
            return (
              <div 
                key={p.id} 
                className="group flex flex-col bg-white rounded-2xl border border-gray-100 p-4 transition-all hover:shadow-lg hover:border-gray-200"
              >
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
                  {/* Wishlist Heart Button */}
                  <button 
                    onClick={() => toggleWishlist(p)}
                    aria-label="Save to wishlist"
                    className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                      inWish 
                        ? 'bg-red-50 text-red-500' 
                        : 'bg-white/80 text-gray-500 hover:text-black hover:bg-white'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${inWish ? 'fill-current' : ''}`} />
                  </button>
                </div>

                <Link 
                  href={`/products/${p.id}`} 
                  className="font-bold text-gray-900 text-sm mb-1.5 hover:underline decoration-1 underline-offset-2 line-clamp-1"
                >
                  {p.name}
                </Link>

                <div className="flex items-center gap-1 mb-2">
                  <div className="flex text-yellow-400 text-xs">★★★★★</div>
                  <span className="text-xs font-bold text-gray-900">{p.rating}</span>
                  <span className="text-xs text-gray-400">({p.reviews})</span>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <span className="font-bold text-red-600 text-lg">${p.price}</span>
                  {p.oldPrice && (
                    <span className="text-xs text-gray-400 line-through font-medium">${p.oldPrice}</span>
                  )}
                </div>

                <button 
                  onClick={() => handleAdd(p)}
                  disabled={added[p.id]}
                  className={`mt-auto w-full border-2 rounded-full py-2.5 flex items-center justify-center gap-2 text-xs font-bold transition-all ${
                    added[p.id] 
                      ? 'bg-green-600 border-green-600 text-white' 
                      : 'border-gray-200 text-gray-900 hover:border-black hover:bg-black hover:text-white'
                  }`}
                >
                  {added[p.id] ? <><Check className="w-4 h-4" /> Added</> : <><ShoppingCart className="w-4 h-4" /> Add to Cart</>}
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-200 max-w-md mx-auto">
          <h3 className="text-lg font-bold text-gray-900 mb-1">No products found</h3>
          <p className="text-xs text-gray-500 mb-6">We couldn't find items in this specific category right now.</p>
          <Link 
            href="/products" 
            className="inline-block bg-black text-white px-6 py-2.5 rounded-full text-xs font-bold hover:bg-gray-800"
          >
            Browse All Products
          </Link>
        </div>
      )}
    </div>
  );
}
