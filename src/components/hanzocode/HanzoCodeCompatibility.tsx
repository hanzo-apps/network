
import React from "react";
import { motion } from "framer-motion";
import { Check, Code2, PanelLeft, Plug, Settings, Shield } from "lucide-react";

const HanzoCodeCompatibility = () => {
  return (
    <section className="hz-py-7 hz-px-4 hz-bg-surface">
      <div className="hz-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="hz-align-center hz-mb-7"
        >
          <h2 className="hz-t-3xl hz-w-bold hz-mb-4">Universal Compatibility</h2>
          <p className="hz-container-narrow hz-t-xl hz-fg-soft">
            Enhance any VS Code-compatible editor with Hanzo's intelligence
          </p>
        </motion.div>

        <div className="hz-grid hz-grid-2 hz-gap-7">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="hz-card"
          >
            <h3 className="hz-t-2xl hz-w-bold hz-mb-5 hz-fg-muted">Works With Your Favorite Editors</h3>
            
            <ul className="hz-stack-4">
              <li className="hz-row hz-ai-start">
                <Check className="hz-sq-4 hz-fg-muted hz-mr-3 hz-mt-1 hz-none" />
                <div>
                  <span className="hz-w-semibold hz-fg">VS Code:</span>
                  <span className="hz-fg-soft hz-ml-2">Native integration with full feature support</span>
                </div>
              </li>
              <li className="hz-row hz-ai-start">
                <Check className="hz-sq-4 hz-fg-muted hz-mr-3 hz-mt-1 hz-none" />
                <div>
                  <span className="hz-w-semibold hz-fg">Cursor:</span>
                  <span className="hz-fg-soft hz-ml-2">Augment Cursor's AI capabilities with Hanzo's advanced agentic features</span>
                </div>
              </li>
              <li className="hz-row hz-ai-start">
                <Check className="hz-sq-4 hz-fg-muted hz-mr-3 hz-mt-1 hz-none" />
                <div>
                  <span className="hz-w-semibold hz-fg">Windsurf:</span>
                  <span className="hz-fg-soft hz-ml-2">Add Hanzo's intelligence layer on top of Windsurf's editor experience</span>
                </div>
              </li>
              <li className="hz-row hz-ai-start">
                <Check className="hz-sq-4 hz-fg-muted hz-mr-3 hz-mt-1 hz-none" />
                <div>
                  <span className="hz-w-semibold hz-fg">Void:</span>
                  <span className="hz-fg-soft hz-ml-2">Perfect complement to Void's streamlined experience</span>
                </div>
              </li>
              <li className="hz-row hz-ai-start">
                <Check className="hz-sq-4 hz-fg-muted hz-mr-3 hz-mt-1 hz-none" />
                <div>
                  <span className="hz-w-semibold hz-fg">Any VS Code-compatible editor:</span>
                  <span className="hz-fg-soft hz-ml-2">If it supports VS Code extensions, it supports Hanzo Code</span>
                </div>
              </li>
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="hz-grid hz-grid-2 hz-gap-5">
              <div className="hz-card">
                <PanelLeft className="hz-sq-6 hz-fg-muted hz-mb-4" />
                <h4 className="hz-t-lg hz-w-semibold hz-mb-2">Extension API</h4>
                <p className="hz-fg-soft hz-t-sm">Seamless integration with standard VS Code extension API</p>
              </div>
              
              <div className="hz-card">
                <Code2 className="hz-sq-6 hz-fg-muted hz-mb-4" />
                <h4 className="hz-t-lg hz-w-semibold hz-mb-2">Native Experience</h4>
                <p className="hz-fg-soft hz-t-sm">Feels like a native part of your existing editor</p>
              </div>
              
              <div className="hz-card">
                <Plug className="hz-sq-6 hz-fg-muted hz-mb-4" />
                <h4 className="hz-t-lg hz-w-semibold hz-mb-2">Plugin System</h4>
                <p className="hz-fg-soft hz-t-sm">Extend with custom plugins for your workflow</p>
              </div>
              
              <div className="hz-card">
                <Shield className="hz-sq-6 hz-fg-muted hz-mb-4" />
                <h4 className="hz-t-lg hz-w-semibold hz-mb-2">Enterprise Ready</h4>
                <p className="hz-fg-soft hz-t-sm">Security and compliance features for teams</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HanzoCodeCompatibility;
