import Hero from "@/components/CustomComponents/LandingPage/HeroPage";
import HowItWorks from "@/components/CustomComponents/LandingPage/HowItWorks";
import OnboardingSection from "@/components/CustomComponents/LandingPage/OnBoardingSection";
import PricingBanner from "@/components/CustomComponents/LandingPage/Pricing";
import Image from "next/image";

export default function CommonPage() {
  return (
    <div>
        <Hero />
        <HowItWorks />
        <OnboardingSection />
        <PricingBanner />
    </div>
  );
}
