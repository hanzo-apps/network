
import React from "react";
import { motion } from "framer-motion";
import { Scale, Zap, Code, Users } from "lucide-react";

const ScalabilitySection = () => {
  const features = [
    {
      icon: Scale,
      title: "Scale as needed",
      description: "Scale elastically to support tens of billions of vectors with a fully distributed architecture."
    },
    {
      icon: Zap,
      title: "Blazing fast",
      description: "Retrieve data quickly and accurately with optimized indexing, regardless of scale."
    },
    {
      icon: Code,
      title: "Reusable Code",
      description: "Write once, and deploy with one line of code into the production environment."
    },
    {
      icon: Users,
      title: "Supportive Community",
      description: "Fan-favorite vector database with extensive resources and supportive contributors."
    }
  ];

  return (
    <section className="hz-py-7 hz-px-4">
      <div className="hz-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="hz-align-center hz-mb-7"
        >
          <h2 className="hz-t-3xl hz-w-bold hz-fg hz-mb-5">
            Why Developers Prefer Hanzo Vector
          </h2>
          <p className="hz-container-narrow hz-t-xl hz-fg-soft">
            The preferred choice for vector database needs from prototype to production
          </p>
        </motion.div>
        
        <div className="hz-grid hz-grid-4 hz-gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="hz-card hz-transition hz-card-interactive"
            >
              <feature.icon className="hz-sq-6 hz-fg-muted hz-mb-5" />
              <h3 className="hz-t-xl hz-w-semibold hz-fg hz-mb-3">{feature.title}</h3>
              <p className="hz-fg-muted">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ScalabilitySection;
