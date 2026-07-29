
import React from "react";
import { motion } from "framer-motion";
import { 
  History, 
  BarChart, 
  MessageSquare, 
  Sparkles, 
  FileBadge,
  Database, 
  Users,
  AlertTriangle
} from "lucide-react";

const features = [
  {
    icon: <History className="hz-sq-5 hz-fg-muted" />,
    title: "Tracing and Logging",
    description: "End-to-end traces for rapid debugging, detailed logs for every inference request."
  },
  {
    icon: <BarChart className="hz-sq-5 hz-fg-muted" />,
    title: "Real-time Metrics",
    description: "Instant visibility into system health, latency, throughput, and cost efficiency."
  },
  {
    icon: <MessageSquare className="hz-sq-5 hz-fg-muted" />,
    title: "Prompt Management",
    description: "Collaboratively version, test, and deploy prompts with low-latency retrieval."
  },
  {
    icon: <Sparkles className="hz-sq-5 hz-fg-muted" />,
    title: "Playground",
    description: "Experiment rapidly with different prompts and models directly in the Hanzo interface."
  },
  {
    icon: <FileBadge className="hz-sq-5 hz-fg-muted" />,
    title: "Evaluation & Feedback",
    description: "Collect, annotate, and systematically evaluate model outputs and user feedback."
  },
  {
    icon: <Database className="hz-sq-5 hz-fg-muted" />,
    title: "Datasets",
    description: "Generate robust datasets from live production data to enhance model training and evaluation."
  },
  {
    icon: <Users className="hz-sq-5 hz-fg-muted" />,
    title: "User Journey Analytics",
    description: "Visualize and optimize user paths, retention rates, and conversion funnels."
  },
  {
    icon: <AlertTriangle className="hz-sq-5 hz-fg-muted" />,
    title: "Predictive Analytics",
    description: "AI-driven anomaly detection and predictive alerts prevent downtime and performance degradation."
  }
];

const Features = () => {
  return (
    <section className="hz-py-7 hz-px-4 hz-rel">
      <div className="hz-abs hz-inset hz-bg-surface"></div>
      
      <div className="hz-container-wide hz-rel hz-z-raised">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="hz-container-narrow hz-align-center hz-mb-7"
        >
          <h2 className="hz-t-3xl hz-w-bold hz-mb-5">Complete Observability for Your AI Stack</h2>
          <p className="hz-t-xl hz-fg-soft">
            Hanzo Observability equips your team with powerful tools for real-time monitoring, comprehensive tracing, and actionable insights.
          </p>
        </motion.div>
        
        <div className="hz-grid hz-grid-4 hz-gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="hz-card hz-transition hz-card-interactive"
            >
              <div className="hz-bg-raised hz-p-3 hz-r-lg hz-w-fit hz-mb-4">
                {feature.icon}
              </div>
              <h3 className="hz-t-xl hz-w-bold hz-mb-3">{feature.title}</h3>
              <p className="hz-fg-muted">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
