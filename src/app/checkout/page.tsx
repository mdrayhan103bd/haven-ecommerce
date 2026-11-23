'use client';

import React, { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { useStore } from '@/context/StoreContext';
import { 
  ArrowLeft, 
  ArrowRight, 
  ShieldCheck, 
  ShoppingBag, 
  CreditCard, 
  Truck, 
  CheckCircle, 
  Tag, 
  DollarSign 
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const { createOrder, applyDiscountCode, settings, user, addresses, showToast } = useStore();
  const router = useRouter();

  // Shipping Form State
  const defaultAddr = addresses.find(a => a.isDefault) || addresses[0];
  const [formData, setFormData] = useState({
    name: user?.name || defaultAddr?.name || '',
    email: user?.email || '',
    phone: user?.phone || defaultAddr?.phone || '',
    address: defaultAddr?.street || '',
    city: defaultAddr?.city || '',
    zip: defaultAddr?.zip || '',
    country: defaultAddr?.country || 'United States'
  });

  // Payment Method - Cash on Delivery active, others temporarily disabled
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'card' | 'bkash'>('cod');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    holder: user?.name || '',
    expiry: '',
    cvv: ''
  });

  // Promo Code State
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; amount: number } | null>(null);
  const [couponError, setCouponError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Auto pre-fill if user loads after mount
  useEffect(() => {
    if (user && !formData.name) {
      setFormData(prev => ({
        ...prev,
        name: user.name,
        email: user.email,
        phone: user.phone || prev.phone
      }));
    }
  }, [user]);

  // Calculations
  const shippingFee = cartTotal >= settings.freeShippingThreshold ? 0 : settings.shippingFee;
  const discountAmount = appliedCoupon ? appliedCoupon.amount : 0;
  const taxAmount = (cartTotal * settings.taxRate) / 100;
  const finalTotal = Math.max(0, cartTotal - discountAmount + shippingFee + taxAmount);

  // Apply Coupon
  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    if (!couponCode.trim()) return;

    const res = applyDiscountCode(couponCode, cartTotal);
    if (res.valid) {
      setAppliedCoupon({ code: couponCode.toUpperCase().trim(), amount: res.discountAmount });
      showToast(res.message);
    } else {
      setCouponError(res.message);
      showToast(res.message, 'error');
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
  };

  // Place Order
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const order = createOrder({
        items: cart,
        subtotal: cartTotal,
        discount: discountAmount,
        shippingFee: shippingFee,
        total: finalTotal,
        status: 'Processing',
        paymentMethod: paymentMethod === 'card' 
          ? 'Credit Card' 
          : paymentMethod === 'cod' 
          ? 'Cash on Delivery' 
          : 'Mobile Banking (bKash/Nagad)',
        shippingDetails: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          zip: formData.zip,
          country: formData.country
        }
      });

      clearCart();
      setIsSubmitting(false);
      router.push(`/checkout/success?orderId=${order.id}`);
    }, 1200);
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 flex flex-col items-center text-center font-sans">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-400">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-serif font-bold mb-2">Your Bag is Empty</h1>
        <p className="text-gray-500 text-sm mb-6 max-w-sm">
          Before proceeding to checkout, discover great products and add them to your bag.
        </p>
        <Link 
          href="/products" 
          className="bg-black text-white px-8 py-3 rounded-full text-xs font-bold hover:bg-gray-800 transition-colors"
        >
          Explore Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 lg:px-8 py-10 font-sans min-h-[80vh]">
      <div className="mb-6">
        <Link href="/products" className="inline-flex items-center text-xs text-gray-500 hover:text-black font-semibold">
          <ArrowLeft className="w-3.5 h-3.5 mr-1.5" /> Continue Shopping
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Left Column: Form Steps */}
        <div className="flex-1">
          <h1 className="text-3xl font-serif font-bold mb-6">Complete Your Order</h1>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Step 1: Contact Information */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h2 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-xs">1</span>
                Contact Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Email Address *</label>
                  <input 
                    required 
                    type="email" 
                    placeholder="e.g. john@example.com" 
                    className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-black" 
                    value={formData.email} 
                    onChange={e => setFormData({ ...formData, email: e.target.value })} 
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Phone Number *</label>
                  <input 
                    required 
                    type="tel" 
                    placeholder="e.g. +1 555 234 5678" 
                    className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-black" 
                    value={formData.phone} 
                    onChange={e => setFormData({ ...formData, phone: e.target.value })} 
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Shipping Details */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h2 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-xs">2</span>
                Shipping Address
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Full Name *</label>
                  <input 
                    required 
                    type="text" 
                    placeholder="Receiver's full name" 
                    className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-black" 
                    value={formData.name} 
                    onChange={e => setFormData({ ...formData, name: e.target.value })} 
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Street Address *</label>
                  <input 
                    required 
                    type="text" 
                    placeholder="House number, street, apt / suite" 
                    className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-black" 
                    value={formData.address} 
                    onChange={e => setFormData({ ...formData, address: e.target.value })} 
                  />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">City *</label>
                    <input 
                      required 
                      type="text" 
                      placeholder="City" 
                      className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-black" 
                      value={formData.city} 
                      onChange={e => setFormData({ ...formData, city: e.target.value })} 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">ZIP / Postal *</label>
                    <input 
                      required 
                      type="text" 
                      placeholder="ZIP code" 
                      className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-black" 
                      value={formData.zip} 
                      onChange={e => setFormData({ ...formData, zip: e.target.value })} 
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Country</label>
                    <input 
                      type="text" 
                      className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-black bg-gray-50" 
                      value={formData.country} 
                      onChange={e => setFormData({ ...formData, country: e.target.value })} 
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Payment Method */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                  <span className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-xs">3</span>
                  Payment Method
                </h2>
                <span className="text-[11px] bg-emerald-50 text-emerald-700 font-bold px-2.5 py-0.5 rounded-full border border-emerald-200">
                  Cash on Delivery Active
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
                {/* 1. Cash on Delivery - ACTIVE & SELECTED */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className="p-4 rounded-xl border-2 border-black bg-emerald-50/30 text-left flex flex-col justify-between transition-all relative ring-2 ring-black/5 cursor-pointer"
                >
                  <div className="flex items-center justify-between w-full mb-3">
                    <Truck className="w-5 h-5 text-black" />
                    <span className="w-4 h-4 rounded-full bg-black text-white flex items-center justify-center text-[10px]">✓</span>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
                      Cash on Delivery
                    </div>
                    <div className="text-[10px] text-emerald-700 font-medium mt-0.5">Pay when receiving parcel</div>
                  </div>
                </button>

                {/* 2. Credit / Debit Card - TEMPORARILY OFF */}
                <div
                  className="p-4 rounded-xl border border-gray-200 bg-gray-50/70 text-left flex flex-col justify-between opacity-50 cursor-not-allowed select-none"
                  title="Card payment is temporarily disabled"
                >
                  <div className="flex items-center justify-between w-full mb-3">
                    <CreditCard className="w-5 h-5 text-gray-400" />
                    <span className="text-[9px] bg-gray-200 text-gray-600 font-bold px-1.5 py-0.5 rounded uppercase">Temporarily Off</span>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-gray-500">Credit / Debit Card</div>
                    <div className="text-[10px] text-gray-400 mt-0.5">Currently unavailable</div>
                  </div>
                </div>

                {/* 3. Mobile Wallet - TEMPORARILY OFF */}
                <div
                  className="p-4 rounded-xl border border-gray-200 bg-gray-50/70 text-left flex flex-col justify-between opacity-50 cursor-not-allowed select-none"
                  title="Mobile payment is temporarily disabled"
                >
                  <div className="flex items-center justify-between w-full mb-3">
                    <DollarSign className="w-5 h-5 text-gray-400" />
                    <span className="text-[9px] bg-gray-200 text-gray-600 font-bold px-1.5 py-0.5 rounded uppercase">Temporarily Off</span>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-gray-500">bKash / Nagad Wallet</div>
                    <div className="text-[10px] text-gray-400 mt-0.5">Currently unavailable</div>
                  </div>
                </div>
              </div>

              {/* Informative COD Banner */}
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200/80 text-xs text-emerald-900 flex items-start gap-3">
                <Truck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold mb-0.5">Cash on Delivery (ক্যাশ অন ডেলিভারি) সক্রিয় আছে</div>
                  <p className="text-emerald-800 text-[11px] leading-relaxed">
                    ডেলিভারি ম্যানের কাছ থেকে আপনার পার্সেলটি রিসিভ করে সরাসরি ক্যাশে মূল্য পরিশোধ করুন। অন্য সকল অনলাইন পেমেন্ট অপশন সাময়িকভাবে বন্ধ রাখা হয়েছে।
                  </p>
                </div>
              </div>
            </div>

            {/* Place Order CTA Button */}
            <button 
              disabled={isSubmitting} 
              type="submit" 
              className="w-full bg-black text-white py-4 rounded-full font-bold text-sm flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors disabled:opacity-50 shadow-lg"
            >
              {isSubmitting ? 'Confirming Order...' : `Pay $${finalTotal.toFixed(2)} & Complete Order`} 
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Right Column: Order Summary & Coupon */}
        <div className="w-full lg:w-[420px]">
          <div className="bg-[#FCFCFC] border border-gray-200 rounded-3xl p-6 lg:p-8 sticky top-28 shadow-sm">
            <h2 className="text-lg font-bold mb-4">Order Summary ({cart.length})</h2>

            {/* Cart Items List */}
            <div className="space-y-3 max-h-72 overflow-y-auto pr-1 mb-6 divide-y divide-gray-100">
              {cart.map((item) => (
                <div key={item.product.id} className="pt-3 first:pt-0 flex items-center gap-3">
                  <div className="relative shrink-0">
                    <img 
                      src={item.product.image} 
                      className="w-14 h-14 rounded-xl object-contain bg-gray-50 border border-gray-100 p-1" 
                      alt={item.product.name} 
                    />
                    <span className="absolute -top-1.5 -right-1.5 bg-black text-white w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-gray-900 truncate">{item.product.name}</h4>
                    <p className="text-[11px] text-gray-500">${item.product.price} each</p>
                  </div>
                  <div className="font-bold text-xs text-gray-900 shrink-0">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            {/* Coupon Code Input */}
            <div className="mb-6 pt-4 border-t border-gray-100">
              {appliedCoupon ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-3 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-green-800 font-bold">
                    <Tag className="w-4 h-4" />
                    <span>Coupon: {appliedCoupon.code} (-${appliedCoupon.amount.toFixed(2)})</span>
                  </div>
                  <button 
                    onClick={handleRemoveCoupon} 
                    className="text-xs text-red-500 hover:underline font-bold"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Promo code (e.g. HAVEN20)"
                    value={couponCode}
                    onChange={e => setCouponCode(e.target.value)}
                    className="flex-1 bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs outline-none focus:border-black uppercase"
                  />
                  <button 
                    type="submit" 
                    className="bg-black text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-gray-800"
                  >
                    Apply
                  </button>
                </form>
              )}
              {couponError && <p className="text-[11px] text-red-500 mt-1.5">{couponError}</p>}
            </div>

            {/* Pricing Breakdown */}
            <div className="border-t border-gray-200 pt-4 space-y-2.5 text-xs text-gray-600 mb-6">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-semibold text-gray-900">${cartTotal.toFixed(2)}</span>
              </div>
              {appliedCoupon && (
                <div className="flex justify-between text-green-600 font-semibold">
                  <span>Discount Applied</span>
                  <span>-${appliedCoupon.amount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className={`font-semibold ${shippingFee === 0 ? 'text-green-600' : 'text-gray-900'}`}>
                  {shippingFee === 0 ? 'FREE' : `$${shippingFee.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Taxes</span>
                <span className="font-semibold text-gray-900">${taxAmount.toFixed(2)}</span>
              </div>
            </div>

            {/* Final Total */}
            <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
              <span className="text-base font-bold text-gray-900">Total</span>
              <span className="text-2xl font-bold text-gray-900">${finalTotal.toFixed(2)}</span>
            </div>

            <div className="mt-6 flex items-center justify-center gap-2 text-[11px] text-gray-400">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> 256-bit encrypted secure checkout
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
