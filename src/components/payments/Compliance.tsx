
import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Receipt, AlertTriangle } from "lucide-react";

const Compliance = () => {
  return (
    <section className="hz-py-7 hz-px-4">
      <div className="hz-container-wide">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="hz-mb-7 hz-align-center"
        >
          <h2 className="hz-t-3xl hz-w-bold hz-mb-5">Automatic Global Tax Compliance</h2>
          <p className="hz-container-narrow hz-t-xl hz-fg-soft">
            Focus on your business while Hanzo handles the complexity of global tax regulations and compliance.
          </p>
        </motion.div>

        <div className="hz-grid hz-grid-3 hz-gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0 }}
            className="hz-card"
          >
            <div className="hz-bg-raised hz-p-3 hz-r-full hz-w-fit hz-mb-4">
              <ShieldCheck className="hz-sq-4 hz-fg-muted" />
            </div>
            <h3 className="hz-t-xl hz-w-semibold hz-mb-3">Automated Tax Management</h3>
            <p className="hz-fg-muted hz-mb-4">
              Automatically handle VAT, GST, and regional taxes (including sales tax).
            </p>
            <ul className="hz-stack-2 hz-fg-muted">
              <li className="hz-row hz-ai-start hz-gap-2">
                <span className="hz-fg-muted">•</span>
                <span>Real-time tax rate calculation</span>
              </li>
              <li className="hz-row hz-ai-start hz-gap-2">
                <span className="hz-fg-muted">•</span>
                <span>Tax exemption handling</span>
              </li>
              <li className="hz-row hz-ai-start hz-gap-2">
                <span className="hz-fg-muted">•</span>
                <span>Automated tax reporting</span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hz-card"
          >
            <div className="hz-bg-raised hz-p-3 hz-r-full hz-w-fit hz-mb-4">
              <Receipt className="hz-sq-4 hz-fg-muted" />
            </div>
            <h3 className="hz-t-xl hz-w-semibold hz-mb-3">Merchant of Record</h3>
            <p className="hz-fg-muted hz-mb-4">
              Hanzo takes liability for taxes and compliance, acting as your merchant of record.
            </p>
            <ul className="hz-stack-2 hz-fg-muted">
              <li className="hz-row hz-ai-start hz-gap-2">
                <span className="hz-fg-muted">•</span>
                <span>Simplified global expansion</span>
              </li>
              <li className="hz-row hz-ai-start hz-gap-2">
                <span className="hz-fg-muted">•</span>
                <span>Legal entity management</span>
              </li>
              <li className="hz-row hz-ai-start hz-gap-2">
                <span className="hz-fg-muted">•</span>
                <span>Compliant invoicing worldwide</span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hz-card"
          >
            <div className="hz-bg-raised hz-p-3 hz-r-full hz-w-fit hz-mb-4">
              <AlertTriangle className="hz-sq-4 hz-fg-muted" />
            </div>
            <h3 className="hz-t-xl hz-w-semibold hz-mb-3">Fraud Protection</h3>
            <p className="hz-fg-muted hz-mb-4">
              Automatic fraud detection and prevention built-in to protect your business.
            </p>
            <ul className="hz-stack-2 hz-fg-muted">
              <li className="hz-row hz-ai-start hz-gap-2">
                <span className="hz-fg-muted">•</span>
                <span>Machine learning fraud detection</span>
              </li>
              <li className="hz-row hz-ai-start hz-gap-2">
                <span className="hz-fg-muted">•</span>
                <span>Adaptive risk rules</span>
              </li>
              <li className="hz-row hz-ai-start hz-gap-2">
                <span className="hz-fg-muted">•</span>
                <span>Chargeback protection</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Compliance;
