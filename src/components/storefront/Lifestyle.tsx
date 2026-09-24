import React from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const lifestyles = [
  { title: 'Work Smarter', img: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=500&auto=format&fit=crop' },
  { title: 'Look Good', img: 'https://images.unsplash.com/photo-1512496015851-a1cfb38ba1fc?w=500&auto=format&fit=crop' },
  { title: 'Stay Active', img: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=500&auto=format&fit=crop' },
  { title: 'Feel Your Best', img: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=500&auto=format&fit=crop' },
  { title: 'Better Living', img: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=500&auto=format&fit=crop' },
  { title: 'On the Go', img: 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=500&auto=format&fit=crop' },
];

export default function Lifestyle() {
  return (
    <section className="container mx-auto px-4 lg:px-8 mb-16">
      <div className="flex items-end justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold mb-1">Shop by Lifestyle</h2>
          <p className="text-gray-500 text-sm">Products for every part of your day</p>
        </div>
        <Link href="/products" className="text-sm font-medium flex items-center gap-1 hover:underline">
          View All <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {lifestyles.map((l, i) => (
          <Link href="/products" key={i} className="group relative rounded-2xl overflow-hidden aspect-[4/5] cursor-pointer block">
            <img src={l.img} alt={l.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <h3 className="font-semibold mb-1">{l.title}</h3>
              <div className="text-xs flex items-center gap-1 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
                Shop Now <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}