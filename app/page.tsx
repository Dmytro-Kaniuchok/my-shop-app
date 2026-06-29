export const dynamic = "force-dynamic";

import AgricultureSection from "@/src/components/AgricultureSection/AgricultureSection";
import FeaturedSection from "@/src/components/FeatureSection/FeaturedSection";
import Hero from "@/src/components/Hero/Hero";
import Popular from "@/src/components/Products/Popular/Popular";
import WhyChooseUs from "@/src/components/WhyChooseUs/WhyChooseUs";

import FadeInSection from "@/src/components/FadeInSection/FadeInSection";
import ContactBanner from "@/src/components/ContactBanner/ContactBanner";

export default function HomePage() {
  return (
    <main>
      <Hero />

      <FadeInSection>
        <FeaturedSection />
      </FadeInSection>

      <FadeInSection>
        <Popular />
      </FadeInSection>

      <FadeInSection>
        <ContactBanner />
      </FadeInSection>

      <FadeInSection>
        <WhyChooseUs />
      </FadeInSection>

      <FadeInSection>
        <AgricultureSection />
      </FadeInSection>
    </main>
  );
}
