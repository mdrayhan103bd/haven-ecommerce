'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { ArrowLeft, ArrowRight, ShieldCheck, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '', email: '', address: '', city: '', zip: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API delay
    setTimeout(() => {
      // Mock save to local storage
      const orders = JSON.parse(localStorage.getItem('haven_orders') || '[]');
      const newOrder = {
        id: Math.random().toString(36).substr(2, 9).toUpperCase(),
        date: new Date().toISOString(),
        items: cart,
        total: cartTotal,
        status: 'Pending',
        shippingDetails: formData
      };
      localStorage.setItem('haven_orders', JSON.stringify([newOrder, ...orders]));
      
      clearCart();
      router.push('/checkout/success');
    }, 1500);
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 flex flex-col items-center text-center">
        <ShoppingBag className="w-20 h-20 text-gray-200 mb-6" />
        <h1 className="text-3xl font-serif mb-4">Your Cart is Empty</h1>
        <p className="text-gray-500 mb-8 max-w-md">Looks like you haven't added any products to your cart yet.</p>
        <Link href="/products" className="bg-black text-white px-8 py-3 rounded-full font-bold hover:bg-gray-800 transition-colors">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 lg:px-8 py-12">
      <div className="mb-8">
        <Link href="/" className="inline-flex items-center text-sm text-gray-500 hover:text-black font-medium">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to store
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        <div className="flex-1">
          <h1 className="text-3xl font-serif mb-8">Checkout</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h2 className="text-xl font-bold mb-4">Contact Information</h2>
              <div className="space-y-4">
                <input required type="email" placeholder="Email address" className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-black" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4 mt-8">Shipping Address</h2>
              <div className="space-y-4">
                <input required type="text" placeholder="Full name" className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-black" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                <input required type="text" placeholder="Street address" className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-black" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
                <div className="grid grid-cols-2 gap-4">
                  <input required type="text" placeholder="City" className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-black" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} />
                  <input required type="text" placeholder="ZIP / Postal code" className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-black" value={formData.zip} onChange={e => setFormData({...formData, zip: e.target.value})} />
                </div>
              </div>
            </div>

            <button disabled={isSubmitting} type="submit" className="w-full bg-black text-white py-4 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors disabled:opacity-50 mt-8">
              {isSubmitting ? 'Processing...' : 'Place Order'} <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        <div className="w-full lg:w-[450px]">
          <div className="bg-[#fcfcfc] border border-gray-100 rounded-3xl p-8 sticky top-32">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
            <div className="space-y-4 mb-6">
              {cart.map((item) => (
                <div key={item.product.id} className="flex items-center gap-4">
                  <div className="relative">
                    <img src={item.product.image} className="w-16 h-16 rounded-lg object-cover bg-gray-50 border border-gray-100" />
                    <span className="absolute -top-2 -right-2 bg-gray-900 text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold">{item.product.name}</h4>
                    <p className="text-xs text-gray-500">${item.product.price} each</p>
                  </div>
                  <div className="font-bold text-sm">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-4 space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-medium">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Shipping</span>
                <span className="font-medium text-green-600">Free</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Taxes</span>
                <span className="font-medium">$0.00</span>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
              <span className="text-lg font-bold">Total</span>
              <span className="text-2xl font-bold">${cartTotal.toFixed(2)}</span>
            </div>

            <div className="mt-8 flex items-center justify-center gap-2 text-xs text-gray-500">
              <ShieldCheck className="w-4 h-4 text-green-500" /> Secure checkout powered by Stripe
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
