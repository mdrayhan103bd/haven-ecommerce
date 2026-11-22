export interface Product {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  images?: string[];
  category: string;
  stock: number;
  tag?: string;
  tagColor?: string;
  rating: number;
  reviews: number | string;
  description: string;
  features?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  paymentMethod: string;
  trackingNumber?: string;
  shippingDetails: {
    name: string;
    email: string;
    phone?: string;
    address: string;
    city: string;
    zip: string;
    country?: string;
  };
}

export interface Discount {
  id: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  minPurchase: number;
  expiresAt: string;
  active: boolean;
  usageCount: number;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  orders: number;
  spent: number;
  status: 'Active' | 'VIP' | 'Inactive';
  avatar?: string;
}

export interface Address {
  id: string;
  title: string;
  name: string;
  phone: string;
  street: string;
  city: string;
  zip: string;
  country: string;
  isDefault: boolean;
}

export interface PaymentCard {
  id: string;
  type: 'card' | 'bkash' | 'nagad';
  cardNumber: string;
  cardHolder: string;
  expiry: string;
  isDefault: boolean;
}

export interface SupportMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  status: 'unread' | 'read' | 'replied';
  reply?: string;
}

export interface StoreSettings {
  storeName: string;
  tagline: string;
  contactEmail: string;
  contactPhone: string;
  currency: string;
  currencySymbol: string;
  shippingFee: number;
  freeShippingThreshold: number;
  taxRate: number;
  announcementText: string;
  announcementEnabled: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'admin' | 'customer';
  avatar?: string;
  bio?: string;
}

export interface HeroBanner {
  tag: string;
  headline: string;
  subheadline: string;
  ctaText: string;
  ctaLink: string;
  image: string;
}

export interface SideBanner {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  link: string;
}

export interface HighlightsBanner {
  tag: string;
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  image: string;
}

export interface LifestyleBanner {
  id: string;
  title: string;
  img: string;
  link: string;
}

export interface BannerSettings {
  hero: HeroBanner;
  sideBanners: SideBanner[];
  highlightsBanner: HighlightsBanner;
  lifestyles: LifestyleBanner[];
}
