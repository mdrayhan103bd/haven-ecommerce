'use client';

import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { SupportMessage } from '@/types';
import { MessageSquare, Mail, Reply, Trash2, X, Send, CheckCircle, Clock } from 'lucide-react';

export default function MessagesPage() {
  const { messages, replyToMessage, deleteMessage } = useStore();
  const [selectedMessage, setSelectedMessage] = useState<SupportMessage | null>(null);
  const [replyText, setReplyText] = useState('');

  const unreadCount = messages.filter(m => m.status === 'unread').length;

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMessage || !replyText.trim()) return;
    replyToMessage(selectedMessage.id, replyText);
    setSelectedMessage(null);
    setReplyText('');
  };

  return (
    <div className="font-sans space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-serif font-bold text-gray-900 mb-1">Customer Support Inbox</h1>
          <p className="text-xs text-gray-500">
            {unreadCount > 0 ? `${unreadCount} unread customer inquiries waiting for reply` : 'All customer messages are answered'}
          </p>
        </div>
      </div>

      {/* Messages List */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
        {messages.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {messages.map((msg) => (
              <div 
                key={msg.id}
                onClick={() => setSelectedMessage(msg)}
                className={`p-4 sm:p-5 flex items-start justify-between gap-4 cursor-pointer transition-colors ${
                  msg.status === 'unread' ? 'bg-blue-50/30 hover:bg-blue-50/50' : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-start gap-3.5 min-w-0">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                    msg.status === 'unread' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {msg.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-bold text-xs text-gray-900">{msg.name}</span>
                      <span className="text-[11px] text-gray-400">({msg.email})</span>
                      {msg.status === 'unread' && (
                        <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                      )}
                    </div>
                    <h4 className="font-semibold text-xs text-gray-800 truncate mb-1">{msg.subject}</h4>
                    <p className="text-xs text-gray-500 line-clamp-1">{msg.message}</p>
                    {msg.reply && (
                      <div className="mt-2 text-[11px] text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md inline-flex items-center gap-1 font-medium">
                        <CheckCircle className="w-3 h-3" /> Replied: "{msg.reply}"
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 text-right">
                  <span className="text-[10px] text-gray-400">
                    {new Date(msg.date).toLocaleDateString()}
                  </span>
                  <button 
                    onClick={(e) => { e.stopPropagation(); deleteMessage(msg.id); }}
                    className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                    title="Delete message"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-gray-400 text-xs">
            <Mail className="w-10 h-10 mx-auto mb-2 text-gray-300" />
            Your inbox is empty. No customer inquiries at the moment.
          </div>
        )}
      </div>

      {/* Message & Reply Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl relative font-sans max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setSelectedMessage(null)}
              className="absolute top-5 right-5 p-1 text-gray-400 hover:text-black"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-sm">
                {selectedMessage.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-bold text-sm text-gray-900">{selectedMessage.name}</h3>
                <p className="text-xs text-gray-400">{selectedMessage.email}</p>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 mb-5 space-y-2">
              <div className="text-xs font-bold text-gray-800">{selectedMessage.subject}</div>
              <p className="text-xs text-gray-600 leading-relaxed">{selectedMessage.message}</p>
              <span className="text-[10px] text-gray-400 block pt-1">
                Received on {new Date(selectedMessage.date).toLocaleString()}
              </span>
            </div>

            {/* Existing reply preview */}
            {selectedMessage.reply && (
              <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl mb-4 text-xs text-emerald-900">
                <span className="font-bold block mb-1">Previous Reply Sent:</span>
                <p>{selectedMessage.reply}</p>
              </div>
            )}

            {/* Reply Form */}
            <form onSubmit={handleSendReply} className="space-y-3">
              <label className="block text-xs font-bold text-gray-700">Write Reply to Customer</label>
              <textarea 
                rows={4}
                required
                value={replyText}
                onChange={e => setReplyText(e.target.value)}
                placeholder="Type your response to the customer..."
                className="w-full border border-gray-200 rounded-xl p-3 text-xs outline-none focus:border-black resize-none"
              />
              <button 
                type="submit" 
                className="w-full bg-black text-white py-2.5 rounded-full text-xs font-bold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" /> Send Response Email
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
