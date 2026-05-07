import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sipariş Onayı",
  description: "Siparişiniz alınmıştır. Teşekkür ederiz.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/siparis-onay" },
};

export default function SiparisOnayLayout({ children }: { children: React.ReactNode }) {
  return children;
}
