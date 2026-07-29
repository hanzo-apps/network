
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SolutionsHero from "@/components/solutions/Hero";
import MainCards from "@/components/solutions/MainCards";
import UnifiedAICloud from "@/components/solutions/UnifiedAICloud";
import ExpertServices from "@/components/solutions/ExpertServices";
import CallToAction from "@/components/index3/CallToAction";

const Solutions: React.FC = () => {
  return (
    <div className="hz-min-h-screen hz-bg hz-fg">
      <Navbar />
      
      <main className="hz-pt-6 hz-pb-6 hz-px-4">
        <div className="hz-container">
          <SolutionsHero />
          <MainCards />
          <UnifiedAICloud />
          <ExpertServices />
          <CallToAction />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Solutions;
