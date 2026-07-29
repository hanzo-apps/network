import { BRAND } from '@/lib/brand';
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, MessageSquare } from "lucide-react";


const FinalCTASection = () => {
  return (
    <section className="hz-py-7 hz-px-4 hz-bg hz-rel hz-clip">
      {/* Background effects */}
      <div className="hz-abs hz-inset">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.2 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="hz-center-xy hz-abs hz-r-full"
          style={{
            background: `radial-gradient(circle, ${BRAND.fg} 0%, transparent 60%)`,
            filter: "blur(100px)",
          }}
        />
      </div>

      <div className="hz-container-narrow hz-rel hz-z-raised">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="hz-align-center"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="hz-t-4xl hz-w-medium hz-fg hz-mb-5"
          >
            Ship faster.{" "}
            <span className="hz-fg" >Keep control.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hz-container-narrow hz-mw-md hz-t-xl hz-fg-muted hz-mb-7"
          >
            The governed agent platform for shipping production software—fast, verifiable, and under your policies.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="hz-col-row hz-ai-center hz-jc-center hz-gap-4"
          >
            <Link
              to="/get-started"
              className="hz-btn hz-btn-ghost hz-btn-lg hz-btn-block hz-fg hz-transition hz-bg-inverse"
              >
              Start free
              <ArrowRight className="hz-sq-3 hz-ml-2" />
            </Link>

            <Link
              to="/contact"
              className="hz-btn hz-btn-ghost hz-btn-lg hz-btn-block hz-fg hz-transition"
            >
              <MessageSquare className="hz-sq-3 hz-mr-2" />
              Talk to sales
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTASection;
