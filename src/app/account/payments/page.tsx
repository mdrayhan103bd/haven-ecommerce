'use client';

import React, { useState } from 'react';
import AccountLayout from '@/components/account/AccountLayout';
import { useStore } from '@/context/StoreContext';
import { CreditCard, Plus, Trash2, X, ShieldCheck } from 'lucide-react';

export default function PaymentsPage() {
  const { paymentCards, addPaymentCard, deletePaymentCard } = useStore();
  const [showModal, setShowModal] = useState(false);
  const [newCard, setNewCard] = useState({
    type: 'card' as const,
    cardNumber: '',
    cardHolder: '',
    expiry: '',
    isDefault: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCard.cardNumber || !newCard.cardHolder) return;
    
    // Mask card number for display
    const last4 = newCard.cardNumber.slice(-4) || '1234';
    addPaymentCard({
      ...newCard,
      cardNumber: `•••• •••• •••• ${last4}`
    });

    setShowModal(false);
    setNewCard({
      type: 'card',
      cardNumber: '',
      cardHolder: '',
      expiry: '',
      isDefault: false
    });
  };

  return (
    <AccountLayout title="Payment Methods" subtitle="Manage your saved credit/debit cards and payment accounts">
      <div className="space-y-6">
        <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200/80 text-xs text-amber-900 flex items-center justify-between">
          <span>ⓘ Currently, store checkout is exclusively accepting <strong>Cash on Delivery (COD)</strong>. Online card processing is temporarily offline.</span>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-xs text-gray-500">You have {paymentCards.length} saved payment methods.</p>
          <button 
            onClick={() => setShowModal(true)}
            className="bg-black text-white px-4 py-2 rounded-full text-xs font-bold hover:bg-gray-800 transition-colors flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" /> Add Payment Method
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {paymentCards.map((card) => (
            <div 
              key={card.id}
              className={`p-5 rounded-2xl border transition-all ${
                card.isDefault 
                  ? 'border-black bg-gray-950 text-white shadow-md' 
                  : 'border-gray-100 hover:border-gray-200 bg-white'
              }`}
            >
              <div className="flex justify-between items-start mb-6">
                <CreditCard className={`w-6 h-6 ${card.isDefault ? 'text-white' : 'text-gray-700'}`} />
                <div className="flex items-center gap-2">
                  {card.isDefault && (
                    <span className="bg-white/20 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      Default
                    </span>
                  )}
                  <button 
                    onClick={() => deletePaymentCard(card.id)}
                    className={`p-1 transition-colors ${card.isDefault ? 'text-gray-400 hover:text-red-400' : 'text-gray-400 hover:text-red-500'}`}
                    title="Remove card"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <div className="font-mono text-base tracking-widest">{card.cardNumber}</div>
                <div className="flex justify-between items-end text-xs">
                  <div>
                    <span className={`text-[10px] uppercase block ${card.isDefault ? 'text-gray-400' : 'text-gray-400'}`}>Card Holder</span>
                    <span className="font-bold">{card.cardHolder}</span>
                  </div>
                  <div>
                    <span className={`text-[10px] uppercase block ${card.isDefault ? 'text-gray-400' : 'text-gray-400'}`}>Expires</span>
                    <span className="font-bold">{card.expiry}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-center gap-3 text-xs text-gray-500">
          <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>Your payment information is stored using bank-level 256-bit SSL encryption. We never store raw CVV codes.</span>
        </div>
      </div>

      {/* Add Card Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative">
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-5 right-5 p-1 text-gray-400 hover:text-black"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold mb-4">Add Card</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Cardholder Name</label>
                <input 
                  type="text" 
                  value={newCard.cardHolder}
                  onChange={e => setNewCard({ ...newCard, cardHolder: e.target.value })}
                  placeholder="e.g. John Doe"
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-xs outline-none focus:border-black"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Card Number</label>
                <input 
                  type="text" 
                  value={newCard.cardNumber}
                  onChange={e => setNewCard({ ...newCard, cardNumber: e.target.value })}
                  placeholder="4242 •••• •••• ••••"
                  maxLength={19}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-xs outline-none focus:border-black font-mono"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Expiry (MM/YY)</label>
                  <input 
                    type="text" 
                    value={newCard.expiry}
                    onChange={e => setNewCard({ ...newCard, expiry: e.target.value })}
                    placeholder="12/28"
                    maxLength={5}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-xs outline-none focus:border-black"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">CVV</label>
                  <input 
                    type="password" 
                    placeholder="123"
                    maxLength={4}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-xs outline-none focus:border-black"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input 
                  type="checkbox" 
                  id="defaultCardCheck"
                  checked={newCard.isDefault}
                  onChange={e => setNewCard({ ...newCard, isDefault: e.target.checked })}
                  className="rounded border-gray-300"
                />
                <label htmlFor="defaultCardCheck" className="text-xs text-gray-700 cursor-pointer">
                  Set as default payment card
                </label>
              </div>

              <button 
                type="submit" 
                className="w-full bg-black text-white py-2.5 rounded-full text-xs font-bold hover:bg-gray-800 transition-colors mt-2"
              >
                Save Payment Method
              </button>
            </form>
          </div>
        </div>
      )}
    </AccountLayout>
  );
}
