import React from 'react';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export default function CheckoutSuccessPage() {
  return (
    <div className="container mx-auto px-4 py-32 flex flex-col items-center text-center">
      <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
        <CheckCircle className="w-10 h-10 text-green-500" />
      </div>
      <h1 className="text-4xl font-serif mb-4 text-gray-900">Thank you for your order!</h1>
      <p className="text-gray-500 max-w-md mx-auto mb-10 leading-relaxed">
        We've received your order and will start processing it right away. You will receive an email confirmation shortly.
      </p>
      
      <div className="flex gap-4">
        <Link href="/dashboard/orders" className="bg-black text-white px-8 py-3 rounded-full font-bold hover:bg-gray-800 transition-colors">
          View Orders
        </Link>
        <Link href="/" className="bg-gray-100 text-gray-900 px-8 py-3 rounded-full font-bold hover:bg-gray-200 transition-colors">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
