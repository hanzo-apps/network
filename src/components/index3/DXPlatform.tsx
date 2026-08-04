
import React, { useState } from "react";
import { motion } from "framer-motion";
import ChromeText from "@/components/ui/chrome-text";
import DXPlatformGrid from "./dx-platform/DXPlatformGrid";

const DXPlatform = () => {
  const [isHovered, setIsHovered] = useState<string | null>(null);

  return (
    <section className="hz-py-7 hz-px-4 hz-bg hz-rel hz-clip">
      {/* Decorative elements */}
      <div className="hz-abs hz-right-0 hz-bg-raised hz-r-full hz-blur-bg"></div>
      <div className="hz-abs hz-left-0 hz-bg-raised hz-r-full hz-blur-bg"></div>
      
      <div className="hz-container hz-rel hz-z-raised">
        <div className="hz-align-center hz-mb-7">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="hz-mb-4"
          >
            <span className="hz-px-4 hz-py-1 hz-r-full hz-bg-raised hz-bordered hz-border-strong hz-fg-soft hz-t-sm hz-w-medium">
              Developer Experience
            </span>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <ChromeText 
              as="h2" 
              className="hz-t-3xl hz-w-bold hz-mb-5"
            >
              The DX Platform
            </ChromeText>
            
            <p className="hz-container-narrow hz-t-xl hz-fg-soft">
              Unify your development workflow with tools designed to increase productivity, enable collaboration, and accelerate innovation.
            </p>
          </motion.div>
        </div>
        
        <DXPlatformGrid isHovered={isHovered} setIsHovered={setIsHovered} />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="hz-mt-7 hz-align-center"
        >
          <p className="hz-container-narrow hz-fg-muted hz-mb-5">
            Join thousands of developers who build faster and ship more reliable software with the Hanzo DX Platform.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default DXPlatform;
