import React from 'react';

export default function AddressesPage() {
  return (
    <div className="p-8 font-sans">
      <h1 className="text-2xl font-bold mb-4">Addresses</h1>
      <div className="bg-white p-8 rounded-2xl border border-gray-100">
        <p className="text-gray-500">Your shipping and billing addresses.</p>
        <button className="mt-4 bg-black text-white px-4 py-2 rounded-lg">Add New Address</button>
      </div>
    </div>
  );
}
