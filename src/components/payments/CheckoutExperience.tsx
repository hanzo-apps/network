
import React from "react";
import { motion } from "framer-motion";
import { Globe, Smartphone, Paintbrush } from "lucide-react";

const CheckoutExperience = () => {
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
          <h2 className="hz-t-3xl hz-w-bold hz-mb-5">Customizable Checkout Experiences</h2>
          <p className="hz-container-narrow hz-t-xl hz-fg-soft">
            Create beautiful, high-converting checkout flows that drive revenue growth and customer satisfaction.
          </p>
        </motion.div>

        <div className="hz-grid hz-grid-2 hz-gap-6 hz-mb-7">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="hz-bg-surface hz-bordered hz-r-lg hz-clip"
          >
            <div className="hz-p-5">
              <h3 className="hz-t-2xl hz-w-bold hz-mb-4">Global Payment Methods</h3>
              <ul className="hz-stack-3 hz-mb-5">
                <li className="hz-row hz-ai-start hz-gap-2">
                  <span className="hz-fg-muted">•</span>
                  <span>Over 200 currencies and local payment methods</span>
                </li>
                <li className="hz-row hz-ai-start hz-gap-2">
                  <span className="hz-fg-muted">•</span>
                  <span>Optimized global payment acceptance with Adaptive Acceptance</span>
                </li>
                <li className="hz-row hz-ai-start hz-gap-2">
                  <span className="hz-fg-muted">•</span>
                  <span>Smart routing for higher authorization rates</span>
                </li>
              </ul>

              <div className="hz-row hz-wrap hz-gap-2 hz-mt-4">
                {['Visa', 'Mastercard', 'Amex', 'PayPal', 'Apple Pay', 'Google Pay', 'iDEAL', 'Bancontact', 'SOFORT', '+190 more'].map((method, index) => (
                  <span key={index} className="hz-px-3 hz-py-1 hz-bg-raised hz-r-full hz-t-sm hz-fg-soft">
                    {method}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="hz-col hz-jc-between hz-bg-surface hz-bordered hz-r-lg hz-clip"
          >
            <div className="hz-p-5">
              <h3 className="hz-t-2xl hz-w-bold hz-mb-4">Checkout Interface</h3>
              <p className="hz-fg-muted hz-mb-5">
                Fully customizable checkout UI that matches your brand and maximizes conversions.
              </p>
              
              <div className="hz-card hz-mb-4">
                <div className="hz-bh-5 hz-bw-8 hz-bg-raised hz-r-md hz-mb-3"></div>
                <div className="hz-grid hz-grid-2 hz-gap-3 hz-mb-3">
                  <div className="hz-bh-6 hz-bg-raised hz-r-md"></div>
                  <div className="hz-bh-6 hz-bg-raised hz-r-md"></div>
                </div>
                <div className="hz-bh-6 hz-bg-raised hz-r-md hz-mb-3"></div>
                <div className="hz-bh-6 hz-bg-raised hz-r-md"></div>
              </div>
              
              <div className="hz-t-sm hz-fg-muted hz-mt-2 hz-align-center">Customizable checkout flow</div>
            </div>
          </motion.div>
        </div>

        <div className="hz-grid hz-grid-3 hz-gap-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0 }}
            className="hz-card"
          >
            <div className="hz-bg-raised hz-p-3 hz-r-full hz-w-fit hz-mb-4">
              <Globe className="hz-sq-4 hz-fg-muted" />
            </div>
            <h3 className="hz-t-xl hz-w-semibold hz-mb-3">Global Reach</h3>
            <p className="hz-fg-muted">
              Accept payments in 200+ countries and territories with localized experiences for each market.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hz-card"
          >
            <div className="hz-bg-raised hz-p-3 hz-r-full hz-w-fit hz-mb-4">
              <Smartphone className="hz-sq-4 hz-fg-muted" />
            </div>
            <h3 className="hz-t-xl hz-w-semibold hz-mb-3">Mobile Optimized</h3>
            <p className="hz-fg-muted">
              Responsive checkout flows designed for high conversion on all devices and screen sizes.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hz-card"
          >
            <div className="hz-bg-raised hz-p-3 hz-r-full hz-w-fit hz-mb-4">
              <Paintbrush className="hz-sq-4 hz-fg-muted" />
            </div>
            <h3 className="hz-t-xl hz-w-semibold hz-mb-3">Fully Customizable</h3>
            <p className="hz-fg-muted">
              Customize every aspect of the checkout experience to match your brand identity.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CheckoutExperience;
