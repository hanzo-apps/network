
import React from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Repeat, LayoutGrid, CreditCard } from "lucide-react";

const useCases = [
  {
    icon: <ShoppingCart className="hz-sq-4 hz-fg-muted" />,
    title: "Ecommerce",
    description: "Sell directly to consumers worldwide with optimized, secure checkout experiences."
  },
  {
    icon: <Repeat className="hz-sq-4 hz-fg-muted" />,
    title: "SaaS & Subscription",
    description: "Automate recurring billing and manage complex pricing tiers."
  },
  {
    icon: <LayoutGrid className="hz-sq-4 hz-fg-muted" />,
    title: "Marketplaces",
    description: "Integrate multi-party payments and payouts for buyers and sellers."
  },
  {
    icon: <CreditCard className="hz-sq-4 hz-fg-muted" />,
    title: "Embedded Finance",
    description: "Seamlessly embed financial services into your product, from cards to loans."
  }
];

const UseCases = () => {
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
          <h2 className="hz-t-3xl hz-w-bold hz-mb-5">Use Cases</h2>
          <p className="hz-container-narrow hz-t-xl hz-fg-soft">
            Hanzo Payments powers diverse business models across industries with flexible, scalable solutions.
          </p>
        </motion.div>

        <div className="hz-grid hz-grid-2 hz-gap-6">
          {useCases.map((useCase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="hz-card"
            >
              <div className="hz-bg-raised hz-p-3 hz-r-full hz-w-fit hz-mb-4">
                {useCase.icon}
              </div>
              <h3 className="hz-t-xl hz-w-semibold hz-mb-3">{useCase.title}</h3>
              <p className="hz-fg-muted hz-mb-4">{useCase.description}</p>
              
              <div className="hz-mt-5 hz-pt-6 hz-border-t">
                <h4 className="hz-t-lg hz-w-medium hz-mb-3">Key Features</h4>
                <div className="hz-grid hz-grid-2 hz-gap-3">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="hz-row hz-ai-center hz-gap-2">
                      <div className="hz-sq-1 hz-r-full hz-bg-raised"></div>
                      <span className="hz-t-sm hz-fg-muted">
                        {index === 0 && ['Optimized checkout', 'Global shipping', 'Inventory sync', 'Tax compliance'][i]}
                        {index === 1 && ['Recurring billing', 'Trials & coupons', 'Revenue recovery', 'Usage metering'][i]}
                        {index === 2 && ['Split payments', 'Escrow', 'KYC verification', 'Seller onboarding'][i]} 
                        {index === 3 && ['Card issuing', 'Lending', 'Account connectivity', 'Balance management'][i]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="hz-card hz-mt-7 hz-align-center"
        >
          <h3 className="hz-t-2xl hz-w-bold hz-mb-4">Start Quickly, Scale Instantly</h3>
          <p className="hz-container-narrow hz-mw-md hz-fg-soft hz-mb-5">
            No-code solutions available, with setup completed in minutes. Scalable from startup to enterprise-level with consistent reliability.
          </p>
          <div className="hz-row hz-wrap hz-jc-center hz-gap-4">
            <button className="hz-px-5 hz-py-3 hz-bg-raised hz-r-md hz-transition hz-hoverable">
              Get Started
            </button>
            <button className="hz-px-5 hz-py-3 hz-bg-none hz-bordered hz-border-strong hz-r-md hz-transition hz-hoverable">
              View Documentation
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default UseCases;
