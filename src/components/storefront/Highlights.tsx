import React from 'react';
import { Heart, ShoppingCart, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const products = [
  { id: 1, name: 'UrbanEase Sneakers', rating: 4.8, reviews: '2.1k', price: 79, oldPrice: 99, tag: 'Best Seller', tagColor: 'bg-[#FF6B6B]', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop' },
  { id: 2, name: 'BrewMaster Coffee Machine', rating: 4.7, reviews: '890', price: 129, oldPrice: 199, tag: 'Limited Time', tagColor: 'bg-[#FF9F43]', img: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500&auto=format&fit=crop' },
  { id: 3, name: 'Luxe Curve Handbag', rating: 4.9, reviews: '1.4k', price: 89, oldPrice: 129, tag: 'Trending', tagColor: 'bg-[#FF9F43]', img: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=500&auto=format&fit=crop' },
];

export default function Highlights() {
  return (
    <section className="container mx-auto px-4 lg:px-8 mb-12 font-sans">
      <div className="flex items-end justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Today's Highlights</h2>
          <p className="text-gray-500 text-sm">Handpicked just for you</p>
        </div>
        <div className="flex gap-2">
          <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 text-gray-600"><ChevronLeft className="w-4 h-4" /></button>
          <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 text-gray-900"><ChevronRight className="w-4 h-4" /></button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map(p => (
          <div key={p.id} className="group">
            <div className="relative bg-[#F5F5F5] rounded-2xl aspect-[4/3] mb-4 overflow-hidden flex items-center justify-center">
              <img src={p.img} alt={p.name} className="w-4/5 h-4/5 object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500" />
              <div className={`absolute top-3 left-3 ${p.tagColor} text-white text-[10px] font-bold px-2 py-1 rounded-full`}>{p.tag}</div>
              <button className="absolute top-3 right-3 w-8 h-8 bg-white/80 backdrop-blur rounded-full flex items-center justify-center hover:bg-white text-gray-600 hover:text-red-500 transition-colors shadow-sm">
                <Heart className="w-4 h-4 stroke-[1.5]" />
              </button>
            </div>
            <h3 className="font-bold text-gray-900 mb-1.5">{p.name}</h3>
            <div className="flex items-center gap-1 mb-2">
              <div className="flex text-yellow-400 text-[10px]">★★★★★</div>
              <span className="text-xs font-bold text-gray-900">{p.rating}</span>
              <span className="text-xs text-gray-500">({p.reviews})</span>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <span className="font-bold text-red-500 text-lg">${p.price}</span>
              <span className="text-xs text-gray-400 line-through font-medium">${p.oldPrice}</span>
            </div>
            <button className="w-full border-2 border-gray-100 rounded-full py-2.5 flex items-center justify-center gap-2 text-sm font-bold text-gray-900 hover:border-black hover:bg-black hover:text-white transition-colors">
              <ShoppingCart className="w-4 h-4" /> Add to Cart
            </button>
          </div>
        ))}
        
        <div className="bg-[#BCA38F] rounded-2xl p-8 relative overflow-hidden flex flex-col justify-center text-white min-h-[300px]">
          <div className="absolute inset-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop')] bg-cover bg-center mix-blend-multiply opacity-50"></div>
          <div className="relative z-10 pl-2">
            <h3 className="text-[2rem] font-serif leading-[1.1] mb-2 tracking-wide text-white">Make Your<br/>Space Yours</h3>
            <p className="text-sm mb-6 opacity-90 tracking-wide">Beautiful living, made simple.</p>
            <button className="bg-white text-gray-900 px-5 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 w-max hover:bg-gray-100 transition-colors">
              Shop Home & Living <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}