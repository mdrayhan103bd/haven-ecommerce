import React from 'react';
import Link from 'next/link';
import { Heart } from 'lucide-react';

export default function WishlistPage() {
  return (
    <div className="container mx-auto px-4 lg:px-8 py-16 font-sans min-h-[60vh] text-center">
      <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
        <Heart className="w-8 h-8" />
      </div>
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Wishlist</h1>
      <p className="text-gray-500 mb-8 max-w-md mx-auto">You haven't saved any items to your wishlist yet. Start shopping and add your favorite items to save them for later.</p>
      <Link href="/products" className="inline-block bg-black text-white px-6 py-3 rounded-full font-bold hover:bg-gray-800 transition-colors">
        Discover Products
      </Link>
    </div>
  );
}
