
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const HanzoAppEnterprise = () => {
  return (
    <section className="hz-py-7 hz-px-4 hz-bg-surface">
      <div className="hz-container-narrow hz-align-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="hz-t-3xl hz-w-bold hz-mb-4">Enterprise</h2>
          <p className="hz-t-xl hz-fg-soft hz-mb-6">
            Looking for specific use cases and support?
          </p>
          <Button 
            size="lg"
            className="hz-bg-raised hz-fg hz-px-6 hz-hoverable"
          >
            Let's Chat
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default HanzoAppEnterprise;
