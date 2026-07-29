
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const CallToAction = () => {
  return (
    <section className="hz-container-narrow hz-mb-7">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="hz-card hz-glass hz-align-center"
      >
        <h2 className="hz-t-3xl hz-w-medium hz-mb-5 hz-fg">
          Start building today
        </h2>
        <p className="hz-container-narrow hz-mw-md hz-fg-muted hz-mb-6 hz-leading-relaxed">
          Join thousands of developers who are creating the next generation of applications on our platform.
        </p>
        <Button 
          size="lg" 
          className="hz-bh-7 hz-px-6 hz-bg-inverse hz-fg-inverse hz-transition hz-hoverable"
        >
          Deploy your first project <ArrowRight className="hz-sq-2 hz-ml-2" />
        </Button>
      </motion.div>
    </section>
  );
};

export default CallToAction;
