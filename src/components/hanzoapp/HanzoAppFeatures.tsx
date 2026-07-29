
import React from "react";
import { motion } from "framer-motion";
import { MessageCircle, Bot, Code, ServerIcon, Database, Share2 } from "lucide-react";

const FeatureCard = ({ title, description, icon, list, code = null }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="hz-card hz-h-full"
    >
      <div className="hz-col hz-h-full">
        <div className="hz-mb-5">
          {icon}
          <h3 className="hz-t-2xl hz-w-semibold hz-mt-4 hz-mb-2">{title}</h3>
          <p className="hz-fg-soft hz-mb-4">{description}</p>
        </div>
        
        {list && (
          <div className="hz-mb-4">
            {list.map((item, index) => (
              <div key={index} className="hz-fg-muted hz-mb-2">{item}</div>
            ))}
          </div>
        )}
        
        {code && (
          <div className="hz-mt-auto">
            <div className="hz-bg-surface hz-r-lg hz-p-4 hz-mono hz-t-xs hz-fg-soft hz-align-left hz-scroll-y">
              <pre>{code}</pre>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

const HanzoAppFeatures = () => {
  return (
    <section className="hz-py-7 hz-px-4 hz-bg">
      <div className="hz-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="hz-align-center hz-mb-7"
        >
          <h2 className="hz-t-3xl hz-w-bold hz-mb-4">Features 01</h2>
        </motion.div>
        
        <div className="hz-grid hz-grid-3 hz-gap-6 hz-mb-7">
          <FeatureCard 
            title="Chatflow LLM Orchestration"
            description="Connect LLMs with memory, data loaders, cache, moderation and many more"
            icon={<MessageCircle className="hz-sq-6 hz-fg-muted" />}
            list={["Langchain", "LlamaIndex", "100+ integrations"]}
          />
          
          <FeatureCard 
            title="Agents & Assistants"
            description="Create autonomous agent that can uses tools to execute different tasks"
            icon={<Bot className="hz-sq-6 hz-fg-muted" />}
            list={["Custom Tools", "OpenAI Assistant", "Function Agent"]}
            code={`import requests
 
url = "/api/v1/prediction/:id"
 
def query(payload):
  response = requests.post(
    url,
    json = payload
  )
  return response.json()
 
output = query({
  question: "hello!"
)}`}
          />
          
          <FeatureCard 
            title="Developer Friendly API, SDK, Embed"
            description="Extend and integrate to your applications using APIs, SDK and Embedded Chat"
            icon={<Code className="hz-sq-6 hz-fg-muted" />}
            list={["APIs", "Embedded Widget", "React SDK"]}
          />
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="hz-align-center hz-mb-7"
        >
          <h2 className="hz-t-3xl hz-w-bold hz-mb-4">Features 02</h2>
        </motion.div>
        
        <div className="hz-grid hz-gap-6">
          <FeatureCard 
            title="Platform Agnostic Open source LLMs"
            description="Run in air-gapped environment with local LLMs, embeddings and vector databases"
            icon={<ServerIcon className="hz-sq-6 hz-fg-muted" />}
            list={[
              "HuggingFace, Ollama, LocalAI, Replicate", 
              "Llama2, Mistral, Vicuna, Orca, Llava", 
              "Self host on AWS, Azure, GCP"
            ]}
          />
        </div>
      </div>
    </section>
  );
};

export default HanzoAppFeatures;
