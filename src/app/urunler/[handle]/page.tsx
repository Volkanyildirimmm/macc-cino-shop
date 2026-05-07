import { notFound } from "next/navigation";
import { PRODUCTS } from "@/lib/constants";
import { ProductDetailPage } from "@/components/product/ProductDetail";

interface Props {
  params: Promise<{ handle: string }>;
}

export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({ handle: p.handle }));
}

export async function generateMetadata({ params }: Props) {
  const { handle } = await params;
  const product = PRODUCTS.find((p) => p.handle === handle);
  if (!product) return {};
  return {
    title: `${product.title} — macc-cino`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: Props) {
  const { handle } = await params;
  const product = PRODUCTS.find((p) => p.handle === handle);
  if (!product) notFound();

  return <ProductDetailPage product={product} />;
}
