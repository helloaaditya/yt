"use client";

import { useRouter } from "next/navigation";
import { getEffectivePrice } from "@/lib/supabase/types";

interface Product {
  id: string;
  slug: string;
  name: string;
  price_inr: number;
  offer_price_inr?: number | null;
}

export function AddToCartButton({ product }: { product: Product }) {
  const router = useRouter();
  const effectivePrice = getEffectivePrice(product);

  function addAndCheckout() {
    const cart = [{ productId: product.id, slug: product.slug, name: product.name, price_inr: effectivePrice, quantity: 1 }];
    sessionStorage.setItem("checkout_cart", JSON.stringify(cart));
    router.push("/checkout");
  }

  return (
    <button
      type="button"
      onClick={addAndCheckout}
      className="w-full rounded-lg bg-[var(--primary)] py-4 font-medium text-white hover:opacity-90 md:w-auto md:px-8"
    >
      Buy now — ₹{Number(effectivePrice).toLocaleString()}
    </button>
  );
}
