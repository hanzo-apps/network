
import React from "react";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";

const HanzoAppUseCases = () => {
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
          <h2 className="hz-t-3xl hz-w-bold hz-mb-4">Use Cases</h2>
          <p className="hz-t-xl hz-fg-soft">
            One platform, endless possibilities. See some of the use cases
          </p>
        </motion.div>
        
        <div className="hz-grid hz-grid-3 hz-gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="hz-card hz-h-full"
          >
            <div className="hz-sq-7 hz-r-lg hz-bg-raised hz-row hz-ai-center hz-jc-center hz-mb-5">
              <ShoppingCart className="hz-sq-5 hz-fg-muted" />
            </div>
            <h3 className="hz-t-2xl hz-w-semibold hz-mb-4">ProductCatalog</h3>
            <p className="hz-fg-soft">
              Product catalog chatbot to answer any questions related to the products
            </p>
          </motion.div>
          
          {/* More use cases would go here */}
        </div>
      </div>
    </section>
  );
};

export default HanzoAppUseCases;
