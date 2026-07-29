
import React from "react";
import { motion } from "framer-motion";
import { Cpu, Clock, Users, LineChart } from "lucide-react";

const UnifiedPlatform = () => {
  return (
    <section className="hz-py-7 hz-px-4 hz-rel">
      <div className="hz-abs hz-inset"></div>
      
      <div className="hz-container-wide hz-rel hz-z-raised">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="hz-container-narrow hz-align-center hz-mb-7"
        >
          <div className="hz-inline hz-ai-center hz-jc-center hz-mb-5 hz-bg-raised hz-p-3 hz-r-full">
            <Cpu className="hz-sq-5 hz-fg-muted" />
          </div>
          <h2 className="hz-t-3xl hz-w-bold hz-mb-5">Unified Intelligence Platform</h2>
          <p className="hz-t-xl hz-fg-soft">
            Bring all your AI observability needs under one seamless platform. Hanzo integrates monitoring, analytics, debugging, and evaluation into a single powerful toolkit.
          </p>
        </motion.div>
        
        <div className="hz-grid hz-grid-3 hz-gap-6">
          {[
            {
              icon: <Clock className="hz-sq-5 hz-fg-muted" />,
              title: "Real-time System Tracing",
              description: "Capture and analyze every event in your AI system with microsecond precision."
            },
            {
              icon: <Users className="hz-sq-5 hz-fg-muted" />,
              title: "Cross-team Collaboration",
              description: "Unite your engineering, data science, and product teams with role-based views and controls."
            },
            {
              icon: <LineChart className="hz-sq-5 hz-fg-muted" />,
              title: "Intelligent Event Analytics",
              description: "Reveal patterns and insights that would otherwise remain hidden in your operational data."
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="hz-card hz-transition hz-card-interactive"
            >
              <div className="hz-bg-raised hz-p-3 hz-r-lg hz-w-fit hz-mb-4">
                {feature.icon}
              </div>
              <h3 className="hz-t-xl hz-w-bold hz-mb-3">{feature.title}</h3>
              <p className="hz-fg-muted">{feature.description}</p>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="hz-mt-7 hz-rel hz-bh-8 hz-clip hz-r-lg hz-bordered"
        >
          <div className="hz-abs hz-inset hz-z-raised"></div>
          
          <div className="hz-abs hz-inset hz-row hz-ai-center hz-jc-center">
            <div className="hz-grid hz-grid-4 hz-gap-4 hz-w-full hz-p-6">
              {Array.from({ length: 12 }).map((_, idx) => (
                <div 
                  key={idx} 
                  className="hz-bh-8 hz-r-lg hz-bordered hz-dim"
                  style={{ 
                    opacity: Math.random() * 0.5 + 0.3,
                    transform: `scale(${Math.random() * 0.3 + 0.8})` 
                  }}
                />
              ))}
            </div>
          </div>
          
          <div className="hz-abs hz-inset hz-row hz-ai-center hz-jc-center hz-z-raised">
            <div className="hz-align-center">
              <h3 className="hz-t-2xl hz-w-bold hz-mb-4">Everything in One Place</h3>
              <p className="hz-fg-soft hz-mw-sm">
                End fragmentation in your AI operations with Hanzo's all-in-one observability platform
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default UnifiedPlatform;
