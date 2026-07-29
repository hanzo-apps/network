
import React from "react";
import { motion } from "framer-motion";
import { ChevronRight, Users, BookOpen, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SectionHeader from "@/components/zen/SectionHeader";

const UnifiedAICloud: React.FC = () => {
  return (
    <div className="hz-mb-7">
      <SectionHeader 
        title="Unified AI Cloud" 
        description="One platform to build, deploy, and scale your AI applications" 
      />
      
      <div className="hz-grid hz-grid-3 hz-gap-6 hz-mb-7">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="hz-card hz-transition hz-card-interactive"
        >
          <div className="hz-sq-7 hz-bg-raised hz-r-lg hz-row hz-ai-center hz-jc-center hz-mb-4">
            <Users className="hz-sq-4 hz-fg-muted" />
          </div>
          <h3 className="hz-t-xl hz-w-bold hz-mb-2 hz-fg">Enterprise Infrastructure</h3>
          <p className="hz-fg-soft">
            Scalable, secure infrastructure designed for enterprise AI workloads, with global availability, 
            compliance-ready security, and managed services.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="hz-card hz-transition hz-card-interactive"
        >
          <div className="hz-sq-7 hz-bg-raised hz-r-lg hz-row hz-ai-center hz-jc-center hz-mb-4">
            <BookOpen className="hz-sq-4 hz-fg-muted" />
          </div>
          <h3 className="hz-t-xl hz-w-bold hz-mb-2 hz-fg">Developer Experience</h3>
          <p className="hz-fg-soft">
            Comprehensive tooling and frameworks that accelerate development, simplify deployments, and reduce 
            time-to-market for AI-powered applications.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="hz-card hz-transition hz-card-interactive"
        >
          <div className="hz-sq-7 hz-bg-raised hz-r-lg hz-row hz-ai-center hz-jc-center hz-mb-4">
            <Shield className="hz-sq-4 hz-fg-muted" />
          </div>
          <h3 className="hz-t-xl hz-w-bold hz-mb-2 hz-fg">Expert Services</h3>
          <p className="hz-fg-soft">
            Access to industry and technical experts who help you strategize, implement, and optimize your AI 
            initiatives for maximum business impact.
          </p>
        </motion.div>
      </div>
      
      <div className="hz-align-center">
        <Button asChild size="lg" className="">
          <Link to="/cloud">
            Explore Our AI Cloud Platform <ChevronRight className="hz-sq-3 hz-ml-2" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default UnifiedAICloud;
