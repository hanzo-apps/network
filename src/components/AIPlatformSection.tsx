
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ChromeText from "@/components/ui/chrome-text";
import { MasonryGrid, MasonryItem } from "@/components/ui/masonry-grid";
import { ArchitecturalBox, GridLines } from "@/components/ui/architectural-elements";
import { aiPlatformFeatures } from "./data/ai-platform-data";
import { BRAND } from "@/lib/brand";

const AIPlatformSection = () => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="hz-rel hz-py-7 hz-clip">
      {/* Background elements - simplified */}
      <div className="hz-abs hz-inset hz-bg" />
      <div className="hz-abs hz-inset"></div>
      
      <GridLines spacing={60} opacity={0.2} color="rgba(147, 51, 234, 0.15)" />
      
      <div className="hz-container hz-rel hz-z-raised">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="hz-align-center hz-mb-7"
        >
          <div className="hz-row hz-jc-center hz-mb-4">
            <span className="hz-px-4 hz-py-1 hz-r-full hz-bg-raised hz-bordered hz-border-strong hz-fg-soft hz-t-sm hz-w-medium">
              Unified AI Development
            </span>
          </div>
          <div className="hz-row hz-jc-center">
            <ChromeText as="h2" className="hz-t-4xl hz-w-bold hz-mb-5">
              AI Engineering Platform
            </ChromeText>
          </div>
          <p className="hz-container-narrow hz-t-lg hz-fg-soft">
            Build powerful AI experiences with our comprehensive platform designed for developers,
            researchers, and enterprises to create, deploy, and scale AI applications.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="hz-container"
        >
          <MasonryGrid columns={4} gap={20} className="hz-mb-7">
            {aiPlatformFeatures.map((feature, index) => {
              const isFeatureHovered = hovered === index;
              
              return (
                <MasonryItem key={feature.id}>
                  <motion.div
                    onMouseEnter={() => setHovered(index)}
                    onMouseLeave={() => setHovered(null)}
                    whileHover={{ scale: 1.03, y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArchitecturalBox
                      className="hz-h-full hz-glass hz-bordered hz-p-5 hz-r-xl hz-transition"
                      showCorners={true}
                      cornerSize={16}
                      cornerColor={isFeatureHovered ? BRAND.cornerStrong : BRAND.cornerSoft}
                    >
                      <div className="hz-mb-4">
                        {React.createElement(feature.icon, { 
                          size: 32, 
                          className: "hz-fg-muted"
                        })}
                      </div>
                      <h3 className="hz-t-xl hz-w-semibold hz-mb-2">{feature.title}</h3>
                      <p className="hz-fg-muted">{feature.description}</p>
                    </ArchitecturalBox>
                  </motion.div>
                </MasonryItem>
              );
            })}
          </MasonryGrid>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="hz-align-center"
        >
          <Button
            size="lg"
            className="hz-r-full"
          >
            <a href="/ai" className="hz-row hz-ai-center">
              Explore the Platform <ArrowRight className="hz-sq-3 hz-ml-2" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default AIPlatformSection;
