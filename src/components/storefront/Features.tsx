import React from 'react';
import { Truck, RotateCcw, ShieldCheck, Headset, Leaf } from 'lucide-react';

const features = [
  { title: 'Free Shipping', desc: 'On orders over $50', icon: Truck },
  { title: 'Easy Returns', desc: 'Hassle-free within 30 days', icon: RotateCcw },
  { title: 'Secure Payments', desc: '100% protected', icon: ShieldCheck },
  { title: '24/7 Support', desc: 'We\'re here to help', icon: Headset },
  { title: 'Sustainable Packaging', desc: 'A greener tomorrow', icon: Leaf },
];

export default function Features() {
  return (
    <section className="border-y border-gray-100 py-6 mb-12">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-wrap lg:flex-nowrap justify-between gap-6">
          {features.map((f, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="text-gray-400"><f.icon className="w-6 h-6" /></div>
              <div>
                <div className="font-medium text-sm text-gray-900">{f.title}</div>
                <div className="text-xs text-gray-500">{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}