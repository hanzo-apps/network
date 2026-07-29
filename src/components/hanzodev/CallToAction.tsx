import { BRAND } from '@/lib/brand';
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";


const CallToAction = () => {
  return (
    <section className="hz-py-7 hz-px-4 hz-bg hz-rel hz-clip">
      {/* Background gradient */}
      <div
        className="hz-center-xy hz-abs hz-r-full hz-dim-more"
        style={{
          background: `radial-gradient(circle, ${BRAND.fg} 0%, transparent 70%)`,
          filter: "blur(100px)",
        }}
      />

      <div className="hz-container-narrow hz-rel hz-z-raised">
        <motion.div
          className="hz-align-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="hz-t-3xl hz-w-bold hz-mb-4 hz-fg">
            Create what's exciting.
            <br />
            <span className="hz-fg" >Maintain what's essential.</span>
          </h2>

          <p className="hz-container-narrow hz-mw-md hz-t-xl hz-fg-muted hz-mb-6">
            Use Hanzo Dev where you work
          </p>

          <div className="hz-col-row hz-jc-center hz-gap-4 hz-mb-7">
            <Button
              size="lg"
              className="hz-fg hz-t-lg hz-px-6 hz-bg-inverse"
              asChild
            >
              <Link to="/signup">
                Get Started
                <ArrowRight className="hz-sq-3 hz-ml-2" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="hz-t-lg hz-px-6 hz-hoverable"
              asChild
            >
              <a href="https://docs.hanzo.ai/dev" target="_blank" rel="noopener noreferrer">
                Read the documentation
              </a>
            </Button>
          </div>

          {/* Newsletter signup */}
          <div className="hz-border-t hz-pt-6">
            <h3 className="hz-t-xl hz-w-semibold hz-fg hz-mb-2">
              Get the developer newsletter
            </h3>
            <p className="hz-container-narrow hz-mw-sm hz-fg-muted hz-t-sm hz-mb-5">
              Product updates, how-tos, community spotlights, and more. Delivered monthly to your inbox.
            </p>
            <div className="hz-col-row hz-container-narrow hz-mw-sm hz-gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="hz-grow hz-px-4 hz-py-3 hz-bg-surface hz-bordered hz-r-lg hz-fg"
              />
              <Button
                className="hz-fg hz-px-5 hz-bg-inverse"
                >
                <Mail className="hz-sq-2 hz-mr-2" />
                Subscribe
              </Button>
            </div>
            <p className="hz-t-xs hz-fg-muted hz-mt-4">
              Please provide your email address if you'd like to receive our monthly developer newsletter.
              You can unsubscribe at any time.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;
