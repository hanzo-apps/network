
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, BookOpen } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="hz-pt-6 hz-pb-6 hz-px-4 hz-rel hz-clip">
      {/* Background elements */}
      <div className="hz-abs hz-inset hz-dim-more"></div>
      <div className="hz-sq-8 hz-abs hz-bg-raised hz-r-full hz-blur-bg"></div>
      <div className="hz-sq-8 hz-abs hz-bg-raised hz-r-full hz-blur-bg"></div>
      
      <div className="hz-container hz-rel hz-z-raised">
        <div className="hz-align-center hz-mb-7">
          <div className="hz-row hz-wrap hz-jc-center hz-gap-4 hz-mb-5">
            <a href="/pricing" className="hz-row hz-ai-center hz-fg-soft hz-transition hz-hoverable">
              <Button variant="ghost" size="sm" className="hz-gap-2 hz-r-full">
                <FileText className="hz-sq-2" />
                Pricing
              </Button>
            </a>
            <a href="https://docs.hanzo.ai/balancer" className="hz-row hz-ai-center hz-fg-soft hz-transition hz-hoverable">
              <Button variant="ghost" size="sm" className="hz-gap-2 hz-r-full">
                <BookOpen className="hz-sq-2" />
                Docs
              </Button>
            </a>
          </div>

          <div className="hz-mb-4">
            <span className="hz-fg-muted hz-w-medium hz-leading-relaxed">Hanzo Balancer v3.3 Is Now Available! 
              <a href="#learn-more" className="hz-ml-2 hz-fg-soft hz-underline">Learn More</a>
            </span>
          </div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="hz-t-4xl hz-w-bold hz-mb-5 hz-leading-tight"
          >
            The Cloud Native<br />
            <span className="hz-fg-muted">Application Proxy</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="hz-container-narrow hz-t-xl hz-fg-soft hz-mb-7 hz-leading-relaxed"
          >
            Simplify and automate the discovery, routing, and load balancing of microservices.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hz-col-row hz-jc-center hz-gap-4 hz-mb-7"
          >
            <Button 
              size="lg"
              className="hz-bg-raised hz-fg hz-r-full hz-py-5 hz-hoverable"
            >
              <span className="hz-py-1 hz-leading-relaxed">GET STARTED</span>
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="hz-border-strong hz-fg hz-r-full hz-py-5 hz-hoverable"
            >
              <span className="hz-py-1 hz-leading-relaxed">Start Free Trial</span>
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="hz-border-strong hz-fg hz-r-full hz-py-5 hz-hoverable"
            >
              <span className="hz-py-1 hz-leading-relaxed">Request Demo</span>
            </Button>
          </motion.div>
          
          <div className="hz-grid hz-grid-4 hz-container-narrow hz-gap-6">
            <div className="hz-align-center">
              <h3 className="hz-t-3xl hz-w-bold hz-mb-2">3.2B+</h3>
              <p className="hz-fg-muted">Downloads</p>
            </div>
            <div className="hz-align-center">
              <h3 className="hz-t-3xl hz-w-bold hz-mb-2">47K+</h3>
              <p className="hz-fg-muted">Stars on Github</p>
            </div>
            <div className="hz-align-center">
              <h3 className="hz-t-3xl hz-w-bold hz-mb-2">900+</h3>
              <p className="hz-fg-muted">Contributors</p>
            </div>
            <div className="hz-align-center">
              <h3 className="hz-t-3xl hz-w-bold hz-mb-2">Top 15</h3>
              <p className="hz-fg-muted">on Docker hub</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
