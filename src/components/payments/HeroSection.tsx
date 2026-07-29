
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CreditCard, Lock, Globe, Zap } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="hz-pt-6 hz-pb-6 hz-px-4">
      <div className="hz-container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="hz-align-center hz-mb-6"
        >
          <span className="hz-px-4 hz-py-1 hz-r-full hz-bg-raised hz-bordered hz-border-strong hz-fg-soft hz-t-sm hz-w-medium hz-mb-4">
            Integrated Global Payments Platform
          </span>
          <h1 className="hz-t-4xl hz-w-bold hz-chrome hz-mb-5">
            Hanzo Payments
          </h1>
          <p className="hz-container-narrow hz-t-xl hz-fg-soft hz-mb-6">
            Effortlessly accept payments, manage subscriptions, and scale globally.
          </p>
          <p className="hz-container-narrow hz-fg-soft hz-mb-6">
            Hanzo Payments is a unified financial infrastructure that simplifies and automates payments, 
            subscriptions, and global financial compliance. From innovative startups to enterprise giants, 
            Hanzo Payments delivers customizable checkout experiences, seamless integrations, and powerful 
            analytics to drive revenue growth.
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
              Explore APIs
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="hz-grid hz-grid-4 hz-gap-5 hz-mt-7"
        >
          {[
            { icon: <CreditCard className="hz-sq-4 hz-fg-muted" />, title: "200+ Currencies", text: "Accept payments in local currencies worldwide" },
            { icon: <Lock className="hz-sq-4 hz-fg-muted" />, title: "Automatic Compliance", text: "Global tax and regulatory compliance built-in" },
            { icon: <Globe className="hz-sq-4 hz-fg-muted" />, title: "Global Reach", text: "Scale your business to new markets instantly" },
            { icon: <Zap className="hz-sq-4 hz-fg-muted" />, title: "Instant Setup", text: "Go live with payments in minutes" }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="hz-card"
            >
              <div className="hz-bg-raised hz-p-3 hz-r-full hz-w-fit hz-mb-4">
                {item.icon}
              </div>
              <h3 className="hz-t-lg hz-w-semibold hz-mb-2">{item.title}</h3>
              <p className="hz-fg-muted">{item.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
