
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HanzoAppHero = () => {
  return (
    <section className="hz-pt-6 hz-pb-6 hz-px-4 hz-rel hz-clip">
      {/* Background elements */}
      <div className="hz-abs hz-inset hz-dim-more"></div>
      <div className="hz-sq-8 hz-abs hz-bg-raised hz-r-full hz-blur-bg"></div>
      <div className="hz-sq-8 hz-abs hz-bg-raised hz-r-full hz-blur-bg"></div>
      
      <div className="hz-container-wide hz-rel hz-z-raised">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="hz-align-center"
        >
          <h1 className="hz-t-4xl hz-w-bold hz-mb-5">
            Build LLM Apps <span className="hz-fg-muted">Easily</span>
          </h1>
          <p className="hz-container-narrow hz-t-xl hz-fg-soft hz-mb-7">
            Build. Deploy. Scale.
          </p>
          
          <div className="hz-mb-7">
            <p className="hz-fg-muted hz-t-lg hz-mb-4">Trusted and used by teams around the globe</p>
          </div>
          
          <div className="hz-container-narrow hz-mw-md hz-card hz-mb-7">
            <h3 className="hz-t-2xl hz-w-semibold hz-mb-4">Iterate, fast</h3>
            <p className="hz-fg-soft hz-mb-5">
              Developing LLM apps takes countless iterations. With AI engineering approach, we enable quick iterations to go from testing to production
            </p>
            
            <div className="hz-bg-surface hz-r-lg hz-p-4 hz-mono hz-t-sm hz-fg-soft hz-align-left hz-mb-5">
              <pre>
                $ npm install -g flowise<br/>
                $ npx flowise start
              </pre>
            </div>
            
            <Button 
              size="lg"
              className="hz-fg hz-px-6 hz-py-5 hz-r-lg hz-t-lg hz-w-medium"
            >
              <a href="#" className="hz-row hz-ai-center">
                Get Started 
                <ArrowRight className="hz-sq-3 hz-ml-2" />
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HanzoAppHero;
