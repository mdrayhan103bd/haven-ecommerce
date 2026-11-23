'use client';

import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { Tag, Plus, Trash2, X, CheckCircle, Percent, DollarSign, Calendar } from 'lucide-react';

export default function DiscountsPage() {
  const { discounts, addDiscount, toggleDiscount, deleteDiscount } = useStore();
  const [showModal, setShowModal] = useState(false);

  const [newDiscount, setNewDiscount] = useState({
    code: '',
    type: 'percentage' as 'percentage' | 'fixed',
    value: 15,
    minPurchase: 50,
    expiresAt: '2026-12-31',
    active: true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDiscount.code) return;
    addDiscount({
      ...newDiscount,
      value: Number(newDiscount.value),
      minPurchase: Number(newDiscount.minPurchase)
    });
    setShowModal(false);
    setNewDiscount({
      code: '',
      type: 'percentage',
      value: 15,
      minPurchase: 50,
      expiresAt: '2026-12-31',
      active: true
    });
  };

  return (
    <div className="font-sans space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-gray-900 mb-1">Promo Codes & Discounts</h1>
          <p className="text-xs text-gray-500">Create promotional codes to drive sales and reward loyal shoppers</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-black text-white px-4 py-2.5 rounded-xl text-xs font-bold hover:bg-gray-800 transition-colors flex items-center gap-2 shadow-sm"
        >
          <Plus className="w-4 h-4" /> Create Coupon Code
        </button>
      </div>

      {/* Coupons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {discounts.map((disc) => (
          <div 
            key={disc.id}
            className={`bg-white rounded-2xl border p-5 shadow-sm flex flex-col justify-between transition-all ${
              disc.active ? 'border-gray-200' : 'border-dashed border-gray-200 opacity-60'
            }`}
          >
            <div>
              <div className="flex justify-between items-start mb-3">
                <span className="font-mono font-bold text-sm bg-gray-100 text-gray-900 px-3 py-1 rounded-lg border border-gray-200 tracking-wider">
                  {disc.code}
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => toggleDiscount(disc.id)}
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full border transition-colors ${
                      disc.active 
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100' 
                        : 'bg-gray-100 text-gray-500 border-gray-200 hover:bg-gray-200'
                    }`}
                  >
                    {disc.active ? 'Active' : 'Paused'}
                  </button>
                  <button
                    onClick={() => deleteDiscount(disc.id)}
                    className="p-1 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                    title="Delete coupon"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="text-xl font-bold text-gray-900 mb-1">
                {disc.type === 'percentage' ? `${disc.value}% OFF` : `৳${disc.value} OFF`}
              </div>
              <p className="text-xs text-gray-500 mb-4">
                Applies to cart orders over ৳{disc.minPurchase}.
              </p>
            </div>

            <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> Expires {disc.expiresAt}
              </span>
              <span className="font-semibold text-gray-700">
                {disc.usageCount} used
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Create Coupon Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative font-sans">
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-5 right-5 p-1 text-gray-400 hover:text-black"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold mb-4">Create New Promo Code</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Coupon Code (Uppercase)</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. FLASH30"
                  value={newDiscount.code}
                  onChange={e => setNewDiscount({ ...newDiscount, code: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-xs outline-none focus:border-black font-mono uppercase font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Discount Type</label>
                  <select 
                    value={newDiscount.type}
                    onChange={e => setNewDiscount({ ...newDiscount, type: e.target.value as any })}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-xs outline-none focus:border-black bg-white"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed Amount (৳)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Discount Value</label>
                  <input 
                    type="number" 
                    required
                    min={1}
                    value={newDiscount.value}
                    onChange={e => setNewDiscount({ ...newDiscount, value: Number(e.target.value) })}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-xs outline-none focus:border-black"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Minimum Order (৳)</label>
                  <input 
                    type="number" 
                    min={0}
                    value={newDiscount.minPurchase}
                    onChange={e => setNewDiscount({ ...newDiscount, minPurchase: Number(e.target.value) })}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-xs outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Expiry Date</label>
                  <input 
                    type="date" 
                    value={newDiscount.expiresAt}
                    onChange={e => setNewDiscount({ ...newDiscount, expiresAt: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-xs outline-none focus:border-black"
                  />
                </div>
              </div>

              <button 
                type="submit" 
                className="w-full bg-black text-white py-2.5 rounded-full text-xs font-bold hover:bg-gray-800 transition-colors mt-2"
              >
                Activate Coupon
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
