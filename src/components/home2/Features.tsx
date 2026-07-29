
import React from "react";
import { motion } from "framer-motion";
import { Terminal, Zap, Shield, Bot } from "lucide-react";

const features = [
  {
    icon: <Terminal className="hz-sq-4" />,
    title: "Developer-First",
    description: "Built by developers, for developers. Simple APIs with complete flexibility."
  },
  {
    icon: <Zap className="hz-sq-4" />,
    title: "Lightning Fast",
    description: "Optimized inference with custom routing and advanced caching."
  },
  {
    icon: <Shield className="hz-sq-4" />,
    title: "Enterprise Ready",
    description: "SOC 2, GDPR, and HIPAA compliant with 99.9% uptime SLA."
  },
  {
    icon: <Bot className="hz-sq-4" />,
    title: "Model Flexibility",
    description: "Use any model from OpenAI, Anthropic, or bring your own models."
  }
];

const Features = () => {
  return (
    <section className="hz-py-7 hz-rel">
      <div className="hz-container hz-mx-auto hz-px-4">
        <div className="hz-align-center hz-mb-7">
          <h2 className="hz-t-3xl hz-w-bold hz-mb-4">
            Everything You Need for AI Engineering
          </h2>
          <p className="hz-container-narrow hz-t-xl hz-fg-soft">
            A complete platform to build, deploy, and scale AI applications
          </p>
        </div>
        
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
              <div className="hz-sq-7 hz-r-lg hz-bg-raised hz-row hz-ai-center hz-jc-center hz-mb-4">
                {feature.icon}
              </div>
              <h3 className="hz-t-xl hz-w-bold hz-mb-2">{feature.title}</h3>
              <p className="hz-fg-muted">{feature.description}</p>
            </motion.div>
          ))}
        </div>
        
        <div className="hz-container-wide hz-card hz-mt-7">
          <div className="hz-col-row hz-ai-center">
            <div className="hz-grow hz-mb-6">
              <h3 className="hz-t-2xl hz-w-bold hz-mb-4">Simple API. Powerful Results.</h3>
              <p className="hz-fg-soft hz-mb-4">
                Just a few lines of code to integrate state-of-the-art AI into your applications.
              </p>
            </div>
            <div className="hz-grow hz-bg-surface hz-p-4 hz-r-lg hz-mono hz-t-sm hz-scroll-y">
              <pre className="hz-fg-soft">
                <code>
{`import { HanzoAI } from '@hanzo/ai';

const ai = new HanzoAI({
  apiKey: process.env.HANZO_API_KEY
});

const response = await ai.complete({
  model: 'gpt-4',
  prompt: 'Explain quantum computing',
  temperature: 0.7
});`}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
