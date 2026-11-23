'use client';

import React, { useState, useEffect } from 'react';
import { useStore } from '@/context/StoreContext';
import { 
  Image as ImageIcon, 
  Save, 
  RotateCcw, 
  ExternalLink, 
  Plus, 
  Trash2, 
  Layers, 
  Sparkles, 
  HelpCircle, 
  Grid, 
  Check, 
  Eye,
  Sliders,
  Compass
} from 'lucide-react';
import { BannerSettings, HeroBanner, HeroSlide, SideBanner, HighlightsBanner, LifestyleBanner } from '@/types';
import Link from 'next/link';
import ImageUploadInput from '@/components/ui/ImageUploadInput';

// Curated high quality presets for quick 1-click selection
const HERO_PRESETS = [
  { name: 'Minimal Interior', url: 'https://images.unsplash.com/photo-1542281286-9e0a16bb7366?auto=format&fit=crop&q=80' },
  { name: 'Warm Living Room', url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80' },
  { name: 'Scandinavian Design', url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80' },
  { name: 'Modern Lifestyle', url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80' },
  { name: 'Serene Workspace', url: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&q=80' },
  { name: 'Aesthetic Home', url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80' }
];

const SIDE_PRESETS = [
  { name: 'Sneakers', url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80' },
  { name: 'Headphones', url: 'https://images.unsplash.com/photo-1543459176-4426b36f23ac?auto=format&fit=crop&q=80' },
  { name: 'Smart Watch', url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80' },
  { name: 'Sale & Fashion', url: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80' },
  { name: 'Greenery / Eco', url: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80' },
  { name: 'Coffee Brewing', url: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&q=80' }
];

const HIGHLIGHT_PRESETS = [
  { name: 'Minimalist Architecture', url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80' },
  { name: 'Modern Lounge', url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80' },
  { name: 'Warm Cozy Space', url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80' },
  { name: 'Dark Luxe Interior', url: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80' }
];

const LIFESTYLE_PRESETS = [
  { name: 'Work / Tech', url: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=500&auto=format&fit=crop' },
  { name: 'Fashion / Beauty', url: 'https://images.unsplash.com/photo-1512496015851-a1cfb38ba1fc?w=500&auto=format&fit=crop' },
  { name: 'Fitness / Active', url: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=500&auto=format&fit=crop' },
  { name: 'Wellness / Spa', url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=500&auto=format&fit=crop' },
  { name: 'Home Living', url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=500&auto=format&fit=crop' },
  { name: 'Travel / Adventure', url: 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=500&auto=format&fit=crop' },
  { name: 'Minimalist Aesthetic', url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=500&auto=format&fit=crop' },
  { name: 'Cozy Morning', url: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500&auto=format&fit=crop' }
];

export default function ContentPage() {
  const { banners, updateAllBanners, resetBannersToDefault, showToast } = useStore();
  const [activeTab, setActiveTab] = useState<'hero' | 'side' | 'highlights' | 'lifestyle' | 'faqs'>('hero');
  const [selectedSlide, setSelectedSlide] = useState(0);
  
  // Local editable copy of banners
  const [formData, setFormData] = useState<BannerSettings>(banners);

  // Sync when store banners change
  useEffect(() => {
    if (banners) {
      setFormData(banners);
    }
  }, [banners]);

  // FAQs state
  const [faqs, setFaqs] = useState([
    { q: 'How long does shipping take?', a: 'Standard shipping takes 3-5 business days. Express shipping takes 1-2 business days.' },
    { q: 'What is your return policy?', a: 'We accept returns within 30 days of delivery. The item must be unused and in original packaging.' },
    { q: 'Do you offer worldwide shipping?', a: 'Yes, we ship internationally to over 50 countries with tracking included.' },
    { q: 'How can I track my order?', a: 'Once your order is processed, tracking details are sent via email and can be viewed in your account.' }
  ]);
  const [newFaq, setNewFaq] = useState({ q: '', a: '' });
  const [showAddFaq, setShowAddFaq] = useState(false);

  const handleSaveAll = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    updateAllBanners(formData);
    showToast('All banner images & content saved to storefront!');
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all banner images and text to their default values?')) {
      resetBannersToDefault();
    }
  };

  const handleAddFaq = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFaq.q || !newFaq.a) return;
    setFaqs([...faqs, newFaq]);
    setNewFaq({ q: '', a: '' });
    setShowAddFaq(false);
    showToast('New FAQ added successfully!');
  };

  const handleDeleteFaq = (index: number) => {
    setFaqs(faqs.filter((_, i) => i !== index));
    showToast('FAQ removed', 'info');
  };

  return (
    <div className="font-sans space-y-6 max-w-5xl pb-16">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-black text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
              Storefront Customizer
            </span>
          </div>
          <h1 className="text-2xl font-serif font-bold text-gray-900">Banner & Content Management</h1>
          <p className="text-xs text-gray-500 mt-1">
            Update hero banners, promotional cards, lifestyle collections, and FAQs. Changes appear instantly on <span className="font-semibold text-gray-700">cavrozone.com</span>.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link 
            href="/" 
            target="_blank" 
            className="px-3.5 py-2 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 hover:border-black hover:text-black transition-all flex items-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5" /> View Live
          </Link>
          <button 
            type="button" 
            onClick={handleReset}
            className="p-2 border border-gray-200 rounded-xl text-gray-500 hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition-all"
            title="Reset to default banners"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button 
            type="button" 
            onClick={() => handleSaveAll()}
            className="bg-black text-white px-5 py-2 rounded-xl text-xs font-bold hover:bg-gray-800 transition-all flex items-center gap-2 shadow-sm"
          >
            <Save className="w-3.5 h-3.5" /> Save Changes
          </button>
        </div>
      </div>

      {/* Tabs navigation */}
      <div className="flex overflow-x-auto gap-2 p-1.5 bg-gray-100/80 rounded-2xl border border-gray-200/60 text-xs font-bold scrollbar-none">
        <button
          onClick={() => setActiveTab('hero')}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 shrink-0 ${
            activeTab === 'hero' 
              ? 'bg-white text-black shadow-sm font-bold' 
              : 'text-gray-500 hover:text-black'
          }`}
        >
          <ImageIcon className="w-3.5 h-3.5" /> Hero Main Banner
        </button>

        <button
          onClick={() => setActiveTab('side')}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 shrink-0 ${
            activeTab === 'side' 
              ? 'bg-white text-black shadow-sm font-bold' 
              : 'text-gray-500 hover:text-black'
          }`}
        >
          <Layers className="w-3.5 h-3.5" /> Side Promos (3 Cards)
        </button>

        <button
          onClick={() => setActiveTab('highlights')}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 shrink-0 ${
            activeTab === 'highlights' 
              ? 'bg-white text-black shadow-sm font-bold' 
              : 'text-gray-500 hover:text-black'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" /> Curated Space Banner
        </button>

        <button
          onClick={() => setActiveTab('lifestyle')}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 shrink-0 ${
            activeTab === 'lifestyle' 
              ? 'bg-white text-black shadow-sm font-bold' 
              : 'text-gray-500 hover:text-black'
          }`}
        >
          <Grid className="w-3.5 h-3.5" /> Lifestyle Categories (6)
        </button>

        <button
          onClick={() => setActiveTab('faqs')}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 shrink-0 ${
            activeTab === 'faqs' 
              ? 'bg-white text-black shadow-sm font-bold' 
              : 'text-gray-500 hover:text-black'
          }`}
        >
          <HelpCircle className="w-3.5 h-3.5" /> Help & FAQs
        </button>
      </div>

      {/* TAB 1: HERO MAIN BANNER (3 SLIDES) */}
      {activeTab === 'hero' && (() => {
        const currentSlideData = (formData.heroSlides && formData.heroSlides[selectedSlide])
          ? formData.heroSlides[selectedSlide]
          : {
              id: `slide-${selectedSlide + 1}`,
              tag: formData.hero.tag,
              headline: formData.hero.headline,
              subheadline: formData.hero.subheadline,
              ctaText: formData.hero.ctaText,
              ctaLink: formData.hero.ctaLink,
              image: formData.hero.image
            };

        const updateSelectedSlideField = (field: keyof HeroSlide, value: string) => {
          const defaultSlides = [
            { id: 'slide-1', ...formData.hero },
            { id: 'slide-2', ...formData.hero },
            { id: 'slide-3', ...formData.hero }
          ];
          const updatedSlides = [...(formData.heroSlides || defaultSlides)];
          while (updatedSlides.length < 3) {
            updatedSlides.push({ ...formData.hero, id: `slide-${updatedSlides.length + 1}` });
          }
          updatedSlides[selectedSlide] = {
            ...updatedSlides[selectedSlide],
            [field]: value
          };

          setFormData({
            ...formData,
            hero: selectedSlide === 0 ? { ...formData.hero, [field]: value } : formData.hero,
            heroSlides: updatedSlides
          });
        };

        return (
          <div className="space-y-6">
            {/* Slide Switcher */}
            <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-gray-700">Hero Carousel Slides:</span>
                <span className="text-xs text-gray-500">(Slider auto-rotates across these 3 slides)</span>
              </div>
              <div className="flex gap-2">
                {[0, 1, 2].map((sIdx) => (
                  <button
                    key={sIdx}
                    type="button"
                    onClick={() => setSelectedSlide(sIdx)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                      selectedSlide === sIdx 
                        ? 'bg-black text-white shadow-md' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <span>Slide 0{sIdx + 1}</span>
                    {selectedSlide === sIdx && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Live Preview Card */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5" /> Live Preview — Slide 0{selectedSlide + 1}
                </span>
                <span className="text-[11px] text-gray-500">Live preview of selected slide</span>
              </div>
              
              <div className="relative rounded-2xl overflow-hidden bg-[#F6F4EF] min-h-[300px] flex items-center border border-gray-200">
                <div 
                  className="absolute right-0 top-0 bottom-0 w-1/2 bg-cover bg-center [mask-image:linear-gradient(to_right,transparent,black_20%)] transition-all duration-500"
                  style={{ backgroundImage: `url(${currentSlideData.image})` }}
                />
                <div className="relative z-10 p-8 w-full md:w-3/5">
                  <span className="uppercase text-[11px] tracking-[0.2em] mb-2 font-semibold text-gray-500 block">
                    {currentSlideData.tag || 'Live a better everyday'}
                  </span>
                  <h2 className="text-3xl font-serif text-[#2C2927] leading-tight mb-2">
                    {currentSlideData.headline || 'Essentials for a Happier You'}
                  </h2>
                  <p className="text-gray-600 text-xs leading-relaxed max-w-sm mb-5">
                    {currentSlideData.subheadline || 'Discover thoughtfully curated products that fit your lifestyle, your way.'}
                  </p>
                  <div className="inline-flex bg-[#2c2a29] text-white px-5 py-2.5 rounded-full items-center gap-2 text-xs font-medium shadow-sm">
                    {currentSlideData.ctaText || 'Shop the Collection'}
                  </div>
                </div>
              </div>
            </div>

            {/* Edit Form */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-5">
              <h3 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-gray-700" /> Slide 0{selectedSlide + 1} Settings
              </h3>

              {/* Image Upload / URL input */}
              <ImageUploadInput
                label={`Slide 0${selectedSlide + 1} Image`}
                aspectHint="16:9 widescreen recommended"
                value={currentSlideData.image}
                onChange={url => updateSelectedSlideField('image', url)}
                helperText="Upload any picture from your device or paste an external image link."
              />

              {/* Quick Image Presets */}
              <div>
                <span className="block text-xs font-bold text-gray-700 mb-2">
                  Or pick a curated preset (Click to apply to Slide 0{selectedSlide + 1}):
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                  {HERO_PRESETS.map((preset, idx) => {
                    const isSelected = currentSlideData.image === preset.url;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          updateSelectedSlideField('image', preset.url);
                          showToast(`Preset "${preset.name}" applied to Slide 0${selectedSlide + 1}!`);
                        }}
                        className={`group relative rounded-xl overflow-hidden border-2 transition-all aspect-[4/3] text-left ${
                          isSelected ? 'border-black ring-2 ring-black/20' : 'border-gray-200 hover:border-gray-400'
                        }`}
                      >
                        <img src={preset.url} alt={preset.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                        <div className="absolute inset-0 bg-black/40 flex items-end p-2">
                          <span className="text-[10px] text-white font-semibold leading-tight line-clamp-1">{preset.name}</span>
                        </div>
                        {isSelected && (
                          <div className="absolute top-1.5 right-1.5 bg-black text-white p-0.5 rounded-full">
                            <Check className="w-3 h-3" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Text and Button Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Tagline Pill</label>
                  <input 
                    type="text" 
                    value={currentSlideData.tag}
                    onChange={e => updateSelectedSlideField('tag', e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-3.5 py-2 text-xs outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Main Headline</label>
                  <input 
                    type="text" 
                    value={currentSlideData.headline}
                    onChange={e => updateSelectedSlideField('headline', e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-3.5 py-2 text-xs outline-none focus:border-black font-semibold"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-gray-700 mb-1">Subheadline Description</label>
                  <textarea 
                    rows={2}
                    value={currentSlideData.subheadline}
                    onChange={e => updateSelectedSlideField('subheadline', e.target.value)}
                    className="w-full border border-gray-200 rounded-xl p-3 text-xs outline-none focus:border-black resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Button Call-to-Action Text</label>
                  <input 
                    type="text" 
                    value={currentSlideData.ctaText}
                    onChange={e => updateSelectedSlideField('ctaText', e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-3.5 py-2 text-xs outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Button Destination Link</label>
                  <input 
                    type="text" 
                    value={currentSlideData.ctaLink}
                    onChange={e => updateSelectedSlideField('ctaLink', e.target.value)}
                    placeholder="/products"
                    className="w-full border border-gray-200 rounded-xl px-3.5 py-2 text-xs outline-none focus:border-black"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button 
                  type="button" 
                  onClick={() => handleSaveAll()}
                  className="bg-black text-white px-6 py-2.5 rounded-xl text-xs font-bold hover:bg-gray-800 transition-colors flex items-center gap-2"
                >
                  <Save className="w-4 h-4" /> Save Hero Carousel
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* TAB 2: HERO SIDE PROMOS (3 Cards) */}
      {activeTab === 'side' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h2 className="text-base font-bold text-gray-900 mb-1">Hero Side Promotional Cards (3 Banners)</h2>
            <p className="text-xs text-gray-500 mb-6">
              These 3 cards appear on the right side of the main hero banner on the homepage.
            </p>

            <div className="space-y-6">
              {formData.sideBanners.map((card, idx) => {
                const bgColors = ['bg-[#F8F5F0]', 'bg-[#F2F5F0]', 'bg-[#F4F6E5]'];
                return (
                  <div key={card.id || idx} className="border border-gray-200 rounded-2xl p-5 bg-gray-50/50 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-800 flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-black text-white text-[10px] flex items-center justify-center font-mono">
                          {idx + 1}
                        </span>
                        Side Banner Card #{idx + 1}
                      </span>
                    </div>

                    {/* Preview of this card */}
                    <div className={`${bgColors[idx % bgColors.length]} rounded-xl p-5 relative overflow-hidden flex flex-col justify-center min-h-[110px] border border-gray-200/80`}>
                      <div className="relative z-10 w-2/3">
                        <h4 className="text-base font-bold text-gray-900 mb-0.5">{card.title}</h4>
                        <p className="text-xs text-gray-500">{card.subtitle}</p>
                      </div>
                      <div 
                        className="absolute right-0 top-0 bottom-0 w-1/2 bg-cover bg-center [mask-image:linear-gradient(to_right,transparent,black_40%)]"
                        style={{ backgroundImage: `url(${card.image})` }}
                      />
                    </div>

                    {/* Controls */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">Card Title</label>
                        <input 
                          type="text" 
                          value={card.title}
                          onChange={e => {
                            const updated = [...formData.sideBanners];
                            updated[idx].title = e.target.value;
                            setFormData({ ...formData, sideBanners: updated });
                          }}
                          className="w-full border border-gray-200 rounded-xl px-3 py-2 text-xs outline-none focus:border-black bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">Subtitle / Promo Text</label>
                        <input 
                          type="text" 
                          value={card.subtitle}
                          onChange={e => {
                            const updated = [...formData.sideBanners];
                            updated[idx].subtitle = e.target.value;
                            setFormData({ ...formData, sideBanners: updated });
                          }}
                          className="w-full border border-gray-200 rounded-xl px-3 py-2 text-xs outline-none focus:border-black bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">Target Link</label>
                        <input 
                          type="text" 
                          value={card.link}
                          onChange={e => {
                            const updated = [...formData.sideBanners];
                            updated[idx].link = e.target.value;
                            setFormData({ ...formData, sideBanners: updated });
                          }}
                          className="w-full border border-gray-200 rounded-xl px-3 py-2 text-xs outline-none focus:border-black bg-white"
                        />
                      </div>

                      <div className="sm:col-span-3">
                        <ImageUploadInput
                          label="Banner Image"
                          aspectHint="4:3 recommended"
                          value={card.image}
                          onChange={url => {
                            const updated = [...formData.sideBanners];
                            updated[idx].image = url;
                            setFormData({ ...formData, sideBanners: updated });
                          }}
                        />
                      </div>

                      {/* Presets */}
                      <div className="sm:col-span-3">
                        <span className="text-[11px] font-semibold text-gray-500 mb-1.5 block">Quick presets:</span>
                        <div className="flex flex-wrap gap-2">
                          {SIDE_PRESETS.map((p, pIdx) => (
                            <button
                              key={pIdx}
                              type="button"
                              onClick={() => {
                                const updated = [...formData.sideBanners];
                                updated[idx].image = p.url;
                                setFormData({ ...formData, sideBanners: updated });
                                showToast(`Applied ${p.name} to Card #${idx + 1}`);
                              }}
                              className="px-2.5 py-1 text-[11px] bg-white border border-gray-200 rounded-lg hover:border-black hover:bg-gray-50 flex items-center gap-1.5"
                            >
                              <img src={p.url} className="w-3.5 h-3.5 rounded object-cover" alt="" />
                              <span>{p.name}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 flex justify-end">
              <button 
                type="button" 
                onClick={() => handleSaveAll()}
                className="bg-black text-white px-6 py-2.5 rounded-xl text-xs font-bold hover:bg-gray-800 transition-colors flex items-center gap-2"
              >
                <Save className="w-4 h-4" /> Save Side Banners
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: HIGHLIGHTS / CURATED SPACE BANNER */}
      {activeTab === 'highlights' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h2 className="text-base font-bold text-gray-900 mb-1">Curated Space Promotional Banner</h2>
            <p className="text-xs text-gray-500 mb-5">
              This banner appears alongside the 3 featured products under "Today's Highlights".
            </p>

            {/* Live Preview */}
            <div className="max-w-xs mb-6">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">Preview</span>
              <div className="bg-[#2c2a29] rounded-2xl p-7 relative overflow-hidden flex flex-col justify-between text-white min-h-[300px]">
                {formData.highlightsBanner.image && (
                  <div 
                    className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay"
                    style={{ backgroundImage: `url(${formData.highlightsBanner.image})` }}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />

                <div className="relative z-10">
                  <span className="text-xs uppercase tracking-widest text-[#BCA38F] font-bold">
                    {formData.highlightsBanner.tag || 'Curated Space'}
                  </span>
                  <h3 className="text-2xl font-serif font-bold leading-tight mt-2 mb-2">
                    {formData.highlightsBanner.title || 'Transform Your Home'}
                  </h3>
                  <p className="text-xs text-gray-300">
                    {formData.highlightsBanner.description || 'Timeless Scandinavian designs made with sustainable materials.'}
                  </p>
                </div>
                
                <div className="relative z-10 pt-4">
                  <div className="bg-white text-gray-900 px-5 py-2 rounded-full text-xs font-bold w-max">
                    {formData.highlightsBanner.ctaText || 'Shop Collection'}
                  </div>
                </div>
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-4 pt-2 border-t border-gray-100">
              <ImageUploadInput
                label="Banner Background Image"
                aspectHint="16:9 widescreen recommended"
                value={formData.highlightsBanner.image}
                onChange={url => setFormData({
                  ...formData,
                  highlightsBanner: { ...formData.highlightsBanner, image: url }
                })}
              />

              {/* Presets */}
              <div>
                <span className="text-xs font-bold text-gray-700 mb-2 block">Curated Image Presets:</span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {HIGHLIGHT_PRESETS.map((p, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setFormData({
                          ...formData,
                          highlightsBanner: { ...formData.highlightsBanner, image: p.url }
                        });
                        showToast(`Selected "${p.name}"`);
                      }}
                      className="group relative rounded-xl overflow-hidden border border-gray-200 aspect-[4/3] text-left hover:border-black transition-all"
                    >
                      <img src={p.url} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                      <div className="absolute inset-0 bg-black/40 flex items-end p-2">
                        <span className="text-[10px] text-white font-medium">{p.name}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Tagline</label>
                  <input 
                    type="text" 
                    value={formData.highlightsBanner.tag}
                    onChange={e => setFormData({
                      ...formData,
                      highlightsBanner: { ...formData.highlightsBanner, tag: e.target.value }
                    })}
                    className="w-full border border-gray-200 rounded-xl px-3.5 py-2 text-xs outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Headline Title</label>
                  <input 
                    type="text" 
                    value={formData.highlightsBanner.title}
                    onChange={e => setFormData({
                      ...formData,
                      highlightsBanner: { ...formData.highlightsBanner, title: e.target.value }
                    })}
                    className="w-full border border-gray-200 rounded-xl px-3.5 py-2 text-xs outline-none focus:border-black font-semibold"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-gray-700 mb-1">Description</label>
                  <textarea 
                    rows={2}
                    value={formData.highlightsBanner.description}
                    onChange={e => setFormData({
                      ...formData,
                      highlightsBanner: { ...formData.highlightsBanner, description: e.target.value }
                    })}
                    className="w-full border border-gray-200 rounded-xl p-3 text-xs outline-none focus:border-black resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Button Text</label>
                  <input 
                    type="text" 
                    value={formData.highlightsBanner.ctaText}
                    onChange={e => setFormData({
                      ...formData,
                      highlightsBanner: { ...formData.highlightsBanner, ctaText: e.target.value }
                    })}
                    className="w-full border border-gray-200 rounded-xl px-3.5 py-2 text-xs outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Button Target Link</label>
                  <input 
                    type="text" 
                    value={formData.highlightsBanner.ctaLink}
                    onChange={e => setFormData({
                      ...formData,
                      highlightsBanner: { ...formData.highlightsBanner, ctaLink: e.target.value }
                    })}
                    className="w-full border border-gray-200 rounded-xl px-3.5 py-2 text-xs outline-none focus:border-black"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end">
                <button 
                  type="button" 
                  onClick={() => handleSaveAll()}
                  className="bg-black text-white px-6 py-2.5 rounded-xl text-xs font-bold hover:bg-gray-800 transition-colors flex items-center gap-2"
                >
                  <Save className="w-4 h-4" /> Save Highlights Banner
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: LIFESTYLE CATEGORIES (6 CARDS) */}
      {activeTab === 'lifestyle' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h2 className="text-base font-bold text-gray-900 mb-1">Shop by Lifestyle (6 Category Banners)</h2>
            <p className="text-xs text-gray-500 mb-6">
              Customize the images, titles, and links for the 6 lifestyle cards displayed across the storefront.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {formData.lifestyles.map((item, idx) => (
                <div key={item.id || idx} className="border border-gray-200 rounded-2xl p-4 bg-gray-50/50 space-y-3">
                  <div className="relative rounded-xl overflow-hidden aspect-[4/3] border border-gray-200 bg-gray-900">
                    <img 
                      src={item.img} 
                      alt={item.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-3">
                      <span className="text-white font-bold text-xs">{item.title}</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 mb-1">Title</label>
                    <input 
                      type="text" 
                      value={item.title}
                      onChange={e => {
                        const updated = [...formData.lifestyles];
                        updated[idx].title = e.target.value;
                        setFormData({ ...formData, lifestyles: updated });
                      }}
                      className="w-full border border-gray-200 rounded-xl px-3 py-1.5 text-xs outline-none focus:border-black bg-white"
                    />
                  </div>

                  <div>
                    <ImageUploadInput
                      label="Card Photo"
                      aspectHint="Square or portrait"
                      value={item.img}
                      onChange={url => {
                        const updated = [...formData.lifestyles];
                        updated[idx].img = url;
                        setFormData({ ...formData, lifestyles: updated });
                      }}
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 mb-1">Target Link</label>
                    <input 
                      type="text" 
                      value={item.link}
                      onChange={e => {
                        const updated = [...formData.lifestyles];
                        updated[idx].link = e.target.value;
                        setFormData({ ...formData, lifestyles: updated });
                      }}
                      className="w-full border border-gray-200 rounded-xl px-3 py-1.5 text-xs outline-none focus:border-black bg-white text-[11px]"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Quick preset selector for lifestyle images */}
            <div className="mt-6 pt-5 border-t border-gray-100">
              <span className="text-xs font-bold text-gray-700 mb-2 block">Quick Lifestyle Image Gallery Presets:</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2">
                {LIFESTYLE_PRESETS.map((p, pIdx) => (
                  <div key={pIdx} className="group relative rounded-lg overflow-hidden border border-gray-200 aspect-[4/3] bg-gray-100">
                    <img src={p.url} alt={p.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-center items-center p-1 text-center">
                      <span className="text-[9px] text-white font-bold mb-1 leading-tight">{p.name}</span>
                      <button 
                        type="button"
                        onClick={() => {
                          // Copy image URL to clipboard or prompt
                          navigator.clipboard?.writeText(p.url);
                          showToast(`Image URL copied for ${p.name}! Paste into any card.`);
                        }}
                        className="bg-white text-black px-1.5 py-0.5 rounded text-[8px] font-bold"
                      >
                        Copy URL
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button 
                type="button" 
                onClick={() => handleSaveAll()}
                className="bg-black text-white px-6 py-2.5 rounded-xl text-xs font-bold hover:bg-gray-800 transition-colors flex items-center gap-2"
              >
                <Save className="w-4 h-4" /> Save Lifestyle Banners
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: FAQS & HELP CONTENT */}
      {activeTab === 'faqs' && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <div className="flex justify-between items-center mb-5">
            <div>
              <h2 className="text-base font-bold text-gray-900">Help Center FAQ Questions ({faqs.length})</h2>
              <p className="text-xs text-gray-500">Manage customer frequently asked questions displayed in the Help Center</p>
            </div>
            <button 
              onClick={() => setShowAddFaq(true)}
              className="bg-black text-white px-3.5 py-2 rounded-xl text-xs font-bold hover:bg-gray-800 transition-colors flex items-center gap-1.5"
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
                  className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors shrink-0"
                  title="Delete FAQ"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Add FAQ Form */}
          {showAddFaq && (
            <form onSubmit={handleAddFaq} className="mt-5 p-5 border border-gray-200 rounded-xl bg-white space-y-3 shadow-sm">
              <h4 className="font-bold text-xs text-gray-900">New FAQ Question</h4>
              <div>
                <input 
                  type="text" 
                  required
                  placeholder="Question (e.g. Do you offer gift wrapping?)"
                  value={newFaq.q}
                  onChange={e => setNewFaq({ ...newFaq, q: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-3.5 py-2 text-xs outline-none focus:border-black"
                />
              </div>
              <div>
                <textarea 
                  rows={2}
                  required
                  placeholder="Answer explanation..."
                  value={newFaq.a}
                  onChange={e => setNewFaq({ ...newFaq, a: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl p-3 text-xs outline-none focus:border-black resize-none"
                />
              </div>
              <div className="flex gap-2">
                <button 
                  type="submit" 
                  className="bg-black text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-gray-800"
                >
                  Add Question
                </button>
                <button 
                  type="button" 
                  onClick={() => setShowAddFaq(false)}
                  className="bg-gray-100 text-gray-600 px-4 py-2 rounded-xl text-xs font-bold hover:bg-gray-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
