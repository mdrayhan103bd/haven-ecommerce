'use client';

import React, { useState, use } from 'react';
import { useCart } from '@/context/CartContext';
import { Product } from '@/types';
import { ArrowLeft, ShoppingCart, Heart, Share2, Check, Star, ShieldCheck, Truck } from 'lucide-react';
import Link from 'next/link';

// Mock DB
const allProducts: Product[] = [
  { id: '1', name: 'UrbanEase Sneakers', rating: 4.8, reviews: '2.1k', price: 79, oldPrice: 99, tag: 'Best Seller', tagColor: 'bg-[#FF6B6B]', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop', description: 'Step into comfort and style with the UrbanEase Sneakers. Featuring a breathable mesh upper, responsive cushioning, and a durable rubber outsole, these sneakers are designed for your active lifestyle.' },
  { id: '2', name: 'BrewMaster Coffee Machine', rating: 4.7, reviews: '890', price: 129, oldPrice: 199, tag: 'Limited Time', tagColor: 'bg-[#FF9F43]', image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500&auto=format&fit=crop', description: 'Experience barista-quality coffee at home. The BrewMaster features a 15-bar pump, precise temperature control, and a built-in milk frother for the perfect latte or cappuccino every time.' },
  { id: '3', name: 'Luxe Curve Handbag', rating: 4.9, reviews: '1.4k', price: 89, oldPrice: 129, tag: 'Trending', tagColor: 'bg-[#FF9F43]', image: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=500&auto=format&fit=crop', description: 'Elevate your everyday look with the Luxe Curve Handbag. Crafted from premium vegan leather, this versatile bag features a spacious interior, multiple pockets, and elegant gold-tone hardware.' },
  { id: '4', name: 'Minimalist Desk Lamp', rating: 4.6, reviews: '420', price: 45, oldPrice: 65, image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&auto=format&fit=crop', description: 'Illuminate your workspace with this sleek, minimalist desk lamp. It features adjustable brightness levels, color temperature controls, and a flexible neck to direct light exactly where you need it.' },
  { id: '5', name: 'Ergonomic Office Chair', rating: 4.9, reviews: '3.2k', price: 299, tag: 'Top Rated', tagColor: 'bg-green-500', image: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=500&auto=format&fit=crop', description: 'Work comfortably for hours with this ergonomic office chair. Designed with lumbar support, adjustable armrests, and a breathable mesh back, it promotes proper posture and reduces strain.' },
  { id: '6', name: 'Wireless Noise-Cancelling Headphones', rating: 4.8, reviews: '1.1k', price: 199, oldPrice: 249, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop', description: 'Immerse yourself in your favorite music with these premium noise-cancelling headphones. Featuring up to 30 hours of battery life, crystal-clear sound, and plush ear cushions for all-day comfort.' },
];

export default function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const product = allProducts.find(p => p.id === resolvedParams.id) || allProducts[0];

  const handleAdd = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="container mx-auto px-4 lg:px-8 py-12">
      <div className="mb-8">
        <Link href="/products" className="inline-flex items-center text-sm text-gray-500 hover:text-black font-medium">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to products
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
        {/* Images */}
        <div className="bg-[#F5F5F5] rounded-3xl p-12 flex items-center justify-center relative">
          {product.tag && (
            <div className={`absolute top-6 left-6 ${product.tagColor} text-white text-xs font-bold px-3 py-1.5 rounded-full`}>
              {product.tag}
            </div>
          )}
          <img src={product.image} alt={product.name} className="w-full h-auto object-contain mix-blend-multiply drop-shadow-2xl" />
        </div>

        {/* Details */}
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-1 text-yellow-400">
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
            </div>
            <span className="text-sm font-bold text-gray-900">{product.rating}</span>
            <span className="text-sm text-gray-500 underline cursor-pointer">{product.reviews} reviews</span>
          </div>

          <h1 className="text-4xl lg:text-5xl font-serif text-gray-900 mb-4">{product.name}</h1>
          
          <div className="flex items-end gap-3 mb-6">
            <span className="text-3xl font-bold text-red-500">${product.price}</span>
            {product.oldPrice && (
              <span className="text-lg text-gray-400 line-through font-medium mb-1">${product.oldPrice}</span>
            )}
            {product.oldPrice && (
              <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded mb-1 ml-2">
                Save ${product.oldPrice - product.price}
              </span>
            )}
          </div>

          <p className="text-gray-600 leading-relaxed mb-8">
            {product.description}
          </p>

          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center border border-gray-200 rounded-full">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-12 h-12 flex items-center justify-center text-gray-500 hover:text-black hover:bg-gray-50 rounded-l-full">
                -
              </button>
              <span className="w-12 text-center font-bold text-lg">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="w-12 h-12 flex items-center justify-center text-gray-500 hover:text-black hover:bg-gray-50 rounded-r-full">
                +
              </button>
            </div>
            <p className="text-sm text-gray-500">Only <span className="font-bold text-orange-500">12 left</span> in stock!</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button 
              onClick={handleAdd}
              disabled={added}
              className={`flex-1 py-4 rounded-full font-bold flex items-center justify-center gap-2 transition-all ${
                added ? 'bg-green-500 text-white' : 'bg-black text-white hover:bg-gray-800'
              }`}
            >
              {added ? <><Check className="w-5 h-5" /> Added to Cart</> : <><ShoppingCart className="w-5 h-5" /> Add to Cart</>}
            </button>
            <div className="flex gap-4">
              <button className="w-14 h-14 border border-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:text-red-500 hover:border-red-500 transition-colors">
                <Heart className="w-5 h-5" />
              </button>
              <button className="w-14 h-14 border border-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:text-blue-500 hover:border-blue-500 transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-6 space-y-4">
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <Truck className="w-5 h-5 text-gray-400" /> Free worldwide shipping on orders over $50
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <ShieldCheck className="w-5 h-5 text-gray-400" /> 30-day money-back guarantee
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
