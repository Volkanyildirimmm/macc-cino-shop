import { Hero } from "@/components/sections/Hero";
import { Products } from "@/components/sections/Products";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Benefits } from "@/components/sections/Benefits";
import { UseCases } from "@/components/sections/UseCases";
import { Comparison } from "@/components/sections/Comparison";
import { Nutrition } from "@/components/sections/Nutrition";
import { StorageTips } from "@/components/sections/StorageTips";
import { Contact } from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      {/* bg: #FAFAF7 gradient */}

      <Products />
      {/* bg: white */}

      <HowItWorks />
      {/* bg: #F5F3EE */}

      <Benefits />
      {/* bg: white */}

      <UseCases />
      {/* bg: #F5F3EE */}

      <Comparison />
      {/* bg: white */}

      <Nutrition />
      {/* bg: #F5F3EE */}

      <StorageTips />
      {/* bg: white */}

      <Contact />
      {/* bg: #F5F3EE */}
    </>
  );
}
