'use client';

import React, { useState } from 'react';
import { Order } from '@/types';
import { useStore } from '@/context/StoreContext';
import { Package, Truck, CheckCircle, Clock, Eye, Trash2, X, Search } from 'lucide-react';

export default function OrderTable() {
  const { orders, updateOrderStatus, deleteOrder } = useStore();
  const [activeFilter, setActiveFilter] = useState<'All' | Order['status']>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filterTabs: Array<'All' | Order['status']> = ['All', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

  const filteredOrders = orders.filter(o => {
    const matchesFilter = activeFilter === 'All' || o.status === activeFilter;
    const matchesSearch = !searchQuery || 
      o.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
      o.shippingDetails.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.shippingDetails.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

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
    <div className="font-sans space-y-5">
      {/* Search and Status Filter Tabs */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                activeFilter === tab 
                  ? 'bg-black text-white shadow-sm' 
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by ID or customer..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs outline-none focus:border-black"
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50/70 border-b border-gray-100 text-gray-400 uppercase font-bold">
              <tr>
                <th className="px-5 py-3.5">Order ID</th>
                <th className="px-5 py-3.5">Date</th>
                <th className="px-5 py-3.5">Customer</th>
                <th className="px-5 py-3.5">Items</th>
                <th className="px-5 py-3.5">Total</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-4 font-bold text-gray-900">#{order.id}</td>
                  <td className="px-5 py-4 text-gray-500">
                    {new Date(order.date).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-4">
                    <div className="font-semibold text-gray-900">{order.shippingDetails.name}</div>
                    <div className="text-[11px] text-gray-400">{order.shippingDetails.email}</div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex -space-x-1.5">
                      {order.items.slice(0, 3).map((item, i) => (
                        <img 
                          key={i} 
                          src={item.product.image} 
                          className="w-8 h-8 rounded-full border border-white object-cover bg-gray-100" 
                          title={item.product.name} 
                        />
                      ))}
                      {order.items.length > 3 && (
                        <div className="w-8 h-8 rounded-full border border-white bg-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-600">
                          +{order.items.length - 3}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-5 py-4 font-bold text-gray-900">
                    ৳{order.total.toLocaleString()}
                  </td>
                  <td className="px-5 py-4">
                    <select 
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value as Order['status'])}
                      className={`text-xs font-bold rounded-full px-2.5 py-1 border outline-none cursor-pointer ${getStatusColor(order.status)}`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button 
                        onClick={() => setSelectedOrder(order)}
                        className="p-1.5 text-gray-400 hover:text-black hover:bg-gray-100 rounded-lg transition-colors"
                        title="View invoice & details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => deleteOrder(order.id)}
                        className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete order"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-400 text-xs">
                    No orders match your selected filter or search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details & Receipt Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setSelectedOrder(null)}
              className="absolute top-5 right-5 p-1 text-gray-400 hover:text-black"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold">Order #{selectedOrder.id} Invoice</h3>
                <p className="text-xs text-gray-400">Placed {new Date(selectedOrder.date).toLocaleString()}</p>
              </div>
              <span className={`text-xs font-bold px-3 py-1 rounded-full border ${getStatusColor(selectedOrder.status)}`}>
                {selectedOrder.status}
              </span>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 mb-4 text-xs space-y-1">
              <div className="font-bold text-gray-700">Customer Details:</div>
              <div className="text-gray-900 font-semibold">{selectedOrder.shippingDetails.name}</div>
              <div className="text-gray-500">{selectedOrder.shippingDetails.address}, {selectedOrder.shippingDetails.city} {selectedOrder.shippingDetails.zip}</div>
              <div className="text-gray-500">Email: {selectedOrder.shippingDetails.email}</div>
              {selectedOrder.shippingDetails.phone && (
                <div className="text-gray-500">Phone: {selectedOrder.shippingDetails.phone}</div>
              )}
              <div className="text-gray-500 font-medium pt-1">Payment Method: {selectedOrder.paymentMethod}</div>
            </div>

            <div className="space-y-3 mb-5">
              <div className="text-xs font-bold text-gray-700 uppercase">Purchased Items:</div>
              {selectedOrder.items.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs border-b border-gray-100 pb-2">
                  <div className="flex items-center gap-2.5">
                    <img src={item.product.image} className="w-10 h-10 rounded-lg object-contain bg-gray-50 border border-gray-100" />
                    <div>
                      <div className="font-semibold text-gray-900">{item.product.name}</div>
                      <div className="text-gray-400">৳{item.product.price} × {item.quantity}</div>
                    </div>
                  </div>
                  <span className="font-bold text-gray-900">৳{(item.product.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>

            <div className="space-y-1.5 text-xs border-t border-gray-100 pt-3 mb-6 text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>৳{(selectedOrder.subtotal || selectedOrder.total).toLocaleString()}</span>
              </div>
              {selectedOrder.discount > 0 && (
                <div className="flex justify-between text-green-600 font-semibold">
                  <span>Discount</span>
                  <span>-৳{selectedOrder.discount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{selectedOrder.shippingFee === 0 ? 'FREE' : `৳${selectedOrder.shippingFee}`}</span>
              </div>
              <div className="flex justify-between font-bold text-sm text-gray-900 pt-2 border-t border-gray-100">
                <span>Total Paid</span>
                <span>৳{selectedOrder.total.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setSelectedOrder(null)}
                className="flex-1 bg-black text-white py-2.5 rounded-full text-xs font-bold hover:bg-gray-800"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
