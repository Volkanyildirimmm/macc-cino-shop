import type { MedusaProduct } from "./medusa-fetch";
import {
  HANDLE_META,
  PRODUCTS,
  localizeProductData,
  type ProductData,
} from "./constants";

export function adaptMedusaProduct(
  p: MedusaProduct,
  locale: string
): ProductData | null {
  const variant = p.variants?.[0];
  if (!variant) return null;

  const meta = HANDLE_META[p.handle];
  const fallback = PRODUCTS.find((x) => x.handle === p.handle);
  if (!meta && !fallback) return null;

  const amount = variant.calculated_price?.calculated_amount;
  const priceCents =
    typeof amount === "number" ? Math.round(amount * 100) : fallback?.price ?? 0;

  const currency = (
    variant.calculated_price?.currency_code ?? fallback?.currency ?? "TRY"
  ).toUpperCase();

  const idx = PRODUCTS.findIndex((x) => x.handle === p.handle);
  const image =
    p.thumbnail ||
    fallback?.image ||
    `/images/product-${(idx >= 0 ? idx : 0) + 1}.jpeg`;

  const categories =
    p.categories?.map((c) => ({ id: c.id, name: c.name, handle: c.handle })) ??
    fallback?.categories ??
    [];

  return localizeProductData({
    id: variant.id,
    handle: p.handle,
    title: p.title,
    subtitle: p.subtitle ?? fallback?.subtitle ?? "",
    description: p.description ?? fallback?.description ?? "",
    sku: variant.sku ?? fallback?.sku ?? "",
    price: priceCents,
    currency,
    weight: p.weight ?? fallback?.weight ?? 0,
    volume: meta?.volume ?? fallback?.volume ?? 0,
    portions: meta?.portions ?? fallback?.portions ?? 0,
    targetText: meta?.targetText ?? fallback?.targetText ?? "",
    labelSize: meta?.labelSize ?? fallback?.labelSize ?? "",
    badge: meta?.badge ?? fallback?.badge ?? null,
    hasPump: meta?.hasPump ?? fallback?.hasPump,
    pumpDosage: meta?.pumpDosage ?? fallback?.pumpDosage,
    image,
    categories,
  }, locale);
}

export function adaptMedusaProducts(
  products: MedusaProduct[],
  locale: string
): ProductData[] {
  const ordered = [...PRODUCTS.map((p) => p.handle)];
  const adapted = products
    .map((p) => adaptMedusaProduct(p, locale))
    .filter((p): p is ProductData => p !== null);
  return adapted.sort(
    (a, b) => ordered.indexOf(a.handle) - ordered.indexOf(b.handle)
  );
}
