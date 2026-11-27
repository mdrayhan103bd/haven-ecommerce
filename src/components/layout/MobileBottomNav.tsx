'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Home, LayoutGrid, Search, Heart, ShoppingBag, X, ArrowRight, TrendingUp } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useStore } from '@/context/StoreContext';

export default function MobileBottomNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { cartCount, toggleCart } = useCart();
  const { wishlistCount, products } = useStore();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const trendingTags = ['Sneakers', 'Espresso', 'Watch', 'Handbag', 'Chair', 'Headphones'];

  const searchResults = searchQuery.trim()
    ? products
        .filter(
          p =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.category.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 4)
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(false);
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleTagClick = (tag: string) => {
    setIsSearchOpen(false);
    router.push(`/products?search=${encodeURIComponent(tag)}`);
  };

  const isHome = pathname === '/';
  const isShop = pathname?.startsWith('/products');
  const isWishlist = pathname === '/wishlist';

  return (
    <>
      {/* Frosted Mobile Navigation Dock */}
      <nav 
        aria-label="Mobile Navigation"
        className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/95 backdrop-blur-xl border-t border-gray-100/80 shadow-[0_-4px_24px_rgba(0,0,0,0.06)] px-2 py-2"
      >
        <div className="grid grid-cols-5 items-center max-w-md mx-auto">
          {/* Home */}
          <Link
            href="/"
            className={`flex flex-col items-center justify-center py-1 transition-all ${
              isHome ? 'text-black font-bold' : 'text-gray-400 hover:text-gray-700'
            }`}
          >
            <div className={`relative p-1 rounded-full transition-all ${isHome ? 'bg-black/5 scale-110' : ''}`}>
              <Home className="w-5 h-5" />
            </div>
            <span className="text-[10px] mt-0.5">Home</span>
          </Link>

          {/* Shop */}
          <Link
            href="/products"
            className={`flex flex-col items-center justify-center py-1 transition-all ${
              isShop ? 'text-black font-bold' : 'text-gray-400 hover:text-gray-700'
            }`}
          >
            <div className={`relative p-1 rounded-full transition-all ${isShop ? 'bg-black/5 scale-110' : ''}`}>
              <LayoutGrid className="w-5 h-5" />
            </div>
            <span className="text-[10px] mt-0.5">Shop</span>
          </Link>

          {/* Search Trigger */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="flex flex-col items-center justify-center py-1 text-gray-400 hover:text-gray-700"
            aria-label="Search items"
          >
            <div className="relative p-1 rounded-full">
              <Search className="w-5 h-5" />
            </div>
            <span className="text-[10px] mt-0.5">Search</span>
          </button>

          {/* Wishlist */}
          <Link
            href="/wishlist"
            className={`flex flex-col items-center justify-center py-1 relative transition-all ${
              isWishlist ? 'text-black font-bold' : 'text-gray-400 hover:text-gray-700'
            }`}
          >
            <div className={`relative p-1 rounded-full transition-all ${isWishlist ? 'bg-black/5 scale-110' : ''}`}>
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                  {wishlistCount}
                </span>
              )}
            </div>
            <span className="text-[10px] mt-0.5">Saved</span>
          </Link>

          {/* Bag / Cart */}
          <button
            onClick={toggleCart}
            className="flex flex-col items-center justify-center py-1 relative text-gray-400 hover:text-gray-700"
            aria-label="Open cart"
          >
            <div className="relative p-1 rounded-full">
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-[9px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="text-[10px] mt-0.5">Bag</span>
          </button>
        </div>
      </nav>

      {/* Mobile Search Overlay Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex flex-col justify-end sm:justify-center p-0 sm:p-4 animate-in fade-in">
          <div 
            className="fixed inset-0"
            onClick={() => setIsSearchOpen(false)}
            aria-hidden="true"
          />

          <div className="relative bg-white w-full rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl z-10 max-h-[85vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
              <span className="text-sm font-bold text-gray-900">Search Store</span>
              <button
                onClick={() => setIsSearchOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:text-black"
                aria-label="Close search"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Input Form */}
            <form onSubmit={handleSearchSubmit} className="relative mb-4">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products, brands, or categories..."
                className="w-full bg-gray-50 border border-gray-200 rounded-full pl-10 pr-10 py-3 text-sm outline-none focus:border-black focus:bg-white transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black text-xs"
                >
                  ✕
                </button>
              )}
            </form>

            {/* Trending Quick Tags */}
            <div className="mb-5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                <TrendingUp className="w-3.5 h-3.5" /> Popular Searches
              </div>
              <div className="flex flex-wrap gap-2">
                {trendingTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => handleTagClick(tag)}
                    className="text-xs bg-gray-100 hover:bg-black hover:text-white px-3 py-1.5 rounded-full text-gray-700 transition-colors font-medium"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Live Matches */}
            {searchResults.length > 0 && (
              <div>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Products</div>
                <div className="divide-y divide-gray-100">
                  {searchResults.map(p => (
                    <Link
                      key={p.id}
                      href={`/products/${p.id}`}
                      onClick={() => setIsSearchOpen(false)}
                      className="flex items-center gap-3 py-2.5 hover:bg-gray-50 rounded-xl px-2 transition-colors"
                    >
                      <img src={p.image} alt="" className="w-12 h-12 object-contain bg-gray-50 rounded-lg p-1" />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-gray-900 truncate">{p.name}</div>
                        <div className="text-[11px] text-gray-500">{p.category}</div>
                      </div>
                      <span className="text-xs font-bold text-red-600 shrink-0">৳{p.price}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {searchQuery && searchResults.length === 0 && (
              <div className="text-center py-6 text-gray-400 text-xs">
                No products found for "{searchQuery}". Press Enter to browse full catalog.
              </div>
            )}

            {/* View all button */}
            <button
              onClick={handleSearchSubmit}
              className="mt-4 w-full bg-black text-white rounded-full py-3 text-xs font-bold flex items-center justify-center gap-2 hover:bg-gray-800 transition-all"
            >
              Search All Products <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
