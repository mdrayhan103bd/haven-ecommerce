import React from 'react';
import { Calendar, ShoppingBag, ShoppingCart, Users, Box, Plus, Percent, Send, Eye } from 'lucide-react';
import { SalesChart, OrderDonut } from '@/components/dashboard/OverviewCharts';

export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-end justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-1 flex items-center gap-2">Good morning, Bappy <span className="text-2xl">👋</span></h1>
          <p className="text-gray-500">Here's what's happening with your store today.</p>
        </div>
        <button className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50">
          <Calendar className="w-4 h-4 text-gray-500" /> Apr 1, 2024 - Apr 30, 2024
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Total Revenue', value: '$24,560', change: '+ 12.5%', icon: ShoppingBag, color: 'text-red-500', bg: 'bg-red-50' },
          { title: 'Total Orders', value: '1,248', change: '+ 8.3%', icon: ShoppingCart, color: 'text-blue-500', bg: 'bg-blue-50' },
          { title: 'Total Customers', value: '892', change: '+ 18.6%', icon: Users, color: 'text-purple-500', bg: 'bg-purple-50' },
          { title: 'Conversion Rate', value: '3.8%', change: '+ 0.7%', icon: Box, color: 'text-orange-500', bg: 'bg-orange-50' },
        ].map((s, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 flex gap-4">
            <div className={`w-12 h-12 rounded-xl ${s.bg} ${s.color} flex items-center justify-center shrink-0`}>
              <s.icon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm text-gray-500 font-medium mb-1">{s.title}</h3>
              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-bold">{s.value}</span>
                <span className="text-xs font-medium text-green-500 bg-green-50 px-2 py-0.5 rounded">{s.change}</span>
              </div>
              <div className="text-[10px] text-gray-400 mt-1">vs. last month</div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Sales Overview */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-bold mb-1">Sales Overview</h2>
              <div className="flex items-baseline gap-3 mb-1">
                <span className="text-2xl font-bold">$24,560</span>
                <span className="text-xs font-medium text-green-500 bg-green-50 px-2 py-0.5 rounded">↑ 12.5%</span>
              </div>
              <p className="text-xs text-gray-500">Total revenue from Apr 1 - Apr 30, 2024</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="text-xs font-medium hover:underline text-gray-600 flex items-center gap-1 mr-4">View Reports →</button>
              <div className="bg-gray-100 p-1 rounded-lg flex text-xs font-medium">
                <button className="px-3 py-1 bg-white shadow-sm rounded-md">Daily</button>
                <button className="px-3 py-1 text-gray-500 hover:text-black">Weekly</button>
                <button className="px-3 py-1 text-gray-500 hover:text-black">Monthly</button>
              </div>
            </div>
          </div>
          <SalesChart />
        </div>

        {/* Right Column: Order Overview & Quick Actions */}
        <div className="flex flex-col gap-6">
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-bold">Order Overview</h2>
              <button className="text-xs font-medium hover:underline text-gray-600">View All →</button>
            </div>
            <OrderDonut />
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="text-lg font-bold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { label: 'Add Product', icon: Plus, color: 'text-blue-500', bg: 'bg-blue-50' },
                { label: 'Create Discount', icon: Percent, color: 'text-red-500', bg: 'bg-red-50' },
                { label: 'Send Campaign', icon: Send, color: 'text-green-500', bg: 'bg-green-50' },
                { label: 'View Store', icon: Eye, color: 'text-orange-500', bg: 'bg-orange-50' },
              ].map((a, i) => (
                <button key={i} className={`${a.bg} rounded-xl p-3 flex flex-col items-center justify-center gap-2 hover:opacity-80 transition-opacity`}>
                  <a.icon className={`w-5 h-5 ${a.color}`} />
                  <span className={`text-[10px] font-semibold ${a.color}`}>{a.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Products */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold">Top Products</h2>
            <button className="text-xs font-medium hover:underline text-gray-600">View All →</button>
          </div>
          <div className="space-y-4">
            {[
              { id: 1, name: 'UrbanEase Sneakers', cat: 'Footwear', sales: '842', rev: '$67,360', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop' },
              { id: 2, name: 'BrewMaster Coffee', cat: 'Home & Living', sales: '620', rev: '$74,380', img: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=100&h=100&fit=crop' },
              { id: 3, name: 'Luxe Curve Handbag', cat: 'Bags & Accessories', sales: '588', rev: '$52,332', img: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=100&h=100&fit=crop' },
            ].map(p => (
              <div key={p.id} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-6 text-center text-xs text-gray-400 font-medium">{p.id}</div>
                  <img src={p.img} alt={p.name} className="w-10 h-10 rounded-lg object-cover bg-gray-100" />
                  <div>
                    <div className="font-semibold text-gray-900">{p.name}</div>
                    <div className="text-xs text-gray-500">{p.cat}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-gray-900">{p.sales} <span className="text-xs font-normal text-gray-500">units sold</span></div>
                  <div className="font-bold">{p.rev}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Inventory Status */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold">Inventory Status</h2>
            <button className="text-xs font-medium hover:underline text-gray-600">View All →</button>
          </div>
          <div className="space-y-4">
            {[
              { name: 'UrbanEase Sneakers', sku: 'UE-SNK-001', stock: 342, status: 'In Stock', color: 'text-green-600 bg-green-50' },
              { name: 'BrewMaster Coffee', sku: 'BM-CM-001', stock: 18, status: 'Low Stock', color: 'text-orange-600 bg-orange-50' },
              { name: 'Luxe Curve Handbag', sku: 'LC-HB-001', stock: 0, status: 'Out of Stock', color: 'text-red-600 bg-red-50' },
            ].map((p, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-3">
                  <img src={`https://ui-avatars.com/api/?name=${p.name.charAt(0)}&background=random`} alt={p.name} className="w-10 h-10 rounded-lg object-cover bg-gray-100" />
                  <div>
                    <div className="font-semibold text-gray-900">{p.name}</div>
                    <div className="text-[10px] text-gray-500">SKU: {p.sku}</div>
                  </div>
                </div>
                <div className="text-right flex items-center gap-4">
                  <div>
                    <div className="font-medium text-gray-900">{p.stock}</div>
                    <div className="text-[10px] text-gray-500">in stock</div>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-1 rounded ${p.color}`}>{p.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Insights Placeholder */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">Customer Insights</h2>
            <button className="text-xs font-medium hover:underline text-gray-600">View All →</button>
          </div>
          <div className="flex justify-between mb-6">
            <div>
              <div className="text-2xl font-bold">892</div>
              <div className="text-xs text-gray-500 mb-1">Total Customers</div>
              <div className="text-xs font-medium text-green-500">↑ 18.6%</div>
            </div>
            <div>
              <div className="text-2xl font-bold">68%</div>
              <div className="text-xs text-gray-500 mb-1">Repeat Customers</div>
              <div className="text-xs font-medium text-green-500">↑ 6.2%</div>
            </div>
          </div>
          <div className="h-32 bg-gray-50 rounded-xl flex items-center justify-center border border-dashed border-gray-200">
             <span className="text-xs text-gray-400">Chart rendering...</span>
          </div>
        </div>
      </div>
      
    </div>
  );
}