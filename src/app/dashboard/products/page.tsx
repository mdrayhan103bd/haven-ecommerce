'use client';

import React, { useState } from 'react';
import { Product } from '@/types';
import { Plus, Search, Edit2, Trash2, MoreVertical } from 'lucide-react';

const mockProducts: Product[] = [
  { id: '1', name: 'UrbanEase Sneakers', category: 'Men', stock: 124, price: 79, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&auto=format&fit=crop' },
  { id: '2', name: 'BrewMaster Coffee Machine', category: 'Home & Living', stock: 12, price: 129, image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=100&auto=format&fit=crop' },
  { id: '3', name: 'Luxe Curve Handbag', category: 'Women', stock: 45, price: 89, image: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=100&auto=format&fit=crop' },
  { id: '4', name: 'Minimalist Desk Lamp', category: 'Home & Living', stock: 89, price: 45, image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=100&auto=format&fit=crop' },
  { id: '5', name: 'Ergonomic Office Chair', category: 'Home & Living', stock: 0, price: 299, image: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=100&auto=format&fit=crop' },
  { id: '6', name: 'Noise-Cancelling Headphones', category: 'Electronics', stock: 32, price: 199, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&auto=format&fit=crop' },
];

export default function DashboardProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = mockProducts.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Products</h1>
          <p className="text-sm text-gray-500">Manage your store's products and inventory.</p>
        </div>
        <button className="bg-[#2c2a29] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-black flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex gap-4">
          <div className="flex-1 max-w-md relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-black transition-colors"
            />
          </div>
          <select className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm outline-none focus:border-black cursor-pointer">
            <option>All Categories</option>
            <option>Men</option>
            <option>Women</option>
            <option>Electronics</option>
            <option>Home & Living</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50/50 text-gray-500 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 font-medium">Product</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Stock</th>
                <th className="px-6 py-4 font-medium">Price</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredProducts.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={p.image} className="w-10 h-10 rounded-lg object-cover bg-gray-100 border border-gray-200" alt={p.name} />
                      <span className="font-bold text-gray-900">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{p.category}</td>
                  <td className="px-6 py-4">
                    {p.stock! > 0 ? (
                      <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium bg-green-50 text-green-600 border border-green-100">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> {p.stock} in stock
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium bg-red-50 text-red-600 border border-red-100">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span> Out of stock
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 font-bold text-gray-900">${p.price}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 text-gray-400 hover:text-blue-500 transition-colors" title="Edit"><Edit2 className="w-4 h-4" /></button>
                      <button className="p-1.5 text-gray-400 hover:text-red-500 transition-colors" title="Delete"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    No products found matching "{searchTerm}"
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
