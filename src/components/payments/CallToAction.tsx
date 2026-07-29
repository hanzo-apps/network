
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FileText, BookOpen, MessageSquare, ExternalLink } from "lucide-react";

const CallToAction = () => {
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
          <h2 className="hz-t-3xl hz-w-bold hz-mb-5">Explore Further</h2>
          <p className="hz-container-narrow hz-t-xl hz-fg-soft">
            Discover how Hanzo Payments can transform your business with our comprehensive resources.
          </p>
        </motion.div>

        <div className="hz-grid hz-grid-4 hz-gap-5 hz-mb-7">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0 }}
            className="hz-card hz-col"
          >
            <div className="hz-bg-raised hz-p-3 hz-r-full hz-w-fit hz-mb-4">
              <FileText className="hz-sq-4 hz-fg-muted" />
            </div>
            <h3 className="hz-t-xl hz-w-semibold hz-mb-3">API Reference</h3>
            <p className="hz-fg-muted hz-mb-5 hz-grow">
              Detailed documentation on all Hanzo Payments APIs and integration options.
            </p>
            <Button variant="outline" className="hz-w-full hz-jc-center hz-gap-2 hz-fg hz-hoverable">
              <ExternalLink className="hz-sq-2" />
              <span>View API Docs</span>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hz-card hz-col"
          >
            <div className="hz-bg-raised hz-p-3 hz-r-full hz-w-fit hz-mb-4">
              <BookOpen className="hz-sq-4 hz-fg-muted" />
            </div>
            <h3 className="hz-t-xl hz-w-semibold hz-mb-3">Hanzo App Marketplace</h3>
            <p className="hz-fg-muted hz-mb-5 hz-grow">
              Explore hundreds of pre-built integrations and apps for Hanzo Payments.
            </p>
            <Button variant="outline" className="hz-w-full hz-jc-center hz-gap-2 hz-fg hz-hoverable">
              <ExternalLink className="hz-sq-2" />
              <span>Browse Apps</span>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hz-card hz-col"
          >
            <div className="hz-bg-raised hz-p-3 hz-r-full hz-w-fit hz-mb-4">
              <MessageSquare className="hz-sq-4 hz-fg-muted" />
            </div>
            <h3 className="hz-t-xl hz-w-semibold hz-mb-3">Checkout Integration</h3>
            <p className="hz-fg-muted hz-mb-5 hz-grow">
              Step-by-step guide to integrating Hanzo Payments checkout into your website or app.
            </p>
            <Button variant="outline" className="hz-w-full hz-jc-center hz-gap-2 hz-fg hz-hoverable">
              <ExternalLink className="hz-sq-2" />
              <span>Integration Guide</span>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="hz-card hz-col"
          >
            <div className="hz-bg-raised hz-p-3 hz-r-full hz-w-fit hz-mb-4">
              <BookOpen className="hz-sq-4 hz-fg-muted" />
            </div>
            <h3 className="hz-t-xl hz-w-semibold hz-mb-3">Case Studies</h3>
            <p className="hz-fg-muted hz-mb-5 hz-grow">
              Read success stories from businesses using Hanzo Payments around the world.
            </p>
            <Button variant="outline" className="hz-w-full hz-jc-center hz-gap-2 hz-fg hz-hoverable">
              <ExternalLink className="hz-sq-2" />
              <span>View Case Studies</span>
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="hz-card hz-align-center"
        >
          <h2 className="hz-t-3xl hz-w-bold hz-mb-4">Start Building Your Financial Future Today</h2>
          <p className="hz-container-narrow hz-t-xl hz-fg-soft hz-mb-6">
            Hanzo Payments helps your team streamline operations, grow faster, and simplify financial complexity.
          </p>
          <div className="hz-row hz-wrap hz-jc-center hz-gap-4">
            <Button 
              size="lg" 
              className=""
            >
              Get Started Now
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="hz-border-strong hz-fg hz-hoverable"
            >
              Contact Sales
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;
