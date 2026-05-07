import { type Metadata } from "next";
import { Contact } from "@/components/sections/Contact";

export const metadata: Metadata = {
  title: "İletişim — macc-cino",
  description: "macc-cino ile iletişime geçin. Toplu sipariş, white label ve genel sorular.",
};

export default function IletisimPage() {
  return (
    <div className="min-h-screen pt-20">
      <Contact />
    </div>
  );
}
