import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Github, Terminal, Cloud, Database, RefreshCw, Globe, Server, Code2, Lock, Box, Network } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    title: "Local Development",
    description: "Run the entire Hanzo stack locally with a single command",
    details: "Hanzo Platform brings the cloud to your machine, enabling you to develop with the same tools and services you'll use in production, all running locally.",
    icon: Terminal,
    replaces: ["docker-compose", "minikube", "kind", "vagrant"]
  },
  {
    title: "Open Source Infrastructure",
    description: "All the components you need to build AI applications, completely open source",
    details: "From local vector databases to inference engines, we've packaged everything you need to build and test AI applications without any cloud dependencies.",
    icon: Github,
    replaces: ["proprietary AI services", "closed APIs", "vendor lock-in"]
  },
  {
    title: "Seamless Cloud Transition",
    description: "Develop locally, deploy to Hanzo Cloud when you're ready",
    details: "The same configuration that runs your local Platform can be used to deploy to Hanzo Cloud with zero changes, giving you flexibility and scalability.",
    icon: Cloud,
    replaces: ["configuration drift", "environment differences", "deployment headaches"]
  },
  {
    title: "AI Development Toolkit",
    description: "Complete suite of AI tools for local model inference, fine-tuning, and testing",
    details: "Hanzo Platform includes optimized local LLM runners, vector search capabilities, and prompt engineering tools that work offline.",
    icon: Box,
    replaces: ["cloud-dependent AI development", "slow feedback loops", "costly experimentation"]
  },
  {
    title: "Community-Driven",
    description: "Built and maintained by a thriving open source community",
    details: "Join thousands of developers contributing to making AI development more accessible, open, and ethical through our permissively licensed platform.",
    icon: Globe,
    replaces: ["closed ecosystems", "walled gardens", "proprietary platforms"]
  }
];

const Features = () => {
  return (
    <section className="hz-py-7 hz-px-4 hz-bg">
      <div className="hz-container">
        <div className="hz-align-center hz-mb-7">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="hz-t-3xl hz-w-bold hz-mb-4"
          >
            Freedom to Build, Power to Deploy
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hz-container-narrow hz-t-xl hz-fg-soft"
          >
            Everything you love about Hanzo Cloud, available as free and open source software you can run anywhere.
          </motion.p>
        </div>
        
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`hz-mb-7 hz-col ${index % 2 === 0 ? '' : ''} hz-gap-6 hz-ai-center`}
          >
            <div className="hz-w-full">
              <div className="hz-row hz-ai-center hz-mb-4">
                <div className="hz-sq-7 hz-r-lg hz-row hz-ai-center hz-jc-center hz-bg-raised hz-fg-muted hz-mr-4">
                  <feature.icon className="hz-sq-4" />
                </div>
                <h2 className="hz-t-3xl hz-w-bold">{feature.title}</h2>
              </div>
              <p className="hz-t-xl hz-fg-soft hz-mb-4">{feature.description}</p>
              <p className="hz-fg-muted hz-mb-5">{feature.details}</p>
              
              <a href="#learn-more" className="hz-inline hz-ai-center hz-fg-muted hz-transition hz-link">
                Learn More <ArrowRight className="hz-sq-2 hz-ml-2" />
              </a>
              
              <div className="hz-mt-6">
                <p className="hz-t-sm hz-fg-muted hz-mb-2">Replaces</p>
                <div className="hz-row hz-wrap hz-gap-4">
                  {feature.replaces.map((replace, i) => (
                    <span key={i} className="hz-px-3 hz-py-1 hz-bg-raised hz-r-full hz-t-xs hz-fg-muted">
                      {replace}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="hz-w-full hz-bg-surface hz-r-lg hz-clip hz-bordered">
              <div className="hz-p-6 hz-row hz-ai-center hz-jc-center">
                <feature.icon className="hz-sq-8 hz-fg-muted" />
              </div>
            </div>
          </motion.div>
        ))}
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="hz-card"
        >
          <div className="hz-grid hz-grid-3 hz-gap-6">
            <div className="hz-stack-4">
              <Code2 className="hz-sq-6 hz-fg-muted" />
              <h3 className="hz-t-xl hz-w-bold">MIT Licensed</h3>
              <p className="hz-fg-muted">Fork it, modify it, use it commercially. We believe in true open source.</p>
            </div>
            
            <div className="hz-stack-4">
              <Lock className="hz-sq-6 hz-fg-muted" />
              <h3 className="hz-t-xl hz-w-bold">Data Sovereignty</h3>
              <p className="hz-fg-muted">Keep your code, data, and models on your infrastructure. No vendor lock-in.</p>
            </div>
            
            <div className="hz-stack-4">
              <Network className="hz-sq-6 hz-fg-muted" />
              <h3 className="hz-t-xl hz-w-bold">Enterprise Ready</h3>
              <p className="hz-fg-muted">Scale from a laptop to a data center with enterprise support available.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
