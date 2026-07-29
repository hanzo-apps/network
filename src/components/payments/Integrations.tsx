
import React from "react";
import { motion } from "framer-motion";
import { Plug, Code, FileText } from "lucide-react";

const Integrations = () => {
  return (
    <section className="hz-py-7 hz-px-4">
      <div className="hz-container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="hz-align-center hz-mb-7"
        >
          <h2 className="hz-t-3xl hz-w-bold hz-mb-5">Powerful Integrations & APIs</h2>
          <p className="hz-container-narrow hz-t-xl hz-fg-soft">
            Connect Hanzo Payments to your existing systems with ease through powerful APIs and pre-built integrations.
          </p>
        </motion.div>

        <div className="hz-grid hz-grid-5 hz-gap-6 hz-mb-7">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="hz-card"
          >
            <div className="hz-bg-raised hz-p-3 hz-r-full hz-w-fit hz-mb-4">
              <Plug className="hz-sq-4 hz-fg-muted" />
            </div>
            <h3 className="hz-t-2xl hz-w-bold hz-mb-4">Pre-built Integrations</h3>
            <p className="hz-fg-muted hz-mb-5">
              Hundreds of pre-built integrations with popular services, including:
            </p>
            <div className="hz-grid hz-grid-3 hz-gap-3">
              {['Salesforce', 'Adobe', 'SAP', 'QuickBooks', 'Shopify', 'WooCommerce', 'Magento', 'WordPress', 'Squarespace', 'NetSuite', 'Xero', 'HubSpot'].map((integration, index) => (
                <div key={index} className="hz-py-2 hz-px-3 hz-bg-raised hz-r-md hz-t-sm hz-align-center hz-fg-soft">
                  {integration}
                </div>
              ))}
            </div>
            <p className="hz-fg-muted hz-mt-4 hz-t-sm hz-align-center">
              And many more via the Hanzo App Marketplace
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hz-bg-surface hz-bordered hz-r-lg hz-clip"
          >
            <div className="hz-p-5 hz-border-b">
              <h3 className="hz-t-2xl hz-w-bold hz-mb-2">Developer-First APIs</h3>
              <p className="hz-fg-muted">
                Comprehensive API and detailed developer documentation for custom integrations.
              </p>
            </div>
            <div className="hz-p-5 hz-bg-surface hz-mono hz-t-sm hz-scroll-y" style={{ maxHeight: '300px' }}>
              <pre className="hz-fg-soft">
{`// Create a payment intent
const paymentIntent = await hanzo.paymentIntents.create({
  amount: 2000,
  currency: 'usd',
  payment_method_types: ['card'],
  customer: customer.id,
  metadata: {
    order_id: '6735',
  },
});

// Handle the payment
const { paymentIntent: confirmed, error } = await hanzo.confirmPayment(
  clientSecret,
  {
    payment_method: {
      card: cardElement,
      billing_details: {
        name: 'Jenny Rosen',
      },
    },
  }
);`}
              </pre>
            </div>
            <div className="hz-p-4 hz-row hz-jc-between hz-ai-center hz-border-t">
              <span className="hz-t-sm hz-fg-muted">API Reference</span>
              <div className="hz-row hz-inline-2">
                <button className="hz-px-3 hz-py-1 hz-bg-raised hz-r-md hz-t-sm">Copy</button>
                <button className="hz-px-3 hz-py-1 hz-bg-raised hz-r-md hz-t-sm">Try it</button>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="hz-grid hz-grid-3 hz-gap-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="hz-card"
          >
            <div className="hz-bg-raised hz-p-3 hz-r-full hz-w-fit hz-mb-4">
              <Code className="hz-sq-4 hz-fg-muted" />
            </div>
            <h3 className="hz-t-xl hz-w-semibold hz-mb-3">Easy to Implement</h3>
            <p className="hz-fg-muted">
              Quick integration with just a few lines of code, with SDKs for all major programming languages.
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
              <FileText className="hz-sq-4 hz-fg-muted" />
            </div>
            <h3 className="hz-t-xl hz-w-semibold hz-mb-3">Comprehensive Documentation</h3>
            <p className="hz-fg-muted">
              Detailed guides, API reference, and code examples to help you integrate Hanzo Payments quickly.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hz-card hz-col hz-jc-between"
          >
            <div>
              <h3 className="hz-t-xl hz-w-semibold hz-mb-3">Explore Our APIs</h3>
              <p className="hz-fg-muted hz-mb-4">
                Get started with quickstart guides, examples, and developer tools.
              </p>
            </div>
            <button className="hz-w-full hz-py-2 hz-bg-raised hz-r-md hz-transition hz-hoverable">
              API Reference
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Integrations;
