'use client';

import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { 
  X, 
  Search, 
  Package, 
  Truck, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  AlertCircle 
} from 'lucide-react';

interface OrderTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function OrderTrackingModal({ isOpen, onClose }: OrderTrackingModalProps) {
  const { orders } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchedOrder, setSearchedOrder] = useState<any | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setHasSearched(true);
    const cleaned = searchQuery.trim().toLowerCase();

    const found = orders.find(o => 
      o.id.toLowerCase() === cleaned ||
      o.id.toLowerCase().includes(cleaned) ||
      (o.shippingDetails.phone && o.shippingDetails.phone.includes(cleaned)) ||
      (o.shippingDetails.email && o.shippingDetails.email.toLowerCase().includes(cleaned))
    );

    setSearchedOrder(found || null);
  };

  const getTimelineStep = (status: string) => {
    switch (status) {
      case 'Pending': return 1;
      case 'Processing': return 2;
      case 'Shipped': return 3;
      case 'Delivered': return 4;
      default: return 1;
    }
  };

  const currentStep = searchedOrder ? getTimelineStep(searchedOrder.status) : 1;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl z-10 border border-gray-100 p-6 sm:p-8 font-sans max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-black text-white flex items-center justify-center">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 leading-tight">
                Live Order Tracking
              </h3>
              <p className="text-xs text-gray-400">
                Track your package status across Bangladesh in real-time
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Input Box */}
        <form onSubmit={handleSearch} className="mb-6">
          <label className="block text-xs font-bold text-gray-700 mb-2">
            Enter Order ID or Mobile Number:
          </label>
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="e.g. HV-8919 or 01711-234567"
                className="w-full bg-gray-50 border border-gray-200 rounded-full pl-10 pr-4 py-3 text-xs sm:text-sm outline-none focus:border-black focus:bg-white transition-all font-medium"
              />
            </div>
            <button
              type="submit"
              className="bg-black text-white px-6 py-3 rounded-full text-xs font-bold hover:bg-gray-800 transition-colors shrink-0 shadow-sm"
            >
              Track Now
            </button>
          </div>

          {/* Quick Order Suggestions */}
          <div className="flex items-center gap-2 mt-2.5 text-[11px] text-gray-500">
            <span>Sample Orders:</span>
            {orders.slice(0, 2).map(o => (
              <button
                key={o.id}
                type="button"
                onClick={() => {
                  setSearchQuery(o.id);
                  setSearchedOrder(o);
                  setHasSearched(true);
                }}
                className="font-bold text-black underline hover:text-red-600"
              >
                #{o.id}
              </button>
            ))}
          </div>
        </form>

        {/* Results Area */}
        {hasSearched && searchedOrder && (
          <div className="bg-gray-50/70 border border-gray-200/80 rounded-2xl p-5 sm:p-6 animate-in fade-in duration-300">
            {/* Top Order Meta */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-200 gap-2 mb-6">
              <div>
                <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block">
                  Tracking Number: {searchedOrder.trackingNumber || 'TRK-982140'}
                </span>
                <span className="text-base font-bold text-gray-900">
                  Order #{searchedOrder.id}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">Status:</span>
                <span className={`text-xs font-extrabold px-3 py-1 rounded-full ${
                  searchedOrder.status === 'Delivered' 
                    ? 'bg-emerald-100 text-emerald-800' 
                    : searchedOrder.status === 'Shipped'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  {searchedOrder.status}
                </span>
              </div>
            </div>

            {/* 4-Step Visual Progress Bar */}
            <div className="mb-8">
              <div className="grid grid-cols-4 relative text-center">
                {/* Connecting Line */}
                <div className="absolute top-4 left-[12%] right-[12%] h-1 bg-gray-200 -z-0">
                  <div 
                    className="h-full bg-emerald-500 transition-all duration-500"
                    style={{ width: `${Math.min(100, (currentStep - 1) * 33.33)}%` }}
                  />
                </div>

                {/* Steps */}
                {[
                  { step: 1, title: 'Confirmed', sub: 'Order Placed' },
                  { step: 2, title: 'Processing', sub: 'Packed at Hub' },
                  { step: 3, title: 'Shipped', sub: 'With Courier' },
                  { step: 4, title: 'Delivered', sub: 'Cash Collected' }
                ].map((s) => {
                  const isDone = s.step <= currentStep;
                  const isCurrent = s.step === currentStep;
                  return (
                    <div key={s.step} className="flex flex-col items-center relative z-10">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs mb-2 transition-all ${
                        isDone 
                          ? 'bg-emerald-500 text-white shadow-sm ring-4 ring-emerald-50' 
                          : 'bg-white border-2 border-gray-300 text-gray-400'
                      }`}>
                        {isDone ? '✓' : s.step}
                      </div>
                      <span className={`text-xs font-bold ${isCurrent ? 'text-black' : isDone ? 'text-gray-900' : 'text-gray-400'}`}>
                        {s.title}
                      </span>
                      <span className="text-[10px] text-gray-400 hidden sm:block">
                        {s.sub}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Delivery Details Card */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-white rounded-xl p-4 border border-gray-200/60 mb-4">
              <div>
                <span className="text-gray-400 block text-[10px] uppercase font-bold tracking-wider mb-1">
                  Delivery Destination
                </span>
                <div className="font-bold text-gray-900">
                  {searchedOrder.shippingDetails.name}
                </div>
                <div className="text-gray-600">
                  {searchedOrder.shippingDetails.address}, {searchedOrder.shippingDetails.city}
                </div>
                <div className="text-gray-500 mt-1">
                  Phone: {searchedOrder.shippingDetails.phone}
                </div>
              </div>

              <div>
                <span className="text-gray-400 block text-[10px] uppercase font-bold tracking-wider mb-1">
                  Payment Summary
                </span>
                <div className="font-bold text-emerald-700 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> {searchedOrder.paymentMethod || 'Cash on Delivery'}
                </div>
                <div className="text-gray-600 mt-1">
                  Amount: <strong className="text-red-600 font-extrabold text-sm">৳{searchedOrder.total.toLocaleString()}</strong>
                </div>
                <div className="text-gray-400 text-[11px] mt-0.5">
                  Pay cash after inspecting your parcel
                </div>
              </div>
            </div>

            {/* Items Included */}
            <div className="text-xs">
              <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block mb-2">
                Items in Package ({searchedOrder.items.length})
              </span>
              <div className="divide-y divide-gray-100 bg-white rounded-xl border border-gray-200/60 p-2">
                {searchedOrder.items.map((item: any, i: number) => (
                  <div key={i} className="flex items-center gap-3 p-2">
                    <img 
                      src={item.product?.image} 
                      alt="" 
                      className="w-10 h-10 object-contain rounded-lg bg-gray-50 p-1 border"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-gray-900 truncate text-xs">
                        {item.product?.name}
                      </div>
                      <div className="text-[11px] text-gray-400">
                        Qty: {item.quantity} × ৳{item.product?.price}
                      </div>
                    </div>
                    <span className="font-bold text-gray-900 text-xs shrink-0">
                      ৳{(item.product?.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Not Found State */}
        {hasSearched && !searchedOrder && (
          <div className="text-center py-10 bg-gray-50 rounded-2xl border border-dashed border-gray-200 p-6">
            <AlertCircle className="w-10 h-10 text-amber-500 mx-auto mb-2" />
            <h4 className="font-bold text-sm text-gray-900 mb-1">No order found</h4>
            <p className="text-xs text-gray-500">
              Please check your Order ID (e.g. HV-8919) or phone number and try again.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
