
import React from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, ExternalLink } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="hz-rel hz-pt-6 hz-pb-6 hz-clip">
      <div className="hz-abs hz-inset hz-z-base" />
      
      {/* Background effect */}
      <div className="hz-abs hz-top-0 hz-left-0 hz-right-0 hz-bh-8 hz-z-base" />
      
      <div className="hz-container hz-rel hz-z-raised hz-mx-auto hz-px-4">
        <div className="hz-container-narrow hz-align-center">
          <div className="hz-inline hz-ai-center hz-px-3 hz-py-1 hz-mb-4 hz-bordered hz-border-strong hz-r-full hz-bg-raised hz-fg-muted hz-t-sm">
            <ShoppingCart className="hz-sq-2 hz-mr-2" />
            Headless E-commerce Platform
          </div>
          
          <h1 className="hz-t-4xl hz-w-bold hz-tracking-tight hz-mb-5">
            <span className="hz-fg">Hanzo</span>
            <span className="hz-chrome"> Commerce</span>
          </h1>
          
          <p className="hz-container-narrow hz-fg-soft hz-t-lg hz-mb-6">
            A powerful headless e-commerce platform with API-first architecture. 
            Build custom shopping experiences with modular components that scale.
          </p>
          
          <div className="hz-col-row hz-jc-center hz-gap-4 hz-mb-7">
            <Button 
              size="lg" 
              className="hz-bg-raised hz-fg-inverse hz-hoverable"
              onClick={() => window.open('https://docs.hanzo.ai/commerce', '_blank')}
            >
              Get Started
              <ExternalLink className="hz-sq-2 hz-ml-2" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="hz-border-strong hz-fg hz-hoverable"
              onClick={() => window.open('https://console.hanzo.ai', '_blank')}
            >
              Console
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
