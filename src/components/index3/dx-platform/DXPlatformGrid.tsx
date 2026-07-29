
import React from "react";
import { motion } from "framer-motion";
import DXPlatformCard from "./DXPlatformCard";
import { dxPlatformData } from "./dxPlatformData";
import { Link } from "react-router-dom";
import ChromeText from "@/components/ui/chrome-text";
import { Button } from "@/components/ui/button";

interface DXPlatformGridProps {
  isHovered: string | null;
  setIsHovered: (id: string | null) => void;
}

const DXPlatformGrid: React.FC<DXPlatformGridProps> = ({ isHovered, setIsHovered }) => {
  return (
    <div className="hz-stack-6">
      {/* Enhanced Platform Visual with Grid Layout */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="hz-mb-7"
      >
        <div className="hz-rel hz-bh-8 hz-w-full hz-bg-surface hz-r-lg hz-clip hz-bordered">
          <div className="hz-abs hz-inset"></div>
          
          {/* Background grid pattern with enhanced visibility */}
          <div className="hz-grid hz-grid-6 hz-abs hz-inset hz-gap-4 hz-p-4 hz-dim-more">
            {Array(16 * 8).fill(0).map((_, i) => (
              <div key={i} className="hz-bordered hz-border-strong hz-r-sm"></div>
            ))}
          </div>
          
          {/* Central platform hub */}
          <div className="hz-center-xy hz-abs">
            <div className="hz-sq-8 hz-r-full hz-bordered hz-border-strong hz-row hz-ai-center hz-jc-center">
              <span className="hz-t-xl hz-w-bold hz-fg">Hanzo DX</span>
            </div>
            
            {/* Connection lines to product categories */}
            <div className="hz-center-xy hz-abs hz-w-full hz-h-full">
              {dxPlatformData.slice(0, 12).map((platform, index) => {
                const angle = (index / 12) * Math.PI * 2;
                const distance = 180;
                const x = Math.cos(angle) * distance;
                const y = Math.sin(angle) * distance;
                
                return (
                  <React.Fragment key={platform.id}>
                    <div 
                      className="hz-abs hz-bw-1"
                      style={{
                        height: distance,
                        transform: `rotate(${angle + Math.PI/2}rad)`,
                        transformOrigin: 'top',
                        top: 0,
                        left: '50%'
                      }}
                    />
                    <div 
                      className="hz-abs hz-p-2 hz-r-lg hz-bordered hz-border-strong hz-row hz-ai-center hz-jc-center"
                      style={{
                        width: '80px',
                        height: '40px',
                        transform: `translate(${x}px, ${y}px)`,
                        top: '50%',
                        left: '50%'
                      }}
                      onMouseEnter={() => setIsHovered(platform.id)}
                      onMouseLeave={() => setIsHovered(null)}
                    >
                      <span className="hz-t-xs hz-w-medium hz-fg hz-whitespace-nowrap">{platform.title}</span>
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Products grid */}
      <div className="hz-grid hz-grid-4 hz-gap-4">
        {/* Display all platform cards */}
        {dxPlatformData.map((platform) => (
          <DXPlatformCard
            key={platform.id}
            id={platform.id}
            title={platform.title}
            description={platform.description}
            features={platform.features}
            icon={platform.icon}
            isHovered={isHovered}
            setIsHovered={setIsHovered}
            color={platform.color}
          />
        ))}

        {/* Updated "Explore More" card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          onMouseEnter={() => setIsHovered("more")}
          onMouseLeave={() => setIsHovered(null)}
        >
          <Link to="/platform" className="hz-card hz-transition hz-h-full hz-col hz-card-interactive">
            <div className="hz-sq-7 hz-r-lg hz-row hz-ai-center hz-jc-center hz-mb-4 hz-transition hz-bg-raised hz-hoverable">
              <svg xmlns="http://www.w3.org/2000/svg" className="hz-sq-4 hz-fg-muted hz-transition hz-link" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
            <ChromeText as="h3" className="hz-t-xl hz-w-bold hz-mb-2">
              Explore More
            </ChromeText>
            <p className="hz-fg-soft hz-mb-4 hz-t-sm">
              Discover our complete DX Platform and developer tools ecosystem
            </p>
            <div className="hz-mt-auto">
              <Button 
                className="hz-fg hz-w-full"
                radius="full"
              >
                View All Tools
              </Button>
            </div>
          </Link>
        </motion.div>
      </div>

      {/* Get Started Free Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="hz-card hz-mt-7"
      >
        <div className="hz-container-narrow hz-align-center">
          <ChromeText as="h2" className="hz-t-2xl hz-w-bold hz-mb-4">
            Start Building Today, Risk-Free
          </ChromeText>
          <p className="hz-t-lg hz-fg-soft hz-mb-5">
            Sign up now and receive $5 in free credits. Earn an additional $5 credit for every friend who joins through your referral link.
          </p>
          <Button 
            asChild
            size="lg"
            className="hz-px-6 hz-py-3 hz-fg hz-w-medium hz-shadow-lg hz-transition"
            radius="full"
          >
            <Link to="/signup">Get Started Free</Link>
          </Button>
          <p className="hz-mt-4 hz-t-sm hz-fg-muted">
            No credit card required. <Link to="/referrals" className="hz-fg-muted hz-underline hz-link">Learn more</Link> about our referral program.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default DXPlatformGrid;
