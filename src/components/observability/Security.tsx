
import React from "react";
import { motion } from "framer-motion";
import { Shield, CheckCircle } from "lucide-react";

const securityFeatures = [
  "SOC 2 Type II", 
  "ISO 27001 certified", 
  "GDPR compliant", 
  "HIPAA compliant", 
  "End-to-end encryption", 
  "Secure data residency options", 
  "Role-based access control", 
  "Audit logs"
];

const Security = () => {
  return (
    <section className="hz-py-7 hz-px-4 hz-bg hz-rel hz-clip">
      <div className="hz-abs hz-inset hz-dim"></div>
      
      <div className="hz-container-wide hz-rel hz-z-raised">
        <div className="hz-grid hz-grid-2 hz-gap-7 hz-ai-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="hz-inline hz-ai-center hz-jc-center hz-mb-5 hz-bg-raised hz-p-3 hz-r-full">
              <Shield className="hz-sq-5 hz-fg-muted" />
            </div>
            <h2 className="hz-t-3xl hz-w-bold hz-mb-5">Enterprise-Grade Security & Compliance</h2>
            <p className="hz-t-lg hz-fg-soft hz-mb-6">
              Hanzo Observability is engineered with enterprise-grade security, compliance, and privacy at its foundation.
            </p>
            
            <div className="hz-grid hz-grid-2 hz-gap-4">
              {securityFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="hz-row hz-ai-center"
                >
                  <CheckCircle className="hz-sq-3 hz-fg-muted hz-mr-2 hz-none" />
                  <span className="hz-fg-soft">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hz-rel"
          >
            <div className="hz-abs hz-r-lg hz-dim"></div>
            <div className="hz-card hz-rel">
              <div className="hz-stack-5">
                <div className="hz-row hz-ai-center">
                  <div className="hz-p-2 hz-bg-raised hz-r-md hz-mr-4">
                    <Shield className="hz-sq-4 hz-fg-muted" />
                  </div>
                  <div>
                    <h3 className="hz-t-lg hz-w-semibold">Data Encryption</h3>
                    <p className="hz-fg-muted hz-t-sm">All data encrypted at rest and in transit</p>
                  </div>
                </div>
                
                <div className="hz-bg-surface hz-r-lg hz-p-4">
                  <div className="hz-mb-3 hz-t-sm hz-fg-muted">Security Certifications</div>
                  <div className="hz-grid hz-grid-2 hz-gap-3">
                    {["SOC 2", "ISO 27001", "GDPR", "HIPAA"].map((cert, idx) => (
                      <div key={idx} className="hz-bg-raised hz-p-2 hz-r-md hz-row hz-ai-center">
                        <CheckCircle className="hz-sq-2 hz-fg-muted hz-mr-2" />
                        <span className="hz-t-sm">{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="hz-bg-surface hz-r-lg hz-p-4">
                  <div className="hz-mb-3 hz-t-sm hz-fg-muted">Data Privacy Controls</div>
                  <div className="hz-stack-3">
                    <div className="hz-row hz-ai-center hz-jc-between">
                      <span className="hz-t-sm">Data Retention</span>
                      <div className="hz-bw-8 hz-bh-1 hz-bg-raised hz-r-full hz-clip">
                        <div className="hz-h-full hz-bg-raised"></div>
                      </div>
                    </div>
                    <div className="hz-row hz-ai-center hz-jc-between">
                      <span className="hz-t-sm">Access Controls</span>
                      <div className="hz-bw-8 hz-bh-1 hz-bg-raised hz-r-full hz-clip">
                        <div className="hz-w-full hz-h-full hz-bg-raised"></div>
                      </div>
                    </div>
                    <div className="hz-row hz-ai-center hz-jc-between">
                      <span className="hz-t-sm">Audit Logging</span>
                      <div className="hz-bw-8 hz-bh-1 hz-bg-raised hz-r-full hz-clip">
                        <div className="hz-h-full hz-bg-raised"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Security;
