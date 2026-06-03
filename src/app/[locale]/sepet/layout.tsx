import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sepet",
  description: "Sepetinizdeki ürünleri inceleyin ve siparişi tamamlayın.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/sepet" },
};

export default function SepetLayout({ children }: { children: React.ReactNode }) {
  return children;
}
