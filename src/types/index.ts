export interface Product {
  id: string | number;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  category?: string;
  stock?: number;
  tag?: string;
  tagColor?: string;
  rating?: number;
  reviews?: string | number;
  description?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  shippingDetails: {
    name: string;
    email: string;
    address: string;
    city: string;
    zip: string;
  };
}
