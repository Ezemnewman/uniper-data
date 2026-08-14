import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/landing/Hero";
import { StatsBar } from "@/components/landing/StatsBar";
import { AboutSection } from "@/components/landing/AboutSection";
import { ServicesSection } from "@/components/landing/ServicesSection";
import { PricingSection } from "@/components/landing/PricingSection";
import { GallerySection } from "@/components/landing/GallerySection";
import { ContactSection } from "@/components/landing/ContactSection";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="pt-16 flex-grow">
        <Hero />
        <StatsBar />
        <AboutSection />
        <ServicesSection />
        <PricingSection />
        <GallerySection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
