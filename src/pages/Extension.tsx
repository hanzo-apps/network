
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import HanzoExtensionHero from "@/components/extension/HanzoExtensionHero";
import HanzoExtensionFeatures from "@/components/extension/HanzoExtensionFeatures";
import HanzoExtensionBrowsers from "@/components/extension/HanzoExtensionBrowsers";
import HanzoExtensionUseCases from "@/components/extension/HanzoExtensionUseCases";
import HanzoExtensionCTA from "@/components/extension/HanzoExtensionCTA";

const Extension = () => {
  return (
    <div className="hz-min-h-screen hz-bg hz-fg">
      <Navbar />
      <main>
        <HanzoExtensionHero />
        <HanzoExtensionFeatures />
        <HanzoExtensionBrowsers />
        <HanzoExtensionUseCases />
        <HanzoExtensionCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Extension;
