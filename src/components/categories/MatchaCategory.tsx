import { Hero } from "@/components/sections/Hero";
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
 * Matcha kategorisine özel layout. Anasayfadan taşınan matcha-spesifik
 * tüm bölümler burada toplu olarak render edilir.
 *
 * Diğer kategoriler için (örn. kahve-makineleri) ayrı component yazılır,
 * o kategorinin handle'ı gelince /kategori/[handle]/page.tsx tarafında dispatch edilir.
 */
export function MatchaCategory({ products }: Props) {
  return (
    <>
      <HomeSchema />
      <Hero />

      <section
        id="urunler"
        className="py-20 sm:py-28"
        style={{ backgroundColor: "#FAFAF7" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-medium tracking-widest uppercase text-[#2D5016] mb-4">
              Koleksiyonumuz
            </span>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold tracking-tight"
              style={{ color: "#1A1A1A" }}
            >
              Matcha Ürünlerimiz
            </h2>
            <p className="text-[#4A4A4A] mt-4 max-w-2xl mx-auto text-sm sm:text-base">
              Dört farklı boyutta, her kullanım senaryosuna uygun matcha konsantresi.
              Ceremonial Grade, organik, Almanya üretimi.
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
    </>
  );
}
