'use client';

import React, { useState } from 'react';
import { Search, Mail, Phone, MapPin } from 'lucide-react';

const mockCustomers = [
  { id: '1', name: 'John Doe', email: 'john@example.com', phone: '+1 234 567 890', location: 'New York, USA', orders: 12, spent: 1250, status: 'Active' },
  { id: '2', name: 'Jane Smith', email: 'jane.smith@example.com', phone: '+44 20 7123 4567', location: 'London, UK', orders: 5, spent: 450, status: 'Active' },
  { id: '3', name: 'Robert Johnson', email: 'robert.j@example.com', phone: '+1 555 123 4567', location: 'San Francisco, USA', orders: 1, spent: 89, status: 'Inactive' },
  { id: '4', name: 'Emily Davis', email: 'emily.d@example.com', phone: '+61 2 9876 5432', location: 'Sydney, AU', orders: 24, spent: 3450, status: 'VIP' },
  { id: '5', name: 'Michael Wilson', email: 'm.wilson@example.com', phone: '+1 415 987 6543', location: 'Chicago, USA', orders: 3, spent: 210, status: 'Active' },
];

export default function DashboardCustomersPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = mockCustomers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-50 text-green-600 border-green-100';
      case 'Inactive': return 'bg-gray-50 text-gray-600 border-gray-200';
      case 'VIP': return 'bg-purple-50 text-purple-600 border-purple-100';
      default: return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Customers</h1>
        <p className="text-sm text-gray-500">View and manage your customer database.</p>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex gap-4">
          <div className="flex-1 max-w-md relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search customers by name or email..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-black transition-colors"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50/50 text-gray-500 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 font-medium">Customer</th>
                <th className="px-6 py-4 font-medium">Location</th>
                <th className="px-6 py-4 font-medium">Orders</th>
                <th className="px-6 py-4 font-medium">Total Spent</th>
                <th className="px-6 py-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
                        {c.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">{c.name}</div>
                        <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                          <Mail className="w-3 h-3" /> {c.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-gray-600">
                      <MapPin className="w-4 h-4 text-gray-400" /> {c.location}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-900 font-medium">{c.orders}</td>
                  <td className="px-6 py-4 font-bold text-gray-900">${c.spent}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(c.status)}`}>
                      {c.status}
                    </span>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    No customers found matching "{searchTerm}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
