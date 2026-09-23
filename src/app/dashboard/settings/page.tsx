'use client';

import React from 'react';
import { Save } from 'lucide-react';

export default function DashboardSettingsPage() {
  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Store Settings</h1>
        <p className="text-sm text-gray-500">Manage your store preferences and details.</p>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl p-8 mb-8">
        <h2 className="text-lg font-bold mb-6 border-b border-gray-100 pb-4">Store Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Store Name</label>
            <input type="text" defaultValue="Haven E-Commerce" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:border-black" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email</label>
            <input type="email" defaultValue="support@haven.com" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:border-black" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Store Description</label>
            <textarea rows={3} defaultValue="Good Things. Brighter Days." className="w-full border border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:border-black resize-none" />
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl p-8 mb-8">
        <h2 className="text-lg font-bold mb-6 border-b border-gray-100 pb-4">Currency & Formatting</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Store Currency</label>
            <select className="w-full border border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:border-black bg-white cursor-pointer">
              <option>USD ($)</option>
              <option>EUR (€)</option>
              <option>GBP (£)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
            <select className="w-full border border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:border-black bg-white cursor-pointer">
              <option>UTC (Coordinated Universal Time)</option>
              <option>EST (Eastern Standard Time)</option>
              <option>PST (Pacific Standard Time)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="bg-black text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-gray-800 transition-colors">
          <Save className="w-4 h-4" /> Save Settings
        </button>
      </div>
    </div>
  );
}
