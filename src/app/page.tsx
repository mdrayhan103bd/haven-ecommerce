import Hero from '@/components/storefront/Hero';
import Categories from '@/components/storefront/Categories';
import FlashSaleSection from '@/components/storefront/FlashSaleSection';
import TabbedProducts from '@/components/storefront/TabbedProducts';
import Features from '@/components/storefront/Features';
import Highlights from '@/components/storefront/Highlights';
import Lifestyle from '@/components/storefront/Lifestyle';
import CustomerReviews from '@/components/storefront/CustomerReviews';
import FAQSection from '@/components/storefront/FAQSection';

export default function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <FlashSaleSection />
      <TabbedProducts />
      <Features />
      <Highlights />
      <Lifestyle />
      <CustomerReviews />
      <FAQSection />
    </>
  );
}
