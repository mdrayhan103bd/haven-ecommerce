'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useStore } from '@/context/StoreContext';
import { useCart } from '@/context/CartContext';
import { Product } from '@/types';
import { Heart, ShoppingCart, Check, Filter, Search, SlidersHorizontal } from 'lucide-react';
import Link from 'next/link';

function ProductsContent() {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  const initialCategory = searchParams.get('category') || 'All';

  const { products, toggleWishlist, isInWishlist } = useStore();
  const { addToCart } = useCart();

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState('featured');
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [added, setAdded] = useState<Record<string, boolean>>({});

  const categories = ['All', 'Men', 'Women', 'Electronics', 'Home & Living', 'Beauty', 'Sports'];

  const filteredProducts = useMemo(() => {
    return products
      .filter(p => {
        const matchesCategory = selectedCategory === 'All' || p.category.toLowerCase() === selectedCategory.toLowerCase();
        const matchesSearch = !searchTerm || 
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
          p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.category.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
        return 0; // featured
      });
  }, [products, selectedCategory, searchTerm, sortBy]);

  const handleAdd = (p: Product) => {
    addToCart(p);
    setAdded({ ...added, [p.id]: true });
    setTimeout(() => setAdded(prev => ({ ...prev, [p.id]: false })), 2000);
  };

  return (
    <div className="container mx-auto px-4 lg:px-8 py-10 font-sans min-h-[70vh]">
      {/* Title & Filter Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-2">
            {searchTerm ? `Search Results for "${searchTerm}"` : selectedCategory === 'All' ? 'All Products' : `${selectedCategory} Collection`}
          </h1>
          <p className="text-gray-500 text-sm">
            Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Quick Search */}
          <div className="relative flex-1 md:w-60">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Filter by name..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs border border-gray-200 rounded-full outline-none focus:border-black"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-gray-400 hidden sm:block" />
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-200 rounded-full px-4 py-2 outline-none focus:border-black text-xs font-medium cursor-pointer bg-white"
            >
              <option value="featured">Sort by: Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 text-xs font-semibold no-scrollbar">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
              selectedCategory.toLowerCase() === cat.toLowerCase()
                ? 'bg-black text-white shadow-sm'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map(p => {
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

                <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                  {p.category}
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
          <Filter className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-gray-900 mb-1">No products found</h3>
          <p className="text-xs text-gray-500 mb-6">Try clearing your filters or search keywords.</p>
          <button 
            onClick={() => { setSelectedCategory('All'); setSearchTerm(''); }}
            className="bg-black text-white px-6 py-2.5 rounded-full text-xs font-bold hover:bg-gray-800"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-20 text-center text-gray-500">Loading products...</div>}>
      <ProductsContent />
    </Suspense>
  );
}
