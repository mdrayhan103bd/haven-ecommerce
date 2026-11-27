'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useStore } from '@/context/StoreContext';
import ProductCard from '@/components/ui/ProductCard';
import { Filter, Search, SlidersHorizontal, LayoutGrid, Grid, Check, RotateCcw } from 'lucide-react';

function ProductsContent() {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  const initialCategory = searchParams.get('category') || 'All';

  const { products } = useStore();

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState('featured');
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [priceRange, setPriceRange] = useState<'all' | 'under2k' | '2k-5k' | '5k-15k' | 'above15k'>('all');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [gridCols, setGridCols] = useState<3 | 4>(4);

  const categories = ['All', 'Men', 'Women', 'Electronics', 'Home & Living', 'Beauty', 'Sports'];

  const filteredProducts = useMemo(() => {
    return products
      .filter(p => {
        // Category filter
        const matchesCategory = selectedCategory === 'All' || p.category.toLowerCase() === selectedCategory.toLowerCase();
        
        // Search filter
        const matchesSearch = !searchTerm || 
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
          p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.category.toLowerCase().includes(searchTerm.toLowerCase());

        // Price range filter
        let matchesPrice = true;
        if (priceRange === 'under2k') matchesPrice = p.price < 2000;
        else if (priceRange === '2k-5k') matchesPrice = p.price >= 2000 && p.price <= 5000;
        else if (priceRange === '5k-15k') matchesPrice = p.price > 5000 && p.price <= 15000;
        else if (priceRange === 'above15k') matchesPrice = p.price > 15000;

        // In-stock filter
        const matchesStock = !inStockOnly || p.stock > 0;

        return matchesCategory && matchesSearch && matchesPrice && matchesStock;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
        return 0; // featured
      });
  }, [products, selectedCategory, searchTerm, priceRange, inStockOnly, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('All');
    setSearchTerm('');
    setPriceRange('all');
    setInStockOnly(false);
    setSortBy('featured');
  };

  const hasActiveFilters = selectedCategory !== 'All' || searchTerm !== '' || priceRange !== 'all' || inStockOnly;

  return (
    <div className="container mx-auto px-4 lg:px-8 py-8 sm:py-12 font-sans min-h-[75vh]">
      {/* Title & Controls Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
            Storefront Catalog
          </span>
          <h1 className="text-2xl sm:text-4xl font-serif font-bold text-gray-900 mt-1 mb-1">
            {searchTerm ? `Results for "${searchTerm}"` : selectedCategory === 'All' ? 'All Products' : `${selectedCategory} Collection`}
          </h1>
          <p className="text-gray-500 text-xs sm:text-sm">
            Showing <span className="font-bold text-black">{filteredProducts.length}</span> items • Free Cash on Delivery Nationwide
          </p>
        </div>

        {/* Search & Sort Controls */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Quick Search */}
          <div className="relative flex-1 md:w-64">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search in catalog..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-8 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-full outline-none focus:border-black focus:bg-white transition-all"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-black"
              >
                ✕
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-200 rounded-full px-4 py-2.5 outline-none focus:border-black text-xs font-bold cursor-pointer bg-white shadow-xs"
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Customer Rated</option>
            </select>
          </div>

          {/* Layout Switcher (Desktop) */}
          <div className="hidden lg:flex items-center bg-gray-100 p-1 rounded-full border border-gray-200">
            <button
              onClick={() => setGridCols(3)}
              className={`p-1.5 rounded-full transition-all ${gridCols === 3 ? 'bg-white shadow-xs text-black' : 'text-gray-400 hover:text-gray-700'}`}
              title="3 Columns View"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setGridCols(4)}
              className={`p-1.5 rounded-full transition-all ${gridCols === 4 ? 'bg-white shadow-xs text-black' : 'text-gray-400 hover:text-gray-700'}`}
              title="4 Columns View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-4 text-xs font-bold no-scrollbar">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition-all duration-200 ${
              selectedCategory.toLowerCase() === cat.toLowerCase()
                ? 'bg-black text-white shadow-sm scale-102'
                : 'bg-gray-100/80 text-gray-600 hover:bg-gray-200 hover:text-black'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Secondary Filter Chips: Price Range & Stock Status */}
      <div className="flex flex-wrap items-center gap-2 mb-8 pt-1">
        <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mr-1 flex items-center gap-1">
          <Filter className="w-3 h-3" /> Filter By:
        </span>

        {/* Price Pills */}
        <button
          onClick={() => setPriceRange('all')}
          className={`text-[11px] font-semibold px-3 py-1 rounded-full border transition-all ${
            priceRange === 'all' ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
          }`}
        >
          All Prices
        </button>
        <button
          onClick={() => setPriceRange('under2k')}
          className={`text-[11px] font-semibold px-3 py-1 rounded-full border transition-all ${
            priceRange === 'under2k' ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
          }`}
        >
          Under ৳2,000
        </button>
        <button
          onClick={() => setPriceRange('2k-5k')}
          className={`text-[11px] font-semibold px-3 py-1 rounded-full border transition-all ${
            priceRange === '2k-5k' ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
          }`}
        >
          ৳2,000 - ৳5,000
        </button>
        <button
          onClick={() => setPriceRange('5k-15k')}
          className={`text-[11px] font-semibold px-3 py-1 rounded-full border transition-all ${
            priceRange === '5k-15k' ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
          }`}
        >
          ৳5,000 - ৳15,000
        </button>
        <button
          onClick={() => setPriceRange('above15k')}
          className={`text-[11px] font-semibold px-3 py-1 rounded-full border transition-all ${
            priceRange === 'above15k' ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
          }`}
        >
          Above ৳15,000
        </button>

        {/* In-Stock Toggle */}
        <button
          onClick={() => setInStockOnly(!inStockOnly)}
          className={`text-[11px] font-semibold px-3 py-1 rounded-full border flex items-center gap-1.5 transition-all ${
            inStockOnly ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
          }`}
        >
          {inStockOnly && <Check className="w-3 h-3 stroke-[3]" />}
          In Stock Only
        </button>

        {/* Clear Filters Button if any active */}
        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="text-[11px] font-bold text-red-600 hover:text-red-700 hover:underline flex items-center gap-1 ml-auto px-2"
          >
            <RotateCcw className="w-3 h-3" /> Reset Filters
          </button>
        )}
      </div>

      {/* Products Grid - Single product view on mobile */}
      {filteredProducts.length > 0 ? (
        <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ${gridCols === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} gap-4 sm:gap-6`}>
          {filteredProducts.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-200 max-w-md mx-auto p-6">
          <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 text-gray-400">
            <Filter className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">No products match your filters</h3>
          <p className="text-xs text-gray-500 mb-6">
            Try adjusting your search terms or clearing price and category filters.
          </p>
          <button 
            onClick={resetFilters}
            className="bg-black text-white px-6 py-2.5 rounded-full text-xs font-bold hover:bg-gray-800 transition-all shadow-sm"
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
