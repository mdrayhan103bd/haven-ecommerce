'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import ProductCard from '@/components/ui/ProductCard';

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const decodedSlug = decodeURIComponent(resolvedParams.slug).toLowerCase();
  
  const { products } = useStore();

  // Match category with slug (handles "home & living", "home", etc.)
  const categoryProducts = products.filter(p => {
    const cat = p.category.toLowerCase();
    if (decodedSlug === 'home & living' || decodedSlug === 'home') {
      return cat.includes('home') || cat.includes('living');
    }
    return cat === decodedSlug || cat.includes(decodedSlug);
  });

  return (
    <div className="container mx-auto px-4 lg:px-8 py-10 font-sans min-h-[70vh]">
      {/* Back Link & Title */}
      <div className="mb-8">
        <Link 
          href="/products" 
          className="inline-flex items-center text-xs font-bold text-gray-500 hover:text-black mb-3"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to all products
        </Link>
        <h1 className="text-3xl lg:text-4xl font-serif font-bold text-gray-900 capitalize mb-1">
          {decodedSlug} Collection
        </h1>
        <p className="text-gray-500 text-xs sm:text-sm">
          Discover our curated selection of {decodedSlug} essentials ({categoryProducts.length} items) • Cash on Delivery across Bangladesh
        </p>
      </div>

      {categoryProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-6">
          {categoryProducts.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-200 max-w-md mx-auto p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-1">No products found</h3>
          <p className="text-xs text-gray-500 mb-6">
            We couldn't find items in the "{decodedSlug}" category right now.
          </p>
          <Link 
            href="/products" 
            className="inline-block bg-black text-white px-6 py-2.5 rounded-full text-xs font-bold hover:bg-gray-800 transition-all shadow-sm"
          >
            Browse All Products
          </Link>
        </div>
      )}
    </div>
  );
}
