'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, Package, Truck, ArrowRight, ShoppingBag } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId') || 'HV-8921';
  const { orders } = useStore();

  const currentOrder = orders.find(o => o.id === orderId) || orders[0];

  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center text-center font-sans max-w-xl">
      <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6 shadow-sm">
        <CheckCircle className="w-10 h-10 text-emerald-600" />
      </div>

      <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full mb-3">
        Payment & Order Confirmed
      </span>

      <h1 className="text-3xl lg:text-4xl font-serif font-bold mb-3 text-gray-900">
        Thank you for your order!
      </h1>

      <p className="text-gray-500 text-sm mb-6 leading-relaxed">
        We have received your purchase and are getting it ready. A confirmation email with your invoice has been sent to your address.
      </p>

      {/* Order Summary Box */}
      <div className="w-full bg-white border border-gray-200 rounded-2xl p-6 text-left mb-8 shadow-sm">
        <div className="flex justify-between items-center pb-4 border-b border-gray-100 text-xs">
          <div>
            <span className="text-gray-400 block">Order Number</span>
            <span className="font-bold text-gray-900 text-sm">#{orderId}</span>
          </div>
          <div className="text-right">
            <span className="text-gray-400 block">Estimated Delivery</span>
            <span className="font-bold text-gray-900 text-sm">3 - 5 Business Days</span>
          </div>
        </div>

        {currentOrder && (
          <div className="py-4 border-b border-gray-100 text-xs space-y-2">
            <div className="font-semibold text-gray-700">Delivering to:</div>
            <div className="text-gray-500">
              {currentOrder.shippingDetails.name} • {currentOrder.shippingDetails.address}, {currentOrder.shippingDetails.city}
            </div>
          </div>
        )}

        <div className="pt-3 flex justify-between items-center text-xs">
          <div>
            <span className="text-gray-400 block text-[11px]">Payment Method</span>
            <span className="font-bold text-emerald-700">{currentOrder?.paymentMethod || 'Cash on Delivery'}</span>
          </div>
          <div className="text-right">
            <span className="text-gray-400 block text-[11px]">Total Due on Delivery:</span>
            <span className="text-base font-bold text-gray-900">
              ৳{currentOrder ? currentOrder.total.toLocaleString() : '1,280'}
            </span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 w-full">
        <Link 
          href="/account" 
          className="flex-1 bg-black text-white py-3 rounded-full text-xs font-bold flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors shadow-sm"
        >
          <Package className="w-4 h-4" /> View My Orders
        </Link>
        <Link 
          href="/products" 
          className="flex-1 bg-gray-100 text-gray-900 py-3 rounded-full text-xs font-bold flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors"
        >
          <ShoppingBag className="w-4 h-4" /> Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-20 text-center text-gray-500">Processing order confirmation...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
