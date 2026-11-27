'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useStore } from '@/context/StoreContext';
import { Mail, Phone, MapPin, ArrowRight, ShieldCheck, Truck, RotateCcw, Heart, CheckCircle2 } from 'lucide-react';
import OrderTrackingModal from '@/components/storefront/OrderTrackingModal';

export default function Footer() {
  const { settings, showToast } = useStore();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setIsSubscribed(true);
    showToast('Congratulations! Use promo code WELCOME10 for 10% OFF your first order!');
    setEmail('');
  };

  return (
    <>
      <footer className="bg-[#181615] text-white font-sans border-t border-gray-800 mt-auto">
        {/* Value Badges Banner */}
        <div className="border-b border-white/10 py-8">
          <div className="container mx-auto px-4 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs text-gray-300">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white shrink-0 border border-white/5">
                <Truck className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <div className="font-bold text-white text-sm">Free Express Shipping</div>
                <div className="text-gray-400">On all orders over ৳{settings.freeShippingThreshold.toLocaleString()}</div>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white shrink-0 border border-white/5">
                <RotateCcw className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <div className="font-bold text-white text-sm">7-Day Easy Returns</div>
                <div className="text-gray-400">Hassle-free replacement across BD</div>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white shrink-0 border border-white/5">
                <ShieldCheck className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <div className="font-bold text-white text-sm">100% Cash on Delivery</div>
                <div className="text-gray-400">Pay after inspecting your parcel</div>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white shrink-0 border border-white/5">
                <Phone className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <div className="font-bold text-white text-sm">Direct Customer Care</div>
                <div className="text-gray-400">Sat-Thu: 9am - 10pm (BST)</div>
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
                Bangladesh's premier online lifestyle destination. Curated everyday essentials designed with uncompromising standards for quality, durability, and convenience.
              </p>
              <div className="text-xs text-gray-400 space-y-2 pt-2">
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-gray-400" />
                  <a href={`mailto:${settings.contactEmail}`} className="hover:text-white transition-colors">
                    {settings.contactEmail}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-gray-400" />
                  <a href={`tel:${settings.contactPhone}`} className="hover:text-white transition-colors">
                    {settings.contactPhone}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-gray-400" />
                  <span>Dhaka, Bangladesh</span>
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
                <li>
                  <button 
                    onClick={() => setIsTrackingOpen(true)}
                    className="hover:text-white transition-colors text-left font-bold text-emerald-400 flex items-center gap-1.5"
                  >
                    <span>⚡ Live Order Tracking</span>
                  </button>
                </li>
                <li><Link href="/help" className="hover:text-white transition-colors">Help Center & FAQ</Link></li>
                <li><Link href="/wishlist" className="hover:text-white transition-colors">My Wishlist</Link></li>
                <li><Link href="/help" className="hover:text-white transition-colors">Cash on Delivery Info</Link></li>
                <li><Link href="/help" className="hover:text-white transition-colors">Returns & Refunds</Link></li>
                <li><Link href="/account" className="hover:text-white transition-colors">My Account</Link></li>
              </ul>
            </div>

            {/* Newsletter Column */}
            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-white mb-4">Join Cavrozone VIP</h4>
              <p className="text-xs text-gray-400 mb-3">
                Subscribe to get 10% OFF coupon code on your first Cash on Delivery purchase.
              </p>

              {isSubscribed ? (
                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-3 text-xs text-emerald-300">
                  <div className="font-bold flex items-center gap-1.5 mb-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> You're on the list!
                  </div>
                  <div>Use promo code: <strong className="text-white bg-black/40 px-1.5 py-0.5 rounded">WELCOME10</strong></div>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full bg-white/10 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-400 outline-none focus:border-white transition-colors"
                  />
                  <button 
                    type="submit" 
                    className="w-full bg-white text-black py-2.5 rounded-xl text-xs font-bold hover:bg-gray-100 transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    Get 10% OFF Voucher <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Payment Methods Badges Strip */}
          <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-gray-400 mr-2 text-[11px] font-bold uppercase tracking-wider">
                Accepted Payment Methods:
              </span>
              <span className="bg-emerald-950/80 text-emerald-300 border border-emerald-700/50 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5" /> Cash on Delivery (COD)
              </span>
              <span className="bg-white/5 border border-white/10 text-gray-300 px-3 py-1 rounded-full text-xs font-semibold">
                bKash
              </span>
              <span className="bg-white/5 border border-white/10 text-gray-300 px-3 py-1 rounded-full text-xs font-semibold">
                Nagad
              </span>
              <span className="bg-white/5 border border-white/10 text-gray-300 px-3 py-1 rounded-full text-xs font-semibold">
                Rocket
              </span>
              <span className="bg-white/5 border border-white/10 text-gray-300 px-3 py-1 rounded-full text-xs font-semibold">
                Visa / MasterCard
              </span>
            </div>

            <div className="text-[11px] text-gray-400 flex items-center gap-1">
              <span>Crafted with</span>
              <Heart className="w-3.5 h-3.5 text-red-500 fill-current inline" />
              <span>for Bangladesh</span>
            </div>
          </div>

          {/* Bottom Credits & Copyright */}
          <div className="border-t border-white/10 mt-6 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
            <div>
              © {new Date().getFullYear()} {settings.storeName || 'Cavrozone'} Inc. All rights reserved.
            </div>
            <div className="flex items-center gap-4 text-gray-400">
              <span className="text-gray-300 font-bold">www.cavrozone.com</span>
              <span>•</span>
              <Link href="/help" className="hover:text-white">Privacy Policy</Link>
              <span>•</span>
              <Link href="/help" className="hover:text-white">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Live Order Tracking Modal */}
      <OrderTrackingModal
        isOpen={isTrackingOpen}
        onClose={() => setIsTrackingOpen(false)}
      />
    </>
  );
}
