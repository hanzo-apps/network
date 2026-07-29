
import React from "react";
import { motion } from "framer-motion";
import { Shield, Lock, Server } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Compliance = () => {
  return (
    <section className="hz-py-7 hz-px-4 hz-bg-surface">
      <div className="hz-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="hz-col hz-stack-6"
        >
          <div className="hz-col-row hz-ai-center hz-jc-between">
            <div className="hz-mb-6">
              <div className="hz-row hz-ai-center">
                <Shield className="hz-sq-4 hz-fg-muted hz-mr-3" />
                <h2 className="hz-t-2xl hz-w-semibold hz-fg">Secure & Compliant</h2>
              </div>
              <div className="hz-mt-4 hz-row hz-wrap hz-gap-4">
                <div className="hz-row hz-ai-center hz-bg-raised hz-bordered hz-r-md hz-px-3 hz-py-1">
                  <Lock className="hz-sq-2 hz-fg-muted hz-mr-2" />
                  <span className="hz-fg-soft hz-t-sm">SOC2 Type 2 Certified</span>
                </div>
                <div className="hz-row hz-ai-center hz-bg-raised hz-bordered hz-r-md hz-px-3 hz-py-1">
                  <Lock className="hz-sq-2 hz-fg-muted hz-mr-2" />
                  <span className="hz-fg-soft hz-t-sm">HIPAA Compliant</span>
                </div>
              </div>
            </div>
            
            <div className="hz-row hz-ai-center">
              <div className="hz-sq-7 hz-mr-4">
                <img src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/hanzo-ai-icon.png" alt="Hanzo Base Logo" className="hz-w-full hz-h-full hz-object-contain" />
              </div>
              <div>
                <h3 className="hz-t-xl hz-w-bold hz-fg">Hanzo Base</h3>
                <p className="hz-fg-muted">Secure. Scalable. Open Source.</p>
              </div>
            </div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hz-card"
          >
            <div className="hz-row hz-ai-center hz-mb-4">
              <Server className="hz-sq-4 hz-fg-muted hz-mr-3" />
              <h3 className="hz-t-xl hz-w-semibold hz-fg">Global Data Regions</h3>
            </div>
            
            <div className="hz-grid hz-grid-3 hz-gap-5 hz-mt-5">
              <div className="hz-card">
                <h4 className="hz-w-medium hz-fg-soft hz-mb-2">United States (US)</h4>
                <p className="hz-fg-soft hz-t-sm hz-mb-1">MCI - Kansas City</p>
                <p className="hz-fg-muted hz-t-xs">Hanzo Cloud region: us-central-1</p>
              </div>
              
              <div className="hz-card">
                <h4 className="hz-w-medium hz-fg-soft hz-mb-2">Canada (CA)</h4>
                <p className="hz-fg-soft hz-t-sm hz-mb-1">YVR - Vancouver</p>
                <p className="hz-fg-muted hz-t-xs">Hanzo Cloud region: ca-west-1</p>
              </div>
              
              <div className="hz-card">
                <h4 className="hz-w-medium hz-fg-soft hz-mb-2">European Union (EU)</h4>
                <p className="hz-fg-soft hz-t-sm hz-mb-1">BCN - Barcelona</p>
                <p className="hz-fg-muted hz-t-xs">Hanzo Cloud region: eu-west-1</p>
              </div>
            </div>
            
            <div className="hz-mt-5 hz-align-center">
              <Button variant="outline" className="hz-bg-raised hz-fg hz-hoverable">
                <Link to="/security">Learn More About Our Security</Link>
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Compliance;
