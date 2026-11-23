'use client';

import React, { useState } from 'react';
import AccountLayout from '@/components/account/AccountLayout';
import { useStore } from '@/context/StoreContext';
import { MapPin, Plus, Trash2, CheckCircle, X } from 'lucide-react';

export default function AddressesPage() {
  const { addresses, addAddress, deleteAddress, setDefaultAddress } = useStore();
  const [showModal, setShowModal] = useState(false);
  const [newAddr, setNewAddr] = useState({
    title: 'Home',
    name: '',
    phone: '',
    street: '',
    city: '',
    zip: '',
    country: 'United States',
    isDefault: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddr.name || !newAddr.street || !newAddr.city) return;
    addAddress(newAddr);
    setShowModal(false);
    setNewAddr({
      title: 'Home',
      name: '',
      phone: '',
      street: '',
      city: '',
      zip: '',
      country: 'United States',
      isDefault: false
    });
  };

  return (
    <AccountLayout title="Saved Addresses" subtitle="Manage your shipping destinations for faster checkout">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <p className="text-xs text-gray-500">You have {addresses.length} saved addresses.</p>
          <button 
            onClick={() => setShowModal(true)}
            className="bg-black text-white px-4 py-2 rounded-full text-xs font-bold hover:bg-gray-800 transition-colors flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" /> Add Address
          </button>
        </div>

        {addresses.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-gray-200 rounded-2xl p-6">
            <MapPin className="w-8 h-8 text-gray-300 mx-auto mb-2" />
            <p className="text-sm font-semibold text-gray-700">No addresses saved yet</p>
            <p className="text-xs text-gray-400 mt-1 mb-4">Add your shipping destination for faster checkout.</p>
            <button
              onClick={() => setShowModal(true)}
              className="bg-black text-white px-4 py-2 rounded-full text-xs font-bold hover:bg-gray-800 transition-colors inline-flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" /> Add Address
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {addresses.map((addr) => (
              <div 
                key={addr.id}
                className={`p-5 rounded-2xl border transition-all ${
                  addr.isDefault 
                    ? 'border-black bg-gray-50/50 shadow-sm' 
                    : 'border-gray-100 hover:border-gray-200 bg-white'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-gray-900">{addr.title}</span>
                    {addr.isDefault && (
                      <span className="bg-black text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        Default
                      </span>
                    )}
                  </div>
                  <button 
                    onClick={() => deleteAddress(addr.id)}
                    className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                    title="Delete address"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="text-xs text-gray-600 space-y-1 mb-4">
                  <div className="font-semibold text-gray-900">{addr.name}</div>
                  <div>{addr.street}</div>
                  <div>{addr.city}, {addr.zip}</div>
                  <div>{addr.country}</div>
                  <div className="text-gray-400">{addr.phone}</div>
                </div>

                {!addr.isDefault && (
                  <button
                    onClick={() => setDefaultAddress(addr.id)}
                    className="text-xs font-bold text-black hover:underline"
                  >
                    Set as Default Address
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Address Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative">
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-5 right-5 p-1 text-gray-400 hover:text-black"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold mb-4">Add New Address</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Label (e.g. Home, Office)</label>
                <input 
                  type="text" 
                  value={newAddr.title}
                  onChange={e => setNewAddr({ ...newAddr, title: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-xs outline-none focus:border-black"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Full Name</label>
                  <input 
                    type="text" 
                    value={newAddr.name}
                    onChange={e => setNewAddr({ ...newAddr, name: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-xs outline-none focus:border-black"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Phone Number</label>
                  <input 
                    type="tel" 
                    value={newAddr.phone}
                    onChange={e => setNewAddr({ ...newAddr, phone: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-xs outline-none focus:border-black"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Street Address</label>
                <input 
                  type="text" 
                  value={newAddr.street}
                  onChange={e => setNewAddr({ ...newAddr, street: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-xs outline-none focus:border-black"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">City</label>
                  <input 
                    type="text" 
                    value={newAddr.city}
                    onChange={e => setNewAddr({ ...newAddr, city: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-xs outline-none focus:border-black"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">ZIP / Postal</label>
                  <input 
                    type="text" 
                    value={newAddr.zip}
                    onChange={e => setNewAddr({ ...newAddr, zip: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-xs outline-none focus:border-black"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input 
                  type="checkbox" 
                  id="defaultAddressCheck"
                  checked={newAddr.isDefault}
                  onChange={e => setNewAddr({ ...newAddr, isDefault: e.target.checked })}
                  className="rounded border-gray-300"
                />
                <label htmlFor="defaultAddressCheck" className="text-xs text-gray-700 cursor-pointer">
                  Make this my default shipping address
                </label>
              </div>

              <button 
                type="submit" 
                className="w-full bg-black text-white py-2.5 rounded-full text-xs font-bold hover:bg-gray-800 transition-colors mt-2"
              >
                Save Address
              </button>
            </form>
          </div>
        </div>
      )}
    </AccountLayout>
  );
}
