
import React from "react";
import { motion } from "framer-motion";
import { Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";

const OperativeUsage = () => {
  return (
    <section className="hz-py-7 hz-bg-surface hz-rel hz-clip" id="get-started">
      {/* Background gradient */}
      <div className="hz-center-y hz-abs hz-bg-raised hz-r-full hz-blur-bg"></div>
      
      <div className="hz-container hz-rel hz-z-raised">
        <div className="hz-container-narrow hz-align-center hz-mb-7">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="hz-t-3xl hz-w-bold hz-fg hz-mb-5">
              Getting Started with Hanzo Operative
            </h2>
            <p className="hz-t-xl hz-fg-soft">
              Set up your environment in minutes and start using AI to operate your computer
            </p>
          </motion.div>
        </div>
        
        <div className="hz-grid hz-grid-5 hz-gap-6">
          <div className="hz-stack-5">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="hz-card"
            >
              <h3 className="hz-t-xl hz-w-semibold hz-fg hz-mb-4">Installation</h3>
              
              <div className="hz-stack-4">
                <div>
                  <p className="hz-fg-muted hz-mb-2">1. Install the package</p>
                  <div className="hz-bg-surface hz-r-md hz-p-3 hz-mono hz-t-sm hz-fg hz-scroll-x">
                    pip install hanzo-operative
                  </div>
                </div>
                
                <div>
                  <p className="hz-fg-muted hz-mb-2">2. Run the operative</p>
                  <div className="hz-bg-surface hz-r-md hz-p-3 hz-mono hz-t-sm hz-fg hz-scroll-x">
                    operative
                  </div>
                </div>
                
                <div>
                  <p className="hz-fg-muted hz-mb-2">3. Enter your API key when prompted</p>
                </div>
              </div>
              
              <div className="hz-mt-5">
                <Button size="sm" variant="outline" className="hz-fg-soft">
                  <Terminal className="hz-sq-2 hz-mr-2" />
                  Copy Installation Commands
                </Button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="hz-card"
            >
              <h3 className="hz-t-xl hz-w-semibold hz-fg hz-mb-4">System Requirements</h3>
              
              <ul className="hz-stack-2 hz-fg-muted">
                <li>• macOS, Windows, or Linux (with X server)</li>
                <li>• Python 3.8 or higher</li>
                <li>• 8GB RAM recommended</li>
                <li>• Internet connection for API access</li>
              </ul>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="hz-card hz-h-full"
          >
            <h3 className="hz-t-xl hz-w-semibold hz-fg hz-mb-4">Basic Usage</h3>
            
            <div className="hz-stack-5">
              <div>
                <p className="hz-fg-muted hz-mb-2">Running with default settings (GPT-4o)</p>
                <div className="hz-bg-surface hz-r-md hz-p-3 hz-mono hz-t-sm hz-fg hz-scroll-x">
                  operative
                </div>
              </div>
              
              <div>
                <p className="hz-fg-muted hz-mb-2">Using voice input mode</p>
                <div className="hz-bg-surface hz-r-md hz-p-3 hz-mono hz-t-sm hz-fg hz-scroll-x">
                  operative --voice
                </div>
              </div>
              
              <div>
                <p className="hz-fg-muted hz-mb-2">Using OCR mode for enhanced element detection</p>
                <div className="hz-bg-surface hz-r-md hz-p-3 hz-mono hz-t-sm hz-fg hz-scroll-x">
                  operative -m gpt-4-with-ocr
                </div>
              </div>
              
              <div>
                <p className="hz-fg-muted hz-mb-2">Using Set-of-Mark (SoM) prompting</p>
                <div className="hz-bg-surface hz-r-md hz-p-3 hz-mono hz-t-sm hz-fg hz-scroll-x">
                  operative -m gpt-4-with-som
                </div>
              </div>
              
              <div className="hz-pt-4">
                <p className="hz-fg-muted">After running any of these commands, you'll be prompted to enter an objective for the AI to accomplish.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OperativeUsage;
