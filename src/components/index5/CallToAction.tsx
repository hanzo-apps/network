
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import ChromeText from "@/components/ui/chrome-text";

const CallToAction: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <section className="hz-py-7 hz-px-4 hz-rel hz-clip">
      <div className="hz-abs hz-inset hz-dim-more"></div>
      <div className="hz-sq-8 hz-abs hz-bg-raised hz-r-full hz-blur-bg"></div>
      <div className="hz-sq-8 hz-abs hz-bg-raised hz-r-full hz-blur-bg"></div>
      
      <div className="hz-container-wide hz-rel hz-z-raised">
        <motion.div 
          className="hz-align-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <ChromeText as="h2" className="hz-t-3xl hz-w-bold hz-mb-5 hz-mx-auto hz-align-center">
            Start Building Today
          </ChromeText>
          <p className="hz-container-narrow hz-t-xl hz-fg-soft hz-mb-6">
            Join thousands of developers building the future with Hanzo AI Cloud and DX Platform.
            Get started for free and scale as you grow.
          </p>
          
          <Button 
            size="lg"
            className="hz-bg-inverse hz-fg-inverse hz-px-6 hz-py-5 hz-r-lg hz-t-xl hz-w-medium hz-shadow-lg hz-transition hz-hoverable"
            onClick={() => navigate('/signup')}
          >
            Start Building for Free <ArrowRight className="hz-sq-3 hz-ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;
