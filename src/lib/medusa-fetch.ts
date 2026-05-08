const BACKEND_URL =
  process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL ?? "http://localhost:9000";
const PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY ?? "";

const FETCH_TIMEOUT_MS = 8000;

function fetchWithTimeout(
  url: string,
  init: RequestInit & { next?: { revalidate?: number; tags?: string[] } }
): Promise<Response> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  return fetch(url, { ...init, signal: controller.signal }).finally(() =>
    clearTimeout(timeout)
  );
}

const PRODUCT_FIELDS = [
  "id",
  "handle",
  "title",
  "subtitle",
  "description",
  "thumbnail",
  "weight",
  "metadata",
  "collection.handle",
  "variants.id",
  "variants.sku",
  "variants.title",
  "variants.calculated_price.calculated_amount",
  "variants.calculated_price.currency_code",
].join(",");

async function fetchRegionId(): Promise<string | null> {
  try {
    const res = await fetchWithTimeout(`${BACKEND_URL}/store/regions`, {
      headers: { "x-publishable-api-key": PUBLISHABLE_KEY },
      next: { revalidate: 300, tags: ["medusa-regions"] },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data?.regions?.[0]?.id ?? null;
  } catch {
    return null;
  }
}

export interface MedusaProduct {
  id: string;
  handle: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  thumbnail: string | null;
  weight: number | null;
  metadata: Record<string, unknown> | null;
  variants: Array<{
    id: string;
    sku: string | null;
    title: string;
    calculated_price?: {
      calculated_amount: number;
      currency_code: string;
    };
  }>;
}

export async function fetchAllProducts(): Promise<MedusaProduct[]> {
  if (!PUBLISHABLE_KEY) return [];
  try {
    const regionId = await fetchRegionId();
    const url = new URL(`${BACKEND_URL}/store/products`);
    url.searchParams.set("fields", PRODUCT_FIELDS);
    url.searchParams.set("limit", "20");
    if (regionId) url.searchParams.set("region_id", regionId);

    const res = await fetchWithTimeout(url.toString(), {
      headers: { "x-publishable-api-key": PUBLISHABLE_KEY },
      next: { revalidate: 60, tags: ["medusa-products"] },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.products ?? [];
  } catch {
    return [];
  }
}

export async function fetchProductByHandle(
  handle: string
): Promise<MedusaProduct | null> {
  if (!PUBLISHABLE_KEY) return null;
  try {
    const regionId = await fetchRegionId();
    const url = new URL(`${BACKEND_URL}/store/products`);
    url.searchParams.set("handle", handle);
    url.searchParams.set("fields", PRODUCT_FIELDS);
    if (regionId) url.searchParams.set("region_id", regionId);

    const res = await fetchWithTimeout(url.toString(), {
      headers: { "x-publishable-api-key": PUBLISHABLE_KEY },
      next: { revalidate: 60, tags: [`medusa-product-${handle}`] },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.products?.[0] ?? null;
  } catch {
    return null;
  }
}
