"use client";

import { PRODUCTS, type ProductData } from "@/lib/constants";

export function useProducts(): { products: ProductData[]; isLoading: boolean } {
  return { products: PRODUCTS, isLoading: false };
}

export function useProduct(handle: string): { product: ProductData | null; isLoading: boolean } {
  const product = PRODUCTS.find((p) => p.handle === handle) ?? null;
  return { product, isLoading: false };
}
