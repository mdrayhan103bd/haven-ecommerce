'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { useStore } from '@/context/StoreContext';
import { Heart, ShoppingBag, Eye, Check, Star } from 'lucide-react';
import QuickViewModal from './QuickViewModal';

interface ProductCardProps {
  product: Product;
  className?: string;
  showCategory?: boolean;
}

export default function ProductCard({ product, className = '', showCategory = true }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useStore();

  const [isAdded, setIsAdded] = useState(false);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const inWish = isInWishlist(product.id);
  const discountPercent = product.oldPrice && product.oldPrice > product.price
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleOpenQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsQuickViewOpen(true);
  };

  return (
    <>
      <div 
        className={`group relative flex flex-col bg-white rounded-3xl border border-gray-100 p-4 sm:p-4.5 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-gray-200/80 font-sans ${className}`}
      >
        {/* Product Image Canvas */}
        <div className="relative bg-[#F7F7F8] rounded-2xl aspect-[4/3] sm:aspect-square max-h-[340px] mb-4 overflow-hidden flex items-center justify-center">
          <Link href={`/products/${product.id}`} className="w-full h-full flex items-center justify-center p-4">
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 ease-out group-hover:scale-108"
            />
          </Link>

          {/* Badges Overlay */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10 pointer-events-none max-w-[65%]">
            {discountPercent > 0 && (
              <span className="bg-red-500 text-white text-[10px] sm:text-[11px] font-extrabold px-2.5 py-0.5 rounded-full shadow-sm">
                -{discountPercent}%
              </span>
            )}
            {product.tag && (
              <span className={`${product.tagColor || 'bg-black'} text-white text-[9px] sm:text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-sm`}>
                {product.tag}
              </span>
            )}
          </div>

          {/* Quick Action Floating Buttons (Wishlist & Quick View) */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
            {/* Wishlist Button */}
            <button
              onClick={handleToggleWishlist}
              aria-label={inWish ? 'Remove from wishlist' : 'Add to wishlist'}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-sm ${
                inWish
                  ? 'bg-red-50 text-red-500 scale-105'
                  : 'bg-white/90 text-gray-500 hover:text-black hover:bg-white hover:scale-105'
              }`}
            >
              <Heart className={`w-4 h-4 ${inWish ? 'fill-current' : ''}`} />
            </button>

            {/* Quick View Button */}
            <button
              onClick={handleOpenQuickView}
              aria-label="Quick preview product"
              title="Quick View"
              className="w-9 h-9 rounded-full bg-white/90 text-gray-500 hover:text-black hover:bg-white flex items-center justify-center shadow-sm transition-all hover:scale-105 opacity-90 sm:opacity-0 sm:group-hover:opacity-100"
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>

          {/* Low Stock Alert if stock < 10 */}
          {product.stock > 0 && product.stock <= 8 && (
            <div className="absolute bottom-2.5 left-3 right-3 text-center bg-amber-500/90 text-white text-[10px] font-bold py-1 rounded-lg backdrop-blur-xs">
              ⚡ Only {product.stock} left in stock
            </div>
          )}
        </div>

        {/* Content Info */}
        <div className="flex flex-col flex-1">
          {showCategory && (
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">
              {product.category}
            </span>
          )}

          <Link
            href={`/products/${product.id}`}
            className="font-bold text-gray-900 text-sm sm:text-base mb-1.5 hover:underline hover:text-black decoration-1 underline-offset-2 transition-colors line-clamp-2"
            title={product.name}
          >
            {product.name}
          </Link>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mb-2.5">
            <div className="flex text-amber-400 text-xs">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            </div>
            <span className="text-xs font-bold text-gray-900">{product.rating || 4.9}</span>
            <span className="text-[11px] text-gray-400">({product.reviews || 80} reviews)</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2 mb-3.5">
            <span className="font-extrabold text-red-600 text-lg sm:text-xl">
              ৳{product.price.toLocaleString('en-US')}
            </span>
            {product.oldPrice && product.oldPrice > product.price && (
              <span className="text-xs sm:text-sm text-gray-400 line-through font-medium">
                ৳{product.oldPrice.toLocaleString('en-US')}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAdd}
            disabled={isAdded || product.stock <= 0}
            className={`mt-auto w-full rounded-full py-3 sm:py-2.5 flex items-center justify-center gap-2 text-xs sm:text-sm font-bold transition-all duration-200 border-2 ${
              isAdded
                ? 'bg-emerald-600 border-emerald-600 text-white shadow-sm'
                : product.stock <= 0
                ? 'bg-gray-100 border-gray-100 text-gray-400 cursor-not-allowed'
                : 'border-gray-200 text-gray-900 bg-white hover:border-black hover:bg-black hover:text-white shadow-xs'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-4 h-4" /> Added to Bag
              </>
            ) : product.stock <= 0 ? (
              'Sold Out'
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" /> Add to Cart
              </>
            )}
          </button>
        </div>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={product}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />
    </>
  );
}
