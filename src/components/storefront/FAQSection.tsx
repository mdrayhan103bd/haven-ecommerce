'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageSquare, Phone, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

interface FAQItem {
  question: string;
  answer: string;
  tag: string;
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: 'ক্যাশ অন ডেলিভারিতে (Cash on Delivery) কীভাবে অর্ডার করব?',
      answer: 'খুবই সহজ! যেকোনো পণ্য "Buy with COD" অথবা "Add to Bag" এ ক্লিক করে চেকআউট পেজে আপনার নাম, মোবাইল নম্বর এবং ঠিকানা দিন। কোনো অগ্রিম পেমেন্ট ছাড়াই সরাসরি ক্যাশ অন ডেলিভারি সিলেক্ট করে অর্ডার কনফার্ম করুন।',
      tag: 'COD Order'
    },
    {
      question: 'সারা বাংলাদেশে ডেলিভারি পেতে কতদিন সময় লাগে?',
      answer: 'ঢাকা সিটির ভেতরে মাত্র ২৪ থেকে ৪৮ ঘণ্টার মধ্যে এক্সপ্রেস ডেলিভারি সম্পন্ন হয়। ঢাকার বাইরে বিভাগীয় শহর ও জেলা পর্যায়ে ২ থেকে ৪ কর্মদিবসের মধ্যে পার্সেল আপনার ঠিকানায় পৌঁছে দেওয়া হয়।',
      tag: 'Fast Delivery'
    },
    {
      question: 'ডেলিভারি ম্যানের সামনে পার্সেল চেক করে টাকা দেওয়া যাবে কি?',
      answer: 'হ্যাঁ, ১০০% নিশ্চিতভাবেই! আমাদের ডেলিভারি পার্টনার আপনার ঠিকানায় পার্সেল পৌঁছালে আপনি বক্স খুলে পণ্য দেখে ও যাচাই করে তারপর ক্যাশ পরিশোধ করতে পারবেন।',
      tag: 'Inspection'
    },
    {
      question: 'পণ্য পছন্দ না হলে বা সাইজ সমস্যা হলে কি এক্সচেঞ্জ/রিটার্ন করা যাবে?',
      answer: 'অবশ্যই! আমাদের রয়েছে ৭ দিনের সহজ রিটার্ন ও এক্সচেঞ্জ গ্যারান্টি। কোনো সমস্যা থাকলে ডেলিভারি পাওয়ার ৭ দিনের মধ্যে আমাদের কাস্টমার কেয়ারে জানালেই আমরা বিনামূল্যে এক্সচেঞ্জ বা ফুল রিফান্ডের ব্যবস্থা করি।',
      tag: '7-Day Return'
    },
    {
      question: 'ফ্রি শিপিং বা ফ্রি ডেলিভারি পেতে কত টাকার অর্ডার করতে হবে?',
      answer: 'যেকোনো ১,০০০ টাকা বা তার বেশি মূল্যের অর্ডারে সারা বাংলাদেশে সম্পূর্ণ ফ্রি ডেলিভারি সুবিধা উপভোগ করতে পারবেন!',
      tag: 'Free Shipping'
    }
  ];

  return (
    <section className="container mx-auto px-4 lg:px-8 mb-20 font-sans">
      <div className="bg-gradient-to-b from-[#FBFBFA] to-white rounded-3xl border border-gray-100 p-6 sm:p-10 shadow-xs">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 bg-black/5 text-gray-800 text-xs font-bold px-3 py-1 rounded-full mb-2">
            <HelpCircle className="w-3.5 h-3.5" /> সাধারণ প্রশ্নোত্তর
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-500 text-xs sm:text-sm mt-1">
            ক্যাশ অন ডেলিভারি, ডেলিভারি সময় ও রিটার্ন সংক্রান্ত প্রয়োজনীয় তথ্য
          </p>
        </div>

        {/* Accordion List */}
        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen 
                    ? 'bg-white border-black/20 shadow-md ring-1 ring-black/5' 
                    : 'bg-white/80 border-gray-100 hover:border-gray-200 shadow-2xs'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-3 text-xs sm:text-sm font-bold text-gray-900"
                >
                  <span className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-md bg-gray-100 text-gray-600 hidden sm:inline">
                      {faq.tag}
                    </span>
                    <span>{faq.question}</span>
                  </span>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                    isOpen ? 'bg-black text-white rotate-180' : 'bg-gray-100 text-gray-600'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-[13px] text-gray-600 leading-relaxed border-t border-gray-100 animate-in fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support Callout */}
        <div className="mt-10 pt-6 border-t border-gray-100 text-center flex flex-col sm:flex-row items-center justify-center gap-4 text-xs text-gray-500">
          <span>আরও কোনো প্রশ্ন আছে? আমাদের সাথে যোগাযোগ করুন:</span>
          <div className="flex items-center gap-3">
            <Link
              href="/help"
              className="inline-flex items-center gap-1.5 bg-black text-white px-4 py-2 rounded-full font-bold hover:bg-gray-800 transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" /> হেল্প ডেস্ক
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
