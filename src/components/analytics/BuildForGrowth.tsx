
import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, Users, CreditCard, ArrowRight } from "lucide-react";

const BuildForGrowth = () => {
  return (
    <section className="hz-py-7 hz-px-4">
      <div className="hz-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="hz-container-narrow hz-align-center hz-mb-7"
        >
          <h2 className="hz-t-3xl hz-w-bold hz-mb-5">Built for Growth</h2>
          <p className="hz-t-xl hz-fg-soft">
            Optimize user journeys and boost your conversions by understanding every interaction from entry point to checkout.
          </p>
        </motion.div>
        
        <div className="hz-grid hz-grid-3 hz-gap-6">
          {[
            {
              icon: <TrendingUp className="hz-sq-5 hz-fg-muted" />,
              title: "Conversion Optimization",
              description: "Identify and fix bottlenecks in your user journey to improve conversion rates.",
              metrics: "+27% average increase in conversions"
            },
            {
              icon: <Users className="hz-sq-5 hz-fg-muted" />,
              title: "Audience Insights",
              description: "Understand your users better with detailed demographics and behavior analysis.",
              metrics: "15M+ user profiles analyzed daily"
            },
            {
              icon: <CreditCard className="hz-sq-5 hz-fg-muted" />,
              title: "Revenue Impact",
              description: "See the direct financial impact of your optimization efforts in real-time.",
              metrics: "$1.2B+ in tracked revenue"
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="hz-card"
            >
              <div className="hz-mb-4">{item.icon}</div>
              <h3 className="hz-t-xl hz-w-bold hz-mb-3">{item.title}</h3>
              <p className="hz-fg-muted hz-mb-4">{item.description}</p>
              <div className="hz-t-sm hz-w-medium hz-px-3 hz-py-1 hz-bg-raised hz-r-full hz-fg-soft">
                {item.metrics}
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="hz-mt-7 hz-align-center"
        >
          <a href="#learn-more" className="hz-inline hz-ai-center hz-fg-muted hz-transition hz-link">
            Learn how our customers achieved growth <ArrowRight className="hz-sq-2 hz-ml-2" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default BuildForGrowth;
