
import React from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ChromeText from "@/components/ui/chrome-text";

const MainCards: React.FC = () => {
  return (
    <div className="hz-grid hz-grid-2 hz-gap-6 hz-mb-7">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
        className="hz-r-xl hz-bordered hz-border-strong hz-clip"
      >
        <div className="hz-bh-8 hz-row hz-ai-center hz-jc-center">
          <ChromeText as="h2" className="hz-t-3xl hz-w-bold">
            Capabilities
          </ChromeText>
        </div>
        <div className="hz-p-6">
          <p className="hz-fg-soft hz-mb-5">
            Discover our comprehensive suite of technical capabilities that empower your organization to innovate
            and transform. From AI and cloud infrastructure to custom development solutions, we provide everything
            you need to stay ahead.
          </p>
          <div className="hz-row hz-wrap hz-gap-3 hz-mb-6">
            <span className="hz-px-3 hz-py-1 hz-bg-raised hz-r-full hz-t-sm hz-fg-soft hz-bordered hz-border-strong">
              AI Engineering
            </span>
            <span className="hz-px-3 hz-py-1 hz-bg-raised hz-r-full hz-t-sm hz-fg-soft hz-bordered hz-border-strong">
              Cloud Infrastructure
            </span>
            <span className="hz-px-3 hz-py-1 hz-bg-raised hz-r-full hz-t-sm hz-fg-soft hz-bordered hz-border-strong">
              Data Analytics
            </span>
            <span className="hz-px-3 hz-py-1 hz-bg-raised hz-r-full hz-t-sm hz-fg-soft hz-bordered hz-border-strong">
              Digital Experiences
            </span>
          </div>
          <Button asChild className="hz-w-full hz-bg-raised hz-hoverable">
            <Link to="/solutions/capabilities">
              Explore Our Capabilities <ChevronRight className="hz-sq-3 hz-ml-2" />
            </Link>
          </Button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="hz-r-xl hz-bordered hz-border-strong hz-clip"
      >
        <div className="hz-bh-8 hz-row hz-ai-center hz-jc-center">
          <ChromeText as="h2" className="hz-t-3xl hz-w-bold">
            Industries
          </ChromeText>
        </div>
        <div className="hz-p-6">
          <p className="hz-fg-soft hz-mb-5">
            Our industry-specific expertise helps organizations across sectors overcome unique challenges and seize
            opportunities. We combine deep domain knowledge with cutting-edge technology to deliver tailored
            solutions for your business.
          </p>
          <div className="hz-row hz-wrap hz-gap-3 hz-mb-6">
            <span className="hz-px-3 hz-py-1 hz-bg-raised hz-r-full hz-t-sm hz-fg-soft hz-bordered hz-border-strong">
              Financial Services
            </span>
            <span className="hz-px-3 hz-py-1 hz-bg-raised hz-r-full hz-t-sm hz-fg-soft hz-bordered hz-border-strong">
              Healthcare
            </span>
            <span className="hz-px-3 hz-py-1 hz-bg-raised hz-r-full hz-t-sm hz-fg-soft hz-bordered hz-border-strong">
              Retail
            </span>
            <span className="hz-px-3 hz-py-1 hz-bg-raised hz-r-full hz-t-sm hz-fg-soft hz-bordered hz-border-strong">
              Technology
            </span>
          </div>
          <Button asChild className="hz-w-full hz-bg-raised hz-hoverable">
            <Link to="/solutions/industries">
              Explore Our Industry Solutions <ChevronRight className="hz-sq-3 hz-ml-2" />
            </Link>
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default MainCards;
