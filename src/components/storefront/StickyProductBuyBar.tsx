'use client';

import React, { useState, useEffect } from 'react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { ShoppingBag, Zap, Check, Star } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface StickyProductBuyBarProps {
  product: Product;
}

export default function StickyProductBuyBar({ product }: StickyProductBuyBarProps) {
  const router = useRouter();
  const { addToCart } = useCart();
  const [isVisible, setIsVisible] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Appear once user has scrolled past 380px
      if (window.scrollY > 380) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    router.push('/checkout');
  };

  return (
    <aside 
      aria-label="Quick Purchase Bar"
      className="fixed bottom-14 md:bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-gray-200/80 shadow-[0_-6px_24px_rgba(0,0,0,0.08)] py-3 px-4 sm:px-6 transition-all duration-300 animate-in slide-in-from-bottom"
    >
      <div className="container mx-auto max-w-6xl flex items-center justify-between gap-3 sm:gap-6 font-sans">
        {/* Product Info Thumbnail */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-12 h-12 bg-gray-50 rounded-xl p-1 border border-gray-100 flex items-center justify-center shrink-0">
            <img
              src={product.image}
              alt=""
              className="w-full h-full object-contain mix-blend-multiply"
            />
          </div>
          <div className="min-w-0 hidden sm:block">
            <h4 className="text-xs sm:text-sm font-bold text-gray-900 truncate max-w-xs">
              {product.name}
            </h4>
            <div className="flex items-center gap-2 text-xs">
              <span className="font-extrabold text-red-600">
                ৳{product.price.toLocaleString('en-US')}
              </span>
              {product.oldPrice && product.oldPrice > product.price && (
                <span className="text-[11px] text-gray-400 line-through">
                  ৳{product.oldPrice.toLocaleString('en-US')}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Price on mobile */}
        <div className="sm:hidden flex flex-col">
          <span className="text-xs font-bold text-gray-900 truncate max-w-[120px]">{product.name}</span>
          <span className="text-xs font-extrabold text-red-600">৳{product.price.toLocaleString('en-US')}</span>
        </div>

        {/* Quantity and Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Quantity Controls */}
          <div className="hidden md:flex items-center border border-gray-200 rounded-full bg-gray-50">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-black font-bold text-xs"
              aria-label="Decrease quantity"
            >
              -
            </button>
            <span className="w-8 text-center text-xs font-bold text-gray-900">{quantity}</span>
            <button
              onClick={() => setQuantity(Math.min(product.stock || 99, quantity + 1))}
              className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-black font-bold text-xs"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            disabled={isAdded || product.stock <= 0}
            className={`py-2 sm:py-2.5 px-3.5 sm:px-5 rounded-full text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-xs ${
              isAdded
                ? 'bg-emerald-600 text-white'
                : 'bg-black text-white hover:bg-gray-800'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5" /> Added
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" /> Add to Bag
              </>
            )}
          </button>

          {/* Buy with COD */}
          <button
            onClick={handleBuyNow}
            disabled={product.stock <= 0}
            className="py-2 sm:py-2.5 px-3.5 sm:px-5 rounded-full text-xs font-bold bg-red-600 hover:bg-red-700 text-white flex items-center justify-center gap-1.5 shadow-xs transition-all"
          >
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span className="hidden xs:inline">Buy with</span> COD
          </button>
        </div>
      </div>
    </aside>
  );
}
