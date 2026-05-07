import type { MedusaProduct } from "./medusa-fetch";
import { HANDLE_META, PRODUCTS, type ProductData } from "./constants";

export function adaptMedusaProduct(p: MedusaProduct): ProductData | null {
  const variant = p.variants?.[0];
  if (!variant) return null;

  const meta = HANDLE_META[p.handle];
  const fallback = PRODUCTS.find((x) => x.handle === p.handle);
  if (!meta && !fallback) return null;

  const amount = variant.calculated_price?.calculated_amount;
  const priceCents =
    typeof amount === "number" ? Math.round(amount * 100) : fallback?.price ?? 0;

  return {
    id: variant.id,
    handle: p.handle,
    title: p.title,
    subtitle: p.subtitle ?? fallback?.subtitle ?? "",
    description: p.description ?? fallback?.description ?? "",
    sku: variant.sku ?? fallback?.sku ?? "",
    price: priceCents,
    weight: p.weight ?? fallback?.weight ?? 0,
    volume: meta?.volume ?? fallback?.volume ?? 0,
    portions: meta?.portions ?? fallback?.portions ?? 0,
    targetText: meta?.targetText ?? fallback?.targetText ?? "",
    labelSize: meta?.labelSize ?? fallback?.labelSize ?? "",
    badge: meta?.badge ?? fallback?.badge ?? null,
    hasPump: meta?.hasPump ?? fallback?.hasPump,
    pumpDosage: meta?.pumpDosage ?? fallback?.pumpDosage,
  };
}

export function adaptMedusaProducts(products: MedusaProduct[]): ProductData[] {
  const ordered = [...PRODUCTS.map((p) => p.handle)];
  const adapted = products
    .map(adaptMedusaProduct)
    .filter((p): p is ProductData => p !== null);
  return adapted.sort(
    (a, b) => ordered.indexOf(a.handle) - ordered.indexOf(b.handle)
  );
}
