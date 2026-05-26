import HeroSection from "@/components/homepage/HeroSection";
import PositioningSection from "@/components/homepage/PositioningSection";
import ServicesShowcase from "@/components/homepage/ServicesShowcase";
import NumbersSection from "@/components/homepage/NumbersSection";
import TestimonialsSection from "@/components/homepage/TestimonialsSection";
import InsightsPreview from "@/components/homepage/InsightsPreview";
import CTASection from "@/components/homepage/CTASection";
import { readCollection } from "@/lib/cms";

export const revalidate = 60;

export default async function HomePage() {
  const [services, testimonials, insights] = await Promise.all([
    readCollection("services"),
    readCollection("testimonials"),
    readCollection("insights"),
  ]);
  return (
    <>
      <HeroSection />
      <PositioningSection />
      <ServicesShowcase services={services} />
      <NumbersSection />
      <TestimonialsSection testimonials={testimonials} />
      <InsightsPreview posts={insights.slice(0, 3)} />
      <CTASection />
    </>
  );
}
