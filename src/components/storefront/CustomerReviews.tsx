'use client';

import React from 'react';
import { Star, ShieldCheck, CheckCircle2, Truck, RefreshCw, ThumbsUp, HeartHandshake } from 'lucide-react';

interface Review {
  id: string;
  name: string;
  location: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
  productName: string;
  productImage: string;
}

export default function CustomerReviews() {
  const reviews: Review[] = [
    {
      id: 'rev-1',
      name: 'Tanvir Hossain',
      location: 'Dhanmondi, Dhaka',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop',
      rating: 5,
      date: '2 days ago',
      comment: 'Cash on delivery was super smooth. The UrbanEase sneakers fit perfectly and the build quality feels truly premium. Received delivery in Dhaka within 24 hours!',
      productName: 'UrbanEase Minimalist Sneakers',
      productImage: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=120&auto=format&fit=crop'
    },
    {
      id: 'rev-2',
      name: 'Nusrat Jahan',
      location: 'Uttara, Dhaka',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop',
      rating: 5,
      date: '5 days ago',
      comment: 'The Luxe Curve Leather Handbag is gorgeous! Exact same color and leather texture as shown on the website. Packaging was top-notch with protective dust bag.',
      productName: 'Luxe Curve Leather Handbag',
      productImage: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=120&auto=format&fit=crop'
    },
    {
      id: 'rev-3',
      name: 'Rafiqul Islam',
      location: 'Nasirabad, Chittagong',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop',
      rating: 5,
      date: '1 week ago',
      comment: 'BrewMaster Espresso Machine exceeded all expectations. Crema is thick and rich like a cafe. Payment after opening and inspecting the box made it 100% stress-free.',
      productName: 'BrewMaster Precision Espresso Machine',
      productImage: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=120&auto=format&fit=crop'
    }
  ];

  return (
    <section className="container mx-auto px-4 lg:px-8 mb-20 font-sans">
      {/* Trust Stats Bar */}
      <div className="bg-[#1C1A19] text-white rounded-3xl p-6 sm:p-8 mb-12 shadow-xl border border-gray-800">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-gray-800">
          <div className="pt-4 md:pt-0">
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400">4.9 / 5</div>
            <div className="text-xs text-gray-400 mt-1 flex items-center justify-center gap-1">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> Over 12,000+ Reviews
            </div>
          </div>
          <div className="pt-4 md:pt-0">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">100% COD</div>
            <div className="text-xs text-gray-400 mt-1 flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Cash on Delivery Nationwide
            </div>
          </div>
          <div className="pt-4 md:pt-0">
            <div className="text-2xl sm:text-3xl font-extrabold text-blue-400">24-48 Hours</div>
            <div className="text-xs text-gray-400 mt-1 flex items-center justify-center gap-1">
              <Truck className="w-3.5 h-3.5 text-blue-400" /> Express Delivery in BD
            </div>
          </div>
          <div className="pt-4 md:pt-0">
            <div className="text-2xl sm:text-3xl font-extrabold text-purple-400">7-Day Return</div>
            <div className="text-xs text-gray-400 mt-1 flex items-center justify-center gap-1">
              <RefreshCw className="w-3.5 h-3.5 text-purple-400" /> Hassle-Free Replacement
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Header */}
      <div className="text-center max-w-xl mx-auto mb-10">
        <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
          Real Stories
        </span>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 tracking-tight mt-1">
          Loved by Shoppers Across Bangladesh
        </h2>
        <p className="text-gray-500 text-xs sm:text-sm mt-1">
          See what our verified buyers have to say about their experience with Cavrozone.
        </p>
      </div>

      {/* Review Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map(rev => (
          <div
            key={rev.id}
            className="flex flex-col justify-between bg-white rounded-3xl border border-gray-100 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div>
              {/* Reviewer Details */}
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-gray-100"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-sm text-gray-900">{rev.name}</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 fill-emerald-50" />
                  </div>
                  <div className="text-[11px] text-gray-400">{rev.location}</div>
                </div>
              </div>

              {/* Star Rating & Date */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex text-amber-400 text-sm">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-[11px] text-gray-400">{rev.date}</span>
              </div>

              {/* Comment */}
              <p className="text-xs text-gray-700 leading-relaxed italic mb-5">
                "{rev.comment}"
              </p>
            </div>

            {/* Product Purchased Tag */}
            <div className="flex items-center gap-3 pt-4 border-t border-gray-100 bg-gray-50/60 -mx-6 -mb-6 p-4 rounded-b-3xl">
              <img
                src={rev.productImage}
                alt=""
                className="w-10 h-10 object-contain rounded-lg bg-white p-1 border border-gray-100"
              />
              <div className="min-w-0 flex-1">
                <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider block">
                  Purchased
                </span>
                <span className="text-xs font-bold text-gray-900 truncate block">
                  {rev.productName}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
