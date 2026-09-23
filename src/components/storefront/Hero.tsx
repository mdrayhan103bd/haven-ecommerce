import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="container mx-auto px-4 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 relative rounded-2xl overflow-hidden bg-[#e8e4db] aspect-[2/1] lg:aspect-auto min-h-[400px]">
        <img src="https://images.unsplash.com/photo-1517627043994-5c8cb5f9630c?q=80&w=2938&auto=format&fit=crop" alt="Hero" className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-multiply" />
        <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-center">
          <span className="uppercase text-sm tracking-widest mb-4 font-semibold text-gray-700">Live a better everyday</span>
          <h1 className="text-4xl md:text-6xl font-serif text-[#3a3532] leading-tight mb-4">Essentials<br/>for a Happier You</h1>
          <p className="text-gray-700 max-w-sm mb-8">Discover thoughtfully curated products that fit your lifestyle, your way.</p>
          <div>
            <button className="bg-[#2c2a29] text-white px-6 py-3 rounded-full flex items-center gap-2 hover:bg-black transition-colors">
              Shop the Collection <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="mt-auto pt-8 flex items-center gap-4">
            <div className="flex -space-x-2">
              {[1,2,3,4].map(i => (
                <img key={i} src={`https://ui-avatars.com/api/?name=U${i}&background=random`} className="w-8 h-8 rounded-full border-2 border-[#e8e4db]" alt="user" />
              ))}
            </div>
            <div className="text-sm">
              <div className="font-bold">50K+ happy customers</div>
              <div className="text-yellow-600 text-xs">★★★★★ 4.9 (12k reviews)</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <div className="bg-[#f2efe9] rounded-2xl p-6 relative overflow-hidden flex flex-col justify-center min-h-[190px]">
          <div className="relative z-10 w-2/3">
            <h3 className="text-xl font-bold mb-1">New Arrivals</h3>
            <p className="text-sm text-gray-600 mb-4">Fresh finds, just for you.</p>
            <button className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center hover:scale-105 transition-transform">
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <img src="https://images.unsplash.com/photo-1543459176-4426b36f23ac?w=500&auto=format&fit=crop" className="absolute right-0 top-0 bottom-0 w-1/2 object-cover object-left mask-image-gradient" alt="New Arrivals" />
        </div>
        
        <div className="bg-[#e4e9e0] rounded-2xl p-6 relative overflow-hidden flex flex-col justify-center min-h-[190px]">
          <div className="relative z-10 w-2/3">
            <h3 className="text-xl font-bold mb-1">Up to 50% Off</h3>
            <p className="text-sm text-gray-600 mb-4">On selected items</p>
            <button className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center hover:scale-105 transition-transform">
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <img src="https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500&auto=format&fit=crop" className="absolute right-0 top-0 bottom-0 w-1/2 object-cover mask-image-gradient" alt="Headphones" />
        </div>
        
        <div className="bg-[#e9ead8] rounded-2xl p-6 relative overflow-hidden flex flex-col justify-center min-h-[190px]">
          <div className="relative z-10 w-2/3">
            <h3 className="text-xl font-bold mb-1">Sustainable Choices</h3>
            <p className="text-sm text-gray-600 mb-4">Good for you, better for tomorrow.</p>
            <button className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center hover:scale-105 transition-transform">
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <img src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=500&auto=format&fit=crop" className="absolute right-0 top-0 bottom-0 w-1/2 object-cover mask-image-gradient" alt="Plant" />
        </div>
      </div>
    </section>
  );
}