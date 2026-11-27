'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useStore } from '@/context/StoreContext';
import { HeroSlide } from '@/types';

const SIDE_BG_COLORS = ['bg-[#F8F5F0]', 'bg-[#F2F5F0]', 'bg-[#F4F6E5]'];

export default function Hero() {
  const { banners } = useStore();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  // Fallback slides if banners.heroSlides is empty
  const slides: HeroSlide[] = (banners?.heroSlides && banners.heroSlides.length > 0)
    ? banners.heroSlides
    : [
        {
          id: 'slide-1',
          tag: banners?.hero?.tag || 'Live a better everyday',
          headline: banners?.hero?.headline || 'Essentials for a Happier You',
          subheadline: banners?.hero?.subheadline || 'Discover thoughtfully curated products that fit your lifestyle, your way.',
          ctaText: banners?.hero?.ctaText || 'Shop the Collection',
          ctaLink: banners?.hero?.ctaLink || '/products',
          image: banners?.hero?.image || 'https://images.unsplash.com/photo-1542281286-9e0a16bb7366?auto=format&fit=crop&q=80'
        }
      ];

  const sideBanners = banners?.sideBanners || [];

  // Auto-play slideshow every 5 seconds
  useEffect(() => {
    if (slides.length <= 1 || isPaused) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length, isPaused]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
    touchStartX.current = null;
  };

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 pt-3 sm:pt-6 pb-6 sm:pb-8 grid grid-cols-1 lg:grid-cols-3 gap-6 font-sans">
      {/* 3-Slide Carousel Main Hero Banner */}
      <div 
        className="lg:col-span-2 relative rounded-3xl overflow-hidden bg-[#F6F4EF] min-h-[420px] sm:min-h-[460px] lg:min-h-[480px] flex items-center group shadow-sm"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Render each slide with smooth fade & translate transition */}
        {slides.map((slide, idx) => {
          const isActive = idx === currentSlide;
          return (
            <div
              key={slide.id || idx}
              className={`absolute inset-0 flex items-center transition-opacity duration-700 ease-in-out ${
                isActive ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {/* Slide Background Image */}
              <div 
                className={`absolute right-0 top-0 bottom-0 w-3/5 sm:w-1/2 md:w-3/5 bg-cover bg-center [mask-image:linear-gradient(to_right,transparent,black_25%)] transition-transform duration-1000 ${
                  isActive ? 'scale-100' : 'scale-105'
                }`}
                style={{ backgroundImage: `url(${slide.image})` }}
              />

              {/* Slide Text Content */}
              <div className="relative z-10 p-6 sm:p-10 md:p-12 w-full md:w-2/3 max-w-xl">
                <span className="uppercase text-[11px] sm:text-xs tracking-[0.2em] mb-3 sm:mb-4 font-bold text-gray-500 block">
                  {slide.tag || 'Live a better everyday'}
                </span>
                
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-serif text-[#2C2927] leading-[1.15] mb-3 sm:mb-4">
                  {slide.headline || 'Essentials for a Happier You'}
                </h1>

                <p className="text-gray-600 max-w-sm mb-6 sm:mb-8 text-xs sm:text-sm leading-relaxed">
                  {slide.subheadline || 'Discover thoughtfully curated products that fit your lifestyle, your way.'}
                </p>

                <div>
                  <Link 
                    href={slide.ctaLink || '/products'} 
                    className="inline-flex bg-[#2c2a29] text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-full items-center gap-2 hover:bg-black transition-all font-semibold text-xs sm:text-sm shadow-md hover:gap-3"
                  >
                    {slide.ctaText || 'Shop the Collection'} <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                {/* Social Proof Badge */}
                <div className="mt-8 sm:mt-12 flex items-center gap-3 sm:gap-4">
                  <div className="flex -space-x-2">
                    {[
                      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80',
                      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80',
                      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=80',
                      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80'
                    ].map((avatarUrl, i) => (
                      <img 
                        key={i} 
                        src={avatarUrl} 
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-[#F6F4EF] object-cover" 
                        alt="Happy customer" 
                      />
                    ))}
                  </div>
                  <div className="text-xs sm:text-sm">
                    <div className="font-bold text-gray-900 leading-tight">
                      50K+ <span className="font-normal text-gray-600">happy customers</span>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] sm:text-xs text-gray-500 mt-0.5">
                      <div className="flex text-yellow-400 text-[10px]">★★★★★</div>
                      <span className="font-bold text-gray-900">4.9</span> (12k reviews)
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Carousel Navigation Arrows */}
        {slides.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              aria-label="Previous Slide"
              className="absolute left-3 sm:left-4 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/80 hover:bg-white text-gray-900 shadow-md backdrop-blur-sm flex items-center justify-center transition-all opacity-80 sm:opacity-0 group-hover:opacity-100 hover:scale-105"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next Slide"
              className="absolute right-3 sm:right-4 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/80 hover:bg-white text-gray-900 shadow-md backdrop-blur-sm flex items-center justify-center transition-all opacity-80 sm:opacity-0 group-hover:opacity-100 hover:scale-105"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Carousel Indicator Dots */}
        {slides.length > 1 && (
          <div className="absolute bottom-4 left-6 sm:left-10 z-20 flex items-center gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentSlide 
                    ? 'w-7 bg-black' 
                    : 'w-2 bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
            <span className="ml-2 text-[10px] font-mono font-bold text-gray-400">
              0{currentSlide + 1} / 0{slides.length}
            </span>
          </div>
        )}
      </div>

      {/* 3 Secondary Side Promos */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4">
        {sideBanners.map((sb, idx) => {
          const bgColor = SIDE_BG_COLORS[idx % SIDE_BG_COLORS.length];
          return (
            <div 
              key={sb.id || idx} 
              className={`${bgColor} rounded-2xl p-5 sm:p-6 relative overflow-hidden flex flex-col justify-center min-h-[135px] sm:min-h-[145px] border border-gray-100/60 shadow-xs`}
            >
              <div className="relative z-10 w-2/3">
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-0.5 leading-snug">
                  {sb.title}
                </h3>
                <p className="text-xs text-gray-500 mb-3 sm:mb-4 line-clamp-1">{sb.subtitle}</p>
                <Link 
                  href={sb.link || '/products'} 
                  className="w-8 h-8 bg-[#2C2927] text-white rounded-full flex items-center justify-center hover:scale-105 hover:bg-black transition-all shadow-sm"
                  aria-label={sb.title}
                >
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div 
                className="absolute right-0 top-0 bottom-0 w-1/2 bg-cover bg-center [mask-image:linear-gradient(to_right,transparent,black_35%)] transition-transform duration-700 hover:scale-105"
                style={{ backgroundImage: `url(${sb.image})` }}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
