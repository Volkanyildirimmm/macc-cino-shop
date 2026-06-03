import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ödeme",
  description: "Siparişinizi güvenli şekilde tamamlayın.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/odeme" },
};

export default function OdemeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
