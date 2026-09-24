import React from 'react';

export default function PaymentsPage() {
  return (
    <div className="p-8 font-sans">
      <h1 className="text-2xl font-bold mb-4">Payment Methods</h1>
      <div className="bg-white p-8 rounded-2xl border border-gray-100">
        <p className="text-gray-500">Manage your saved credit cards and payment options.</p>
        <button className="mt-4 bg-black text-white px-4 py-2 rounded-lg">Add Payment Method</button>
      </div>
    </div>
  );
}
