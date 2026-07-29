
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/payments/HeroSection";
import PaymentsSuite from "@/components/payments/PaymentsSuite";
import Compliance from "@/components/payments/Compliance";
import CheckoutExperience from "@/components/payments/CheckoutExperience";
import Integrations from "@/components/payments/Integrations";
import UseCases from "@/components/payments/UseCases";
import TrustedBy from "@/components/payments/TrustedBy";
import CallToAction from "@/components/payments/CallToAction";

const Payments = () => {
  return (
    <div className="hz-min-h-screen hz-bg hz-fg">
      <Navbar />
      <main>
        <HeroSection />
        <PaymentsSuite />
        <Compliance />
        <CheckoutExperience />
        <Integrations />
        <UseCases />
        <TrustedBy />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default Payments;
