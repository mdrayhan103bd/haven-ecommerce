'use client';

import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { FileText, Save, Plus, Trash2, CheckCircle, HelpCircle, Layers } from 'lucide-react';

export default function ContentPage() {
  const { showToast } = useStore();

  const [heroContent, setHeroContent] = useState({
    tag: 'Sustainable Living',
    headline: 'Good Things. Brighter Days.',
    subheadline: 'Carefully curated essentials designed for intentional, sustainable living. Explore our timeless collections.',
    ctaText: 'Discover Collection'
  });

  const [faqs, setFaqs] = useState([
    { q: 'How long does shipping take?', a: 'Standard shipping takes 3-5 business days. Express shipping takes 1-2 business days.' },
    { q: 'What is your return policy?', a: 'We accept returns within 30 days of delivery. The item must be unused and in original packaging.' },
    { q: 'Do you offer worldwide shipping?', a: 'Yes, we ship internationally to over 50 countries with tracking included.' },
    { q: 'How can I track my order?', a: 'Once your order is processed, tracking details are sent via email and can be viewed in your account.' }
  ]);

  const [newFaq, setNewFaq] = useState({ q: '', a: '' });
  const [showAddFaq, setShowAddFaq] = useState(false);

  const handleSaveHero = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Homepage hero content updated successfully!');
  };

  const handleAddFaq = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFaq.q || !newFaq.a) return;
    setFaqs([...faqs, newFaq]);
    setNewFaq({ q: '', a: '' });
    setShowAddFaq(false);
    showToast('New FAQ added!');
  };

  const handleDeleteFaq = (index: number) => {
    setFaqs(faqs.filter((_, i) => i !== index));
    showToast('FAQ removed', 'info');
  };

  return (
    <div className="font-sans space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl font-serif font-bold text-gray-900 mb-1">Content Management</h1>
        <p className="text-xs text-gray-500">Edit storefront messaging, homepage hero copy, and FAQ questions</p>
      </div>

      {/* 1. Hero Copy Settings */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Layers className="w-5 h-5 text-gray-700" />
          <h2 className="text-base font-bold text-gray-900">Homepage Hero Banner Content</h2>
        </div>

        <form onSubmit={handleSaveHero} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Tagline Pill</label>
              <input 
                type="text" 
                value={heroContent.tag}
                onChange={e => setHeroContent({ ...heroContent, tag: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-3.5 py-2 text-xs outline-none focus:border-black"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Main Headline</label>
              <input 
                type="text" 
                value={heroContent.headline}
                onChange={e => setHeroContent({ ...heroContent, headline: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-3.5 py-2 text-xs outline-none focus:border-black font-bold"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Subheadline Description</label>
            <textarea 
              rows={2}
              value={heroContent.subheadline}
              onChange={e => setHeroContent({ ...heroContent, subheadline: e.target.value })}
              className="w-full border border-gray-200 rounded-xl p-3 text-xs outline-none focus:border-black resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Button Call to Action</label>
            <input 
              type="text" 
              value={heroContent.ctaText}
              onChange={e => setHeroContent({ ...heroContent, ctaText: e.target.value })}
              className="w-full sm:w-64 border border-gray-200 rounded-xl px-3.5 py-2 text-xs outline-none focus:border-black"
            />
          </div>

          <button 
            type="submit" 
            className="bg-black text-white px-5 py-2.5 rounded-full text-xs font-bold hover:bg-gray-800 transition-colors flex items-center gap-2"
          >
            <Save className="w-3.5 h-3.5" /> Save Hero Copy
          </button>
        </form>
      </div>

      {/* 2. FAQs Manager */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-gray-700" />
            <h2 className="text-base font-bold text-gray-900">Help Center FAQ Items ({faqs.length})</h2>
          </div>
          <button 
            onClick={() => setShowAddFaq(true)}
            className="bg-black text-white px-3.5 py-1.5 rounded-xl text-xs font-bold hover:bg-gray-800 transition-colors flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" /> Add FAQ
          </button>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border border-gray-100 rounded-xl p-4 bg-gray-50/50 flex justify-between items-start gap-4">
              <div>
                <h4 className="font-bold text-xs text-gray-900 mb-1">{faq.q}</h4>
                <p className="text-xs text-gray-500 leading-relaxed">{faq.a}</p>
              </div>
              <button 
                onClick={() => handleDeleteFaq(idx)}
                className="p-1 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors shrink-0"
                title="Delete FAQ"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Add FAQ Form */}
        {showAddFaq && (
          <form onSubmit={handleAddFaq} className="mt-4 p-4 border border-gray-200 rounded-xl bg-white space-y-3">
            <h4 className="font-bold text-xs text-gray-900">New FAQ Question</h4>
            <div>
              <input 
                type="text" 
                required
                placeholder="Question (e.g. Do you offer gift wrapping?)"
                value={newFaq.q}
                onChange={e => setNewFaq({ ...newFaq, q: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs outline-none focus:border-black"
              />
            </div>
            <div>
              <textarea 
                rows={2}
                required
                placeholder="Answer text..."
                value={newFaq.a}
                onChange={e => setNewFaq({ ...newFaq, a: e.target.value })}
                className="w-full border border-gray-200 rounded-lg p-3 text-xs outline-none focus:border-black resize-none"
              />
            </div>
            <div className="flex gap-2">
              <button 
                type="submit" 
                className="bg-black text-white px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-gray-800"
              >
                Add Question
              </button>
              <button 
                type="button" 
                onClick={() => setShowAddFaq(false)}
                className="bg-gray-100 text-gray-600 px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-gray-200"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
