
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CallToAction: React.FC = () => {
  const navigate = useNavigate();
  
  const handleGetStarted = () => {
    navigate('/signup');
  };
  
  return (
    <section className="hz-py-7 hz-px-4 hz-rel hz-clip">
      {/* Background animation elements */}
      <motion.div 
        className="hz-abs hz-inset hz-dim-more"
        initial={{ backgroundPosition: "0% 0%" }}
        animate={{ backgroundPosition: "100% 100%" }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
        style={{ 
          backgroundImage: "radial-gradient(circle at 30% 50%, purple 0%, transparent 20%), radial-gradient(circle at 70% 50%, indigo 0%, transparent 20%)",
          backgroundSize: "100% 100%",
        }}
      />
      
      <div className="hz-container-narrow hz-align-center hz-rel hz-z-raised">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="hz-t-3xl hz-w-bold hz-mb-5 hz-fg hz-leading-tight"
        >
          Ready to Transform Your AI Development?
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="hz-t-lg hz-fg-soft hz-mb-6 hz-leading-relaxed"
        >
          Join thousands of developers and companies building the future with Hanzo AI.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="hz-row hz-wrap hz-jc-center hz-gap-4"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Button 
              size="lg" 
              className="hz-bg-raised hz-fg hz-px-6 hz-py-5 hz-t-lg hz-rel hz-clip hz-r-full hz-hoverable"
              onClick={handleGetStarted}
            >
              <span className="hz-rel hz-z-raised hz-row hz-ai-center hz-py-1 hz-leading-relaxed">
                Get Started for Free 
                <motion.span
                  initial={{ x: 0 }}
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop", ease: "easeInOut", repeatDelay: 1 }}
                >
                  <ArrowRight className="hz-sq-3 hz-ml-2" />
                </motion.span>
              </span>
              <motion.span 
                className="hz-abs hz-inset hz-invisible hz-transition" 
              />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;
