const fs = require('fs');
const path = require('path');

const files = {
  'src/components/layout/Header.tsx': `
import React from 'react';
import { Search, HelpCircle, Box, Heart, ShoppingBag, User } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="container mx-auto px-4 lg:px-8 py-4">
        <div className="flex items-center justify-between gap-8">
          <div className="flex items-center gap-2">
            <Link href="/" className="text-2xl font-bold tracking-tight">Haven</Link>
          </div>
          
          <div className="flex-1 max-w-2xl hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2">
            <Search className="w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search for products, brands or inspiration..." 
              className="bg-transparent border-none outline-none flex-1 px-3 text-sm"
            />
            <Search className="w-5 h-5 text-gray-400 invisible" />
          </div>

          <div className="flex items-center gap-6">
            <Link href="#" className="hidden lg:flex items-center gap-2 text-sm text-gray-600 hover:text-black">
              Help
            </Link>
            <Link href="#" className="hidden lg:flex items-center gap-2 text-sm text-gray-600 hover:text-black">
              Orders
            </Link>
            <Link href="#" className="text-gray-600 hover:text-black">
              <Heart className="w-5 h-5" />
            </Link>
            <Link href="#" className="text-gray-600 hover:text-black relative">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">2</span>
            </Link>
            <Link href="/dashboard" className="flex items-center gap-2 text-sm font-medium">
              <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                <img src="https://ui-avatars.com/api/?name=Bappy&background=random" alt="User" />
              </div>
              <div className="hidden lg:block leading-tight">
                <div className="text-xs text-gray-500">Hello, Bappy</div>
                <div>My Account <span className="text-[10px]">▼</span></div>
              </div>
            </Link>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-8 mt-4 text-sm font-medium text-gray-600 overflow-x-auto">
          <Link href="#" className="text-black border-b-2 border-black pb-1">All Products</Link>
          <Link href="#" className="hover:text-black pb-1">Women</Link>
          <Link href="#" className="hover:text-black pb-1">Men</Link>
          <Link href="#" className="hover:text-black pb-1">Home & Living</Link>
          <Link href="#" className="hover:text-black pb-1">Beauty</Link>
          <Link href="#" className="hover:text-black pb-1">Electronics</Link>
          <Link href="#" className="hover:text-black pb-1">Sports</Link>
          <Link href="#" className="text-red-500 hover:text-red-600 pb-1">Deals</Link>
        </nav>
      </div>
    </header>
  );
}
`,
  'src/components/storefront/Hero.tsx': `
import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="container mx-auto px-4 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 relative rounded-2xl overflow-hidden bg-[#e8e4db] aspect-[2/1] lg:aspect-auto min-h-[400px]">
        <img src="https://images.unsplash.com/photo-1517627043994-5c8cb5f9630c?q=80&w=2938&auto=format&fit=crop" alt="Hero" className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-multiply" />
        <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-center">
          <span className="uppercase text-sm tracking-widest mb-4 font-semibold text-gray-700">Live a better everyday</span>
          <h1 className="text-4xl md:text-6xl font-serif text-[#3a3532] leading-tight mb-4">Essentials<br/>for a Happier You</h1>
          <p className="text-gray-700 max-w-sm mb-8">Discover thoughtfully curated products that fit your lifestyle, your way.</p>
          <div>
            <button className="bg-[#2c2a29] text-white px-6 py-3 rounded-full flex items-center gap-2 hover:bg-black transition-colors">
              Shop the Collection <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="mt-auto pt-8 flex items-center gap-4">
            <div className="flex -space-x-2">
              {[1,2,3,4].map(i => (
                <img key={i} src={\`https://ui-avatars.com/api/?name=U\${i}&background=random\`} className="w-8 h-8 rounded-full border-2 border-[#e8e4db]" alt="user" />
              ))}
            </div>
            <div className="text-sm">
              <div className="font-bold">50K+ happy customers</div>
              <div className="text-yellow-600 text-xs">★★★★★ 4.9 (12k reviews)</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <div className="bg-[#f2efe9] rounded-2xl p-6 relative overflow-hidden flex flex-col justify-center min-h-[190px]">
          <div className="relative z-10 w-2/3">
            <h3 className="text-xl font-bold mb-1">New Arrivals</h3>
            <p className="text-sm text-gray-600 mb-4">Fresh finds, just for you.</p>
            <button className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center hover:scale-105 transition-transform">
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <img src="https://images.unsplash.com/photo-1543459176-4426b36f23ac?w=500&auto=format&fit=crop" className="absolute right-0 top-0 bottom-0 w-1/2 object-cover object-left mask-image-gradient" alt="New Arrivals" />
        </div>
        
        <div className="bg-[#e4e9e0] rounded-2xl p-6 relative overflow-hidden flex flex-col justify-center min-h-[190px]">
          <div className="relative z-10 w-2/3">
            <h3 className="text-xl font-bold mb-1">Up to 50% Off</h3>
            <p className="text-sm text-gray-600 mb-4">On selected items</p>
            <button className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center hover:scale-105 transition-transform">
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <img src="https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500&auto=format&fit=crop" className="absolute right-0 top-0 bottom-0 w-1/2 object-cover mask-image-gradient" alt="Headphones" />
        </div>
        
        <div className="bg-[#e9ead8] rounded-2xl p-6 relative overflow-hidden flex flex-col justify-center min-h-[190px]">
          <div className="relative z-10 w-2/3">
            <h3 className="text-xl font-bold mb-1">Sustainable Choices</h3>
            <p className="text-sm text-gray-600 mb-4">Good for you, better for tomorrow.</p>
            <button className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center hover:scale-105 transition-transform">
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <img src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=500&auto=format&fit=crop" className="absolute right-0 top-0 bottom-0 w-1/2 object-cover mask-image-gradient" alt="Plant" />
        </div>
      </div>
    </section>
  );
}
`,
  'src/components/storefront/Categories.tsx': `
import React from 'react';
import { Shirt, ShoppingBag, Monitor, Search, Coffee, Gift, Dumbbell, Sparkles } from 'lucide-react';
import { ArrowRight } from 'lucide-react';

const categories = [
  { name: 'Women', icon: Shirt, color: 'bg-red-50 text-red-500' },
  { name: 'Men', icon: Shirt, color: 'bg-blue-50 text-blue-500' },
  { name: 'Home & Living', icon: Coffee, color: 'bg-orange-50 text-orange-500' },
  { name: 'Electronics', icon: Monitor, color: 'bg-teal-50 text-teal-500' },
  { name: 'Beauty', icon: Sparkles, color: 'bg-pink-50 text-pink-500' },
  { name: 'Sports', icon: Dumbbell, color: 'bg-purple-50 text-purple-500' },
  { name: 'Bags & Accessories', icon: ShoppingBag, color: 'bg-yellow-50 text-yellow-600' },
  { name: 'Gifts', icon: Gift, color: 'bg-blue-50 text-blue-500' },
];

export default function Categories() {
  return (
    <section className="container mx-auto px-4 lg:px-8 py-8">
      <div className="flex items-center justify-between overflow-x-auto gap-4 pb-4 scrollbar-hide">
        {categories.map((c, i) => (
          <div key={i} className="flex flex-col items-center gap-3 min-w-[80px] cursor-pointer group">
            <div className={\`w-16 h-16 rounded-full flex items-center justify-center transition-transform group-hover:scale-110 \${c.color}\`}>
              <c.icon className="w-6 h-6" />
            </div>
            <span className="text-xs font-medium text-gray-700 whitespace-nowrap">{c.name}</span>
          </div>
        ))}
        
        <div className="flex-1 min-w-[200px] ml-4">
          <div className="bg-red-50 rounded-2xl p-4 flex items-center justify-between cursor-pointer group">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-500">
                <span className="text-xl">🔥</span>
              </div>
              <div>
                <div className="font-bold text-red-600">Deals</div>
                <div className="text-xs text-red-500">Of The Day</div>
              </div>
            </div>
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:bg-red-500 group-hover:text-white transition-colors">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
`,
  'src/components/storefront/Features.tsx': `
import React from 'react';
import { Truck, RotateCcw, ShieldCheck, Headset, Leaf } from 'lucide-react';

const features = [
  { title: 'Free Shipping', desc: 'On orders over $50', icon: Truck },
  { title: 'Easy Returns', desc: 'Hassle-free within 30 days', icon: RotateCcw },
  { title: 'Secure Payments', desc: '100% protected', icon: ShieldCheck },
  { title: '24/7 Support', desc: 'We\\'re here to help', icon: Headset },
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
`,
  'src/components/storefront/Highlights.tsx': `
import React from 'react';
import { Heart, ShoppingCart, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const products = [
  { id: 1, name: 'UrbanEase Sneakers', rating: 4.8, reviews: '2.1k', price: 79, oldPrice: 99, tag: 'Best Seller', tagColor: 'bg-red-500', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop' },
  { id: 2, name: 'BrewMaster Coffee Machine', rating: 4.7, reviews: '890', price: 129, oldPrice: 199, tag: 'Limited Time', tagColor: 'bg-orange-500', img: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500&auto=format&fit=crop' },
  { id: 3, name: 'Luxe Curve Handbag', rating: 4.9, reviews: '1.4k', price: 89, oldPrice: 129, tag: 'Trending', tagColor: 'bg-pink-500', img: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=500&auto=format&fit=crop' },
];

export default function Highlights() {
  return (
    <section className="container mx-auto px-4 lg:px-8 mb-12">
      <div className="flex items-end justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold mb-1">Today's Highlights</h2>
          <p className="text-gray-500 text-sm">Handpicked just for you</p>
        </div>
        <div className="flex gap-2">
          <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"><ChevronLeft className="w-4 h-4" /></button>
          <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"><ChevronRight className="w-4 h-4" /></button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map(p => (
          <div key={p.id} className="group">
            <div className="relative bg-gray-100 rounded-2xl aspect-[4/3] mb-4 overflow-hidden">
              <img src={p.img} alt={p.name} className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500" />
              <div className={\`absolute top-3 left-3 \${p.tagColor} text-white text-[10px] font-bold px-2 py-1 rounded\`}>{p.tag}</div>
              <button className="absolute top-3 right-3 w-8 h-8 bg-white/80 backdrop-blur rounded-full flex items-center justify-center hover:bg-white text-gray-600 hover:text-red-500 transition-colors">
                <Heart className="w-4 h-4" />
              </button>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">{p.name}</h3>
            <div className="flex items-center gap-1 mb-2">
              <div className="flex text-yellow-400 text-xs">★★★★★</div>
              <span className="text-xs font-medium">{p.rating}</span>
              <span className="text-xs text-gray-500">({p.reviews})</span>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <span className="font-bold text-red-500">$\${p.price}</span>
              <span className="text-sm text-gray-400 line-through">$\${p.oldPrice}</span>
            </div>
            <button className="w-full border border-gray-200 rounded-full py-2 flex items-center justify-center gap-2 text-sm font-medium hover:border-black hover:bg-black hover:text-white transition-colors">
              <ShoppingCart className="w-4 h-4" /> Add to Cart
            </button>
          </div>
        ))}
        
        <div className="bg-[#bcaaa4] rounded-2xl p-8 relative overflow-hidden flex flex-col justify-center text-white min-h-[300px]">
          <img src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-multiply" alt="Room" />
          <div className="relative z-10">
            <h3 className="text-3xl font-serif leading-tight mb-2">Make Your<br/>Space Yours</h3>
            <p className="text-sm mb-6 opacity-90">Beautiful living, made simple.</p>
            <button className="bg-white text-black px-5 py-2 rounded-full text-sm font-medium flex items-center gap-2 w-max hover:bg-gray-100 transition-colors">
              Shop Home & Living <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
`,
  'src/components/storefront/Lifestyle.tsx': `
import React from 'react';
import { ArrowRight } from 'lucide-react';

const lifestyles = [
  { title: 'Work Smarter', img: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=500&auto=format&fit=crop' },
  { title: 'Look Good', img: 'https://images.unsplash.com/photo-1512496015851-a1cfb38ba1fc?w=500&auto=format&fit=crop' },
  { title: 'Stay Active', img: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=500&auto=format&fit=crop' },
  { title: 'Feel Your Best', img: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=500&auto=format&fit=crop' },
  { title: 'Better Living', img: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=500&auto=format&fit=crop' },
  { title: 'On the Go', img: 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=500&auto=format&fit=crop' },
];

export default function Lifestyle() {
  return (
    <section className="container mx-auto px-4 lg:px-8 mb-16">
      <div className="flex items-end justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold mb-1">Shop by Lifestyle</h2>
          <p className="text-gray-500 text-sm">Products for every part of your day</p>
        </div>
        <button className="text-sm font-medium flex items-center gap-1 hover:underline">
          View All <ArrowRight className="w-4 h-4" />
        </button>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {lifestyles.map((l, i) => (
          <div key={i} className="group relative rounded-2xl overflow-hidden aspect-[4/5] cursor-pointer">
            <img src={l.img} alt={l.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <h3 className="font-semibold mb-1">{l.title}</h3>
              <div className="text-xs flex items-center gap-1 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
                Shop Now <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
`,
  'src/app/page.tsx': `
import Header from '@/components/layout/Header';
import Hero from '@/components/storefront/Hero';
import Categories from '@/components/storefront/Categories';
import Features from '@/components/storefront/Features';
import Highlights from '@/components/storefront/Highlights';
import Lifestyle from '@/components/storefront/Lifestyle';

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Categories />
      <Features />
      <Highlights />
      <Lifestyle />
    </main>
  );
}
`
};

for (const [filepath, content] of Object.entries(files)) {
  const dir = path.dirname(filepath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filepath, content.trim());
}
console.log('Storefront components generated');
