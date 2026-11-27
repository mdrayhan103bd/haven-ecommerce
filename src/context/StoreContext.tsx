'use client';

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { 
  Product, 
  Order, 
  Discount, 
  SupportMessage, 
  StoreSettings, 
  UserProfile, 
  Address, 
  PaymentCard,
  BannerSettings,
  HeroBanner,
  HeroSlide,
  SideBanner,
  HighlightsBanner,
  LifestyleBanner
} from '@/types';

// Initial Mock Products (30 Comprehensive Demo Products)
export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'UrbanEase Minimalist Sneakers',
    price: 2450,
    oldPrice: 3200,
    category: 'Men',
    stock: 45,
    tag: 'Best Seller',
    tagColor: 'bg-[#FF6B6B]',
    rating: 4.8,
    reviews: '2.1k',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop',
    description: 'Ultra-lightweight everyday sneakers made with breathable mesh and ergonomic soles. Designed for all-day comfort whether walking the city streets or commuting.',
    features: ['Breathable recycled mesh', 'Cushioned EVA midsole', 'Slip-resistant rubber outsole', 'Water-resistant coating']
  },
  {
    id: '2',
    name: 'BrewMaster Precision Espresso Machine',
    price: 14500,
    oldPrice: 18500,
    category: 'Home & Living',
    stock: 18,
    tag: 'Trending',
    tagColor: 'bg-[#FF9F43]',
    rating: 4.9,
    reviews: '890',
    image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=600&auto=format&fit=crop',
    description: 'Professional grade 15-bar Italian pump with instant thermal heating and milk frothing wand. Brew rich, cafe-quality espresso and cappuccinos from your countertop.',
    features: ['15-bar Italian pressure pump', 'Rapid thermoblock heating', 'Stainless steel steam wand', 'Removable 1.5L water reservoir']
  },
  {
    id: '3',
    name: 'Luxe Curve Leather Handbag',
    price: 3200,
    oldPrice: 4500,
    category: 'Women',
    stock: 30,
    tag: 'New Arrival',
    tagColor: 'bg-emerald-500',
    rating: 4.9,
    reviews: '1.4k',
    image: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=600&auto=format&fit=crop',
    description: 'Elegantly sculpted crescent handbag crafted from buttery-soft sustainable vegan leather. Features gold-tone hardware and adjustable shoulder strap.',
    features: ['Premium vegan grain leather', 'Reinforced gold-plated hardware', 'Interior zip compartment', 'Magnetic closure']
  },
  {
    id: '4',
    name: 'Nordic Minimalist Desk Lamp',
    price: 1850,
    oldPrice: 2400,
    category: 'Home & Living',
    stock: 62,
    rating: 4.7,
    reviews: '420',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&auto=format&fit=crop',
    description: 'Warm, glare-free LED illumination with touch-sensitive dimming and wireless charging base for your smartphone.',
    features: ['3 color temperature modes', 'Integrated Qi wireless charging pad', 'Memory brightness setting', 'Energy-efficient LED']
  },
  {
    id: '5',
    name: 'Ergonomic Mesh Executive Chair',
    price: 16500,
    oldPrice: 19500,
    category: 'Home & Living',
    stock: 14,
    tag: 'Top Rated',
    tagColor: 'bg-blue-600',
    rating: 4.9,
    reviews: '3.2k',
    image: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=600&auto=format&fit=crop',
    description: 'Engineered for healthy spinal posture with adaptive lumbar support, 3D armrests, and high-elasticity mesh.',
    features: ['Dynamic lumbar tracking', 'Breathable tensile mesh', 'Smooth-rolling silent casters', 'Heavy-duty steel base']
  },
  {
    id: '6',
    name: 'AcousticPro ANC Wireless Headphones',
    price: 7500,
    oldPrice: 9800,
    category: 'Electronics',
    stock: 25,
    tag: '20% OFF',
    tagColor: 'bg-purple-600',
    rating: 4.8,
    reviews: '1.1k',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop',
    description: 'Active hybrid noise cancellation blocks 98% of ambient sound. Delivers crystal clear high-fidelity audio with 40 hours battery life.',
    features: ['Hybrid active noise cancelling', '40-hour battery life with fast charge', 'Spatial audio tracking', 'Ultra-soft memory foam earcups']
  },
  {
    id: '7',
    name: 'Classic Linen Relaxed Shirt',
    price: 1650,
    oldPrice: 2200,
    category: 'Men',
    stock: 50,
    rating: 4.6,
    reviews: '310',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&auto=format&fit=crop',
    description: 'Breezy, 100% organic European flax linen shirt with relaxed collar. Perfect for warm summer weekends and casual office wear.',
    features: ['100% organic French linen', 'Pre-washed for ultra-soft hand feel', 'Mother-of-pearl buttons', 'Tailored casual fit']
  },
  {
    id: '8',
    name: 'Velvet Matte Hydrating Lip Tint',
    price: 850,
    oldPrice: 1200,
    category: 'Beauty',
    stock: 80,
    tag: 'Organic',
    tagColor: 'bg-pink-500',
    rating: 4.7,
    reviews: '640',
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600&auto=format&fit=crop',
    description: 'Weightless lip color infused with nourishing hyaluronic acid and organic jojoba oil for soft, long-lasting tint.',
    features: ['Cruelty-free & vegan certified', '12-hour transfer-resistant wear', 'Deep hydration complex', 'Non-drying velvet finish']
  },
  {
    id: '9',
    name: 'ProFit Aerobic Smart Fitness Band',
    price: 2850,
    oldPrice: 3800,
    category: 'Sports',
    stock: 35,
    tag: 'New',
    tagColor: 'bg-emerald-600',
    rating: 4.8,
    reviews: '520',
    image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=600&auto=format&fit=crop',
    description: 'Waterproof fitness tracker with heart rate monitor, sleep stage analysis, SpO2 sensor, and 14-day battery life.',
    features: ['AMOLED vibrant touchscreen', '50m water resistance (5ATM)', 'Heart rate & blood oxygen tracking', 'Over 30 sport workout modes']
  },
  {
    id: '10',
    name: 'Ultra-Slim Mechanical Wireless Keyboard',
    price: 4500,
    oldPrice: 5800,
    category: 'Electronics',
    stock: 40,
    tag: 'Popular',
    tagColor: 'bg-indigo-600',
    rating: 4.9,
    reviews: '780',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&auto=format&fit=crop',
    description: 'Low-profile mechanical switches with hot-swappable keys, RGB backlighting, and dual Bluetooth 5.2 / 2.4GHz connectivity.',
    features: ['Low profile mechanical switches', 'Multi-device Bluetooth pairing', 'CNC aluminum chassis', 'Customizable RGB backlighting']
  },
  {
    id: '11',
    name: 'Artisan Ceramic Pour-Over Coffee Dripper',
    price: 1250,
    oldPrice: 1750,
    category: 'Home & Living',
    stock: 55,
    tag: 'Artisan',
    tagColor: 'bg-amber-600',
    rating: 4.8,
    reviews: '410',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop',
    description: 'Handcrafted stoneware dripper with precision internal spiral ribs for consistent heat retention and rich extraction.',
    features: ['High-fired ceramic stoneware', 'Internal water flow spiral ribs', 'Dishwasher and microwave safe', 'Fits universal #02 filters']
  },
  {
    id: '12',
    name: 'Cashmere Wool Oversized Wrap Coat',
    price: 8500,
    oldPrice: 11000,
    category: 'Women',
    stock: 22,
    tag: 'Luxury',
    tagColor: 'bg-rose-700',
    rating: 4.9,
    reviews: '340',
    image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600&auto=format&fit=crop',
    description: 'Sumptuous double-faced cashmere and virgin wool blend. Features a draped shawl collar and detachable waist tie.',
    features: ['80% virgin wool, 20% Mongolian cashmere', 'Double-faced hand-finished seams', 'Deep welt pockets', 'Relaxed tailored silhouette']
  },
  {
    id: '13',
    name: 'Vintage Washed Denim Trucker Jacket',
    price: 2950,
    oldPrice: 3800,
    category: 'Men',
    stock: 38,
    rating: 4.7,
    reviews: '610',
    image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=600&auto=format&fit=crop',
    description: 'Classic American trucker jacket made with 100% organic cotton selvedge denim in a vintage stone-washed fade.',
    features: ['13.5oz organic rigid selvedge denim', 'Antiqued brass hardware', 'Dual chest flap pockets', 'Button-tab waist adjusters']
  },
  {
    id: '14',
    name: 'Pure Silk Floral Summer Midi Dress',
    price: 4200,
    oldPrice: 5500,
    category: 'Women',
    stock: 28,
    tag: 'Trending',
    tagColor: 'bg-fuchsia-600',
    rating: 4.8,
    reviews: '890',
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&auto=format&fit=crop',
    description: 'Fluid mulberry silk crepe de chine adorned with delicate botanical prints. Cut on the bias for a flattering silhouette.',
    features: ['100% Mulberry silk (19mm)', 'Bias-cut flattering drape', 'Adjustable spaghetti straps', 'Concealed side zipper']
  },
  {
    id: '15',
    name: 'Ultrasonic Bamboo Aromatherapy Diffuser',
    price: 1750,
    oldPrice: 2300,
    category: 'Home & Living',
    stock: 65,
    rating: 4.7,
    reviews: '530',
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&auto=format&fit=crop',
    description: 'BPA-free natural bamboo essential oil diffuser with whisper-quiet ultrasonic atomization and soft ambient LED halo.',
    features: ['Real bamboo housing', '300ml water capacity (8-10 hrs)', 'Auto safety shut-off', '7 ambient light color options']
  },
  {
    id: '16',
    name: 'Falcon 4K GPS Ultra-Light Drone',
    price: 28500,
    oldPrice: 35000,
    category: 'Electronics',
    stock: 15,
    tag: 'Flagship',
    tagColor: 'bg-cyan-700',
    rating: 4.9,
    reviews: '412',
    image: 'https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?w=600&auto=format&fit=crop',
    description: 'Compact foldable quadcopter featuring a 3-axis gimbal 4K HDR camera, 35-minute flight time, and AI obstacle avoidance.',
    features: ['4K HDR 60fps stabilized video', 'Level 5 wind resistance', '10km HD video transmission', 'Under 249g lightweight regulation']
  },
  {
    id: '17',
    name: 'Eco-Grip Natural Tree Rubber Yoga Mat',
    price: 1650,
    oldPrice: 2250,
    category: 'Sports',
    stock: 44,
    tag: 'Eco-Friendly',
    tagColor: 'bg-emerald-600',
    rating: 4.8,
    reviews: '720',
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600&auto=format&fit=crop',
    description: 'Non-slip textured surface engineered from sustainable harvested tree rubber. 5mm thickness delivers optimum joint cushioning.',
    features: ['100% biodegradable natural tree rubber', 'Laser-etched body alignment lines', 'Non-toxic, PVC and phthalate free', 'Includes carry sling strap']
  },
  {
    id: '18',
    name: 'ChronoMaster Titanium Minimalist Watch',
    price: 6500,
    oldPrice: 8500,
    category: 'Men',
    stock: 24,
    tag: 'Premium',
    tagColor: 'bg-neutral-800',
    rating: 4.9,
    reviews: '1.2k',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop',
    description: 'Grade 2 titanium case paired with scratch-resistant sapphire crystal and Japanese Miyota quartz movement.',
    features: ['Featherlight titanium casing', 'Sapphire crystal glass face', '5 ATM water resistance (50m)', 'Quick-release Italian leather strap']
  },
  {
    id: '19',
    name: 'Botanical Glow Restorative Face Serum',
    price: 1450,
    oldPrice: 1950,
    category: 'Beauty',
    stock: 75,
    tag: 'Clean Beauty',
    tagColor: 'bg-pink-600',
    rating: 4.8,
    reviews: '930',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&auto=format&fit=crop',
    description: 'Potent vitamin C and botanical squalane serum that restores natural radiance, fades dark spots, and shields against pollution.',
    features: ['15% stable THD Vitamin C', 'Plant-derived olive squalane', 'Dermatologist tested & hypoallergenic', 'Paraben, sulfate and fragrance free']
  },
  {
    id: '20',
    name: 'Handcrafted Italian Leather Oxford Shoes',
    price: 5200,
    oldPrice: 6800,
    category: 'Men',
    stock: 19,
    tag: 'Classic',
    tagColor: 'bg-amber-900',
    rating: 4.9,
    reviews: '480',
    image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=600&auto=format&fit=crop',
    description: 'Goodyear welted wholecut Oxford shoes cut from full-grain calfskin leather with hand-burnished patina finish.',
    features: ['Full-grain Italian calf leather', 'Traditional Goodyear welt construction', 'Cushioned leather insole', 'Stacked leather heel with rubber tap']
  },
  {
    id: '21',
    name: 'Compact 360 Waterproof Bluetooth Speaker',
    price: 3200,
    oldPrice: 4200,
    category: 'Electronics',
    stock: 52,
    tag: 'Hot Deal',
    tagColor: 'bg-orange-600',
    rating: 4.7,
    reviews: '1.5k',
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&auto=format&fit=crop',
    description: 'Immersive omnidirectional stereo sound with deep bass. IP67 waterproof and dustproof with 24 hours of playtime.',
    features: ['360-degree omnidirectional audio', 'IP67 fully waterproof & floats', '24-hour battery with USB-C power bank', 'True Wireless Stereo pairing']
  },
  {
    id: '22',
    name: 'Sculptural Ceramic Tabletop Flower Vase',
    price: 1150,
    oldPrice: 1600,
    category: 'Home & Living',
    stock: 48,
    rating: 4.6,
    reviews: '280',
    image: 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=600&auto=format&fit=crop',
    description: 'Contemporary donut-shaped hollow stoneware vase with a matte unglazed chalky textured exterior.',
    features: ['High-temp fired stoneware', 'Matte sculptural geometry', 'Watertight glazed interior', 'Non-scratch protective base pads']
  },
  {
    id: '23',
    name: 'Thermal Double-Wall Vacuum Water Bottle 750ml',
    price: 950,
    oldPrice: 1350,
    category: 'Sports',
    stock: 90,
    tag: 'Essential',
    tagColor: 'bg-teal-600',
    rating: 4.8,
    reviews: '2.4k',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&auto=format&fit=crop',
    description: '18/8 food-grade stainless steel flask keeps beverages ice cold for 24 hours or steaming hot for 12 hours.',
    features: ['18/8 pro-grade stainless steel', 'TempShield vacuum insulation', 'Leak-proof flex cap with silicone seal', 'Powder-coated sweat-free grip']
  },
  {
    id: '24',
    name: 'Cloud Quilted Nylon Crossbody Bag',
    price: 1850,
    oldPrice: 2500,
    category: 'Women',
    stock: 42,
    tag: 'Trending',
    tagColor: 'bg-violet-600',
    rating: 4.8,
    reviews: '670',
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&auto=format&fit=crop',
    description: 'Pillow-soft lightweight quilted bag with spacious compartments and an adjustable webbing strap.',
    features: ['Water-repellent ripstop nylon', 'Plush cloud-quilted padding', 'Interior key clip and card slots', 'Two-way smooth metal zippers']
  },
  {
    id: '25',
    name: 'Rose Quartz Gua Sha & Facial Roller Set',
    price: 850,
    oldPrice: 1250,
    category: 'Beauty',
    stock: 85,
    tag: 'Self Care',
    tagColor: 'bg-pink-400',
    rating: 4.9,
    reviews: '1.8k',
    image: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=600&auto=format&fit=crop',
    description: '100% authentic Brazilian rose quartz stone tools designed to reduce facial puffiness, boost lymphatic drainage, and relax jaw tension.',
    features: ['100% natural Grade-A rose quartz', 'Reinforced noiseless zinc frame', 'Ergonomic scalloped gua sha tool', 'Includes velvet storage pouch']
  },
  {
    id: '26',
    name: 'Japanese Uji Matcha Purifying Clay Mask',
    price: 1150,
    oldPrice: 1650,
    category: 'Beauty',
    stock: 60,
    tag: 'Detox',
    tagColor: 'bg-emerald-700',
    rating: 4.7,
    reviews: '510',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&auto=format&fit=crop',
    description: 'Mineral-rich Kaolin clay blended with ceremonial grade organic Japanese green tea matcha to decongest pores without stripping moisture.',
    features: ['Ceremonial organic Uji matcha', 'Kaolin and Bentonite purifying clays', 'Niacinamide pore refining complex', 'Sulfate and phthalate free']
  },
  {
    id: '27',
    name: 'Retro Polarized Classic Tortoise Sunglasses',
    price: 2100,
    oldPrice: 2800,
    category: 'Men',
    stock: 45,
    rating: 4.7,
    reviews: '820',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&auto=format&fit=crop',
    description: 'Handcrafted Italian acetate frames fitted with Category 3 polarized TAC lenses for 100% UV400 solar glare protection.',
    features: ['Handcrafted cellulose acetate frame', 'UV400 Category 3 polarized lenses', 'Durable 5-barrel German hinges', 'Includes hard case and microfiber cloth']
  },
  {
    id: '28',
    name: '14K Gold Minimalist Chunky Huggie Hoops',
    price: 1850,
    oldPrice: 2600,
    category: 'Women',
    stock: 35,
    tag: 'Jewelry',
    tagColor: 'bg-yellow-600',
    rating: 4.9,
    reviews: '1.1k',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&auto=format&fit=crop',
    description: 'Timeless small thick hoop earrings dipped in thick 14K yellow gold over solid 925 sterling silver.',
    features: ['14K yellow gold vermeil (2.5 microns)', 'Solid 925 hypoallergenic sterling silver base', 'Secure click-top closure', 'Nickel and lead-free']
  },
  {
    id: '29',
    name: 'Heavyweight French Terry Casual Hoodie',
    price: 2650,
    oldPrice: 3400,
    category: 'Men',
    stock: 40,
    rating: 4.8,
    reviews: '960',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&auto=format&fit=crop',
    description: '450 GSM ultra-heavyweight combed organic cotton fleece. Features a structured double-layered hood and ribbed side gussets.',
    features: ['450 GSM combed organic cotton', 'Ribbed side panels for flexibility', 'Double-needle flatlock coverstitching', 'Preshrunk to retain perfect fit']
  },
  {
    id: '30',
    name: 'Ambient Sunrise Simulation Smart Alarm Clock',
    price: 2450,
    oldPrice: 3200,
    category: 'Electronics',
    stock: 36,
    tag: 'Wellness Tech',
    tagColor: 'bg-amber-500',
    rating: 4.8,
    reviews: '640',
    image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600&auto=format&fit=crop',
    description: 'Wakes you gently by simulating natural morning dawn from red to warm white, accompanied by soothing natural sounds or FM radio.',
    features: ['Gradual 30-min sunrise light simulator', '7 soothing nature alarm melodies', 'Dual alarm with tap snooze function', 'Built-in bedside reading lamp & nightlight']
  }
];

// Initial Sample Orders
export const INITIAL_ORDERS: Order[] = [
  {
    id: 'HV-8921',
    date: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    items: [
      { product: INITIAL_PRODUCTS[0], quantity: 1 },
      { product: INITIAL_PRODUCTS[3], quantity: 1 }
    ],
    subtotal: 4300,
    discount: 300,
    shippingFee: 0,
    total: 4000,
    status: 'Processing',
    paymentMethod: 'Cash on Delivery',
    trackingNumber: 'TRK-9823412',
    shippingDetails: {
      name: 'Sarah Jenkins',
      email: 'sarah.j@example.com',
      phone: '+880 1711-234567',
      address: 'House 42, Road 11, Banani',
      city: 'Dhaka',
      zip: '1213',
      country: 'Bangladesh'
    }
  },
  {
    id: 'HV-8919',
    date: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
    items: [
      { product: INITIAL_PRODUCTS[1], quantity: 1 }
    ],
    subtotal: 14500,
    discount: 0,
    shippingFee: 0,
    total: 14500,
    status: 'Shipped',
    paymentMethod: 'Cash on Delivery',
    trackingNumber: 'TRK-9821903',
    shippingDetails: {
      name: 'Michael Chen',
      email: 'm.chen@example.com',
      phone: '+880 1819-876543',
      address: 'GEC Circle, Nasirabad',
      city: 'Chittagong',
      zip: '4000',
      country: 'Bangladesh'
    }
  },
  {
    id: 'HV-8890',
    date: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
    items: [
      { product: INITIAL_PRODUCTS[2], quantity: 1 },
      { product: INITIAL_PRODUCTS[7], quantity: 2 }
    ],
    subtotal: 4900,
    discount: 400,
    shippingFee: 0,
    total: 4500,
    status: 'Delivered',
    paymentMethod: 'Cash on Delivery',
    trackingNumber: 'TRK-9810481',
    shippingDetails: {
      name: 'Emily Davis',
      email: 'emily.d@example.com',
      phone: '+880 1912-345678',
      address: 'Zindabazar Point',
      city: 'Sylhet',
      zip: '3100',
      country: 'Bangladesh'
    }
  }
];

// Initial Discounts
export const INITIAL_DISCOUNTS: Discount[] = [
  {
    id: 'disc-1',
    code: 'WELCOME10',
    type: 'percentage',
    value: 10,
    minPurchase: 1000,
    expiresAt: '2026-12-31',
    active: true,
    usageCount: 142
  },
  {
    id: 'disc-2',
    code: 'HAVEN20',
    type: 'percentage',
    value: 20,
    minPurchase: 2000,
    expiresAt: '2026-12-31',
    active: true,
    usageCount: 89
  },
  {
    id: 'disc-3',
    code: 'FREESHIP',
    type: 'fixed',
    value: 60,
    minPurchase: 1000,
    expiresAt: '2026-12-31',
    active: true,
    usageCount: 230
  }
];

// Initial Messages
export const INITIAL_MESSAGES: SupportMessage[] = [
  {
    id: 'msg-1',
    name: 'Alex Rivera',
    email: 'alex.r@example.com',
    subject: 'Question regarding UrbanEase Sneaker sizing',
    message: 'Hello! I normally wear US 9.5 in Nike. Do these run true to size or should I size up half a size?',
    date: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    status: 'unread'
  },
  {
    id: 'msg-2',
    name: 'Clara Oswald',
    email: 'clara.o@example.com',
    subject: 'International Delivery to UK',
    message: 'Hi Haven team, do you offer expedited shipping to London? Looking to receive an order before next Friday.',
    date: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
    status: 'read'
  }
];

// Initial Store Settings
export const INITIAL_SETTINGS: StoreSettings = {
  storeName: 'Cavrozone',
  tagline: 'Premium Lifestyle & Everyday Essentials',
  contactEmail: 'cavrozone@gmail.com',
  contactPhone: '+880 1711-234567',
  currency: 'BDT',
  currencySymbol: '৳',
  shippingFee: 60,
  freeShippingThreshold: 1000,
  taxRate: 0,
  announcementText: '✨ Welcome to Cavrozone: Cash on Delivery available nationwide | Free Shipping over ৳1,000!',
  announcementEnabled: true
};

// Initial User Profile (Default unauthenticated for visitors)
export const INITIAL_USER: UserProfile | null = null;

export const INITIAL_ADDRESSES: Address[] = [];

export const INITIAL_PAYMENT_CARDS: PaymentCard[] = [];

export const INITIAL_BANNERS: BannerSettings = {
  hero: {
    tag: 'Live a better everyday',
    headline: 'Essentials for a Happier You',
    subheadline: 'Discover thoughtfully curated products that fit your lifestyle, your way.',
    ctaText: 'Shop the Collection',
    ctaLink: '/products',
    image: 'https://images.unsplash.com/photo-1542281286-9e0a16bb7366?auto=format&fit=crop&q=80'
  },
  heroSlides: [
    {
      id: 'slide-1',
      tag: 'Live a better everyday',
      headline: 'Essentials for a Happier You',
      subheadline: 'Discover thoughtfully curated products that fit your lifestyle, your way.',
      ctaText: 'Shop the Collection',
      ctaLink: '/products',
      image: 'https://images.unsplash.com/photo-1542281286-9e0a16bb7366?auto=format&fit=crop&q=80'
    },
    {
      id: 'slide-2',
      tag: 'Modern Living & Workspace',
      headline: 'Upgrade Your Daily Routine',
      subheadline: 'Engineered performance meets timeless Scandinavian design. Built for peak focus and comfort.',
      ctaText: 'Explore Electronics',
      ctaLink: '/products/category/electronics',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80'
    },
    {
      id: 'slide-3',
      tag: 'Sustainable Luxury',
      headline: 'Curated Elegance for Every Moment',
      subheadline: 'Ethically crafted organic apparel and artisanal essentials designed to last a lifetime.',
      ctaText: 'Shop New Arrivals',
      ctaLink: '/products/category/women',
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80'
    }
  ],
  sideBanners: [
    {
      id: 'side-1',
      title: 'New Arrivals',
      subtitle: 'Fresh finds, just for you.',
      image: 'https://images.unsplash.com/photo-1543459176-4426b36f23ac?auto=format&fit=crop',
      link: '/products'
    },
    {
      id: 'side-2',
      title: 'Up to 50% Off',
      subtitle: 'On selected items',
      image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop',
      link: '/products'
    },
    {
      id: 'side-3',
      title: 'Sustainable Choices',
      subtitle: 'Good for you, better for tomorrow.',
      image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop',
      link: '/products'
    }
  ],
  highlightsBanner: {
    tag: 'Curated Space',
    title: 'Transform Your Home',
    description: 'Timeless Scandinavian designs made with sustainable materials.',
    ctaText: 'Shop Collection',
    ctaLink: '/products/category/home%20%26%20living',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80'
  },
  lifestyles: [
    { id: 'life-1', title: 'Work Smarter', img: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=500&auto=format&fit=crop', link: '/products' },
    { id: 'life-2', title: 'Look Good', img: 'https://images.unsplash.com/photo-1512496015851-a1cfb38ba1fc?w=500&auto=format&fit=crop', link: '/products' },
    { id: 'life-3', title: 'Stay Active', img: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=500&auto=format&fit=crop', link: '/products' },
    { id: 'life-4', title: 'Feel Your Best', img: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=500&auto=format&fit=crop', link: '/products' },
    { id: 'life-5', title: 'Better Living', img: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=500&auto=format&fit=crop', link: '/products' },
    { id: 'life-6', title: 'On the Go', img: 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=500&auto=format&fit=crop', link: '/products' }
  ]
};

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface StoreContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  
  wishlist: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  wishlistCount: number;

  orders: Order[];
  createOrder: (order: Omit<Order, 'id' | 'date'>) => Order;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  deleteOrder: (orderId: string) => void;

  discounts: Discount[];
  addDiscount: (discount: Omit<Discount, 'id' | 'usageCount'>) => void;
  toggleDiscount: (id: string) => void;
  deleteDiscount: (id: string) => void;
  applyDiscountCode: (code: string, subtotal: number) => { valid: boolean; discountAmount: number; message: string; discount?: Discount };

  messages: SupportMessage[];
  addMessage: (msg: Omit<SupportMessage, 'id' | 'date' | 'status'>) => void;
  replyToMessage: (id: string, replyText: string) => void;
  deleteMessage: (id: string) => void;

  settings: StoreSettings;
  updateSettings: (newSettings: Partial<StoreSettings>) => void;

  banners: BannerSettings;
  updateAllBanners: (newBanners: BannerSettings) => void;
  updateHeroBanner: (heroUpdates: Partial<HeroBanner>) => void;
  updateHeroSlide: (index: number, updates: Partial<HeroSlide>) => void;
  updateSideBanner: (id: string, updates: Partial<SideBanner>) => void;
  updateHighlightsBanner: (updates: Partial<HighlightsBanner>) => void;
  updateLifestyleBanner: (id: string, updates: Partial<LifestyleBanner>) => void;
  resetBannersToDefault: () => void;

  user: UserProfile | null;
  addresses: Address[];
  paymentCards: PaymentCard[];
  updateUserProfile: (updates: Partial<UserProfile>) => void;
  addAddress: (address: Omit<Address, 'id'>) => void;
  deleteAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  addPaymentCard: (card: Omit<PaymentCard, 'id'>) => void;
  deletePaymentCard: (id: string) => void;
  login: (email: string, pass: string) => boolean;
  signup: (name: string, email: string, pass: string) => boolean;
  logout: () => void;

  isAdminAuthenticated: boolean;
  adminLogin: (email: string, pass: string) => boolean;
  adminLogout: () => void;

  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  dismissToast: (id: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [discounts, setDiscounts] = useState<Discount[]>(INITIAL_DISCOUNTS);
  const [messages, setMessages] = useState<SupportMessage[]>(INITIAL_MESSAGES);
  const [settings, setSettings] = useState<StoreSettings>(INITIAL_SETTINGS);
  const [banners, setBanners] = useState<BannerSettings>(INITIAL_BANNERS);
  const [user, setUser] = useState<UserProfile | null>(INITIAL_USER);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [addresses, setAddresses] = useState<Address[]>(INITIAL_ADDRESSES);
  const [paymentCards, setPaymentCards] = useState<PaymentCard[]>(INITIAL_PAYMENT_CARDS);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize from LocalStorage
  useEffect(() => {
    try {
      const savedProducts = localStorage.getItem('haven_products');
      if (savedProducts) {
        try {
          const parsed = JSON.parse(savedProducts);
          // Auto-migrate if any product still has old USD price (< 400) or missing items
          const hasOldUsdPrices = Array.isArray(parsed) && parsed.some((p: Product) => p.price < 400);
          if (Array.isArray(parsed) && parsed.length >= 25 && !hasOldUsdPrices) {
            setProducts(parsed);
          } else {
            setProducts(INITIAL_PRODUCTS);
            localStorage.setItem('haven_products', JSON.stringify(INITIAL_PRODUCTS));
          }
        } catch {
          setProducts(INITIAL_PRODUCTS);
        }
      } else {
        setProducts(INITIAL_PRODUCTS);
      }

      const savedWishlist = localStorage.getItem('haven_wishlist');
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));

      const savedOrders = localStorage.getItem('haven_orders');
      if (savedOrders) {
        try {
          const parsedO = JSON.parse(savedOrders);
          const hasOldOrders = Array.isArray(parsedO) && parsedO.some((o: Order) => o.total < 400);
          if (Array.isArray(parsedO) && !hasOldOrders) {
            setOrders(parsedO);
          } else {
            setOrders(INITIAL_ORDERS);
            localStorage.setItem('haven_orders', JSON.stringify(INITIAL_ORDERS));
          }
        } catch {
          setOrders(INITIAL_ORDERS);
        }
      } else {
        setOrders(INITIAL_ORDERS);
      }

      const savedDiscounts = localStorage.getItem('haven_discounts');
      if (savedDiscounts) {
        try {
          const parsedD = JSON.parse(savedDiscounts);
          const hasOldDiscounts = Array.isArray(parsedD) && parsedD.some((d: Discount) => d.minPurchase < 100);
          if (Array.isArray(parsedD) && !hasOldDiscounts) {
            setDiscounts(parsedD);
          } else {
            setDiscounts(INITIAL_DISCOUNTS);
            localStorage.setItem('haven_discounts', JSON.stringify(INITIAL_DISCOUNTS));
          }
        } catch {
          setDiscounts(INITIAL_DISCOUNTS);
        }
      } else {
        setDiscounts(INITIAL_DISCOUNTS);
      }

      const savedMessages = localStorage.getItem('haven_messages');
      if (savedMessages) setMessages(JSON.parse(savedMessages));

      const savedSettings = localStorage.getItem('haven_settings');
      if (savedSettings) {
        try {
          const parsedS = JSON.parse(savedSettings);
          if (
            parsedS.currency === 'USD' || 
            parsedS.currencySymbol === '$' || 
            parsedS.contactEmail?.includes('haven.com') || 
            parsedS.contactEmail?.includes('support@cavrozone.com') ||
            parsedS.contactPhone?.includes('+880 1700-000000')
          ) {
            parsedS.currency = 'BDT';
            parsedS.currencySymbol = '৳';
            parsedS.shippingFee = 60;
            parsedS.freeShippingThreshold = 1000;
            parsedS.contactEmail = 'cavrozone@gmail.com';
            parsedS.contactPhone = '+880 1711-234567';
            parsedS.storeName = 'Cavrozone';
            parsedS.announcementText = '✨ Welcome to Cavrozone: Cash on Delivery available nationwide | Free Shipping over ৳1,000!';
            localStorage.setItem('haven_settings', JSON.stringify(parsedS));
          }
          setSettings({ ...INITIAL_SETTINGS, ...parsedS });
        } catch {
          setSettings(INITIAL_SETTINGS);
        }
      } else {
        setSettings(INITIAL_SETTINGS);
      }

      const savedBanners = localStorage.getItem('haven_banners');
      if (savedBanners) {
        try {
          const parsedB = JSON.parse(savedBanners);
          if (!parsedB.heroSlides || !Array.isArray(parsedB.heroSlides) || parsedB.heroSlides.length < 3) {
            parsedB.heroSlides = INITIAL_BANNERS.heroSlides;
          }
          setBanners({ ...INITIAL_BANNERS, ...parsedB });
        } catch {
          setBanners(INITIAL_BANNERS);
        }
      }

      const savedUser = localStorage.getItem('haven_user');
      if (savedUser) {
        try {
          const parsedU = JSON.parse(savedUser);
          if (
            !parsedU ||
            parsedU.id === 'usr-admin-1' || 
            parsedU.id === 'admin-cavrozone' ||
            parsedU.role === 'admin' ||
            parsedU.name === 'John Doe' || 
            parsedU.name === 'Cavrozone Admin' ||
            parsedU.email === 'john.doe@example.com' || 
            parsedU.email === 'cavrozone@gmail.com' ||
            parsedU.email?.includes('admin@cavrozone.com') ||
            parsedU.email?.includes('customer@cavrozone.com')
          ) {
            localStorage.removeItem('haven_user');
            setUser(null);
          } else {
            setUser(parsedU);
          }
        } catch {
          localStorage.removeItem('haven_user');
          setUser(null);
        }
      } else {
        setUser(null);
      }

      const savedAddresses = localStorage.getItem('haven_addresses');
      if (savedAddresses) {
        try {
          const parsedA = JSON.parse(savedAddresses);
          const cleanAddresses = Array.isArray(parsedA)
            ? parsedA.filter((a: Address) => a.name !== 'John Doe' && !a.street?.includes('742 Evergreen'))
            : [];
          setAddresses(cleanAddresses);
          localStorage.setItem('haven_addresses', JSON.stringify(cleanAddresses));
        } catch {
          setAddresses([]);
        }
      } else {
        setAddresses([]);
      }

      const savedCards = localStorage.getItem('haven_cards');
      if (savedCards) {
        try {
          const parsedC = JSON.parse(savedCards);
          const cleanCards = Array.isArray(parsedC)
            ? parsedC.filter((c: PaymentCard) => c.cardHolder !== 'John Doe')
            : [];
          setPaymentCards(cleanCards);
          localStorage.setItem('haven_cards', JSON.stringify(cleanCards));
        } catch {
          setPaymentCards([]);
        }
      } else {
        setPaymentCards([]);
      }

      const savedAdminAuth = localStorage.getItem('cavrozone_admin_auth');
      if (savedAdminAuth === 'true') {
        setIsAdminAuthenticated(true);
      }
    } catch (e) {
      console.error('Failed to load store data from localStorage', e);
    }
    setIsLoaded(true);
  }, []);

  // Cloud Firestore Real-time Multi-device Sync
  useEffect(() => {
    let unsubBanners: () => void = () => {};
    let unsubProducts: () => void = () => {};
    let unsubSettings: () => void = () => {};
    let unsubOrders: () => void = () => {};
    let unsubDiscounts: () => void = () => {};

    try {
      // 1. Banners Sync
      const bannersRef = doc(db, 'store', 'banners');
      unsubBanners = onSnapshot(bannersRef, (snap) => {
        if (!snap.metadata.hasPendingWrites && snap.exists()) {
          const data = snap.data() as BannerSettings;
          if (data && Array.isArray(data.heroSlides) && data.heroSlides.length >= 3) {
            setBanners(data);
            try { localStorage.setItem('haven_banners', JSON.stringify(data)); } catch {}
          }
        }
      }, (err) => console.log('Firestore banners listener info:', err.message));

      // 2. Products Sync
      const productsRef = doc(db, 'store', 'products');
      unsubProducts = onSnapshot(productsRef, (snap) => {
        if (!snap.metadata.hasPendingWrites && snap.exists()) {
          const data = snap.data();
          if (data && Array.isArray(data.items) && data.items.length > 0) {
            setProducts(data.items);
            try { localStorage.setItem('haven_products', JSON.stringify(data.items)); } catch {}
          }
        }
      }, (err) => console.log('Firestore products listener info:', err.message));

      // 3. Store Settings Sync
      const settingsRef = doc(db, 'store', 'settings');
      unsubSettings = onSnapshot(settingsRef, (snap) => {
        if (!snap.metadata.hasPendingWrites && snap.exists()) {
          const data = snap.data() as StoreSettings;
          if (data && data.storeName) {
            setSettings(data);
            try { localStorage.setItem('haven_settings', JSON.stringify(data)); } catch {}
          }
        }
      }, (err) => console.log('Firestore settings listener info:', err.message));

      // 4. Orders Sync
      const ordersRef = doc(db, 'store', 'orders');
      unsubOrders = onSnapshot(ordersRef, (snap) => {
        if (!snap.metadata.hasPendingWrites && snap.exists()) {
          const data = snap.data();
          if (data && Array.isArray(data.items)) {
            setOrders(data.items);
            try { localStorage.setItem('haven_orders', JSON.stringify(data.items)); } catch {}
          }
        }
      }, (err) => console.log('Firestore orders listener info:', err.message));

      // 5. Discounts Sync
      const discountsRef = doc(db, 'store', 'discounts');
      unsubDiscounts = onSnapshot(discountsRef, (snap) => {
        if (!snap.metadata.hasPendingWrites && snap.exists()) {
          const data = snap.data();
          if (data && Array.isArray(data.items)) {
            setDiscounts(data.items);
            try { localStorage.setItem('haven_discounts', JSON.stringify(data.items)); } catch {}
          }
        }
      }, (err) => console.log('Firestore discounts listener info:', err.message));
    } catch (e) {
      console.log('Firestore real-time sync offline fallback');
    }

    return () => {
      unsubBanners();
      unsubProducts();
      unsubSettings();
      unsubOrders();
      unsubDiscounts();
    };
  }, []);

  // Sync back to LocalStorage AND Cloud Firestore
  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem('haven_products', JSON.stringify(products));
    try {
      setDoc(doc(db, 'store', 'products'), { items: products }, { merge: true }).catch(() => {});
    } catch {}
  }, [products, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem('haven_wishlist', JSON.stringify(wishlist));
  }, [wishlist, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem('haven_orders', JSON.stringify(orders));
    try {
      setDoc(doc(db, 'store', 'orders'), { items: orders }, { merge: true }).catch(() => {});
    } catch {}
  }, [orders, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem('haven_discounts', JSON.stringify(discounts));
    try {
      setDoc(doc(db, 'store', 'discounts'), { items: discounts }, { merge: true }).catch(() => {});
    } catch {}
  }, [discounts, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem('haven_messages', JSON.stringify(messages));
    try {
      setDoc(doc(db, 'store', 'messages'), { items: messages }, { merge: true }).catch(() => {});
    } catch {}
  }, [messages, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem('haven_settings', JSON.stringify(settings));
    try {
      setDoc(doc(db, 'store', 'settings'), settings, { merge: true }).catch(() => {});
    } catch {}
  }, [settings, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem('haven_banners', JSON.stringify(banners));
    try {
      setDoc(doc(db, 'store', 'banners'), banners, { merge: true }).catch(() => {});
    } catch {}
  }, [banners, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      if (user) {
        localStorage.setItem('haven_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('haven_user');
      }
    } catch {}
  }, [user, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem('haven_addresses', JSON.stringify(addresses));
  }, [addresses, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem('haven_cards', JSON.stringify(paymentCards));
  }, [paymentCards, isLoaded]);

  // Toast System
  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  };

  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Products CRUD
  const addProduct = (productData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...productData,
      id: Math.random().toString(36).substring(2, 9)
    };
    setProducts(prev => [newProduct, ...prev]);
    showToast(`Product "${newProduct.name}" added successfully!`);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
    showToast('Product updated successfully!');
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    showToast('Product deleted', 'info');
  };

  // Wishlist
  const addToWishlist = (product: Product) => {
    if (!wishlist.some(p => p.id === product.id)) {
      setWishlist(prev => [...prev, product]);
      showToast(`Added to your Wishlist!`);
    }
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist(prev => prev.filter(p => p.id !== productId));
    showToast(`Removed from Wishlist`, 'info');
  };

  const toggleWishlist = (product: Product) => {
    if (wishlist.some(p => p.id === product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some(p => p.id === productId);
  };

  // Orders
  const createOrder = (orderData: Omit<Order, 'id' | 'date'>) => {
    const newOrder: Order = {
      ...orderData,
      id: `HV-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString()
    };
    setOrders(prev => [newOrder, ...prev]);

    // Deduct stock for ordered items
    setProducts(prev => prev.map(prod => {
      const item = orderData.items.find(i => i.product.id === prod.id);
      if (item) {
        return { ...prod, stock: Math.max(0, prod.stock - item.quantity) };
      }
      return prod;
    }));

    showToast(`Order #${newOrder.id} placed successfully!`);
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
    showToast(`Order #${orderId} marked as ${status}`);
  };

  const deleteOrder = (orderId: string) => {
    setOrders(prev => prev.filter(o => o.id !== orderId));
    showToast(`Order #${orderId} deleted`, 'info');
  };

  // Discounts
  const addDiscount = (discountData: Omit<Discount, 'id' | 'usageCount'>) => {
    const newDiscount: Discount = {
      ...discountData,
      code: discountData.code.toUpperCase().trim(),
      id: `disc-${Date.now()}`,
      usageCount: 0
    };
    setDiscounts(prev => [newDiscount, ...prev]);
    showToast(`Coupon code ${newDiscount.code} created!`);
  };

  const toggleDiscount = (id: string) => {
    setDiscounts(prev => prev.map(d => d.id === id ? { ...d, active: !d.active } : d));
  };

  const deleteDiscount = (id: string) => {
    setDiscounts(prev => prev.filter(d => d.id !== id));
    showToast('Discount removed', 'info');
  };

  const applyDiscountCode = (code: string, subtotal: number) => {
    const clean = code.toUpperCase().trim();
    const match = discounts.find(d => d.code === clean && d.active);

    if (!match) {
      return { valid: false, discountAmount: 0, message: 'Invalid or expired coupon code.' };
    }

    if (subtotal < match.minPurchase) {
      return {
        valid: false,
        discountAmount: 0,
        message: `Requires minimum purchase of ৳${match.minPurchase}.`
      };
    }

    let discountAmount = 0;
    if (match.type === 'percentage') {
      discountAmount = (subtotal * match.value) / 100;
    } else {
      discountAmount = match.value;
    }

    // Update usage count
    setDiscounts(prev => prev.map(d => d.id === match.id ? { ...d, usageCount: d.usageCount + 1 } : d));

    return {
      valid: true,
      discountAmount,
      message: `Coupon ${clean} applied: ৳${discountAmount.toFixed(2)} off!`,
      discount: match
    };
  };

  // Messages
  const addMessage = (msgData: Omit<SupportMessage, 'id' | 'date' | 'status'>) => {
    const newMsg: SupportMessage = {
      ...msgData,
      id: `msg-${Date.now()}`,
      date: new Date().toISOString(),
      status: 'unread'
    };
    setMessages(prev => [newMsg, ...prev]);
    showToast('Message sent! Our support team will get back to you shortly.');
  };

  const replyToMessage = (id: string, replyText: string) => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, status: 'replied', reply: replyText } : m));
    showToast('Reply sent successfully!');
  };

  const deleteMessage = (id: string) => {
    setMessages(prev => prev.filter(m => m.id !== id));
    showToast('Message deleted', 'info');
  };

  // Settings
  const updateSettings = (newSettings: Partial<StoreSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
    showToast('Store settings saved successfully!');
  };

  // Banners
  const updateAllBanners = (newBanners: BannerSettings) => {
    setBanners(newBanners);
    showToast('All banner settings saved successfully!');
  };

  const updateHeroBanner = (heroUpdates: Partial<HeroBanner>) => {
    setBanners(prev => ({
      ...prev,
      hero: { ...prev.hero, ...heroUpdates }
    }));
    showToast('Hero banner updated!');
  };

  const updateHeroSlide = (index: number, updates: Partial<HeroSlide>) => {
    setBanners(prev => {
      const slides = [...(prev.heroSlides || INITIAL_BANNERS.heroSlides)];
      if (slides[index]) {
        slides[index] = { ...slides[index], ...updates };
      }
      return {
        ...prev,
        hero: index === 0 ? { ...prev.hero, ...updates } : prev.hero,
        heroSlides: slides
      };
    });
    showToast(`Hero Slide #${index + 1} updated!`);
  };

  const updateSideBanner = (id: string, updates: Partial<SideBanner>) => {
    setBanners(prev => ({
      ...prev,
      sideBanners: prev.sideBanners.map(b => b.id === id ? { ...b, ...updates } : b)
    }));
    showToast('Side banner updated!');
  };

  const updateHighlightsBanner = (updates: Partial<HighlightsBanner>) => {
    setBanners(prev => ({
      ...prev,
      highlightsBanner: { ...prev.highlightsBanner, ...updates }
    }));
    showToast('Highlights banner updated!');
  };

  const updateLifestyleBanner = (id: string, updates: Partial<LifestyleBanner>) => {
    setBanners(prev => ({
      ...prev,
      lifestyles: prev.lifestyles.map(l => l.id === id ? { ...l, ...updates } : l)
    }));
    showToast('Lifestyle banner updated!');
  };

  const resetBannersToDefault = () => {
    setBanners(INITIAL_BANNERS);
    showToast('All banners restored to default', 'info');
  };

  // User Profile & Addresses
  const updateUserProfile = (updates: Partial<UserProfile>) => {
    if (user) {
      const updated = { ...user, ...updates };
      setUser(updated);
      try {
        localStorage.setItem('haven_user', JSON.stringify(updated));
      } catch {}
      showToast('Profile updated!');
    }
  };

  const addAddress = (addressData: Omit<Address, 'id'>) => {
    const newAddr: Address = {
      ...addressData,
      id: `addr-${Date.now()}`
    };
    if (newAddr.isDefault) {
      setAddresses(prev => prev.map(a => ({ ...a, isDefault: false })).concat(newAddr));
    } else {
      setAddresses(prev => [...prev, newAddr]);
    }
    showToast('Address added!');
  };

  const deleteAddress = (id: string) => {
    setAddresses(prev => prev.filter(a => a.id !== id));
    showToast('Address deleted', 'info');
  };

  const setDefaultAddress = (id: string) => {
    setAddresses(prev => prev.map(a => ({ ...a, isDefault: a.id === id })));
    showToast('Default address set!');
  };

  const addPaymentCard = (cardData: Omit<PaymentCard, 'id'>) => {
    const newCard: PaymentCard = {
      ...cardData,
      id: `card-${Date.now()}`
    };
    if (newCard.isDefault) {
      setPaymentCards(prev => prev.map(c => ({ ...c, isDefault: false })).concat(newCard));
    } else {
      setPaymentCards(prev => [...prev, newCard]);
    }
    showToast('Payment method saved!');
  };

  const deletePaymentCard = (id: string) => {
    setPaymentCards(prev => prev.filter(c => c.id !== id));
    showToast('Payment method removed', 'info');
  };

  const login = (email: string, pass: string) => {
    const rawName = email.split('@')[0];
    const formattedName = rawName.charAt(0).toUpperCase() + rawName.slice(1);
    const loggedUser: UserProfile = {
      id: 'usr-' + Date.now(),
      name: formattedName,
      email: email,
      role: 'customer',
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(formattedName)}&background=random`
    };
    setUser(loggedUser);
    try {
      localStorage.setItem('haven_user', JSON.stringify(loggedUser));
    } catch {}
    showToast(`Welcome back, ${loggedUser.name}!`);
    return true;
  };

  const signup = (name: string, email: string, pass: string) => {
    const newUser: UserProfile = {
      id: 'usr-' + Date.now(),
      name: name,
      email: email,
      role: 'customer',
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`
    };
    setUser(newUser);
    try {
      localStorage.setItem('haven_user', JSON.stringify(newUser));
    } catch {}
    showToast(`Account created! Welcome to Cavrozone, ${name}.`);
    return true;
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem('haven_user');
    } catch {}
    showToast('Signed out successfully', 'info');
  };

  const adminLogin = (email: string, pass: string) => {
    const cleanEmail = email.trim().toLowerCase();
    if (cleanEmail === 'cavrozone@gmail.com' && pass === '@#23#@') {
      setIsAdminAuthenticated(true);
      try {
        localStorage.setItem('cavrozone_admin_auth', 'true');
      } catch {}
      showToast('Admin authentication successful! Welcome to Cavrozone Dashboard.');
      return true;
    }
    showToast('Invalid admin credentials. Please try again.', 'error');
    return false;
  };

  const adminLogout = () => {
    setIsAdminAuthenticated(false);
    try {
      localStorage.removeItem('cavrozone_admin_auth');
    } catch {}
    showToast('Admin signed out successfully', 'info');
  };

  return (
    <StoreContext.Provider value={{
      products,
      addProduct,
      updateProduct,
      deleteProduct,

      wishlist,
      addToWishlist,
      removeFromWishlist,
      toggleWishlist,
      isInWishlist,
      wishlistCount: wishlist.length,

      orders,
      createOrder,
      updateOrderStatus,
      deleteOrder,

      discounts,
      addDiscount,
      toggleDiscount,
      deleteDiscount,
      applyDiscountCode,

      messages,
      addMessage,
      replyToMessage,
      deleteMessage,

      settings,
      updateSettings,

      banners,
      updateAllBanners,
      updateHeroBanner,
      updateHeroSlide,
      updateSideBanner,
      updateHighlightsBanner,
      updateLifestyleBanner,
      resetBannersToDefault,

      user,
      addresses,
      paymentCards,
      updateUserProfile,
      addAddress,
      deleteAddress,
      setDefaultAddress,
      addPaymentCard,
      deletePaymentCard,
      login,
      signup,
      logout,
      isAdminAuthenticated,
      adminLogin,
      adminLogout,

      toasts,
      showToast,
      dismissToast
    }}>
      {children}
      {/* Toast Floating Notification Container */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 pointer-events-none">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`pointer-events-auto px-5 py-3 rounded-xl shadow-xl text-sm font-semibold flex items-center gap-3 transition-all transform translate-y-0 opacity-100 ${
              toast.type === 'success' 
                ? 'bg-gray-950 text-white border border-gray-800' 
                : toast.type === 'error'
                ? 'bg-red-600 text-white'
                : 'bg-white text-gray-900 border border-gray-200'
            }`}
          >
            <span>{toast.message}</span>
            <button
              onClick={() => dismissToast(toast.id)}
              className="text-xs opacity-70 hover:opacity-100 ml-2"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </StoreContext.Provider>
  );
}

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
