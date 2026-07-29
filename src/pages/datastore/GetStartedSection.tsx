import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Terminal, Download } from "lucide-react";
import ChromeText from "@/components/ui/chrome-text";

const GetStartedSection = () => {
  return (
    <section className="hz-py-7 hz-px-4">
      <div className="hz-container-wide hz-align-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <ChromeText as="h2" className="hz-t-3xl hz-w-bold hz-mb-5">
            Start Using Datastore in Minutes
          </ChromeText>
          <p className="hz-container-narrow hz-t-lg hz-fg-soft hz-mb-7">
            Get up and running quickly with multiple installation options for MacOS, Linux, Windows, FreeBSD, and Docker.
          </p>

          <div className="hz-col hz-ai-center hz-jc-center hz-stack-6 hz-mb-7">
            <div className="hz-card hz-w-full hz-mw-md">
              <div className="hz-row hz-ai-center hz-mb-3">
                <Terminal className="hz-sq-3 hz-fg-muted hz-mr-2" />
                <span className="hz-t-sm hz-fg-muted">Installation Command</span>
              </div>
              <div className="hz-mono hz-t-lg hz-bg-surface hz-p-4 hz-r-lg hz-fg hz-scroll-x">
                curl https://datastore.hanzo.ai/ | sh
              </div>
            </div>

            <div className="hz-row hz-wrap hz-jc-center hz-gap-5">
              <Button
                size="lg"
                className="hz-btn hz-btn-lg hz-fg hz-shadow-lg hz-transition"
              >
                <Download className="hz-sq-3 hz-mr-2" />
                Download
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="hz-btn hz-btn-primary hz-btn-lg hz-fg hz-transition"
              >
                <Code className="hz-sq-3 hz-mr-2" />
                View Docs
              </Button>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <Button
              size="lg"
              className="hz-fg hz-px-6 hz-py-5 hz-r-lg hz-t-lg hz-w-medium hz-shadow-lg hz-transition"
            >
              Deploy Now <ArrowRight className="hz-sq-3 hz-ml-2" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default GetStartedSection;
