
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download, ExternalLink, Github } from "lucide-react";

const HanzoCodeCTA = () => {
  return (
    <section className="hz-py-7 hz-px-4 hz-bg-surface">
      <div className="hz-container-narrow hz-align-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="hz-t-3xl hz-w-bold hz-mb-6">Upgrade Your Editor Today</h2>
          
          <p className="hz-container-narrow hz-mw-md hz-t-xl hz-fg-soft hz-mb-7">
            Transform your VS Code, Cursor, Windsurf, or Void experience with the most advanced AI coding tools available.
          </p>
          
          <div className="hz-col-row hz-ai-center hz-jc-center hz-stack-4 hz-mb-7">
            <Button 
              size="sm"
              className="hz-bg-raised hz-fg hz-w-full hz-hoverable"
            >
              <Download className="hz-sq-2 hz-mr-2" />
              Download Hanzo Code
            </Button>
            
            <Button 
              size="sm" 
              variant="outline"
              className="hz-bg-none hz-border-strong hz-fg hz-w-full hz-hoverable"
            >
              <ExternalLink className="hz-sq-2 hz-mr-2" />
              VS Code Extension
            </Button>
            
            <Button 
              size="sm" 
              variant="outline"
              className="hz-bg-none hz-border-strong hz-fg hz-w-full hz-hoverable"
            >
              <Github className="hz-sq-2 hz-mr-2" />
              GitHub
            </Button>
          </div>
          
          <div className="hz-card hz-mb-7">
            <h3 className="hz-t-xl hz-w-semibold hz-mb-4">Already Using Cursor or Windsurf?</h3>
            <p className="hz-fg-soft hz-mb-5">
              Install Hanzo Code alongside your current editor and supercharge it with our agentic capabilities. No need to switch or change your workflow.
            </p>
            <Button 
              size="sm"
              className="hz-fg"
            >
              One-Click Integration
            </Button>
          </div>
          
          <div className="hz-grid hz-grid-4 hz-gap-4 hz-t-sm hz-fg-muted">
            <a href="#" className="hz-transition hz-hoverable">Pricing</a>
            <a href="#" className="hz-transition hz-hoverable">Downloads</a>
            <a href="#" className="hz-transition hz-hoverable">Docs</a>
            <a href="#" className="hz-transition hz-hoverable">Forum</a>
            <a href="#" className="hz-transition hz-hoverable">Careers</a>
            <a href="#" className="hz-transition hz-hoverable">Company</a>
            <a href="#" className="hz-transition hz-hoverable">Security</a>
            <a href="#" className="hz-transition hz-hoverable">Privacy</a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HanzoCodeCTA;
