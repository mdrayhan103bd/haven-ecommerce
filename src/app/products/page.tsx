'use client';

import React from 'react';
import { Product } from '@/types';
import { Heart, ShoppingCart, Check } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';

const allProducts: Product[] = [
  { id: '1', name: 'UrbanEase Sneakers', rating: 4.8, reviews: '2.1k', price: 79, oldPrice: 99, tag: 'Best Seller', tagColor: 'bg-[#FF6B6B]', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop' },
  { id: '2', name: 'BrewMaster Coffee Machine', rating: 4.7, reviews: '890', price: 129, oldPrice: 199, tag: 'Limited Time', tagColor: 'bg-[#FF9F43]', image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500&auto=format&fit=crop' },
  { id: '3', name: 'Luxe Curve Handbag', rating: 4.9, reviews: '1.4k', price: 89, oldPrice: 129, tag: 'Trending', tagColor: 'bg-[#FF9F43]', image: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=500&auto=format&fit=crop' },
  { id: '4', name: 'Minimalist Desk Lamp', rating: 4.6, reviews: '420', price: 45, oldPrice: 65, image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&auto=format&fit=crop' },
  { id: '5', name: 'Ergonomic Office Chair', rating: 4.9, reviews: '3.2k', price: 299, tag: 'Top Rated', tagColor: 'bg-green-500', image: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=500&auto=format&fit=crop' },
  { id: '6', name: 'Wireless Noise-Cancelling Headphones', rating: 4.8, reviews: '1.1k', price: 199, oldPrice: 249, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop' },
];

export default function ProductsPage() {
  const { addToCart } = useCart();
  const [added, setAdded] = React.useState<Record<string, boolean>>({});

  const handleAdd = (p: Product) => {
    addToCart(p);
    setAdded({ ...added, [p.id]: true });
    setTimeout(() => setAdded(prev => ({ ...prev, [p.id]: false })), 2000);
  };

  return (
    <div className="container mx-auto px-4 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-end mb-8">
        <div>
          <h1 className="text-4xl font-serif mb-2">All Products</h1>
          <p className="text-gray-500">Showing {allProducts.length} results</p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-4">
          <select className="border border-gray-200 rounded-full px-4 py-2 outline-none focus:border-black text-sm cursor-pointer">
            <option>Sort by: Featured</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Newest Arrivals</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {allProducts.map(p => (
          <div key={p.id} className="group flex flex-col">
            <Link href={`/products/${p.id}`} className="relative bg-[#F5F5F5] rounded-2xl aspect-[4/3] mb-4 overflow-hidden flex items-center justify-center cursor-pointer">
              <img src={p.image} alt={p.name} className="w-4/5 h-4/5 object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500" />
              {p.tag && (
                <div className={`absolute top-3 left-3 ${p.tagColor} text-white text-[10px] font-bold px-2 py-1 rounded-full`}>{p.tag}</div>
              )}
            </Link>
            
            <Link href={`/products/${p.id}`} className="font-bold text-gray-900 mb-1.5 hover:underline decoration-2 underline-offset-2">{p.name}</Link>
            
            <div className="flex items-center gap-1 mb-2">
              <div className="flex text-yellow-400 text-[10px]">★★★★★</div>
              <span className="text-xs font-bold text-gray-900">{p.rating}</span>
              <span className="text-xs text-gray-500">({p.reviews})</span>
            </div>
            
            <div className="flex items-center gap-2 mb-4">
              <span className="font-bold text-red-500 text-lg">${p.price}</span>
              {p.oldPrice && <span className="text-xs text-gray-400 line-through font-medium">${p.oldPrice}</span>}
            </div>
            
            <div className="mt-auto pt-2">
              <button 
                onClick={(e) => { e.preventDefault(); handleAdd(p); }}
                disabled={added[p.id]}
                className={`w-full border-2 rounded-full py-2.5 flex items-center justify-center gap-2 text-sm font-bold transition-all ${
                  added[p.id] 
                    ? 'bg-green-500 border-green-500 text-white' 
                    : 'border-gray-100 text-gray-900 hover:border-black hover:bg-black hover:text-white'
                }`}
              >
                {added[p.id] ? <><Check className="w-4 h-4" /> Added</> : <><ShoppingCart className="w-4 h-4" /> Add to Cart</>}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
