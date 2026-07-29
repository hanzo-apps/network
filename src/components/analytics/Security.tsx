
import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Lock, CheckCircle } from "lucide-react";

const certifications = [
  { name: "SOC 2 Type II", details: "Certified for organizational controls and security." },
  { name: "GDPR compliance", details: "Fully compliant with European data protection regulations." },
  { name: "ISO 27001 certified", details: "International standard for information security management." },
  { name: "HIPAA compliant", details: "Compliant with healthcare data protection requirements." }
];

const SecurityFeatures = [
  "End-to-end encryption",
  "Data residency controls",
  "Custom data retention policies",
  "Role-based access control",
  "Regular security audits",
  "Privacy-focused data collection",
  "Automated compliance monitoring"
];

const Security = () => {
  return (
    <section className="hz-py-7 hz-px-4 hz-bg hz-rel hz-clip">
      <div className="hz-abs hz-inset"></div>
      
      <div className="hz-container-wide hz-rel hz-z-raised">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="hz-align-center hz-mb-7"
        >
          <div className="hz-inline hz-ai-center hz-jc-center hz-mb-4">
            <ShieldCheck className="hz-sq-6 hz-fg-muted" />
          </div>
          <h2 className="hz-t-3xl hz-w-bold hz-mb-5">Enterprise-Grade Security & Compliance</h2>
          <p className="hz-container-narrow hz-t-xl hz-fg-soft">
            Secure by design, ensuring your data meets stringent compliance standards.
          </p>
        </motion.div>
        
        <div className="hz-grid hz-grid-3 hz-gap-6 hz-mb-7">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className=""
          >
            <div className="hz-card hz-h-full">
              <div className="hz-row hz-jc-center hz-mb-5">
                <div className="hz-card hz-card-tight">
                  <Lock className="hz-sq-5 hz-fg-muted" />
                </div>
              </div>
              
              <h3 className="hz-t-xl hz-w-bold hz-align-center hz-mb-5">Security Features</h3>
              
              <ul className="hz-stack-3">
                {SecurityFeatures.map((feature, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                    className="hz-row hz-ai-center"
                  >
                    <CheckCircle className="hz-sq-3 hz-fg-muted hz-mr-3 hz-none" />
                    <span className="hz-fg-soft">{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className=""
          >
            <div className="hz-card hz-h-full">
              <h3 className="hz-t-xl hz-w-bold hz-mb-5">Compliance Certifications</h3>
              
              <div className="hz-grid hz-grid-2 hz-gap-5">
                {certifications.map((cert, index) => (
                  <motion.div
                    key={cert.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    className="hz-card"
                  >
                    <div className="hz-row hz-ai-center">
                      <div className="hz-mr-3 hz-p-2 hz-bg-raised hz-r-full">
                        <ShieldCheck className="hz-sq-4 hz-fg-muted" />
                      </div>
                      <h4 className="hz-t-lg hz-w-medium">{cert.name}</h4>
                    </div>
                    <p className="hz-mt-3 hz-fg-muted">{cert.details}</p>
                  </motion.div>
                ))}
              </div>
              
              <div className="hz-card hz-mt-6">
                <div className="hz-row">
                  <div className="hz-mr-4 hz-p-2 hz-bg-raised hz-r-full">
                    <svg className="hz-sq-4 hz-fg-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="hz-t-lg hz-w-medium hz-mb-2">Data Privacy Commitment</h4>
                    <p className="hz-fg-muted">
                      We believe privacy is a fundamental right. Hanzo Analytics is designed with privacy-first principles and gives you full control over your data collection practices.
                    </p>
                    <a href="#privacy-policy" className="hz-mt-3 hz-fg-muted hz-transition hz-link">
                      Read our privacy policy →
                    </a>
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
