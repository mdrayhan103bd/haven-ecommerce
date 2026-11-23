'use client';

import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { Save, Building, DollarSign, Truck, ShieldCheck, Mail } from 'lucide-react';

export default function DashboardSettingsPage() {
  const { settings, updateSettings, showToast } = useStore();

  const [formData, setFormData] = useState({
    storeName: settings.storeName,
    tagline: settings.tagline,
    contactEmail: settings.contactEmail,
    contactPhone: settings.contactPhone,
    currency: settings.currency,
    currencySymbol: settings.currencySymbol,
    shippingFee: settings.shippingFee,
    freeShippingThreshold: settings.freeShippingThreshold,
    taxRate: settings.taxRate
  });

  const handleCurrencyChange = (curr: string) => {
    let symbol = '৳';
    if (curr === 'USD') symbol = '$';
    if (curr === 'EUR') symbol = '€';
    if (curr === 'GBP') symbol = '£';
    if (curr === 'BDT') symbol = '৳';
    setFormData({ ...formData, currency: curr, currencySymbol: symbol });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      ...formData,
      shippingFee: Number(formData.shippingFee),
      freeShippingThreshold: Number(formData.freeShippingThreshold),
      taxRate: Number(formData.taxRate)
    });
    showToast('Store settings saved successfully!');
  };

  return (
    <div className="font-sans max-w-4xl space-y-8">
      <div>
        <h1 className="text-2xl font-serif font-bold text-gray-900 mb-1">Store Settings</h1>
        <p className="text-xs text-gray-500">Configure store branding, contact information, currency, and checkout rates</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* 1. Store Details */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
            <Building className="w-4 h-4 text-gray-700" />
            <h2 className="text-sm font-bold text-gray-900">Store Profile</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Store Name</label>
              <input 
                type="text" 
                value={formData.storeName}
                onChange={e => setFormData({ ...formData, storeName: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-black font-semibold"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Store Tagline</label>
              <input 
                type="text" 
                value={formData.tagline}
                onChange={e => setFormData({ ...formData, tagline: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-black"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Customer Support Email</label>
              <input 
                type="email" 
                value={formData.contactEmail}
                onChange={e => setFormData({ ...formData, contactEmail: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-black"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Support Phone Hotline</label>
              <input 
                type="text" 
                value={formData.contactPhone}
                onChange={e => setFormData({ ...formData, contactPhone: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-black"
              />
            </div>
          </div>
        </div>

        {/* 2. Currency & Shipping */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
            <span className="w-5 h-5 rounded-md bg-black text-white flex items-center justify-center font-bold text-xs">৳</span>
            <h2 className="text-sm font-bold text-gray-900">Currency & Shipping Rates</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Base Currency</label>
              <select 
                value={formData.currency}
                onChange={e => handleCurrencyChange(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-black bg-white cursor-pointer font-bold"
              >
                <option value="BDT">BDT (৳) - Bangladeshi Taka (Default)</option>
                <option value="USD">USD ($) - US Dollar</option>
                <option value="EUR">EUR (€) - Euro</option>
                <option value="GBP">GBP (£) - British Pound</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Standard Shipping Fee ({formData.currencySymbol})</label>
              <input 
                type="number" 
                min={0}
                value={formData.shippingFee}
                onChange={e => setFormData({ ...formData, shippingFee: Number(e.target.value) })}
                className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-black"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Free Shipping Order Minimum ({formData.currencySymbol})</label>
              <input 
                type="number" 
                min={0}
                value={formData.freeShippingThreshold}
                onChange={e => setFormData({ ...formData, freeShippingThreshold: Number(e.target.value) })}
                className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-black"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Estimated Tax Rate (%)</label>
              <input 
                type="number" 
                min={0}
                max={50}
                value={formData.taxRate}
                onChange={e => setFormData({ ...formData, taxRate: Number(e.target.value) })}
                className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-black"
              />
            </div>
          </div>
        </div>

        {/* Save CTA */}
        <div className="flex justify-end">
          <button 
            type="submit" 
            className="bg-black text-white px-8 py-3 rounded-full text-xs font-bold hover:bg-gray-800 transition-colors flex items-center gap-2 shadow-md"
          >
            <Save className="w-4 h-4" /> Save Store Settings
          </button>
        </div>
      </form>
    </div>
  );
}
