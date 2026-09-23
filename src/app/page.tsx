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