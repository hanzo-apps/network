
import React from "react";
import { motion } from "framer-motion";
import { Laptop, Server, Cloud, Workflow } from "lucide-react";
import { Button } from "@/components/ui/button";

const DeploymentOptions = () => {
  const deploymentOptions = [
    {
      icon: Laptop,
      title: "Hanzo Vector Lite",
      description: "Lightweight vector database-as-a-library that runs directly in your application.",
      features: [
        "Instant setup with pip/npm install",
        "Perfect for prototyping and development",
        "No external dependencies or services",
        "Up to 1M vectors on a single machine"
      ],
      cta: "Get Started",
      color: "blue"
    },
    {
      icon: Server,
      title: "Hanzo Vector Server",
      description: "Self-hosted, production-ready vector database for single-machine deployment.",
      features: [
        "Complete feature set in standalone mode",
        "Ideal for up to 100M vectors",
        "Docker & Kubernetes deployment options",
        "Simple configuration and management"
      ],
      cta: "Deploy Now",
      color: "indigo"
    },
    {
      icon: Workflow,
      title: "Hanzo Vector Cluster",
      description: "Distributed, horizontally scalable deployment for massive vector collections.",
      features: [
        "Scale to billions of vectors with minimal latency",
        "Horizontal scaling across multiple nodes",
        "Advanced cluster management tools",
        "High availability and fault tolerance"
      ],
      cta: "Learn More",
      color: "purple"
    },
    {
      icon: Cloud,
      title: "Hanzo Vector Cloud",
      description: "Fully-managed vector database service with zero operational overhead.",
      features: [
        "Pay-as-you-go serverless option",
        "Dedicated clusters for enterprise needs",
        "10x faster than self-hosted solutions",
        "99.99% uptime SLA and global availability"
      ],
      cta: "Try Free",
      color: "teal"
    }
  ];

  /* Four hue names that all resolved to the same greyscale — @hanzo/design
     ships no accent. What varies is emphasis, so that is all this returns. */
  const getColorClasses = (_color: string, isHovered: boolean = false) => ({
    bg: isHovered ? 'hz-bg-raised' : 'hz-bg-surface',
    text: 'hz-fg-muted',
    border: isHovered ? 'hz-border-strong' : '',
  });

  return (
    <section className="hz-py-7 hz-px-4 hz-bg-surface hz-rel hz-clip">
      <div className="hz-container hz-rel hz-z-raised">
        <div className="hz-container-narrow hz-align-center hz-mb-7">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="hz-t-3xl hz-w-bold hz-fg hz-mb-5">
              Deployment Options to Match Your Journey
            </h2>
            <p className="hz-t-xl hz-fg-soft">
              From local development to global-scale production, Hanzo Vector offers flexible deployment options to fit your needs.
            </p>
          </motion.div>
        </div>

        <div className="hz-grid hz-grid-4 hz-gap-6">
          {deploymentOptions.map((option, index) => {
            const { bg, text, border } = getColorClasses(option.color);
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`${bg} hz-bordered ${border} hz-r-lg hz-p-5 hz-col hz-h-full hz-transition`}
              >
                <div className={`hz-sq-7 hz-r-lg ${bg} hz-row hz-ai-center hz-jc-center hz-mb-4`}>
                  <option.icon className={`hz-sq-4 ${text}`} />
                </div>
                <h3 className="hz-t-xl hz-w-bold hz-fg hz-mb-2">{option.title}</h3>
                <p className="hz-fg-soft hz-mb-5">{option.description}</p>
                
                <ul className="hz-stack-2 hz-mb-6 hz-grow">
                  {option.features.map((feature, fIndex) => (
                    <li key={fIndex} className="hz-row hz-ai-start">
                      <span className={`hz-mr-2 ${text}`}>•</span>
                      <span className="hz-fg-muted hz-t-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button variant="outline" className={`hz-mt-auto ${text} hz-hoverable`}>
                  {option.cta}
                </Button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DeploymentOptions;
