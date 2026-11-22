'use client';

import React, { useState } from 'react';
import { Product } from '@/types';
import { useStore } from '@/context/StoreContext';
import { Plus, Search, Edit2, Trash2, X, Image as ImageIcon } from 'lucide-react';

export default function DashboardProductsPage() {
  const { products, addProduct, updateProduct, deleteProduct } = useStore();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Modal States
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'Men',
    price: 89,
    oldPrice: 119,
    stock: 25,
    tag: 'New Arrival',
    tagColor: 'bg-black',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop',
    rating: 4.8,
    reviews: '120',
    description: 'Crafted with premium materials and ergonomic comfort for everyday wear.'
  });

  const categories = ['All', 'Men', 'Women', 'Electronics', 'Home & Living', 'Beauty', 'Sports'];

  const presetImages = [
    { label: 'Sneakers', url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop' },
    { label: 'Coffee Maker', url: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=600&auto=format&fit=crop' },
    { label: 'Handbag', url: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=600&auto=format&fit=crop' },
    { label: 'Desk Lamp', url: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&auto=format&fit=crop' },
    { label: 'Headphones', url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop' },
    { label: 'Linen Shirt', url: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&auto=format&fit=crop' },
  ];

  const filteredProducts = products.filter(p => {
    const matchesCat = selectedCategory === 'All' || p.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) return;
    addProduct({
      ...newProduct,
      price: Number(newProduct.price),
      oldPrice: newProduct.oldPrice ? Number(newProduct.oldPrice) : undefined,
      stock: Number(newProduct.stock)
    });
    setShowAddModal(false);
    setNewProduct({
      name: '',
      category: 'Men',
      price: 89,
      oldPrice: 119,
      stock: 25,
      tag: 'New Arrival',
      tagColor: 'bg-black',
      image: presetImages[0].url,
      rating: 4.8,
      reviews: '120',
      description: 'Crafted with premium materials and ergonomic comfort for everyday wear.'
    });
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    updateProduct(editingProduct.id, {
      name: editingProduct.name,
      category: editingProduct.category,
      price: Number(editingProduct.price),
      stock: Number(editingProduct.stock),
      description: editingProduct.description
    });
    setEditingProduct(null);
  };

  return (
    <div className="font-sans space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-gray-900 mb-1">Products & Inventory</h1>
          <p className="text-xs text-gray-500">Manage catalog, live stock, pricing, and new releases</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-black text-white px-4 py-2.5 rounded-xl text-xs font-bold hover:bg-gray-800 transition-colors flex items-center gap-2 shadow-sm"
        >
          <Plus className="w-4 h-4" /> Add New Product
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-gray-100 rounded-2xl p-4 flex flex-col sm:flex-row gap-3 shadow-sm">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search products by name..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs outline-none focus:border-black"
          />
        </div>
        <select 
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-xs outline-none focus:border-black cursor-pointer font-medium"
        >
          {categories.map(c => <option key={c} value={c}>{c === 'All' ? 'All Departments' : c}</option>)}
        </select>
      </div>

      {/* Products Table */}
      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50/70 text-gray-400 border-b border-gray-100 uppercase font-bold">
              <tr>
                <th className="px-5 py-3.5">Product</th>
                <th className="px-5 py-3.5">Category</th>
                <th className="px-5 py-3.5">Price</th>
                <th className="px-5 py-3.5">Stock Status</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredProducts.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <img 
                        src={p.image} 
                        className="w-10 h-10 rounded-xl object-contain bg-gray-50 border border-gray-100 p-1" 
                        alt={p.name} 
                      />
                      <div>
                        <div className="font-bold text-gray-900 line-clamp-1">{p.name}</div>
                        {p.tag && (
                          <span className="text-[10px] text-gray-400 font-semibold">{p.tag}</span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-gray-600 font-medium">{p.category}</td>
                  <td className="px-5 py-3.5 font-bold text-gray-900">${p.price}</td>
                  <td className="px-5 py-3.5">
                    {p.stock > 0 ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> {p.stock} available
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-red-50 text-red-700 border border-red-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span> Out of stock
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button 
                        onClick={() => setEditingProduct(p)}
                        className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" 
                        title="Edit product"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => deleteProduct(p.id)}
                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" 
                        title="Delete product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-400 text-xs">
                    No products found matching "{searchTerm}".
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setShowAddModal(false)}
              className="absolute top-5 right-5 p-1 text-gray-400 hover:text-black"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold mb-4">Add Product to Catalog</h3>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Product Title *</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Classic Organic Cotton Hoodie"
                  value={newProduct.name}
                  onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-xs outline-none focus:border-black"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Category *</label>
                  <select 
                    value={newProduct.category}
                    onChange={e => setNewProduct({ ...newProduct, category: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-xs outline-none focus:border-black bg-white"
                  >
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Home & Living">Home & Living</option>
                    <option value="Beauty">Beauty</option>
                    <option value="Sports">Sports</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Stock Count *</label>
                  <input 
                    type="number" 
                    required
                    min={0}
                    value={newProduct.stock}
                    onChange={e => setNewProduct({ ...newProduct, stock: Number(e.target.value) })}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-xs outline-none focus:border-black"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Sale Price ($) *</label>
                  <input 
                    type="number" 
                    required
                    min={1}
                    value={newProduct.price}
                    onChange={e => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-xs outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Original Price ($)</label>
                  <input 
                    type="number" 
                    value={newProduct.oldPrice}
                    onChange={e => setNewProduct({ ...newProduct, oldPrice: Number(e.target.value) })}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-xs outline-none focus:border-black"
                  />
                </div>
              </div>

              {/* Quick Pick Preset Images */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Select Preset Image or enter URL</label>
                <div className="flex gap-2 overflow-x-auto pb-2 mb-2">
                  {presetImages.map(img => (
                    <button
                      key={img.label}
                      type="button"
                      onClick={() => setNewProduct({ ...newProduct, image: img.url })}
                      className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg border whitespace-nowrap transition-colors ${
                        newProduct.image === img.url ? 'bg-black text-white border-black' : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      {img.label}
                    </button>
                  ))}
                </div>
                <input 
                  type="url" 
                  value={newProduct.image}
                  onChange={e => setNewProduct({ ...newProduct, image: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-xs outline-none focus:border-black"
                  placeholder="https://images.unsplash.com/..."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Description</label>
                <textarea 
                  rows={2}
                  value={newProduct.description}
                  onChange={e => setNewProduct({ ...newProduct, description: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl p-3 text-xs outline-none focus:border-black resize-none"
                />
              </div>

              <button 
                type="submit" 
                className="w-full bg-black text-white py-2.5 rounded-full text-xs font-bold hover:bg-gray-800 transition-colors"
              >
                Publish Product to Store
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative">
            <button 
              onClick={() => setEditingProduct(null)}
              className="absolute top-5 right-5 p-1 text-gray-400 hover:text-black"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold mb-4">Edit Product</h3>

            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Product Title</label>
                <input 
                  type="text" 
                  value={editingProduct.name}
                  onChange={e => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-xs outline-none focus:border-black"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Price ($)</label>
                  <input 
                    type="number" 
                    value={editingProduct.price}
                    onChange={e => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-xs outline-none focus:border-black"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Stock Count</label>
                  <input 
                    type="number" 
                    value={editingProduct.stock}
                    onChange={e => setEditingProduct({ ...editingProduct, stock: Number(e.target.value) })}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-xs outline-none focus:border-black"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Description</label>
                <textarea 
                  rows={2}
                  value={editingProduct.description}
                  onChange={e => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl p-3 text-xs outline-none focus:border-black resize-none"
                />
              </div>

              <button 
                type="submit" 
                className="w-full bg-black text-white py-2.5 rounded-full text-xs font-bold hover:bg-gray-800 transition-colors"
              >
                Save Product Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
