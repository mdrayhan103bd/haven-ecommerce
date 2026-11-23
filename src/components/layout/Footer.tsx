'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useStore } from '@/context/StoreContext';
import { Mail, Phone, MapPin, ArrowRight, ShieldCheck, Truck, RotateCcw, Heart } from 'lucide-react';

export default function Footer() {
  const { settings, showToast } = useStore();
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    showToast('Thank you for subscribing to the Cavrozone newsletter!');
    setEmail('');
  };

  return (
    <footer className="bg-[#1c1a19] text-white font-sans border-t border-gray-800 mt-auto">
      {/* Value Badges Banner */}
      <div className="border-b border-white/10 py-8">
        <div className="container mx-auto px-4 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs text-gray-300">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-white text-sm">Free Express Shipping</div>
              <div className="text-gray-400">On all orders over ৳{settings.freeShippingThreshold.toLocaleString()}</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-white text-sm">30-Day Free Returns</div>
              <div className="text-gray-400">Hassle-free refunds & exchanges</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-white text-sm">100% Secure Checkout</div>
              <div className="text-gray-400">256-bit encrypted data protection</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-white text-sm">Dedicated Support</div>
              <div className="text-gray-400">Mon-Fri: 9am - 6pm EST</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="container mx-auto px-4 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="text-3xl font-serif font-bold text-white tracking-tight">
              {settings.storeName || 'Cavrozone'}
            </Link>
            <p className="text-xs text-gray-400 max-w-sm leading-relaxed">
              Curated everyday essentials for modern living. Designed with uncompromising standards for quality, sustainability, and elegance.
            </p>
            <div className="text-xs text-gray-400 space-y-1 pt-2">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-gray-500" />
                <a href={`mailto:${settings.contactEmail}`} className="hover:text-white transition-colors">
                  {settings.contactEmail}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-gray-500" />
                <a href={`tel:${settings.contactPhone}`} className="hover:text-white transition-colors">
                  {settings.contactPhone}
                </a>
              </div>
            </div>
          </div>

          {/* Shop Column */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-white mb-4">Shop Collections</h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li><Link href="/products" className="hover:text-white transition-colors">All Products</Link></li>
              <li><Link href="/products/category/men" className="hover:text-white transition-colors">Men's Apparel</Link></li>
              <li><Link href="/products/category/women" className="hover:text-white transition-colors">Women's Fashion</Link></li>
              <li><Link href="/products/category/electronics" className="hover:text-white transition-colors">Electronics & Audio</Link></li>
              <li><Link href="/products/category/home%20%26%20living" className="hover:text-white transition-colors">Home & Living</Link></li>
              <li><Link href="/products/category/beauty" className="hover:text-white transition-colors">Beauty & Personal Care</Link></li>
            </ul>
          </div>

          {/* Customer Service Column */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-white mb-4">Customer Care</h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li><Link href="/account" className="hover:text-white transition-colors">Order Tracking</Link></li>
              <li><Link href="/help" className="hover:text-white transition-colors">Help Center & FAQ</Link></li>
              <li><Link href="/wishlist" className="hover:text-white transition-colors">My Wishlist</Link></li>
              <li><Link href="/help" className="hover:text-white transition-colors">Shipping & Returns</Link></li>
              <li><Link href="/help" className="hover:text-white transition-colors">Contact Support</Link></li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-white mb-4">Stay Connected</h4>
            <p className="text-xs text-gray-400 mb-3">
              Subscribe to get exclusive early drops and 10% off your first purchase.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <input 
                type="email" 
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full bg-white/10 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-500 outline-none focus:border-white transition-colors"
              />
              <button 
                type="submit" 
                className="w-full bg-white text-black py-2.5 rounded-xl text-xs font-bold hover:bg-gray-200 transition-colors flex items-center justify-center gap-1.5"
              >
                Subscribe <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div>
            © {new Date().getFullYear()} {settings.storeName || 'Cavrozone'} Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-gray-400">
            <span>cavrozone.com</span>
            <span>•</span>
            <Link href="/help" className="hover:text-white">Privacy Policy</Link>
            <span>•</span>
            <Link href="/help" className="hover:text-white">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
