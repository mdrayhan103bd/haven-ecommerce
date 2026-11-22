'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Product, 
  Order, 
  Discount, 
  SupportMessage, 
  StoreSettings, 
  UserProfile, 
  Address, 
  PaymentCard 
} from '@/types';

// Initial Mock Products
export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'UrbanEase Minimalist Sneakers',
    price: 89,
    oldPrice: 120,
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
    price: 149,
    oldPrice: 199,
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
    price: 99,
    oldPrice: 145,
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
    price: 49,
    oldPrice: 65,
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
    price: 289,
    oldPrice: 349,
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
    price: 179,
    oldPrice: 229,
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
    price: 59,
    oldPrice: 85,
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
    price: 24,
    oldPrice: 32,
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
    price: 69,
    oldPrice: 99,
    category: 'Sports',
    stock: 35,
    tag: 'New',
    tagColor: 'bg-emerald-600',
    rating: 4.8,
    reviews: '520',
    image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=600&auto=format&fit=crop',
    description: 'Waterproof fitness tracker with heart rate monitor, sleep stage analysis, SpO2 sensor, and 14-day battery life.',
    features: ['AMOLED vibrant touchscreen', '50m water resistance (5ATM)', 'Heart rate & blood oxygen tracking', 'Over 30 sport workout modes']
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
    subtotal: 138,
    discount: 10,
    shippingFee: 0,
    total: 128,
    status: 'Processing',
    paymentMethod: 'Credit Card (Visa)',
    trackingNumber: 'TRK-9823412',
    shippingDetails: {
      name: 'Sarah Jenkins',
      email: 'sarah.j@example.com',
      phone: '+1 555 382 9102',
      address: '742 Evergreen Terrace',
      city: 'Springfield',
      zip: '97477',
      country: 'United States'
    }
  },
  {
    id: 'HV-8919',
    date: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
    items: [
      { product: INITIAL_PRODUCTS[1], quantity: 1 }
    ],
    subtotal: 149,
    discount: 0,
    shippingFee: 0,
    total: 149,
    status: 'Shipped',
    paymentMethod: 'Credit Card (Mastercard)',
    trackingNumber: 'TRK-9821903',
    shippingDetails: {
      name: 'Michael Chen',
      email: 'm.chen@example.com',
      phone: '+1 415 882 1902',
      address: '1048 Market St, Suite 400',
      city: 'San Francisco',
      zip: '94103',
      country: 'United States'
    }
  },
  {
    id: 'HV-8890',
    date: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
    items: [
      { product: INITIAL_PRODUCTS[2], quantity: 1 },
      { product: INITIAL_PRODUCTS[7], quantity: 2 }
    ],
    subtotal: 147,
    discount: 15,
    shippingFee: 0,
    total: 132,
    status: 'Delivered',
    paymentMethod: 'Cash on Delivery',
    trackingNumber: 'TRK-9810481',
    shippingDetails: {
      name: 'Emily Davis',
      email: 'emily.d@example.com',
      phone: '+1 212 994 2018',
      address: '350 5th Avenue, Apt 12B',
      city: 'New York',
      zip: '10118',
      country: 'United States'
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
    minPurchase: 50,
    expiresAt: '2026-12-31',
    active: true,
    usageCount: 142
  },
  {
    id: 'disc-2',
    code: 'HAVEN20',
    type: 'percentage',
    value: 20,
    minPurchase: 100,
    expiresAt: '2026-12-31',
    active: true,
    usageCount: 89
  },
  {
    id: 'disc-3',
    code: 'FREESHIP',
    type: 'fixed',
    value: 15,
    minPurchase: 40,
    expiresAt: '2026-12-31',
    active: true,
    usageCount: 215
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
  tagline: 'Good Things. Brighter Days.',
  contactEmail: 'support@cavrozone.com',
  contactPhone: '+1 (800) 428-3601',
  currency: 'USD',
  currencySymbol: '$',
  shippingFee: 10,
  freeShippingThreshold: 50,
  taxRate: 0,
  announcementText: '✨ Welcome to Cavrozone: Enjoy 20% off with coupon HAVEN20 | Free Shipping over $50!',
  announcementEnabled: true
};

// Initial User Profile
export const INITIAL_USER: UserProfile = {
  id: 'usr-admin-1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+1 (555) 234-5678',
  role: 'admin',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop',
  bio: 'Product Designer & Haven Store Manager. Enthusiast of clean aesthetics and sustainable lifestyle.'
};

export const INITIAL_ADDRESSES: Address[] = [
  {
    id: 'addr-1',
    title: 'Home Address',
    name: 'John Doe',
    phone: '+1 (555) 234-5678',
    street: '742 Evergreen Terrace',
    city: 'Springfield',
    zip: '97477',
    country: 'United States',
    isDefault: true
  },
  {
    id: 'addr-2',
    title: 'Studio / Office',
    name: 'John Doe',
    phone: '+1 (555) 890-1234',
    street: '120 Broadway, Floor 4',
    city: 'New York',
    zip: '10005',
    country: 'United States',
    isDefault: false
  }
];

export const INITIAL_PAYMENT_CARDS: PaymentCard[] = [
  {
    id: 'card-1',
    type: 'card',
    cardNumber: '•••• •••• •••• 4242',
    cardHolder: 'John Doe',
    expiry: '12/28',
    isDefault: true
  },
  {
    id: 'card-2',
    type: 'card',
    cardNumber: '•••• •••• •••• 8891',
    cardHolder: 'John Doe',
    expiry: '08/27',
    isDefault: false
  }
];

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
  const [user, setUser] = useState<UserProfile | null>(INITIAL_USER);
  const [addresses, setAddresses] = useState<Address[]>(INITIAL_ADDRESSES);
  const [paymentCards, setPaymentCards] = useState<PaymentCard[]>(INITIAL_PAYMENT_CARDS);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize from LocalStorage
  useEffect(() => {
    try {
      const savedProducts = localStorage.getItem('haven_products');
      if (savedProducts) setProducts(JSON.parse(savedProducts));

      const savedWishlist = localStorage.getItem('haven_wishlist');
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));

      const savedOrders = localStorage.getItem('haven_orders');
      if (savedOrders) setOrders(JSON.parse(savedOrders));

      const savedDiscounts = localStorage.getItem('haven_discounts');
      if (savedDiscounts) setDiscounts(JSON.parse(savedDiscounts));

      const savedMessages = localStorage.getItem('haven_messages');
      if (savedMessages) setMessages(JSON.parse(savedMessages));

      const savedSettings = localStorage.getItem('haven_settings');
      if (savedSettings) setSettings(JSON.parse(savedSettings));

      const savedUser = localStorage.getItem('haven_user');
      if (savedUser) setUser(JSON.parse(savedUser));

      const savedAddresses = localStorage.getItem('haven_addresses');
      if (savedAddresses) setAddresses(JSON.parse(savedAddresses));

      const savedCards = localStorage.getItem('haven_cards');
      if (savedCards) setPaymentCards(JSON.parse(savedCards));
    } catch (e) {
      console.error('Failed to load store data from localStorage', e);
    }
    setIsLoaded(true);
  }, []);

  // Sync back to LocalStorage
  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem('haven_products', JSON.stringify(products));
  }, [products, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem('haven_wishlist', JSON.stringify(wishlist));
  }, [wishlist, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem('haven_orders', JSON.stringify(orders));
  }, [orders, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem('haven_discounts', JSON.stringify(discounts));
  }, [discounts, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem('haven_messages', JSON.stringify(messages));
  }, [messages, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem('haven_settings', JSON.stringify(settings));
  }, [settings, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem('haven_user', JSON.stringify(user));
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
        message: `Requires minimum purchase of $${match.minPurchase}.`
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
      message: `Coupon ${clean} applied: $${discountAmount.toFixed(2)} off!`,
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

  // User Profile & Addresses
  const updateUserProfile = (updates: Partial<UserProfile>) => {
    if (user) {
      const updated = { ...user, ...updates };
      setUser(updated);
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
    // Immediate mock login allowing instant testing
    const loggedUser: UserProfile = {
      id: 'usr-' + Date.now(),
      name: email.split('@')[0].toUpperCase(),
      email: email,
      role: email.includes('admin') ? 'admin' : 'customer',
      avatar: `https://ui-avatars.com/api/?name=${email}&background=random`
    };
    setUser(loggedUser);
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
    showToast(`Account created! Welcome to Haven, ${name}.`);
    return true;
  };

  const logout = () => {
    setUser(null);
    showToast('Signed out successfully', 'info');
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
