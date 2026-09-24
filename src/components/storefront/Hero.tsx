import React from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="container mx-auto px-4 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6 font-sans">
      <div className="lg:col-span-2 relative rounded-2xl overflow-hidden bg-[#F6F4EF] aspect-[16/9] lg:aspect-auto lg:min-h-[440px] flex items-center">
        {/* Placeholder image on the right side */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 md:w-3/5 bg-[url('https://images.unsplash.com/photo-1542281286-9e0a16bb7366?auto=format&fit=crop&q=80')] bg-cover bg-center [mask-image:linear-gradient(to_right,transparent,black_20%)]"></div>
        
        <div className="relative z-10 p-8 md:p-12 w-full md:w-2/3">
          <span className="uppercase text-xs tracking-[0.2em] mb-4 font-semibold text-gray-500 block">Live a better everyday</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#2C2927] leading-[1.1] mb-4">
            Essentials<br/>
            <span className="italic">for a</span> Happier You
          </h1>
          <p className="text-gray-600 max-w-sm mb-8 text-sm leading-relaxed">
            Discover thoughtfully curated products that fit your lifestyle, your way.
          </p>
          <div>
            <Link href="/products" className="inline-flex bg-[#2c2a29] text-white px-6 py-3 rounded-full items-center gap-2 hover:bg-black transition-colors font-medium text-sm">
              Shop the Collection <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="mt-12 flex items-center gap-4">
            <div className="flex -space-x-2">
              {[1,2,3,4].map(i => (
                <img key={i} src={`https://ui-avatars.com/api/?name=U${i}&background=random`} className="w-8 h-8 rounded-full border-2 border-[#F6F4EF]" alt="user" />
              ))}
            </div>
            <div className="text-sm">
              <div className="font-bold text-gray-900">50K+ <span className="font-normal text-gray-600">happy customers</span></div>
              <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                <div className="flex text-yellow-400 text-[10px]">★★★★★</div>
                <span className="font-bold text-gray-900">4.9</span> (12k reviews)
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        <div className="bg-[#F8F5F0] rounded-2xl p-6 relative overflow-hidden flex flex-col justify-center min-h-[135px]">
          <div className="relative z-10 w-2/3">
            <h3 className="text-lg font-bold text-gray-900 mb-1">New Arrivals</h3>
            <p className="text-xs text-gray-500 mb-4">Fresh finds, just for you.</p>
            <Link href="/products" className="w-8 h-8 bg-[#2C2927] text-white rounded-full flex items-center justify-center hover:scale-105 transition-transform">
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-[url('https://images.unsplash.com/photo-1543459176-4426b36f23ac?auto=format&fit=crop')] bg-cover bg-center [mask-image:linear-gradient(to_right,transparent,black_40%)]"></div>
        </div>
        
        <div className="bg-[#F2F5F0] rounded-2xl p-6 relative overflow-hidden flex flex-col justify-center min-h-[135px]">
          <div className="relative z-10 w-2/3">
            <h3 className="text-lg font-bold text-gray-900 mb-1">Up to 50% Off</h3>
            <p className="text-xs text-gray-500 mb-4">On selected items</p>
            <Link href="/products" className="w-8 h-8 bg-[#2C2927] text-white rounded-full flex items-center justify-center hover:scale-105 transition-transform">
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-[url('https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop')] bg-cover bg-center [mask-image:linear-gradient(to_right,transparent,black_40%)]"></div>
        </div>
        
        <div className="bg-[#F4F6E5] rounded-2xl p-6 relative overflow-hidden flex flex-col justify-center min-h-[135px]">
          <div className="relative z-10 w-2/3">
            <h3 className="text-lg font-bold text-gray-900 mb-1">Sustainable Choices</h3>
            <p className="text-xs text-gray-500 mb-4">Good for you, better for tomorrow.</p>
            <Link href="/products" className="w-8 h-8 bg-[#2C2927] text-white rounded-full flex items-center justify-center hover:scale-105 transition-transform">
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-[url('https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop')] bg-cover bg-center [mask-image:linear-gradient(to_right,transparent,black_40%)]"></div>
        </div>
      </div>
    </section>
  );
}