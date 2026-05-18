import { Hero } from "@/components/sections/Hero";
import { Categories } from "@/components/sections/Categories";
import { Contact } from "@/components/sections/Contact";

// ISR: anasayfa her 60 saniyede bir yeniden generate edilir.
// Yeni kategori/ürün admin'den eklendiğinde otomatik görünür.
export const revalidate = 60;

export default function HomePage() {
  return (
    <>
      <Hero />
      <Categories />
      <Contact />
    </>
  );
}
