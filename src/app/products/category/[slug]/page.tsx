import React from 'react';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';

// Using mock data. In a real app this would come from a database.
const allProducts = [
  { id: '1', name: 'UrbanEase Sneakers', category: 'Men', price: 79, oldPrice: 99, tag: 'Best Seller', tagColor: 'bg-[#FF6B6B]', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop' },
  { id: '2', name: 'BrewMaster Coffee Machine', category: 'Electronics', price: 129, oldPrice: 199, tag: 'Limited Time', tagColor: 'bg-[#FF9F43]', image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500&auto=format&fit=crop' },
  { id: '3', name: 'Luxe Curve Handbag', category: 'Women', price: 89, oldPrice: 129, tag: 'Trending', tagColor: 'bg-[#FF9F43]', image: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=500&auto=format&fit=crop' },
  { id: '4', name: 'Minimalist Desk Lamp', category: 'Home', price: 45, image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&auto=format&fit=crop' },
  { id: '5', name: 'Ergonomic Office Chair', category: 'Home', price: 299, image: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=500&auto=format&fit=crop' },
  { id: '6', name: 'Noise-Cancelling Headphones', category: 'Electronics', price: 199, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop' },
];

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const decodedSlug = decodeURIComponent(resolvedParams.slug);
  
  // Find products matching this category (case insensitive)
  const categoryProducts = allProducts.filter(p => p.category.toLowerCase() === decodedSlug.toLowerCase());

  return (
    <div className="container mx-auto px-4 lg:px-8 py-12 font-sans min-h-[60vh]">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 capitalize">{decodedSlug}</h1>
        <p className="text-gray-500">Explore our collection of {decodedSlug.toLowerCase()} products.</p>
      </div>

      {categoryProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categoryProducts.map(p => (
            <div key={p.id} className="group flex flex-col">
              <Link href={`/products/${p.id}`} className="relative bg-[#F5F5F5] rounded-2xl aspect-[4/3] mb-4 overflow-hidden flex items-center justify-center">
                <img src={p.image} alt={p.name} className="w-4/5 h-4/5 object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500" />
                {p.tag && <div className={`absolute top-3 left-3 ${p.tagColor} text-white text-[10px] font-bold px-2 py-1 rounded-full`}>{p.tag}</div>}
              </Link>
              <Link href={`/products/${p.id}`} className="font-bold text-gray-900 mb-1.5 hover:underline decoration-2 underline-offset-2">{p.name}</Link>
              <div className="flex items-center gap-2 mb-4">
                <span className="font-bold text-red-500 text-lg">${p.price}</span>
                {p.oldPrice && <span className="text-xs text-gray-400 line-through font-medium">${p.oldPrice}</span>}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-2">No products found</h2>
          <p className="text-gray-500 mb-6">We couldn't find any products in the "{decodedSlug}" category.</p>
          <Link href="/products" className="inline-block bg-black text-white px-6 py-3 rounded-full font-bold hover:bg-gray-800 transition-colors">
            Browse All Products
          </Link>
        </div>
      )}
    </div>
  );
}
