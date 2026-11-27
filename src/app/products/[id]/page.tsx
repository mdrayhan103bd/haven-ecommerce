'use client';

import React, { useState, use } from 'react';
import { useCart } from '@/context/CartContext';
import { useStore } from '@/context/StoreContext';
import { Product } from '@/types';
import { useRouter } from 'next/navigation';
import ProductCard from '@/components/ui/ProductCard';
import StickyProductBuyBar from '@/components/storefront/StickyProductBuyBar';
import { 
  ArrowLeft, 
  ShoppingCart, 
  Heart, 
  Share2, 
  Check, 
  Star, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Send,
  Zap
} from 'lucide-react';
import Link from 'next/link';

export default function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const { addToCart } = useCart();
  const { products, toggleWishlist, isInWishlist, showToast } = useStore();

  const [added, setAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'features' | 'reviews'>('description');
  
  // Interactive reviews state
  const [reviewsList, setReviewsList] = useState([
    { id: '1', user: 'Marcus Vance', rating: 5, date: '2 days ago', comment: 'Exceptional craftsmanship. The materials feel premium and durable. Delivered in 2 days!' },
    { id: '2', user: 'Sophia Miller', rating: 5, date: '1 week ago', comment: 'Exceeded my expectations. Beautiful packaging and works exactly as described.' },
    { id: '3', user: 'David Kim', rating: 4, date: '2 weeks ago', comment: 'Very comfortable and stylish. Great value for the price.' }
  ]);
  const [newReview, setNewReview] = useState({ name: '', rating: 5, comment: '' });
  const [showReviewForm, setShowReviewForm] = useState(false);

  // Find product from centralized store
  const product = products.find(p => p.id === resolvedParams.id) || products[0];
  const inWishlist = isInWishlist(product.id);

  const handleAdd = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    router.push('/checkout');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Product link copied to clipboard!');
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name || !newReview.comment) return;
    setReviewsList([
      {
        id: Date.now().toString(),
        user: newReview.name,
        rating: newReview.rating,
        date: 'Just now',
        comment: newReview.comment
      },
      ...reviewsList
    ]);
    setNewReview({ name: '', rating: 5, comment: '' });
    setShowReviewForm(false);
    showToast('Thank you! Your review has been published.');
  };

  const relatedProducts = products.filter(p => p.id !== product.id && p.category === product.category).slice(0, 4);

  return (
    <div className="container mx-auto px-4 lg:px-8 py-10 font-sans min-h-[80vh]">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-xs text-gray-500">
        <Link href="/" className="hover:text-black">Home</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-black">Products</Link>
        <span>/</span>
        <Link href={`/products/category/${encodeURIComponent(product.category.toLowerCase())}`} className="hover:text-black">{product.category}</Link>
        <span>/</span>
        <span className="text-gray-900 font-bold truncate max-w-xs">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 mb-16">
        {/* Images Container */}
        <div className="space-y-4">
          <div className="bg-[#F5F5F5] rounded-3xl p-8 lg:p-12 flex items-center justify-center relative aspect-square">
            {product.tag && (
              <div className={`absolute top-6 left-6 ${product.tagColor || 'bg-black'} text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm`}>
                {product.tag}
              </div>
            )}
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-4/5 h-4/5 object-contain mix-blend-multiply drop-shadow-xl hover:scale-105 transition-transform duration-500" 
            />
          </div>
        </div>

        {/* Details Container */}
        <div className="flex flex-col justify-center">
          <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
            {product.category}
          </div>

          <h1 className="text-3xl lg:text-4xl font-serif font-bold text-gray-900 mb-3">
            {product.name}
          </h1>

          <div className="flex items-center gap-4 mb-5">
            <div className="flex items-center gap-1 text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <span className="text-xs font-bold text-gray-900">{product.rating}</span>
            <span className="text-xs text-gray-400 underline cursor-pointer" onClick={() => setActiveTab('reviews')}>
              {reviewsList.length} customer reviews
            </span>
            <span className="text-gray-300">|</span>
            <span className={`text-xs font-bold ${product.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
              {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
            </span>
          </div>

          {/* Pricing */}
          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-3xl font-bold text-red-600">৳{product.price}</span>
            {product.oldPrice && (
              <span className="text-lg text-gray-400 line-through font-medium">৳{product.oldPrice}</span>
            )}
            {product.oldPrice && (
              <span className="text-xs font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded-md ml-2">
                Save ৳{(product.oldPrice - product.price).toFixed(2)}
              </span>
            )}
          </div>

          <p className="text-gray-600 text-sm leading-relaxed mb-6">
            {product.description}
          </p>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center border border-gray-200 rounded-full bg-white">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))} 
                className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-black rounded-l-full"
              >
                -
              </button>
              <span className="w-10 text-center font-bold text-sm">{quantity}</span>
              <button 
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} 
                className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-black rounded-r-full"
              >
                +
              </button>
            </div>
            <span className="text-xs text-gray-500">Subtotal: <strong className="text-gray-900">৳{(product.price * quantity).toLocaleString()}</strong></span>
          </div>

          {/* Add to Cart, Buy Now & Wishlist Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-8">
            <button 
              onClick={handleAdd}
              disabled={added || product.stock === 0}
              className={`flex-1 py-3.5 px-6 rounded-full font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                added 
                  ? 'bg-emerald-600 text-white' 
                  : product.stock === 0
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-black text-white hover:bg-gray-800 shadow-md'
              }`}
            >
              {added ? <><Check className="w-4 h-4" /> Added to Bag</> : <><ShoppingCart className="w-4 h-4" /> Add to Bag</>}
            </button>

            <button
              onClick={handleBuyNow}
              disabled={product.stock === 0}
              className="py-3.5 px-6 rounded-full font-bold text-sm bg-red-600 hover:bg-red-700 text-white flex items-center justify-center gap-2 shadow-md transition-all"
            >
              <Zap className="w-4 h-4 fill-current" /> Buy with COD
            </button>

            <div className="flex items-center gap-3 justify-center">
              <button 
                onClick={() => toggleWishlist(product)}
                className={`w-12 h-12 border rounded-full flex items-center justify-center transition-all ${
                  inWishlist 
                    ? 'border-red-200 bg-red-50 text-red-500' 
                    : 'border-gray-200 text-gray-600 hover:border-black hover:text-black'
                }`}
                title={inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
              >
                <Heart className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`} />
              </button>

              <button 
                onClick={handleShare}
                className="w-12 h-12 border border-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:border-black hover:text-black transition-colors"
                title="Share product link"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Value Props */}
          <div className="border-t border-gray-100 pt-6 space-y-3 text-xs text-gray-600">
            <div className="flex items-center gap-3">
              <Truck className="w-4 h-4 text-emerald-600 shrink-0" /> Free express delivery on orders over ৳1,000
            </div>
            <div className="flex items-center gap-3">
              <RotateCcw className="w-4 h-4 text-blue-600 shrink-0" /> 30-day hassle-free return and exchange policy
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0" /> 100% Genuine, tested and certified guarantee
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section: Description, Features, Reviews */}
      <div className="border-t border-gray-100 pt-10 mb-16">
        <div className="flex gap-6 border-b border-gray-100 pb-3 mb-6 text-sm font-bold">
          <button 
            onClick={() => setActiveTab('description')}
            className={`pb-2 transition-colors relative ${activeTab === 'description' ? 'text-black border-b-2 border-black' : 'text-gray-400 hover:text-black'}`}
          >
            Product Overview
          </button>
          <button 
            onClick={() => setActiveTab('features')}
            className={`pb-2 transition-colors relative ${activeTab === 'features' ? 'text-black border-b-2 border-black' : 'text-gray-400 hover:text-black'}`}
          >
            Key Specifications
          </button>
          <button 
            onClick={() => setActiveTab('reviews')}
            className={`pb-2 transition-colors relative ${activeTab === 'reviews' ? 'text-black border-b-2 border-black' : 'text-gray-400 hover:text-black'}`}
          >
            Customer Reviews ({reviewsList.length})
          </button>
        </div>

        {/* Tab 1: Description */}
        {activeTab === 'description' && (
          <div className="max-w-3xl text-gray-600 text-sm leading-relaxed space-y-4">
            <p>{product.description}</p>
            <p>Designed with meticulous attention to detail at the Haven Studios. We blend sustainable manufacturing with contemporary aesthetics to bring you everyday essentials that last.</p>
          </div>
        )}

        {/* Tab 2: Features */}
        {activeTab === 'features' && (
          <div className="max-w-2xl">
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700">
              {(product.features || ['Premium materials', 'Eco-friendly processing', 'Durable build', 'Certified quality']).map((feat, i) => (
                <li key={i} className="flex items-center gap-2 bg-gray-50 p-3 rounded-xl border border-gray-100">
                  <Check className="w-4 h-4 text-green-600 shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Tab 3: Reviews */}
        {activeTab === 'reviews' && (
          <div className="max-w-3xl space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-gray-100">
              <div>
                <div className="text-2xl font-bold text-gray-900">{product.rating} out of 5</div>
                <p className="text-xs text-gray-500">Based on verified customer reviews</p>
              </div>
              <button 
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="bg-black text-white px-4 py-2 rounded-full text-xs font-bold hover:bg-gray-800"
              >
                {showReviewForm ? 'Cancel Review' : 'Write a Review'}
              </button>
            </div>

            {/* Write Review Form */}
            {showReviewForm && (
              <form onSubmit={handleReviewSubmit} className="bg-gray-50 p-6 rounded-2xl border border-gray-200 space-y-4">
                <h4 className="font-bold text-sm text-gray-900">Share your thoughts</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Your Name</label>
                    <input 
                      required 
                      type="text" 
                      value={newReview.name}
                      onChange={e => setNewReview({ ...newReview, name: e.target.value })}
                      placeholder="e.g. Alex Morgan"
                      className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs outline-none focus:border-black"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Rating</label>
                    <select 
                      value={newReview.rating}
                      onChange={e => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                      className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs outline-none focus:border-black"
                    >
                      <option value={5}>5 Stars - Outstanding</option>
                      <option value={4}>4 Stars - Very Good</option>
                      <option value={3}>3 Stars - Average</option>
                      <option value={2}>2 Stars - Below Average</option>
                      <option value={1}>1 Star - Poor</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Review</label>
                  <textarea 
                    required 
                    rows={3}
                    value={newReview.comment}
                    onChange={e => setNewReview({ ...newReview, comment: e.target.value })}
                    placeholder="Tell us what you liked or disliked about this product..."
                    className="w-full bg-white border border-gray-200 rounded-lg p-3 text-xs outline-none focus:border-black resize-none"
                  />
                </div>
                <button type="submit" className="bg-black text-white px-5 py-2 rounded-lg text-xs font-bold hover:bg-gray-800 flex items-center gap-2">
                  <Send className="w-3.5 h-3.5" /> Submit Review
                </button>
              </form>
            )}

            {/* Existing Reviews List */}
            <div className="space-y-4">
              {reviewsList.map(rev => (
                <div key={rev.id} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="font-bold text-sm text-gray-900">{rev.user}</span>
                      <div className="flex text-yellow-400 text-xs mt-0.5">
                        {[...Array(rev.rating)].map((_, i) => (
                          <span key={i}>★</span>
                        ))}
                      </div>
                    </div>
                    <span className="text-xs text-gray-400">{rev.date}</span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">{rev.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="border-t border-gray-100 pt-12">
          <div className="mb-6">
            <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Recommended</span>
            <h2 className="text-2xl font-bold font-serif text-gray-900 mt-1">You May Also Like</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

      {/* Floating Sticky Buy Bar */}
      <StickyProductBuyBar product={product} />
    </div>
  );
}
