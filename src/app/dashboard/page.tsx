'use client';

import React, { useEffect, useState } from 'react';
import { Calendar, ShoppingBag, ShoppingCart, Users, Box, Plus, Percent, Send, Eye } from 'lucide-react';
import { SalesChart, OrderDonut } from '@/components/dashboard/OverviewCharts';

export default function Dashboard() {
  const [metrics, setMetrics] = useState({ revenue: 24560, orders: 1248, customers: 892 });
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('haven_orders');
    if (saved) {
      const orders = JSON.parse(saved);
      const revenue = orders.reduce((sum: number, o: any) => sum + o.total, 0) + 24560;
      const uniqueCustomers = new Set(orders.map((o: any) => o.shippingDetails?.email)).size + 892;
      setMetrics({
        revenue,
        orders: orders.length + 1248,
        customers: uniqueCustomers
      });
    }
  }, []);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-1 flex items-center gap-2">Good morning, Admin <span className="text-2xl">👋</span></h1>
          <p className="text-gray-500">Here's what's happening with your store today.</p>
        </div>
        <button className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50">
          <Calendar className="w-4 h-4 text-gray-500" /> Today
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-sm transition-all">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-green-50 text-green-500 flex items-center justify-center">
              <span className="text-xl font-bold">$</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Revenue</p>
              <h3 className="text-2xl font-bold">${metrics.revenue.toFixed(2)}</h3>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-green-500">
            <span className="bg-green-50 px-2 py-0.5 rounded font-medium">+12.5%</span> <span className="text-gray-400">from last month</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-sm transition-all">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Orders</p>
              <h3 className="text-2xl font-bold">{metrics.orders}</h3>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-green-500">
            <span className="bg-green-50 px-2 py-0.5 rounded font-medium">+8.2%</span> <span className="text-gray-400">from last month</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-sm transition-all">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Active Customers</p>
              <h3 className="text-2xl font-bold">{metrics.customers}</h3>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-green-500">
            <span className="bg-green-50 px-2 py-0.5 rounded font-medium">+18.6%</span> <span className="text-gray-400">from last month</span>
          </div>
        </div>
      </div>

      {/* Main Charts area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-6">
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-lg font-bold">Revenue Overview</h2>
            <select className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-sm outline-none cursor-pointer">
              <option>This Week</option>
              <option>This Month</option>
              <option>This Year</option>
            </select>
          </div>
          <SalesChart />
        </div>
        
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="mb-6">
            <h2 className="text-lg font-bold">Orders by Category</h2>
          </div>
          <OrderDonut />
        </div>
      </div>

    </div>
  );
}