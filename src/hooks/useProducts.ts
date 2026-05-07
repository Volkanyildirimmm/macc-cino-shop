"use client";

import { useQuery } from "@tanstack/react-query";
import { medusa } from "@/lib/medusa";
import { adaptMedusaProducts, adaptMedusaProduct } from "@/lib/product-adapter";
import { PRODUCTS, type ProductData } from "@/lib/constants";
import type { MedusaProduct } from "@/lib/medusa-fetch";

const PRODUCT_FIELDS = [
  "id",
  "handle",
  "title",
  "subtitle",
  "description",
  "weight",
  "metadata",
  "variants.id",
  "variants.sku",
  "variants.title",
  "variants.calculated_price.calculated_amount",
  "variants.calculated_price.currency_code",
].join(",");

async function fetchRegionId(): Promise<string | undefined> {
  try {
    const { regions } = await medusa.store.region.list();
    return regions[0]?.id;
  } catch {
    return undefined;
  }
}

export function useProducts(): {
  products: ProductData[];
  isLoading: boolean;
} {
  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const region_id = await fetchRegionId();
      const { products } = await medusa.store.product.list({
        fields: PRODUCT_FIELDS,
        limit: 20,
        ...(region_id ? { region_id } : {}),
      });
      return products as unknown as MedusaProduct[];
    },
  });

  const products = data ? adaptMedusaProducts(data) : PRODUCTS;
  return { products, isLoading: isLoading && !data };
}

export function useProduct(handle: string): {
  product: ProductData | null;
  isLoading: boolean;
} {
  const { data, isLoading } = useQuery({
    queryKey: ["product", handle],
    queryFn: async () => {
      const region_id = await fetchRegionId();
      const { products } = await medusa.store.product.list({
        handle,
        fields: PRODUCT_FIELDS,
        ...(region_id ? { region_id } : {}),
      });
      return (products[0] ?? null) as unknown as MedusaProduct | null;
    },
    enabled: !!handle,
  });

  const product = data
    ? adaptMedusaProduct(data)
    : PRODUCTS.find((p) => p.handle === handle) ?? null;
  return { product, isLoading: isLoading && !data };
}
