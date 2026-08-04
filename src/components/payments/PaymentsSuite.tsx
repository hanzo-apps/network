
import React from "react";
import { motion } from "framer-motion";
import { CreditCard, Calendar, Send, CreditCard as CardIcon, Coins } from "lucide-react";

const suiteItems = [
  {
    icon: <CreditCard className="hz-sq-4 hz-fg-muted" />,
    title: "Online Payments",
    description: "Flexible integration with any website, optimized checkouts, and local payment methods."
  },
  {
    icon: <Calendar className="hz-sq-4 hz-fg-muted" />,
    title: "Subscriptions & Billing",
    description: "Automated subscription management, recurring billing, and multilingual invoicing."
  },
  {
    icon: <Send className="hz-sq-4 hz-fg-muted" />,
    title: "Embedded Finance (Connect)",
    description: "Integrate end-to-end payment experiences for marketplaces and platforms, including streamlined payouts."
  },
  {
    icon: <CardIcon className="hz-sq-4 hz-fg-muted" />,
    title: "Issuing",
    description: "Create and manage physical and virtual cards for your teams or customers."
  },
  {
    icon: <Coins className="hz-sq-4 hz-fg-muted" />,
    title: "Capital",
    description: "Access financing options to fuel your growth."
  }
];

const PaymentsSuite = () => {
  return (
    <section className="hz-py-7 hz-px-4 hz-bg">
      <div className="hz-container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="hz-align-center hz-mb-7"
        >
          <h2 className="hz-t-3xl hz-w-bold hz-mb-5">Comprehensive Payments Infrastructure</h2>
          <p className="hz-container-narrow hz-t-xl hz-fg-soft">
            Hanzo Payments provides the essential tools needed to process payments and optimize your financial operations, 
            fully integrated into your Hanzo workflow.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="hz-mb-7"
        >
          <h3 className="hz-t-2xl hz-w-bold hz-mb-6 hz-align-center">Unified Payments Suite</h3>
          <div className="hz-grid hz-grid-3 hz-gap-5">
            {suiteItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="hz-card"
              >
                <div className="hz-bg-raised hz-p-3 hz-r-full hz-w-fit hz-mb-4">
                  {item.icon}
                </div>
                <h4 className="hz-t-xl hz-w-semibold hz-mb-3">{item.title}</h4>
                <p className="hz-fg-muted">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="hz-card hz-rel hz-clip"
        >
          <div className="hz-abs hz-inset hz-bg-surface"></div>
          <div className="hz-col-row hz-rel hz-z-raised hz-gap-6 hz-ai-center">
            <div className="">
              <h3 className="hz-t-2xl hz-w-bold hz-mb-4">Optimized for Growth</h3>
              <ul className="hz-stack-3">
                <li className="hz-row hz-ai-start hz-gap-2">
                  <span className="hz-fg-muted">•</span>
                  <span>Real-time analytics and detailed financial reporting.</span>
                </li>
                <li className="hz-row hz-ai-start hz-gap-2">
                  <span className="hz-fg-muted">•</span>
                  <span>Forecast and predict revenues with built-in AI-driven analytics.</span>
                </li>
                <li className="hz-row hz-ai-start hz-gap-2">
                  <span className="hz-fg-muted">•</span>
                  <span>Transparent pricing with no hidden fees.</span>
                </li>
              </ul>
            </div>
            <div className="hz-card">
              <div className="hz-align-center">
                <h4 className="hz-t-lg hz-w-semibold hz-mb-3">Payment Growth</h4>
                <div className="hz-row hz-ai-end hz-jc-center hz-inline-2 hz-bh-8 hz-mb-4">
                  {[20, 35, 28, 45, 60, 75, 90].map((height, i) => (
                    <div 
                      key={i} 
                      className="hz-r-md hz-bw-4"
                      style={{height: `${height}%`}}
                    ></div>
                  ))}
                </div>
                <div className="hz-t-sm hz-fg-muted">Last 7 days</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PaymentsSuite;
