
import React from "react";
import { motion } from "framer-motion";
import { 
  Eye, 
  History, 
  GitCommit, 
  Shield, 
  Lock, 
  Bookmark,
  CheckCircle
} from "lucide-react";

const AuditFeatures = () => {
  return (
    <section className="hz-py-7 hz-px-4 hz-bg">
      <div className="hz-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="hz-align-center hz-mb-7"
        >
          <div className="hz-inline hz-p-2 hz-r-full hz-bg-raised hz-bordered hz-border-strong hz-fg-muted hz-mb-4">
            <History className="hz-sq-4" />
          </div>
          <h2 className="hz-t-3xl hz-w-bold hz-mb-5">
            Enterprise-Grade Audit & Security
          </h2>
          <p className="hz-container-narrow hz-t-xl hz-fg-soft">
            Full transparency and accountability with comprehensive audit logs 
            and enterprise security features that meet the most stringent compliance requirements.
          </p>
        </motion.div>

        <div className="hz-grid hz-grid-3 hz-gap-6 hz-mb-7">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hz-card hz-rel hz-clip"
          >
            <div className="hz-sq-8 hz-abs hz-top-0 hz-right-0 hz-bg-raised"></div>
            <div className="hz-bg-raised hz-p-3 hz-r-lg hz-inline hz-mb-4">
              <Eye className="hz-sq-5 hz-fg-muted" />
            </div>
            <h3 className="hz-t-xl hz-w-semibold hz-mb-3">Real-Time Monitoring</h3>
            <p className="hz-fg-muted hz-mb-4">
              Watch your AI agents' work in real-time through a secure virtual desktop environment. 
              Every action is visible and recordable.
            </p>
            <ul className="hz-stack-2">
              <li className="hz-row hz-ai-start">
                <CheckCircle className="hz-sq-3 hz-fg-muted hz-mr-2 hz-mt-1 hz-none" />
                <span className="hz-fg-soft">Live screen sharing capability</span>
              </li>
              <li className="hz-row hz-ai-start">
                <CheckCircle className="hz-sq-3 hz-fg-muted hz-mr-2 hz-mt-1 hz-none" />
                <span className="hz-fg-soft">Activity dashboards and alerts</span>
              </li>
              <li className="hz-row hz-ai-start">
                <CheckCircle className="hz-sq-3 hz-fg-muted hz-mr-2 hz-mt-1 hz-none" />
                <span className="hz-fg-soft">Performance metrics tracking</span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hz-card hz-rel hz-clip"
          >
            <div className="hz-sq-8 hz-abs hz-top-0 hz-right-0 hz-bg-raised"></div>
            <div className="hz-bg-raised hz-p-3 hz-r-lg hz-inline hz-mb-4">
              <GitCommit className="hz-sq-5 hz-fg-muted" />
            </div>
            <h3 className="hz-t-xl hz-w-semibold hz-mb-3">Comprehensive Audit Logs</h3>
            <p className="hz-fg-muted hz-mb-4">
              Every action taken by AI agents is meticulously logged and stored securely. 
              Search, filter, and export logs for compliance reporting.
            </p>
            <ul className="hz-stack-2">
              <li className="hz-row hz-ai-start">
                <CheckCircle className="hz-sq-3 hz-fg-muted hz-mr-2 hz-mt-1 hz-none" />
                <span className="hz-fg-soft">Tamper-proof logging system</span>
              </li>
              <li className="hz-row hz-ai-start">
                <CheckCircle className="hz-sq-3 hz-fg-muted hz-mr-2 hz-mt-1 hz-none" />
                <span className="hz-fg-soft">Full record of all decisions and actions</span>
              </li>
              <li className="hz-row hz-ai-start">
                <CheckCircle className="hz-sq-3 hz-fg-muted hz-mr-2 hz-mt-1 hz-none" />
                <span className="hz-fg-soft">Advanced search and filtering options</span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="hz-card hz-rel hz-clip"
          >
            <div className="hz-sq-8 hz-abs hz-top-0 hz-right-0 hz-bg-raised"></div>
            <div className="hz-bg-raised hz-p-3 hz-r-lg hz-inline hz-mb-4">
              <Shield className="hz-sq-5 hz-fg-muted" />
            </div>
            <h3 className="hz-t-xl hz-w-semibold hz-mb-3">Enterprise Security</h3>
            <p className="hz-fg-muted hz-mb-4">
              Military-grade encryption, role-based access control, and compliance 
              with industry standards ensure your data remains secure.
            </p>
            <ul className="hz-stack-2">
              <li className="hz-row hz-ai-start">
                <CheckCircle className="hz-sq-3 hz-fg-muted hz-mr-2 hz-mt-1 hz-none" />
                <span className="hz-fg-soft">SOC 2, HIPAA, GDPR, and CCPA compliant</span>
              </li>
              <li className="hz-row hz-ai-start">
                <CheckCircle className="hz-sq-3 hz-fg-muted hz-mr-2 hz-mt-1 hz-none" />
                <span className="hz-fg-soft">End-to-end encryption for all data</span>
              </li>
              <li className="hz-row hz-ai-start">
                <CheckCircle className="hz-sq-3 hz-fg-muted hz-mr-2 hz-mt-1 hz-none" />
                <span className="hz-fg-soft">Single sign-on (SSO) and SCIM support</span>
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="hz-card hz-align-center"
        >
          <div className="hz-row hz-jc-center hz-gap-6 hz-wrap">
            <div className="hz-row hz-ai-center">
              <Lock className="hz-sq-4 hz-fg-muted hz-mr-2" />
              <span className="hz-fg-soft">SOC 2 Type II</span>
            </div>
            <div className="hz-row hz-ai-center">
              <Lock className="hz-sq-4 hz-fg-muted hz-mr-2" />
              <span className="hz-fg-soft">HIPAA</span>
            </div>
            <div className="hz-row hz-ai-center">
              <Lock className="hz-sq-4 hz-fg-muted hz-mr-2" />
              <span className="hz-fg-soft">GDPR</span>
            </div>
            <div className="hz-row hz-ai-center">
              <Lock className="hz-sq-4 hz-fg-muted hz-mr-2" />
              <span className="hz-fg-soft">CCPA</span>
            </div>
            <div className="hz-row hz-ai-center">
              <Lock className="hz-sq-4 hz-fg-muted hz-mr-2" />
              <span className="hz-fg-soft">ISO 27001</span>
            </div>
            <div className="hz-row hz-ai-center">
              <Bookmark className="hz-sq-4 hz-fg-muted hz-mr-2" />
              <span className="hz-fg-soft">99.9% Uptime SLA</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AuditFeatures;
