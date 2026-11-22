'use client';

import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { Megaphone, Mail, Send, Users, CheckCircle, Bell, ArrowRight, X } from 'lucide-react';

export default function MarketingPage() {
  const { settings, updateSettings, showToast } = useStore();

  const [announcementText, setAnnouncementText] = useState(settings.announcementText);
  const [announcementEnabled, setAnnouncementEnabled] = useState(settings.announcementEnabled);

  // Email Campaign Modal
  const [showBroadcastModal, setShowBroadcastModal] = useState(false);
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');

  // Sample Subscribers
  const [subscribers, setSubscribers] = useState([
    { email: 'alex.rivera@example.com', date: '2026-09-18', status: 'Subscribed' },
    { email: 'sarah.jenkins@example.com', date: '2026-09-14', status: 'Subscribed' },
    { email: 'michael.chen@example.com', date: '2026-09-10', status: 'Subscribed' },
    { email: 'emily.davis@example.com', date: '2026-09-02', status: 'Subscribed' },
    { email: 'david.kim@example.com', date: '2026-08-28', status: 'Subscribed' }
  ]);

  const handleSaveAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      announcementText,
      announcementEnabled
    });
    showToast('Store announcement banner updated live!');
  };

  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailSubject || !emailBody) return;
    showToast(`Broadcast campaign "${emailSubject}" sent to ${subscribers.length} subscribers!`);
    setShowBroadcastModal(false);
    setEmailSubject('');
    setEmailBody('');
  };

  return (
    <div className="font-sans space-y-8 max-w-5xl">
      <div>
        <h1 className="text-2xl font-serif font-bold text-gray-900 mb-1">Marketing & Campaigns</h1>
        <p className="text-xs text-gray-500">Manage site-wide announcement banners, campaigns, and customer emails</p>
      </div>

      {/* 1. Live Store Announcement Banner Controller */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Megaphone className="w-5 h-5 text-gray-700" />
          <h2 className="text-base font-bold text-gray-900">Header Announcement Banner</h2>
        </div>
        <p className="text-xs text-gray-500 mb-4">
          This message is displayed prominently at the very top of your store on every page.
        </p>

        <form onSubmit={handleSaveAnnouncement} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Banner Announcement Text</label>
            <input 
              type="text" 
              value={announcementText}
              onChange={e => setAnnouncementText(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-black"
              required
            />
          </div>

          <div className="flex items-center gap-2">
            <input 
              type="checkbox" 
              id="announcementToggle"
              checked={announcementEnabled}
              onChange={e => setAnnouncementEnabled(e.target.checked)}
              className="rounded border-gray-300"
            />
            <label htmlFor="announcementToggle" className="text-xs font-semibold text-gray-800 cursor-pointer">
              Enable announcement bar on storefront
            </label>
          </div>

          <button 
            type="submit" 
            className="bg-black text-white px-5 py-2.5 rounded-full text-xs font-bold hover:bg-gray-800 transition-colors"
          >
            Save & Publish Banner
          </button>
        </form>
      </div>

      {/* 2. Active Promotional Campaigns */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <h2 className="text-base font-bold text-gray-900 mb-4">Active Campaigns & Promotions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-gray-200 rounded-xl p-4 bg-gray-50/50">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              Live Now
            </span>
            <h4 className="font-bold text-sm text-gray-900 mt-2 mb-1">Welcome Discount</h4>
            <p className="text-xs text-gray-500">New visitors receive 10% off with coupon code WELCOME10.</p>
          </div>

          <div className="border border-gray-200 rounded-xl p-4 bg-gray-50/50">
            <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">
              Automated
            </span>
            <h4 className="font-bold text-sm text-gray-900 mt-2 mb-1">Free Delivery Threshold</h4>
            <p className="text-xs text-gray-500">Free shipping automatically applied on orders over ${settings.freeShippingThreshold}.</p>
          </div>

          <div className="border border-gray-200 rounded-xl p-4 bg-gray-50/50">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
              Seasonal
            </span>
            <h4 className="font-bold text-sm text-gray-900 mt-2 mb-1">HAVEN20 Flash Sale</h4>
            <p className="text-xs text-gray-500">20% off high ticket items over $100 with code HAVEN20.</p>
          </div>
        </div>
      </div>

      {/* 3. Newsletter Email Subscribers */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
          <div>
            <h2 className="text-base font-bold text-gray-900">Email Subscribers ({subscribers.length})</h2>
            <p className="text-xs text-gray-400">Audience who subscribed to product drops and news</p>
          </div>
          <button 
            onClick={() => setShowBroadcastModal(true)}
            className="bg-black text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-gray-800 transition-colors flex items-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" /> Send Campaign Email
          </button>
        </div>

        <div className="border border-gray-100 rounded-xl overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-400 font-bold uppercase">
              <tr>
                <th className="px-4 py-2.5">Email</th>
                <th className="px-4 py-2.5">Date Subscribed</th>
                <th className="px-4 py-2.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {subscribers.map((s, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-4 py-2.5 font-medium text-gray-900">{s.email}</td>
                  <td className="px-4 py-2.5 text-gray-500">{s.date}</td>
                  <td className="px-4 py-2.5">
                    <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {s.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Broadcast Campaign Email Modal */}
      {showBroadcastModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl relative font-sans">
            <button 
              onClick={() => setShowBroadcastModal(false)}
              className="absolute top-5 right-5 p-1 text-gray-400 hover:text-black"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold mb-1">Send Newsletter Campaign</h3>
            <p className="text-xs text-gray-400 mb-4">Deliver a direct message to all {subscribers.length} subscribed shoppers</p>

            <form onSubmit={handleSendBroadcast} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Email Subject Line</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Exclusive Weekend Drop: 20% Off New Footwear"
                  value={emailSubject}
                  onChange={e => setEmailSubject(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-xs outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Email Message Content</label>
                <textarea 
                  rows={4}
                  required
                  placeholder="Write your email body here..."
                  value={emailBody}
                  onChange={e => setEmailBody(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl p-3 text-xs outline-none focus:border-black resize-none"
                />
              </div>

              <button 
                type="submit" 
                className="w-full bg-black text-white py-2.5 rounded-full text-xs font-bold hover:bg-gray-800 transition-colors"
              >
                Send Email to {subscribers.length} Subscribers
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
