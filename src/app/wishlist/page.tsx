'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { useCart } from '@/context/CartContext';
import { Product } from '@/types';

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, showToast } = useStore();
  const { addToCart } = useCart();

  const handleMoveToCart = (product: Product) => {
    addToCart(product);
    removeFromWishlist(product.id);
    showToast(`"${product.name}" moved to your bag!`);
  };

  const handleMoveAllToCart = () => {
    wishlist.forEach(p => {
      addToCart(p);
      removeFromWishlist(p.id);
    });
    showToast(`All items moved to your bag!`);
  };

  return (
    <div className="container mx-auto px-4 lg:px-8 py-12 font-sans min-h-[70vh]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-gray-900 mb-1">My Wishlist</h1>
          <p className="text-sm text-gray-500">
            {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved for later
          </p>
        </div>

        {wishlist.length > 0 && (
          <button 
            onClick={handleMoveAllToCart}
            className="bg-black text-white px-5 py-2.5 rounded-full text-xs font-bold hover:bg-gray-800 transition-colors flex items-center gap-2"
          >
            <ShoppingCart className="w-3.5 h-3.5" /> Move All to Cart
          </button>
        )}
      </div>

      {wishlist.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-6">
          {wishlist.map(p => (
            <div 
              key={p.id} 
              className="bg-white rounded-2xl border border-gray-100 p-4 flex flex-col transition-all hover:shadow-lg"
            >
              <div className="relative bg-[#F5F5F5] rounded-xl aspect-[4/3] mb-4 overflow-hidden flex items-center justify-center">
                <Link href={`/products/${p.id}`} className="w-full h-full flex items-center justify-center">
                  <img src={p.image} alt={p.name} className="w-4/5 h-4/5 object-contain mix-blend-multiply" />
                </Link>
                <button 
                  onClick={() => removeFromWishlist(p.id)}
                  className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white text-gray-400 hover:text-red-500 flex items-center justify-center shadow-sm transition-colors"
                  title="Remove from wishlist"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                {p.category}
              </div>

              <Link href={`/products/${p.id}`} className="font-bold text-gray-900 text-sm mb-1 hover:underline truncate">
                {p.name}
              </Link>

              <div className="flex items-center gap-2 mb-4">
                <span className="font-bold text-red-600 text-lg">${p.price}</span>
                {p.oldPrice && (
                  <span className="text-xs text-gray-400 line-through font-medium">${p.oldPrice}</span>
                )}
              </div>

              <div className="mt-auto space-y-2">
                <button 
                  onClick={() => handleMoveToCart(p)}
                  className="w-full bg-black text-white py-2.5 rounded-full text-xs font-bold flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors"
                >
                  <ShoppingCart className="w-3.5 h-3.5" /> Move to Bag
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-gray-50 rounded-3xl border border-dashed border-gray-200 max-w-lg mx-auto">
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2">Your wishlist is empty</h2>
          <p className="text-gray-500 text-sm mb-6 max-w-sm mx-auto">
            Save items you love by tapping the heart icon on any product, and find them all here whenever you are ready.
          </p>
          <Link 
            href="/products" 
            className="inline-flex items-center gap-2 bg-black text-white px-7 py-3 rounded-full text-xs font-bold hover:bg-gray-800 transition-colors shadow-sm"
          >
            Start Exploring <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}
    </div>
  );
}
