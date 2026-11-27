'use client';

import React, { useState } from 'react';
import { X, Minus, Plus, ShoppingBag, Truck, ArrowRight, ShieldCheck, Zap, Tag, Check, FileText } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useStore } from '@/context/StoreContext';
import Link from 'next/link';

export default function CartDrawer() {
  const { cart, isCartOpen, toggleCart, updateQuantity, removeFromCart, cartTotal, cartCount } = useCart();
  const { settings, applyDiscountCode, showToast } = useStore();

  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<{ code: string; amount: number } | null>(null);
  const [orderNote, setOrderNote] = useState('');
  const [showNoteInput, setShowNoteInput] = useState(false);

  if (!isCartOpen) return null;

  const freeShippingThreshold = settings?.freeShippingThreshold || 1000;
  const progressPercent = Math.min(100, Math.round((cartTotal / freeShippingThreshold) * 100));
  const diff = freeShippingThreshold - cartTotal;

  const discountAmount = appliedDiscount ? appliedDiscount.amount : 0;
  const finalTotal = Math.max(0, cartTotal - discountAmount);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;

    const res = applyDiscountCode(couponCode, cartTotal);
    if (res.valid) {
      setAppliedDiscount({ code: couponCode.toUpperCase().trim(), amount: res.discountAmount });
      showToast(res.message);
    } else {
      showToast(res.message, 'error');
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedDiscount(null);
    setCouponCode('');
  };

  return (
    <>
      {/* Backdrop with blur */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 transition-opacity animate-in fade-in" 
        onClick={toggleCart}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col font-sans animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-gray-900" />
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">
              Your Bag ({cartCount})
            </h2>
          </div>
          <button 
            onClick={toggleCart} 
            className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 hover:text-black transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        {cart.length > 0 && (
          <div className="bg-amber-50/70 border-b border-amber-100/80 px-5 sm:px-6 py-3">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-900 mb-1.5">
              <Truck className="w-4 h-4 text-amber-600 shrink-0" />
              <span>
                {diff <= 0 ? (
                  '🎉 Congratulations! You unlocked FREE Delivery!'
                ) : (
                  <>Add <strong className="text-red-600">৳{diff.toLocaleString()}</strong> more to get FREE Delivery!</>
                )}
              </span>
            </div>
            <div className="w-full bg-amber-200/60 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-amber-500 to-emerald-500 h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-gray-500">
              <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center mb-4 text-gray-300">
                <ShoppingBag className="w-10 h-10" />
              </div>
              <p className="text-lg font-bold text-gray-900 mb-1">Your bag is empty</p>
              <p className="text-xs text-gray-400 mb-6 max-w-xs">
                Looks like you haven't added anything yet. Discover our new collection today!
              </p>
              <button 
                onClick={toggleCart} 
                className="bg-black text-white px-6 py-3 rounded-full text-xs font-bold hover:bg-gray-800 transition-colors shadow-sm"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-5 divide-y divide-gray-100">
              {cart.map((item) => (
                <div key={item.product.id} className="pt-4 first:pt-0 flex gap-4">
                  <div className="w-20 h-20 bg-gray-50 rounded-2xl p-1.5 border border-gray-100 flex items-center justify-center shrink-0">
                    <img 
                      src={item.product.image} 
                      alt={item.product.name} 
                      className="w-full h-full object-contain mix-blend-multiply" 
                    />
                  </div>
                  
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex justify-between items-start gap-2 mb-1">
                        <Link
                          href={`/products/${item.product.id}`}
                          onClick={toggleCart}
                          className="font-bold text-gray-900 text-xs sm:text-sm truncate hover:underline"
                        >
                          {item.product.name}
                        </Link>
                        <button 
                          onClick={() => removeFromCart(item.product.id)} 
                          className="text-gray-400 hover:text-red-500 p-0.5 shrink-0 transition-colors"
                          aria-label="Remove item"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-red-600 font-extrabold text-sm">
                        ৳{item.product.price.toLocaleString('en-US')}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-gray-200 rounded-full bg-gray-50/80">
                        <button 
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)} 
                          className="w-7 h-7 flex items-center justify-center text-gray-500 hover:text-black rounded-l-full text-xs font-bold"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-xs font-bold text-gray-900">
                          {item.quantity}
                        </span>
                        <button 
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)} 
                          className="w-7 h-7 flex items-center justify-center text-gray-500 hover:text-black rounded-r-full text-xs font-bold"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-xs font-bold text-gray-900">
                        ৳{(item.product.price * item.quantity).toLocaleString('en-US')}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {/* Special Delivery Note Trigger */}
              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => setShowNoteInput(!showNoteInput)}
                  className="text-xs font-semibold text-gray-600 hover:text-black flex items-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5" />
                  {showNoteInput ? 'Hide delivery instructions' : '+ Add delivery instructions / note'}
                </button>
                {showNoteInput && (
                  <textarea
                    rows={2}
                    value={orderNote}
                    onChange={(e) => setOrderNote(e.target.value)}
                    placeholder="e.g. Call before delivery, delivery during office hours..."
                    className="w-full mt-2 p-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-black focus:bg-white resize-none"
                  />
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer Checkout Summary */}
        {cart.length > 0 && (
          <div className="p-5 sm:p-6 border-t border-gray-100 bg-gray-50/90">
            {/* Promo Code Input */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2 mb-3">
              <div className="relative flex-1">
                <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Coupon (e.g. WELCOME10)"
                  className="w-full pl-8 pr-3 py-2 text-xs bg-white border border-gray-200 rounded-full outline-none focus:border-black uppercase font-bold"
                />
              </div>
              <button
                type="submit"
                className="bg-gray-900 text-white px-4 py-2 rounded-full text-xs font-bold hover:bg-black transition-colors shrink-0"
              >
                Apply
              </button>
            </form>

            {appliedDiscount && (
              <div className="flex items-center justify-between text-xs text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg mb-2">
                <span>Coupon {appliedDiscount.code} applied:</span>
                <span className="font-bold flex items-center gap-1">
                  -৳{appliedDiscount.amount.toLocaleString()}
                  <button type="button" onClick={handleRemoveCoupon} className="text-red-500 ml-1 hover:text-red-700">✕</button>
                </span>
              </div>
            )}

            <div className="flex justify-between items-center mb-1 text-xs text-gray-500">
              <span>Subtotal</span>
              <span>৳{cartTotal.toLocaleString('en-US')}</span>
            </div>

            {appliedDiscount && (
              <div className="flex justify-between items-center mb-1 text-xs text-emerald-600 font-medium">
                <span>Discount</span>
                <span>-৳{appliedDiscount.amount.toLocaleString('en-US')}</span>
              </div>
            )}

            <div className="flex justify-between items-center mb-3 text-base font-extrabold text-gray-900 pt-1 border-t border-gray-200/60">
              <span>Estimated Total</span>
              <span className="text-lg text-red-600">
                ৳{finalTotal.toLocaleString('en-US')}
              </span>
            </div>
            
            <div className="flex items-center gap-1.5 text-[11px] text-gray-500 mb-3.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>100% Cash on Delivery Available Nationwide</span>
            </div>

            <Link 
              href="/checkout" 
              onClick={toggleCart} 
              className="w-full bg-black text-white py-3.5 rounded-full flex items-center justify-center gap-2 font-bold text-xs sm:text-sm hover:bg-gray-800 transition-all shadow-md active:scale-98"
            >
              <Zap className="w-4 h-4 fill-current text-amber-400" />
              Proceed to Checkout
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
