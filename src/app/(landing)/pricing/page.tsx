
import PricingSection from "@/components/landing/pricing-section";
import MainNav from "@/components/main-nav";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Snapcheck",
  description: "Snapcheck pricing section",
};

export default function PricingPage() {
  
  return (
    <>
      <MainNav />
      <PricingSection/>
    
    </>
  );
}
