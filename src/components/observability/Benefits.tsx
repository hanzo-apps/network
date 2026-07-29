
import React from "react";
import { motion } from "framer-motion";
import { 
  Zap, 
  Target, 
  Lightbulb, 
  BarChart4 
} from "lucide-react";

const benefits = [
  {
    icon: <Zap className="hz-sq-4 hz-fg-muted" />,
    title: "Precision Monitoring",
    description: "Identify exactly where and why issues occur in real-time."
  },
  {
    icon: <Target className="hz-sq-4 hz-fg-muted" />,
    title: "Faster Debugging",
    description: "Detailed traces and logs provide the clarity needed for rapid resolution."
  },
  {
    icon: <Lightbulb className="hz-sq-4 hz-fg-muted" />,
    title: "Optimized User Experiences",
    description: "Understand user behavior deeply, driving improvements that matter."
  },
  {
    icon: <BarChart4 className="hz-sq-4 hz-fg-muted" />,
    title: "Informed Decisions",
    description: "Reliable analytics and predictive insights empower smarter product and operational decisions."
  }
];

const Benefits = () => {
  return (
    <section className="hz-py-7 hz-px-4 hz-rel">
      <div className="hz-container-wide hz-rel hz-z-raised">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="hz-container-narrow hz-align-center hz-mb-7"
        >
          <h2 className="hz-t-3xl hz-w-bold hz-mb-5">Why Leading Teams Choose Hanzo Observability</h2>
        </motion.div>
        
        <div className="hz-grid hz-grid-4 hz-gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="hz-card"
            >
              <div className="hz-bg-raised hz-p-3 hz-r-lg hz-w-fit hz-mb-4">
                {benefit.icon}
              </div>
              <h3 className="hz-t-lg hz-w-bold hz-mb-3">{benefit.title}</h3>
              <p className="hz-fg-muted hz-t-sm">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="hz-mt-7 hz-align-center"
        >
          <div className="hz-p-4 hz-r-lg">
            <blockquote className="hz-container-narrow hz-mw-md hz-t-xl hz-italic hz-fg-soft">
              "Hanzo Observability has been critical to our AI operations, giving us unprecedented visibility into our models' performance and significantly improving our debugging time."
            </blockquote>
            <div className="hz-mt-4 hz-fg-muted">
              <div className="hz-w-medium">Alex Chen</div>
              <div className="hz-t-sm">AI Engineering Lead, Triller</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Benefits;
