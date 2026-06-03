import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { Categories } from "@/components/sections/Categories";
import { Contact } from "@/components/sections/Contact";

// ISR: anasayfa her 60 saniyede bir yeniden generate edilir.
// Yeni kategori/ürün admin'den eklendiğinde otomatik görünür.
export const revalidate = 60;

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <Categories />
      <Contact />
    </>
  );
}
