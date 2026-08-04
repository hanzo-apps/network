
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/commerce/HeroSection";
import Features from "@/components/commerce/Features";
import APIEndpoints from "@/components/commerce/APIEndpoints";
import UseCases from "@/components/commerce/UseCases";
import TechStack from "@/components/commerce/TechStack";
import Integrations from "@/components/commerce/Integrations";
import CallToAction from "@/components/commerce/CallToAction";

const Commerce = () => {
  return (
    <div className="hz-min-h-screen hz-bg hz-fg">
      <Navbar />
      <main>
        <HeroSection />
        <Features />
        <APIEndpoints />
        <UseCases />
        <Integrations />
        <TechStack />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default Commerce;
