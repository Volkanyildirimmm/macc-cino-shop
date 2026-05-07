import { Hero } from "@/components/sections/Hero";
import { Products } from "@/components/sections/Products";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Benefits } from "@/components/sections/Benefits";
import { UseCases } from "@/components/sections/UseCases";
import { Comparison } from "@/components/sections/Comparison";
import { Nutrition } from "@/components/sections/Nutrition";
import { StorageTips } from "@/components/sections/StorageTips";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";
import { HomeSchema } from "@/components/seo/HomeSchema";

export default function HomePage() {
  return (
    <>
      <HomeSchema />
      <Hero />
      <Products />
      <HowItWorks />
      <Benefits />
      <UseCases />
      <Comparison />
      <Nutrition />
      <StorageTips />
      <FAQ />
      <Contact />
    </>
  );
}
