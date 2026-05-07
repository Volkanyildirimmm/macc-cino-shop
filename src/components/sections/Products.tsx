import { PRODUCTS } from "@/lib/constants";
import { ProductCard } from "@/components/product/ProductCard";
import { TextReveal } from "@/components/ui/TextReveal";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export function Products() {
  return (
    <section id="urunler" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <span className="text-[#2D5016] text-xs font-semibold uppercase tracking-widest mb-3 block">Koleksiyonumuz</span>
          <TextReveal
            text="Ürünlerimiz"
            as="h2"
            className="text-4xl sm:text-5xl font-display font-bold text-[#1A1A1A] mb-4 justify-center"
          />
          <p className="text-[#4A4A4A] text-lg max-w-2xl mx-auto">
            Dört farklı boyutta, her kullanım senaryosuna uygun matcha konsantresi.
            Ceremonial Grade, organik, Almanya üretimi.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {PRODUCTS.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        <AnimatedSection className="mt-10 text-center" delay={0.3}>
          <p className="text-[#8A8A7A] text-sm">
            ✓ Ücretsiz kargo €100 üzeri · ✓ 30 gün iade garantisi · ✓ Güvenli ödeme
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
