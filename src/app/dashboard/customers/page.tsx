'use client';

import React, { useState, useMemo } from 'react';
import { useStore } from '@/context/StoreContext';
import { Customer } from '@/types';
import { Search, Mail, Phone, MapPin, Eye, X, ShoppingBag } from 'lucide-react';

export default function DashboardCustomersPage() {
  const { orders } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  // Compute customers from all orders
  const customersList: Customer[] = useMemo(() => {
    const customerMap = new Map<string, Customer>();

    // Initial mock base customers
    const baseCustomers: Customer[] = [
      { id: 'c-1', name: 'Sarah Jenkins', email: 'sarah.j@example.com', phone: '+880 1711-234567', location: 'Dhaka, Bangladesh', orders: 4, spent: 14890, status: 'Active' },
      { id: 'c-2', name: 'Michael Chen', email: 'm.chen@example.com', phone: '+880 1819-876543', location: 'Chittagong, Bangladesh', orders: 8, spent: 42500, status: 'VIP' },
      { id: 'c-3', name: 'Emily Davis', email: 'emily.d@example.com', phone: '+880 1912-345678', location: 'Sylhet, Bangladesh', orders: 12, spent: 68400, status: 'VIP' },
      { id: 'c-4', name: 'Marcus Vance', email: 'marcus.v@example.com', phone: '+880 1610-987654', location: 'Dhaka, Bangladesh', orders: 2, spent: 7800, status: 'Active' },
      { id: 'c-5', name: 'Clara Oswald', email: 'clara.o@example.com', phone: '+880 1515-123456', location: 'Khulna, Bangladesh', orders: 1, spent: 2450, status: 'Active' }
    ];

    baseCustomers.forEach(c => customerMap.set(c.email.toLowerCase(), c));

    // Aggregate from actual placed orders
    orders.forEach(o => {
      const email = o.shippingDetails.email.toLowerCase();
      if (customerMap.has(email)) {
        const existing = customerMap.get(email)!;
        existing.orders += 1;
        existing.spent += o.total;
        if (existing.spent > 15000) existing.status = 'VIP';
      } else {
        customerMap.set(email, {
          id: `cust-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          name: o.shippingDetails.name,
          email: o.shippingDetails.email,
          phone: o.shippingDetails.phone || '+880 1700-000000',
          location: `${o.shippingDetails.city}, ${o.shippingDetails.country || 'Bangladesh'}`,
          orders: 1,
          spent: o.total,
          status: o.total > 10000 ? 'VIP' : 'Active'
        });
      }
    });

    return Array.from(customerMap.values());
  }, [orders]);

  const filtered = customersList.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'VIP': return 'bg-purple-50 text-purple-700 border-purple-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="font-sans space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-gray-900 mb-1">Customers</h1>
          <p className="text-xs text-gray-500">View customer database, spending insights, and purchase history</p>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
        {/* Search header */}
        <div className="p-4 border-b border-gray-100">
          <div className="max-w-md relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search customers by name, email, or city..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs outline-none focus:border-black"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50/70 text-gray-400 border-b border-gray-100 uppercase font-bold">
              <tr>
                <th className="px-5 py-3.5">Customer</th>
                <th className="px-5 py-3.5">Location</th>
                <th className="px-5 py-3.5">Orders</th>
                <th className="px-5 py-3.5">Total Spent</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs shrink-0">
                        {c.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">{c.name}</div>
                        <div className="text-[11px] text-gray-400 flex items-center gap-1 mt-0.5">
                          <Mail className="w-3 h-3" /> {c.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-gray-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-gray-400" /> {c.location}
                    </div>
                  </td>
                  <td className="px-5 py-3.5 font-bold text-gray-900">{c.orders}</td>
                  <td className="px-5 py-3.5 font-bold text-gray-900">৳{c.spent.toLocaleString()}</td>
                  <td className="px-5 py-3.5">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getStatusColor(c.status)}`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <button 
                      onClick={() => setSelectedCustomer(c)}
                      className="p-1.5 text-gray-400 hover:text-black hover:bg-gray-100 rounded-lg transition-colors"
                      title="View customer profile"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-400 text-xs">
                    No customers found matching "{searchTerm}".
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative">
            <button 
              onClick={() => setSelectedCustomer(null)}
              className="absolute top-5 right-5 p-1 text-gray-400 hover:text-black"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-base">
                {selectedCustomer.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-bold text-base text-gray-900">{selectedCustomer.name}</h3>
                <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold border ${getStatusColor(selectedCustomer.status)}`}>
                  {selectedCustomer.status} Customer
                </span>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 space-y-2 text-xs mb-5">
              <div className="flex items-center gap-2 text-gray-600">
                <Mail className="w-3.5 h-3.5 text-gray-400" /> {selectedCustomer.email}
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Phone className="w-3.5 h-3.5 text-gray-400" /> {selectedCustomer.phone}
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-3.5 h-3.5 text-gray-400" /> {selectedCustomer.location}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 text-center">
                <span className="text-[10px] uppercase text-gray-400 font-bold block">Total Purchases</span>
                <span className="text-xl font-bold text-gray-900">{selectedCustomer.orders} Orders</span>
              </div>
              <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 text-center">
                <span className="text-[10px] uppercase text-gray-400 font-bold block">Lifetime Value</span>
                <span className="text-xl font-bold text-emerald-600">৳{selectedCustomer.spent.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedCustomer(null)}
              className="w-full bg-black text-white py-2.5 rounded-full text-xs font-bold hover:bg-gray-800"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
