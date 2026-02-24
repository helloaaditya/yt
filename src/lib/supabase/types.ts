export type ProductType = 'course' | 'one_to_one';
export type OrderStatus = 'pending' | 'awaiting_utr' | 'paid' | 'verified' | 'completed' | 'cancelled';
export type PaymentStatus = 'pending' | 'utr_submitted' | 'verified' | 'rejected';

export interface Profile {
  id: string;
  email: string | null;
  full_name: string | null;
  avatar_url: string | null;
  is_admin: boolean;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  short_description: string | null;
  product_type: ProductType;
  price_inr: number;
  offer_price_inr: number | null;
  image_url: string | null;
  featured: boolean;
  is_active: boolean;
  sort_order: number;
  meta_title: string | null;
  meta_description: string | null;
  created_at: string;
  updated_at: string;
}

/** Price to charge / display when offer is set; otherwise regular price. */
export function getEffectivePrice(p: { price_inr: number; offer_price_inr?: number | null }): number {
  return p.offer_price_inr != null ? p.offer_price_inr : p.price_inr;
}

export interface Order {
  id: string;
  order_number: string;
  user_id: string | null;
  guest_email: string | null;
  guest_name: string | null;
  total_inr: number;
  status: OrderStatus;
  payment_status: PaymentStatus;
  utr_number: string | null;
  utr_verified_at: string | null;
  utr_verified_by: string | null;
  admin_notes: string | null;
  created_at: string;
  updated_at: string;
  order_items?: OrderItem[];
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  product_name: string;
  product_slug: string;
  quantity: number;
  price_inr: number;
  created_at: string;
}

export interface Payment {
  id: string;
  order_id: string;
  amount_inr: number;
  upi_id: string | null;
  qr_payload: string | null;
  utr_number: string | null;
  status: PaymentStatus;
  verified_at: string | null;
  verified_by: string | null;
  rejection_reason: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProductFile {
  id: string;
  product_id: string;
  file_name: string;
  storage_path: string;
  file_size_bytes: number | null;
  created_at: string;
}

export interface UpiAccount {
  id: string;
  upi_id: string;
  payee_name: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}
