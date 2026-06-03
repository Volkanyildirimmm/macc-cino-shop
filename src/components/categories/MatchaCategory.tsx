import { getTranslations } from "next-intl/server";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Benefits } from "@/components/sections/Benefits";
import { UseCases } from "@/components/sections/UseCases";
import { Comparison } from "@/components/sections/Comparison";
import { Nutrition } from "@/components/sections/Nutrition";
import { StorageTips } from "@/components/sections/StorageTips";
import { FAQ } from "@/components/sections/FAQ";
import { HomeSchema } from "@/components/seo/HomeSchema";
import { ProductCard } from "@/components/product/ProductCard";
import type { ProductData } from "@/lib/constants";

interface Props {
  products: ProductData[];
}

/**
 * Matcha kategorisine özel layout. Matcha-spesifik tüm detay bölümler
 * (HowItWorks, Comparison, Nutrition, FAQ vs.) burada toplu render edilir.
 *
 * Hero anasayfada — bu sayfada başlık olarak kategori adı ve ürünler doğrudan üstte.
 *
 * Diğer kategoriler için (örn. kahve-makineleri) ayrı component yazılır,
 * o kategorinin handle'ı gelince /kategori/[handle]/page.tsx tarafında dispatch edilir.
 */
export async function MatchaCategory({ products }: Props) {
  const t = await getTranslations("matcha_category");

  return (
    <div className="pt-24" style={{ backgroundColor: "#FAFAF7" }}>
      <HomeSchema />

      <section
        id="urunler"
        className="py-12 sm:py-16"
        style={{ backgroundColor: "#FAFAF7" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-medium tracking-widest uppercase text-[#2D5016] mb-4">
              {t("collection_label")}
            </span>
            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold tracking-tight"
              style={{ color: "#1A1A1A" }}
            >
              {t("title")}
            </h1>
            <p className="text-[#4A4A4A] mt-4 max-w-2xl mx-auto text-sm sm:text-base">
              {t("subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      <HowItWorks />
      <Benefits />
      <UseCases />
      <Comparison />
      <Nutrition />
      <StorageTips />
      <FAQ />
    </div>
  );
}
