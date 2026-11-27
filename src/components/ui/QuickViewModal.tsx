'use client';

import React, { useState, useEffect } from 'react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { useStore } from '@/context/StoreContext';
import { useRouter } from 'next/navigation';
import { X, Heart, ShoppingBag, Zap, Check, Star, ShieldCheck, Truck, RotateCcw, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
  const router = useRouter();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useStore();
  
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedImage(product.image);
      setQuantity(1);
      setIsAdded(false);
    }
  }, [product]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  const inWish = isInWishlist(product.id);
  const discountPercent = product.oldPrice && product.oldPrice > product.price
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    onClose();
    router.push('/checkout');
  };

  const allImages = product.images && product.images.length > 0 
    ? [product.image, ...product.images.filter(img => img !== product.image)] 
    : [product.image];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl z-10 border border-gray-100 p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-8 font-sans">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center transition-all hover:scale-105"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Image Gallery */}
        <div className="md:w-1/2 flex flex-col">
          <div className="relative aspect-square rounded-2xl bg-[#F8F9FA] overflow-hidden border border-gray-100 flex items-center justify-center p-6 mb-3">
            <img
              src={selectedImage || product.image}
              alt={product.name}
              className="w-full h-full object-contain transition-all duration-300 hover:scale-105"
            />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-1.5">
              {discountPercent > 0 && (
                <span className="bg-red-500 text-white text-[11px] font-extrabold px-2.5 py-1 rounded-full shadow-sm tracking-wide">
                  -{discountPercent}% OFF
                </span>
              )}
              {product.tag && (
                <span className={`${product.tagColor || 'bg-black'} text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm`}>
                  {product.tag}
                </span>
              )}
            </div>

            {/* Wishlist Button */}
            <button
              onClick={() => toggleWishlist(product)}
              className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                inWish ? 'bg-red-50 text-red-500 shadow-sm' : 'bg-white/90 text-gray-500 hover:text-black hover:bg-white shadow-sm'
              }`}
              title="Add to wishlist"
            >
              <Heart className={`w-4 h-4 ${inWish ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Thumbnails if multiple */}
          {allImages.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-14 h-14 rounded-xl border-2 overflow-hidden bg-gray-50 flex-shrink-0 transition-all ${
                    selectedImage === img ? 'border-black ring-2 ring-black/10' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-contain p-1" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Product Details & Purchase Actions */}
        <div className="md:w-1/2 flex flex-col justify-between">
          <div>
            {/* Category & Stock Status */}
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                {product.category}
              </span>
              <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-0.5 rounded-full ${
                product.stock > 0 ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'
              }`}>
                <span className={`w-2 h-2 rounded-full ${product.stock > 0 ? 'bg-emerald-500' : 'bg-red-500'}`} />
                {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 leading-snug mb-2">
              {product.name}
            </h2>

            {/* Rating & Reviews */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center text-amber-400 text-sm">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < Math.floor(product.rating || 5) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <span className="text-xs font-bold text-gray-900">{product.rating || 5.0}</span>
              <span className="text-xs text-gray-400">({product.reviews || '120'} reviews)</span>
            </div>

            {/* Price display */}
            <div className="flex items-baseline gap-3 p-3.5 bg-gray-50/80 rounded-2xl mb-4 border border-gray-100">
              <span className="text-2xl md:text-3xl font-extrabold text-red-600">
                ৳{product.price.toLocaleString('en-US')}
              </span>
              {product.oldPrice && product.oldPrice > product.price && (
                <>
                  <span className="text-sm text-gray-400 line-through font-medium">
                    ৳{product.oldPrice.toLocaleString('en-US')}
                  </span>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                    Save ৳{(product.oldPrice - product.price).toLocaleString('en-US')}
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-xs text-gray-600 leading-relaxed line-clamp-3 mb-4">
              {product.description}
            </p>

            {/* Key Features */}
            {product.features && product.features.length > 0 && (
              <div className="mb-5">
                <div className="text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-2">Highlights:</div>
                <ul className="grid grid-cols-1 gap-1.5">
                  {product.features.slice(0, 3).map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs text-gray-700">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Action Area */}
          <div className="pt-4 border-t border-gray-100">
            {/* Quantity Selector */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-bold text-gray-700">Quantity:</span>
              <div className="flex items-center border border-gray-200 rounded-full overflow-hidden bg-gray-50">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-200 text-sm font-bold"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="w-10 text-center text-xs font-bold text-gray-900">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock || 99, quantity + 1))}
                  className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-200 text-sm font-bold"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            {/* Buttons: Add to Cart & Buy Now (COD) */}
            <div className="grid grid-cols-2 gap-2.5 mb-3">
              <button
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
                className={`py-3 px-4 rounded-full font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm ${
                  isAdded
                    ? 'bg-emerald-600 text-white'
                    : 'bg-black text-white hover:bg-gray-800'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4" /> Added to Bag
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" /> Add to Bag
                  </>
                )}
              </button>

              <button
                onClick={handleBuyNow}
                disabled={product.stock <= 0}
                className="py-3 px-4 rounded-full font-bold text-xs bg-red-600 text-white hover:bg-red-700 flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                <Zap className="w-4 h-4 fill-current" /> Buy with COD
              </button>
            </div>

            {/* View Full Product Page */}
            <div className="flex items-center justify-between pt-2 text-[11px] text-gray-500">
              <div className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-gray-400" />
                <span>Fast Cash on Delivery in Bangladesh</span>
              </div>
              <Link
                href={`/products/${product.id}`}
                onClick={onClose}
                className="font-bold text-black hover:underline flex items-center gap-1"
              >
                Full Details <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
