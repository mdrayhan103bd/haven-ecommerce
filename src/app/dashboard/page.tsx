'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ShoppingBag, 
  Users, 
  Box, 
  Plus, 
  Percent, 
  ArrowUpRight, 
  Eye, 
  Truck, 
  CheckCircle, 
  Clock, 
  X, 
  ArrowRight,
  TrendingUp,
  Tag,
  DollarSign
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { Order } from '@/types';
import { SalesChart, OrderDonut } from '@/components/dashboard/OverviewCharts';

export default function DashboardPage() {
  const { orders, products, discounts, updateOrderStatus } = useStore();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Dynamic calculations
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrdersCount = orders.length;
  const inStockProducts = products.filter(p => p.stock > 0).length;
  const uniqueCustomersCount = new Set(orders.map(o => o.shippingDetails.email)).size;
  const recentOrders = orders.slice(0, 5);

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'Pending': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Processing': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Shipped': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Delivered': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 font-sans">
      {/* Header with Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-serif font-bold text-gray-900 mb-1">
            Store Performance
          </h1>
          <p className="text-xs text-gray-500">Live analytics, sales data, and store operations</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link 
            href="/dashboard/products" 
            className="bg-black text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-gray-800 transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" /> Add Product
          </Link>
          <Link 
            href="/dashboard/discounts" 
            className="bg-white border border-gray-200 text-gray-800 px-4 py-2 rounded-xl text-xs font-bold hover:bg-gray-50 transition-colors flex items-center gap-1.5"
          >
            <Tag className="w-3.5 h-3.5" /> New Coupon
          </Link>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Revenue</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">${totalRevenue.toFixed(2)}</div>
          <div className="flex items-center gap-1 text-xs text-emerald-600 font-semibold">
            <TrendingUp className="w-3.5 h-3.5" /> +14.2% <span className="text-gray-400 font-normal">from last week</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Orders</span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">{totalOrdersCount}</div>
          <div className="flex items-center gap-1 text-xs text-blue-600 font-semibold">
            <TrendingUp className="w-3.5 h-3.5" /> +8.5% <span className="text-gray-400 font-normal">order growth</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Catalog Items</span>
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              <Box className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">{products.length} Products</div>
          <div className="text-xs text-gray-400 font-medium">
            {inStockProducts} in stock • {products.length - inStockProducts} out of stock
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Active Promo Codes</span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <Percent className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">{discounts.filter(d => d.active).length} Active</div>
          <div className="text-xs text-gray-400 font-medium">
            Across {discounts.length} campaign codes
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <div className="mb-6 flex justify-between items-center">
            <div>
              <h2 className="text-base font-bold text-gray-900">Revenue Overview</h2>
              <p className="text-xs text-gray-400">Monthly earnings and transaction volume</p>
            </div>
            <select className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-xs outline-none cursor-pointer">
              <option>This Year (2026)</option>
              <option>Previous Quarter</option>
            </select>
          </div>
          <SalesChart />
        </div>
        
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-base font-bold text-gray-900">Category Sales Share</h2>
            <p className="text-xs text-gray-400">Breakdown of orders by department</p>
          </div>
          <OrderDonut />
        </div>
      </div>

      {/* Recent Orders Section */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-base font-bold text-gray-900">Recent Customer Orders</h2>
            <p className="text-xs text-gray-400">Latest transactions from your storefront</p>
          </div>
          <Link href="/dashboard/orders" className="text-xs font-bold text-black flex items-center gap-1 hover:underline">
            Manage All Orders <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {recentOrders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50/70 border-b border-gray-100 text-gray-400 uppercase font-bold">
                <tr>
                  <th className="px-4 py-3">Order ID</th>
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3">Items</th>
                  <th className="px-4 py-3">Total</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-3.5 font-bold text-gray-900">#{order.id}</td>
                    <td className="px-4 py-3.5">
                      <div className="font-semibold text-gray-900">{order.shippingDetails.name}</div>
                      <div className="text-[11px] text-gray-400">{order.shippingDetails.email}</div>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex -space-x-1.5">
                        {order.items.slice(0, 3).map((item, i) => (
                          <img 
                            key={i} 
                            src={item.product.image} 
                            alt={item.product.name} 
                            className="w-7 h-7 rounded-full border border-white object-cover bg-gray-100" 
                          />
                        ))}
                        {order.items.length > 3 && (
                          <span className="w-7 h-7 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center font-bold text-[10px]">
                            +{order.items.length - 3}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3.5 font-bold text-gray-900">${order.total.toFixed(2)}</td>
                    <td className="px-4 py-3.5">
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value as Order['status'])}
                        className={`text-[11px] font-bold rounded-full px-2.5 py-1 border outline-none cursor-pointer ${getStatusColor(order.status)}`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      <button 
                        onClick={() => setSelectedOrder(order)}
                        className="p-1.5 text-gray-400 hover:text-black hover:bg-gray-100 rounded-lg transition-colors"
                        title="View details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12 text-gray-400 text-xs">
            No orders placed yet.
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto font-sans">
            <button 
              onClick={() => setSelectedOrder(null)}
              className="absolute top-5 right-5 p-1 text-gray-400 hover:text-black"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold mb-1">Order #{selectedOrder.id} Details</h3>
            <p className="text-xs text-gray-400 mb-4">{new Date(selectedOrder.date).toLocaleString()}</p>

            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 mb-4 text-xs space-y-1">
              <div className="font-bold text-gray-800">Customer Shipping Address:</div>
              <div className="text-gray-900">{selectedOrder.shippingDetails.name}</div>
              <div className="text-gray-500">{selectedOrder.shippingDetails.address}, {selectedOrder.shippingDetails.city} {selectedOrder.shippingDetails.zip}</div>
              <div className="text-gray-500">Email: {selectedOrder.shippingDetails.email}</div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="text-xs font-bold text-gray-700 uppercase">Items:</div>
              {selectedOrder.items.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs border-b border-gray-100 pb-2">
                  <div className="flex items-center gap-2">
                    <img src={item.product.image} className="w-8 h-8 rounded-lg object-contain bg-gray-50" />
                    <span>{item.product.name} (x{item.quantity})</span>
                  </div>
                  <span className="font-bold">${(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="text-xs space-y-1.5 border-t border-gray-100 pt-3 mb-6">
              <div className="flex justify-between font-bold text-sm text-gray-900">
                <span>Total Paid:</span>
                <span>${selectedOrder.total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedOrder(null)}
              className="w-full bg-black text-white py-2.5 rounded-full text-xs font-bold hover:bg-gray-800"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
