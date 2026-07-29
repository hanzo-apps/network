
import React from "react";
import { motion } from "framer-motion";
import { Chrome, Compass, LayoutGrid, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

const BrowserCard = ({ icon: Icon, title, description, buttonText }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="hz-card hz-col"
    >
      <div className="hz-mb-4">
        <Icon className="hz-sq-7 hz-fg-muted hz-mb-4" />
        <h3 className="hz-t-2xl hz-w-bold hz-mb-2">{title}</h3>
        <p className="hz-fg-soft hz-mb-5">{description}</p>
      </div>
      
      <div className="hz-mt-auto">
        <Button className="hz-w-full hz-bg-raised hz-hoverable">
          {buttonText}
        </Button>
      </div>
    </motion.div>
  );
};

const HanzoExtensionBrowsers = () => {
  return (
    <section id="browsers" className="hz-py-7 hz-px-4 hz-bg">
      <div className="hz-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="hz-align-center hz-mb-7"
        >
          <h2 className="hz-t-3xl hz-w-bold hz-mb-4">Available on All Major Browsers</h2>
          <p className="hz-container-narrow hz-t-xl hz-fg-soft">
            Install the Hanzo Extension on your preferred browser
          </p>
        </motion.div>
        
        <div className="hz-grid hz-grid-4 hz-gap-6">
          <BrowserCard 
            icon={Chrome}
            title="Chrome"
            description="Perfect integration with Google Chrome browser with all features supported."
            buttonText="Add to Chrome"
          />
          
          <BrowserCard 
            icon={Globe}
            title="Firefox"
            description="Fully compatible with Mozilla Firefox for privacy-conscious users."
            buttonText="Get Firefox Add-on"
          />
          
          <BrowserCard 
            icon={Compass}
            title="Edge"
            description="Enhanced experience on Microsoft Edge with optimized performance."
            buttonText="Add to Edge"
          />
          
          <BrowserCard 
            icon={LayoutGrid}
            title="More Browsers"
            description="Safari, Opera, and other Chromium-based browsers are also supported."
            buttonText="View All Browsers"
          />
        </div>
      </div>
    </section>
  );
};

export default HanzoExtensionBrowsers;
