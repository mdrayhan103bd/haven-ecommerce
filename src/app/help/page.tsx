'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { HelpCircle, Mail, MessageSquare, Phone, Send, ChevronDown, ChevronUp, CheckCircle } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export default function HelpPage() {
  const { addMessage, settings } = useStore();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const faqs = [
    { q: 'How long does shipping take?', a: `Standard domestic delivery takes 3 to 5 business days. Express next-day shipping is also available at checkout. Orders over $${settings.freeShippingThreshold} ship free!` },
    { q: 'What is your return and exchange policy?', a: 'We offer a 30-day no-questions-asked return and exchange policy on all unworn items in original packaging. We provide pre-paid return labels.' },
    { q: 'Do you deliver internationally?', a: 'Yes! We ship worldwide across Europe, Asia, Australia, and the Americas with tracking provided on every shipment.' },
    { q: 'How can I track my order status?', a: 'After ordering, you will receive a confirmation email with your order ID. You can also track shipment status anytime under My Account > My Orders.' },
    { q: 'Can I apply promotional coupon codes?', a: 'Yes, you can enter any active discount code (such as WELCOME10 or HAVEN20) in the promo code box during checkout.' }
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) return;
    addMessage(contactForm);
    setSubmitted(true);
    setContactForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="container mx-auto px-4 lg:px-8 py-14 font-sans min-h-[75vh]">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-14">
        <div className="w-14 h-14 bg-gray-100 text-gray-900 rounded-full flex items-center justify-center mx-auto mb-4">
          <HelpCircle className="w-7 h-7" />
        </div>
        <h1 className="text-3xl lg:text-4xl font-serif font-bold text-gray-900 mb-2">How can we help?</h1>
        <p className="text-xs text-gray-500">Find quick answers below or reach out to our team directly</p>
      </div>

      {/* Support Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16 max-w-4xl mx-auto">
        <div className="bg-white border border-gray-100 rounded-2xl p-6 text-center shadow-sm">
          <Mail className="w-6 h-6 text-gray-700 mx-auto mb-3" />
          <h3 className="font-bold text-sm mb-1">Email Support</h3>
          <p className="text-xs text-gray-400 mb-3">Response within 24 hours</p>
          <a href={`mailto:${settings.contactEmail}`} className="text-xs font-bold text-black hover:underline">
            {settings.contactEmail}
          </a>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl p-6 text-center shadow-sm">
          <Phone className="w-6 h-6 text-gray-700 mx-auto mb-3" />
          <h3 className="font-bold text-sm mb-1">Phone Line</h3>
          <p className="text-xs text-gray-400 mb-3">Mon-Fri from 9am to 6pm EST</p>
          <a href={`tel:${settings.contactPhone}`} className="text-xs font-bold text-black hover:underline">
            {settings.contactPhone}
          </a>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl p-6 text-center shadow-sm">
          <MessageSquare className="w-6 h-6 text-gray-700 mx-auto mb-3" />
          <h3 className="font-bold text-sm mb-1">Quick Contact</h3>
          <p className="text-xs text-gray-400 mb-3">Direct message our staff</p>
          <a href="#contact-section" className="text-xs font-bold text-black hover:underline">
            Submit a Message ↓
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto items-start">
        {/* FAQs Accordion */}
        <div>
          <h2 className="text-xl font-serif font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                  <button 
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-4 text-left flex justify-between items-center gap-4 text-xs font-bold text-gray-900"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-gray-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />}
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 text-xs text-gray-500 leading-relaxed border-t border-gray-50">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Live Contact Form */}
        <div id="contact-section" className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-serif font-bold text-gray-900 mb-1">Send Us a Message</h2>
          <p className="text-xs text-gray-400 mb-6">We'd love to assist with sizing, orders, or custom requests</p>

          {submitted ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center text-xs">
              <CheckCircle className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
              <h4 className="font-bold text-emerald-900 text-sm mb-1">Message Sent Successfully!</h4>
              <p className="text-emerald-700 mb-4">Our customer support specialists will reply to your email shortly.</p>
              <button 
                onClick={() => setSubmitted(false)}
                className="bg-black text-white px-4 py-2 rounded-full text-xs font-bold hover:bg-gray-800"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Your Name *</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Alex Morgan"
                  value={contactForm.name}
                  onChange={e => setContactForm({ ...contactForm, name: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address *</label>
                <input 
                  type="email" 
                  required
                  placeholder="e.g. alex@example.com"
                  value={contactForm.email}
                  onChange={e => setContactForm({ ...contactForm, email: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Subject</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Question about my order delivery"
                  value={contactForm.subject}
                  onChange={e => setContactForm({ ...contactForm, subject: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Message *</label>
                <textarea 
                  rows={4}
                  required
                  placeholder="Describe your question or issue in detail..."
                  value={contactForm.message}
                  onChange={e => setContactForm({ ...contactForm, message: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl p-3 text-xs outline-none focus:border-black resize-none"
                />
              </div>

              <button 
                type="submit" 
                className="w-full bg-black text-white py-3 rounded-full text-xs font-bold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <Send className="w-3.5 h-3.5" /> Submit Inquiry
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
