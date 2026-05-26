import HeroSection from "@/components/homepage/HeroSection";
import PositioningSection from "@/components/homepage/PositioningSection";
import ServicesShowcase from "@/components/homepage/ServicesShowcase";
import NumbersSection from "@/components/homepage/NumbersSection";
import TestimonialsSection from "@/components/homepage/TestimonialsSection";
import InsightsPreview from "@/components/homepage/InsightsPreview";
import CTASection from "@/components/homepage/CTASection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PositioningSection />
      <ServicesShowcase />
      <NumbersSection />
      <TestimonialsSection />
      <InsightsPreview />
      <CTASection />
    </>
  );
}
