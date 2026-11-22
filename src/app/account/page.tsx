'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Package, Clock, CheckCircle, Truck, Eye, X, ShoppingBag } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { useCart } from '@/context/CartContext';
import { Order } from '@/types';
import AccountLayout from '@/components/account/AccountLayout';

export default function AccountOrdersPage() {
  const { orders } = useStore();
  const { addToCart } = useCart();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const getStatusBadge = (status: Order['status']) => {
    switch(status) {
      case 'Delivered':
        return (
          <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 rounded-full text-[11px] font-bold flex items-center gap-1">
            <CheckCircle className="w-3 h-3" /> Delivered
          </span>
        );
      case 'Shipped':
        return (
          <span className="bg-purple-50 text-purple-700 border border-purple-200 px-2.5 py-0.5 rounded-full text-[11px] font-bold flex items-center gap-1">
            <Truck className="w-3 h-3" /> Shipped
          </span>
        );
      case 'Processing':
        return (
          <span className="bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-0.5 rounded-full text-[11px] font-bold flex items-center gap-1">
            <Package className="w-3 h-3" /> Processing
          </span>
        );
      default:
        return (
          <span className="bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-0.5 rounded-full text-[11px] font-bold flex items-center gap-1">
            <Clock className="w-3 h-3" /> Pending
          </span>
        );
    }
  };

  const handleReorder = (order: Order) => {
    order.items.forEach(item => {
      addToCart(item.product, item.quantity);
    });
  };

  return (
    <AccountLayout title="My Orders" subtitle="Track orders, view receipts, and reorder items">
      {orders.length > 0 ? (
        <div className="space-y-4">
          {orders.map((order) => (
            <div 
              key={order.id} 
              className="border border-gray-100 rounded-2xl overflow-hidden hover:border-gray-200 transition-colors shadow-sm"
            >
              {/* Order Header bar */}
              <div className="bg-gray-50/70 px-5 py-3.5 flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 text-xs">
                <div className="flex items-center gap-4">
                  <div>
                    <span className="text-gray-400 block text-[10px] uppercase font-bold">Order ID</span>
                    <span className="font-bold text-gray-900 text-sm">#{order.id}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[10px] uppercase font-bold">Date</span>
                    <span className="text-gray-700 font-medium">{new Date(order.date).toLocaleDateString()}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[10px] uppercase font-bold">Total</span>
                    <span className="font-bold text-gray-900 text-sm">${order.total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {getStatusBadge(order.status)}
                  <button 
                    onClick={() => setSelectedOrder(order)}
                    className="p-1.5 text-gray-500 hover:text-black rounded-lg hover:bg-gray-200 transition-colors"
                    title="View details"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Order Items Preview */}
              <div className="p-5">
                <div className="space-y-3">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <img 
                          src={item.product.image} 
                          alt={item.product.name} 
                          className="w-12 h-12 object-contain rounded-xl bg-gray-50 border border-gray-100 p-1 shrink-0" 
                        />
                        <div>
                          <h4 className="font-bold text-gray-900 text-xs line-clamp-1">{item.product.name}</h4>
                          <span className="text-[11px] text-gray-400">Qty: {item.quantity} • ${item.product.price} each</span>
                        </div>
                      </div>
                      <div className="font-bold text-xs text-gray-900 shrink-0">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                  <span className="text-gray-500">Paid via {order.paymentMethod}</span>
                  <button 
                    onClick={() => handleReorder(order)}
                    className="bg-gray-100 hover:bg-black hover:text-white text-gray-800 font-bold px-3.5 py-1.5 rounded-full transition-colors"
                  >
                    Buy Again
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
          <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-gray-900 mb-1">No orders yet</h3>
          <p className="text-xs text-gray-500 mb-5">You haven't placed any purchases yet.</p>
          <Link 
            href="/products" 
            className="inline-block bg-black text-white px-6 py-2.5 rounded-full text-xs font-bold hover:bg-gray-800"
          >
            Start Shopping
          </Link>
        </div>
      )}

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setSelectedOrder(null)}
              className="absolute top-5 right-5 p-1 rounded-full text-gray-400 hover:text-black"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold mb-1">Order #{selectedOrder.id} Details</h3>
            <p className="text-xs text-gray-400 mb-5">Placed on {new Date(selectedOrder.date).toLocaleString()}</p>

            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 mb-5 text-xs space-y-1.5">
              <div className="font-bold text-gray-700">Shipping To:</div>
              <div className="text-gray-800 font-medium">{selectedOrder.shippingDetails.name}</div>
              <div className="text-gray-500">{selectedOrder.shippingDetails.address}, {selectedOrder.shippingDetails.city} {selectedOrder.shippingDetails.zip}</div>
              <div className="text-gray-500">Contact: {selectedOrder.shippingDetails.email}</div>
            </div>

            <div className="space-y-3 mb-5">
              <div className="text-xs font-bold text-gray-700 uppercase">Items Purchased:</div>
              {selectedOrder.items.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs border-b border-gray-100 pb-2">
                  <div className="flex items-center gap-2">
                    <img src={item.product.image} className="w-8 h-8 rounded-lg object-contain bg-gray-50" />
                    <div>
                      <span className="font-semibold">{item.product.name}</span>
                      <span className="text-gray-400 ml-1">x{item.quantity}</span>
                    </div>
                  </div>
                  <span className="font-bold">${(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="space-y-2 text-xs border-t border-gray-100 pt-3 mb-6">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal</span>
                <span>${selectedOrder.subtotal?.toFixed(2) || selectedOrder.total.toFixed(2)}</span>
              </div>
              {selectedOrder.discount > 0 && (
                <div className="flex justify-between text-green-600 font-medium">
                  <span>Discount</span>
                  <span>-${selectedOrder.discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-gray-500">
                <span>Shipping</span>
                <span>{selectedOrder.shippingFee === 0 ? 'FREE' : `$${selectedOrder.shippingFee?.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between font-bold text-sm text-gray-900 pt-1 border-t border-gray-100">
                <span>Total Amount</span>
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
    </AccountLayout>
  );
}
