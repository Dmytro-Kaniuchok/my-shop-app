export const dynamic = "force-dynamic";

import FeaturedSection from "@/src/components/FeatureSection/FeaturedSection";
import Hero from "@/src/components/Hero/Hero";
import Popular from "@/src/components/Products/Popular/Popular";
import WhyChooseUs from "@/src/components/WhyChooseUs/WhyChooseUs";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <FeaturedSection />
      <Popular />
      <WhyChooseUs />
    </main>
  );
}
