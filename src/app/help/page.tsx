import React from 'react';
import Link from 'next/link';
import { HelpCircle, Mail, MessageSquare, Phone } from 'lucide-react';

export default function HelpPage() {
  const faqs = [
    { q: 'How long does shipping take?', a: 'Standard shipping takes 3-5 business days. Express shipping takes 1-2 business days.' },
    { q: 'Can I return an item?', a: 'Yes, we accept returns within 30 days of delivery. The item must be unused and in original packaging.' },
    { q: 'Do you ship internationally?', a: 'Currently we only ship within the US and Canada. We are working on expanding our delivery zones.' },
    { q: 'How can I track my order?', a: 'Once your order ships, you will receive a tracking number via email. You can also view it in your Account Dashboard.' },
  ];

  return (
    <div className="container mx-auto px-4 lg:px-8 py-16 font-sans">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <HelpCircle className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">How can we help?</h1>
        <p className="text-lg text-gray-500">Search our FAQ or reach out to our support team directly.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 max-w-5xl mx-auto">
        <div className="bg-white border border-gray-100 rounded-2xl p-8 text-center hover:shadow-sm transition-shadow">
          <Mail className="w-8 h-8 text-gray-400 mx-auto mb-4" />
          <h3 className="font-bold text-lg mb-2">Email Support</h3>
          <p className="text-sm text-gray-500 mb-4">We aim to respond within 24 hours.</p>
          <a href="mailto:support@haven.com" className="text-black font-medium hover:underline">support@haven.com</a>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl p-8 text-center hover:shadow-sm transition-shadow">
          <MessageSquare className="w-8 h-8 text-gray-400 mx-auto mb-4" />
          <h3 className="font-bold text-lg mb-2">Live Chat</h3>
          <p className="text-sm text-gray-500 mb-4">Available 9am-5pm EST, Mon-Fri.</p>
          <button className="text-black font-medium hover:underline">Start a Chat</button>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl p-8 text-center hover:shadow-sm transition-shadow">
          <Phone className="w-8 h-8 text-gray-400 mx-auto mb-4" />
          <h3 className="font-bold text-lg mb-2">Phone Support</h3>
          <p className="text-sm text-gray-500 mb-4">Call us for urgent inquiries.</p>
          <a href="tel:1-800-HAVEN" className="text-black font-medium hover:underline">1-800-123-4567</a>
        </div>
      </div>

      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-gray-50 rounded-2xl p-6">
              <h4 className="font-bold text-gray-900 mb-2 text-lg">{faq.q}</h4>
              <p className="text-gray-600">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
