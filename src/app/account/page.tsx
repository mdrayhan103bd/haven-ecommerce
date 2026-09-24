'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Package, User, MapPin, CreditCard, Clock, CheckCircle } from 'lucide-react';
import { Order } from '@/types';

export default function AccountPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    // In a real app, this would fetch from an API filtering by logged-in user's ID
    const saved = localStorage.getItem('haven_orders');
    if (saved) {
      setOrders(JSON.parse(saved).reverse());
    }
  }, []);

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'Delivered': return <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold flex items-center gap-1"><CheckCircle className="w-3 h-3"/> Delivered</span>;
      case 'Shipped': return <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-bold flex items-center gap-1"><Package className="w-3 h-3"/> Shipped</span>;
      default: return <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs font-bold flex items-center gap-1"><Clock className="w-3 h-3"/> {status}</span>;
    }
  };

  return (
    <div className="container mx-auto px-4 lg:px-8 py-12 font-sans min-h-[60vh]">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="bg-gray-50 rounded-2xl p-6 mb-6">
            <div className="w-16 h-16 bg-[#BCA38F] text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4">
              JD
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">John Doe</h2>
            <p className="text-sm text-gray-500 mb-6">john.doe@example.com</p>
            
            <nav className="space-y-2">
              <Link href="/account" className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white text-gray-900 font-bold shadow-sm">
                <Package className="w-4 h-4" /> My Orders
              </Link>
              <Link href="/account/profile" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-white hover:text-gray-900 transition-colors">
                <User className="w-4 h-4" /> Personal Info
              </Link>
              <Link href="/account/addresses" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-white hover:text-gray-900 transition-colors">
                <MapPin className="w-4 h-4" /> Addresses
              </Link>
              <Link href="/account/payments" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-white hover:text-gray-900 transition-colors">
                <CreditCard className="w-4 h-4" /> Payment Methods
              </Link>
            </nav>
          </div>
          <button className="w-full text-left px-4 py-2 text-red-500 font-medium hover:bg-red-50 rounded-lg transition-colors">
            Log Out
          </button>
        </div>

        {/* Main Content (Orders) */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">My Orders</h1>
          
          {orders.length > 0 ? (
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order.id} className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                  <div className="bg-gray-50 px-6 py-4 flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 text-sm">
                    <div>
                      <div className="text-gray-500 mb-0.5">Order Number</div>
                      <div className="font-bold text-gray-900">#{order.id.substring(0, 8).toUpperCase()}</div>
                    </div>
                    <div>
                      <div className="text-gray-500 mb-0.5">Date Placed</div>
                      <div className="font-medium text-gray-900">{new Date(order.date).toLocaleDateString()}</div>
                    </div>
                    <div>
                      <div className="text-gray-500 mb-0.5">Total Amount</div>
                      <div className="font-bold text-gray-900">${order.total.toFixed(2)}</div>
                    </div>
                    <div>
                      {getStatusBadge(order.status)}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="space-y-4">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-4">
                          <img src={item.product.image} alt={item.product.name} className="w-16 h-16 object-cover rounded-xl bg-gray-50" />
                          <div className="flex-1">
                            <h4 className="font-bold text-gray-900">{item.product.name}</h4>
                            <div className="text-sm text-gray-500">Qty: {item.quantity}</div>
                          </div>
                          <div className="font-bold text-gray-900">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
              <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h2 className="text-lg font-bold text-gray-900 mb-2">No orders yet</h2>
              <p className="text-gray-500 mb-6">Looks like you haven't made your first purchase.</p>
              <Link href="/products" className="inline-block bg-black text-white px-6 py-3 rounded-full font-bold hover:bg-gray-800 transition-colors">
                Start Shopping
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
