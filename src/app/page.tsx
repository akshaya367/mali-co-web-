"use client";

import DemoGuard from "@/components/DemoGuard";
import HeroSection from "@/components/sections/HeroSection";
import WhyUsSection from "@/components/sections/WhyUsSection";
import MenuSection from "@/components/sections/MenuSection";
import ReviewsSection from "@/components/sections/ReviewsSection";
import InstagramPreview from "@/components/sections/InstagramPreview";
import LocationSection from "@/components/sections/LocationSection";
import Footer from "@/components/sections/Footer";
import StickyBottom from "@/components/sections/StickyBottom";
import Navbar from "@/components/sections/Navbar";
import BulkOrdersSection from "@/components/sections/BulkOrdersSection";
import CustomizationSection from "@/components/sections/CustomizationSection";

import LoadingScreen from "@/components/sections/LoadingScreen";

export default function Home() {
  return (
    <DemoGuard>
      <LoadingScreen />
      <main className="relative bg-cream selection:bg-mali-gold selection:text-white">
        {/* Navigation Layers */}
        <Navbar />
        
        {/* Main Content Sections */}
        <article className="relative z-10">
          <HeroSection />
          <WhyUsSection />
          <MenuSection />
          <CustomizationSection />
          <BulkOrdersSection />
          <ReviewsSection />
          <InstagramPreview />
          <LocationSection />
          <Footer />
        </article>

        {/* Global Floating Elements */}
        <StickyBottom />
      </main>
    </DemoGuard>
  );
}
