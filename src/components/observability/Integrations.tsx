
import React from "react";
import { motion } from "framer-motion";
import { Code, Braces, CheckCircle } from "lucide-react";

const integrationGroups = [
  {
    title: "SDK Integrations", 
    items: [
      "Python", "JS/TS", "OpenTelemetry", "OpenAI SDK", "LangChain", "Llama-Index", 
      "LiteLLM", "LangGraph", "CrewAI", "Semantic Kernel", "DSPy"
    ]
  },
  {
    title: "Platforms", 
    items: [
      "Smolagents", "Pydantic AI", "AutoGen", "Amazon Bedrock", "Google Gemini", 
      "Ollama", "Flowise", "Langflow", "Dify", "OpenWeb UI"
    ]
  }
];

const Integrations = () => {
  return (
    <section className="hz-py-7 hz-px-4 hz-rel">
      <div className="hz-container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="hz-container-narrow hz-align-center hz-mb-7"
        >
          <div className="hz-inline hz-ai-center hz-jc-center hz-mb-5 hz-bg-raised hz-p-3 hz-r-full">
            <Braces className="hz-sq-5 hz-fg-muted" />
          </div>
          <h2 className="hz-t-3xl hz-w-bold hz-mb-5">Integrated Across Your Development Workflow</h2>
          <p className="hz-t-xl hz-fg-soft">
            Hanzo Observability seamlessly integrates with your existing stack, supporting your AI operations from prototype to production.
          </p>
        </motion.div>
        
        <div className="hz-grid hz-grid-2 hz-gap-7">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="hz-card hz-clip"
          >
            <div className="hz-row hz-ai-center hz-mb-5">
              <Code className="hz-sq-4 hz-fg-muted hz-mr-3" />
              <h3 className="hz-t-2xl hz-w-bold">Import & Initialize</h3>
            </div>
            
            <div className="hz-bg-overlay hz-r-lg hz-p-5 hz-mono hz-t-sm">
              <div className="hz-mb-4">
                <span className="hz-fg-muted">import</span> <span className="hz-fg-muted">{'{'}</span> <span className="hz-fg-soft">HanzoObservability</span> <span className="hz-fg-muted">{'}'}</span> <span className="hz-fg-muted">from</span> <span className="hz-fg-muted">'hanzo-observability'</span>
              </div>
              <div className="hz-mb-4">
                <span className="hz-fg-muted">// Initialize with your project token</span>
              </div>
              <div className="hz-mb-4">
                <span className="hz-fg-muted">const</span> observability <span className="hz-fg">=</span> <span className="hz-fg-muted">new</span> <span className="hz-fg-soft">HanzoObservability</span><span className="hz-fg">(</span><span className="hz-fg-muted">'YOUR_PROJECT_TOKEN'</span><span className="hz-fg">);</span>
              </div>
              <div className="hz-mb-4">
                <span className="hz-fg-muted">// Trace AI model calls</span>
              </div>
              <div>
                <span className="hz-fg-muted">await</span> observability.<span className="hz-fg-soft">trace</span><span className="hz-fg">(</span><span className="hz-fg-muted">'chatCompletion'</span><span className="hz-fg">, {'async () => {'}</span>
                <div className="hz-px-4 hz-fg">
                  <span className="hz-fg-muted">const</span> response <span className="hz-fg">=</span> <span className="hz-fg-muted">await</span> openai.<span className="hz-fg-soft">createChatCompletion</span><span className="hz-fg">({'{...}'})</span>
                  <div><span className="hz-fg-muted">return</span> response</div>
                </div>
                <span className="hz-fg">{'}'})</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {integrationGroups.map((group, groupIndex) => (
              <div key={groupIndex} className="hz-mb-6">
                <h3 className="hz-t-xl hz-w-bold hz-mb-5 hz-fg-soft">{group.title}</h3>
                <div className="hz-grid hz-grid-3 hz-gap-3">
                  {group.items.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.1 + (index * 0.05) }}
                      className="hz-card hz-card-tight hz-row hz-ai-center"
                    >
                      <CheckCircle className="hz-sq-2 hz-fg-muted hz-mr-2 hz-none" />
                      <span className="hz-fg-soft hz-t-sm">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="hz-align-center hz-mt-6"
            >
              <a href="#integrations" className="hz-inline hz-ai-center hz-fg-muted hz-transition hz-t-sm hz-link">
                View all integrations <Code className="hz-sq-2 hz-ml-1" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Integrations;
