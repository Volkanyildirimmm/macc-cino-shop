import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  fetchCategories,
  fetchProductsByCategory,
} from "@/lib/medusa-fetch";
import { adaptMedusaProducts } from "@/lib/product-adapter";
import { ProductCard } from "@/components/product/ProductCard";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://shop.macc-cino.com";

// Her istekte fresh SSR — kategori/ürün admin'den eklendiğinde anında yansır.
export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ handle: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  const categories = await fetchCategories();
  const category = categories.find((c) => c.handle === handle);
  if (!category) return {};

  const url = `${SITE_URL}/kategori/${handle}`;
  const title = `${category.name} — Macc-cino`;
  const description = category.description ?? `${category.name} ürünleri`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "macc-cino",
      locale: "tr_TR",
      type: "website",
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { handle } = await params;

  const [categories, products] = await Promise.all([
    fetchCategories(),
    fetchProductsByCategory(handle),
  ]);

  const category = categories.find((c) => c.handle === handle);
  if (!category) notFound();

  const adapted = adaptMedusaProducts(products);

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Kategoriler",
        item: `${SITE_URL}/#kategoriler`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: category.name,
        item: `${SITE_URL}/kategori/${handle}`,
      },
    ],
  };

  return (
    <div
      className="min-h-screen pt-24 pb-20"
      style={{ backgroundColor: "#FAFAF7" }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-medium tracking-widest uppercase text-[#2D5016] mb-4">
            Kategori
          </span>
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold tracking-tight"
            style={{ color: "#1A1A1A" }}
          >
            {category.name}
          </h1>
          {category.description && (
            <p className="text-[#4A4A4A] mt-4 max-w-2xl mx-auto text-sm sm:text-base">
              {category.description}
            </p>
          )}
        </div>

        {adapted.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-[#8A8A7A] text-lg">
              Bu kategoride henüz ürün bulunmuyor.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {adapted.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
