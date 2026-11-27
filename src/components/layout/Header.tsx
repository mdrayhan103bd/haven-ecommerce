'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search, Heart, ShoppingBag, Mic, Menu, X, User, ShieldCheck, LogOut, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useStore } from '@/context/StoreContext';
import CartDrawer from '@/components/storefront/CartDrawer';

export default function Header() {
  const router = useRouter();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { cartCount, toggleCart } = useCart();
  const { wishlistCount, user, logout, settings, products } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  // Keyboard shortcut: Ctrl+K / Cmd+K to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
        setShowSearchResults(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filteredSearchProducts = searchQuery.trim() 
    ? products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 5)
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowSearchResults(false);
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <>
      {/* Top Announcement Bar */}
      {settings.announcementEnabled && (
        <div className="bg-[#2c2a29] text-white text-xs py-2 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2">
          <span>{settings.announcementText}</span>
        </div>
      )}

      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100/90 font-sans transition-all">
        <div className="container mx-auto px-4 lg:px-8 py-3.5">
          <div className="flex items-center justify-between gap-4 lg:gap-8">
            {/* Mobile Menu Toggle & Brand */}
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setMobileMenuOpen(true)}
                className="md:hidden p-1.5 text-gray-700 hover:text-black rounded-lg"
                aria-label="Open mobile menu"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div className="flex flex-col">
                <Link href="/" className="text-2xl md:text-3xl font-bold tracking-tight text-black leading-none">
                  {settings.storeName || 'Cavrozone'}
                </Link>
                <span className="text-[10px] text-gray-500 font-medium tracking-wide mt-1 hidden sm:block">
                  {settings.tagline}
                </span>
              </div>
            </div>

            {/* Live Search Bar */}
            <div className="flex-1 max-w-xl hidden md:block relative">
              <form onSubmit={handleSearchSubmit} className="flex items-center bg-[#f5f5f5] rounded-full px-4 py-2 border border-transparent focus-within:border-black/20 focus-within:bg-white transition-all">
                <Search className="w-4 h-4 text-gray-500 mr-2 shrink-0" />
                <input 
                  ref={searchInputRef}
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSearchResults(true);
                  }}
                  onFocus={() => setShowSearchResults(true)}
                  placeholder="Search products, brands, or categories..." 
                  className="bg-transparent border-none outline-none flex-1 px-1 text-sm text-gray-800 placeholder-gray-400"
                />
                <kbd className="hidden lg:inline-flex items-center gap-0.5 px-2 py-0.5 text-[10px] font-mono text-gray-400 bg-white rounded border border-gray-200 shadow-xs mr-1">
                  Ctrl K
                </kbd>
                {searchQuery && (
                  <button 
                    type="button" 
                    onClick={() => { setSearchQuery(''); setShowSearchResults(false); }}
                    className="text-xs text-gray-400 hover:text-black px-1"
                  >
                    ✕
                  </button>
                )}
              </form>

              {/* Live Search Dropdown */}
              {showSearchResults && filteredSearchProducts.length > 0 && (
                <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 p-2 z-50">
                  <div className="text-xs font-semibold text-gray-400 px-3 py-1.5 uppercase">Products Found</div>
                  {filteredSearchProducts.map(p => (
                    <Link
                      key={p.id}
                      href={`/products/${p.id}`}
                      onClick={() => setShowSearchResults(false)}
                      className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-xl transition-colors"
                    >
                      <img src={p.image} alt={p.name} className="w-10 h-10 object-cover rounded-lg bg-gray-100" />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-bold text-gray-900 truncate">{p.name}</div>
                        <div className="text-xs text-gray-500">{p.category} • ৳{p.price}</div>
                      </div>
                    </Link>
                  ))}
                  <div className="pt-1.5 border-t border-gray-100 text-center">
                    <button 
                      onClick={handleSearchSubmit}
                      className="text-xs font-bold text-black py-1 hover:underline"
                    >
                      View all results for "{searchQuery}"
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Right Action Icons */}
            <div className="flex items-center gap-4 sm:gap-6">
              <Link href="/products" className="hidden lg:block text-sm font-semibold text-gray-700 hover:text-black">
                Shop
              </Link>

              {/* Wishlist Link with Live Badge */}
              <Link href="/wishlist" className="text-gray-700 hover:text-black relative p-1" title="Wishlist">
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart Button with Live Badge */}
              <button 
                onClick={toggleCart} 
                className="text-gray-700 hover:text-black relative p-1 outline-none" 
                title="Shopping Bag"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* User Account / Dropdown */}
              <div className="relative">
                {user ? (
                  <div className="relative">
                    <button 
                      onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                      className="flex items-center gap-2 outline-none p-1 rounded-full hover:bg-gray-50"
                    >
                      <img 
                        src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`} 
                        className="w-8 h-8 rounded-full object-cover border border-gray-200" 
                        alt={user.name} 
                      />
                      <div className="hidden lg:block text-left leading-tight">
                        <div className="text-[11px] text-gray-500 font-medium">Hello, {user.name.split(' ')[0]}</div>
                        <div className="text-xs font-bold text-gray-900 flex items-center gap-1">
                          Account <ChevronDown className="w-3 h-3 text-gray-400" />
                        </div>
                      </div>
                    </button>

                    {/* Account Dropdown Menu */}
                    {userDropdownOpen && (
                      <div 
                        onMouseLeave={() => setUserDropdownOpen(false)}
                        className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 p-2 z-50 text-sm font-medium"
                      >
                        <div className="px-3 py-2 border-b border-gray-100 mb-1">
                          <div className="font-bold text-gray-900 truncate">{user.name}</div>
                          <div className="text-xs text-gray-500 truncate">{user.email}</div>
                        </div>
                        <Link 
                          href="/account" 
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2 px-3 py-2 rounded-xl text-gray-700 hover:bg-gray-50 hover:text-black"
                        >
                          <ShoppingBag className="w-4 h-4 text-gray-400" /> My Orders
                        </Link>
                        <Link 
                          href="/account/profile" 
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2 px-3 py-2 rounded-xl text-gray-700 hover:bg-gray-50 hover:text-black"
                        >
                          <User className="w-4 h-4 text-gray-400" /> Personal Info
                        </Link>
                        <div className="border-t border-gray-100 mt-1 pt-1">
                          <button 
                            onClick={() => {
                              logout();
                              setUserDropdownOpen(false);
                            }}
                            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-red-600 hover:bg-red-50 text-left"
                          >
                            <LogOut className="w-4 h-4" /> Sign Out
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link 
                    href="/login" 
                    className="flex items-center gap-1.5 text-xs font-bold bg-black text-white px-3.5 py-2 rounded-full hover:bg-gray-800 transition-colors shadow-sm"
                  >
                    <User className="w-3.5 h-3.5" />
                    <span>Sign In</span>
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Desktop Category Navigation */}
          <nav className="hidden md:flex items-center gap-7 mt-3.5 text-sm font-medium text-gray-600 border-t border-gray-100 pt-3 overflow-x-auto">
            <Link href="/products" className="text-black font-bold pb-1 hover:text-black shrink-0">
              All Products
            </Link>
            <Link href="/products/category/women" className="hover:text-black pb-1 shrink-0">
              Women
            </Link>
            <Link href="/products/category/men" className="hover:text-black pb-1 shrink-0">
              Men
            </Link>
            <Link href="/products/category/home%20%26%20living" className="hover:text-black pb-1 shrink-0">
              Home & Living
            </Link>
            <Link href="/products/category/beauty" className="hover:text-black pb-1 shrink-0">
              Beauty
            </Link>
            <Link href="/products/category/electronics" className="hover:text-black pb-1 shrink-0">
              Electronics
            </Link>
            <Link href="/products/category/sports" className="hover:text-black pb-1 shrink-0">
              Sports
            </Link>
            <Link href="/products?tag=discount" className="text-red-500 font-bold hover:text-red-600 pb-1 ml-auto shrink-0 flex items-center gap-1">
              <span>🔥</span> Special Deals
            </Link>
          </nav>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div 
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
          />
          <div className="relative w-4/5 max-w-xs bg-white h-full p-6 flex flex-col overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-bold">
                {settings.storeName || 'Cavrozone'}
              </Link>
              <button onClick={() => setMobileMenuOpen(false)} className="p-1 rounded-full text-gray-500 hover:text-black">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Mobile Search */}
            <form onSubmit={(e) => { handleSearchSubmit(e); setMobileMenuOpen(false); }} className="mb-6">
              <div className="flex items-center bg-gray-100 rounded-full px-3 py-2">
                <Search className="w-4 h-4 text-gray-500 mr-2" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search products..." 
                  className="bg-transparent text-sm w-full outline-none"
                />
              </div>
            </form>

            <div className="space-y-4 flex-1">
              <div className="text-xs font-bold uppercase text-gray-400">Categories</div>
              <div className="flex flex-col space-y-2.5 text-sm font-medium">
                <Link href="/products" onClick={() => setMobileMenuOpen(false)} className="hover:text-black">All Products</Link>
                <Link href="/products/category/women" onClick={() => setMobileMenuOpen(false)} className="hover:text-black">Women's Fashion</Link>
                <Link href="/products/category/men" onClick={() => setMobileMenuOpen(false)} className="hover:text-black">Men's Fashion</Link>
                <Link href="/products/category/home%20%26%20living" onClick={() => setMobileMenuOpen(false)} className="hover:text-black">Home & Living</Link>
                <Link href="/products/category/beauty" onClick={() => setMobileMenuOpen(false)} className="hover:text-black">Beauty & Care</Link>
                <Link href="/products/category/electronics" onClick={() => setMobileMenuOpen(false)} className="hover:text-black">Electronics</Link>
                <Link href="/products/category/sports" onClick={() => setMobileMenuOpen(false)} className="hover:text-black">Sports & Fitness</Link>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <div className="text-xs font-bold uppercase text-gray-400 mb-2.5">Quick Links</div>
                <div className="flex flex-col space-y-2.5 text-sm font-medium">
                  <Link href="/wishlist" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-between">
                    <span>Wishlist</span>
                    <span className="bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded-full font-bold">{wishlistCount}</span>
                  </Link>
                  <Link href="/account" onClick={() => setMobileMenuOpen(false)}>My Account</Link>
                  <Link href="/help" onClick={() => setMobileMenuOpen(false)}>Help & Support</Link>
                </div>
              </div>
            </div>

            {user ? (
              <div className="pt-4 border-t border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <div className="font-bold text-sm">{user.name}</div>
                    <div className="text-xs text-gray-500">{user.email}</div>
                  </div>
                </div>
                <button 
                  onClick={() => { logout(); setMobileMenuOpen(false); }}
                  className="w-full text-center py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-bold text-red-600"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="pt-4 border-t border-gray-100 flex gap-2">
                <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="flex-1 py-2 text-center border border-gray-200 rounded-lg font-bold text-sm">
                  Sign In
                </Link>
                <Link href="/signup" onClick={() => setMobileMenuOpen(false)} className="flex-1 py-2 text-center bg-black text-white rounded-lg font-bold text-sm">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Cart Drawer Component */}
      <CartDrawer />
    </>
  );
}
