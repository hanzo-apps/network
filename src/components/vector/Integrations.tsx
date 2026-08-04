
import React from "react";
import { motion } from "framer-motion";

const Integrations = () => {
  const tools = [
    "LangChain", "LlamaIndex", "OpenAI", "HuggingFace", 
    "DSPy", "Haystack", "Ragas", "MemGPT", 
    "ChromaDB", "Pinecone", "Weaviate", "Qdrant"
  ];
  
  return (
    <section className="hz-py-7 hz-px-4 hz-bg">
      <div className="hz-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="hz-align-center hz-mb-7"
        >
          <h2 className="hz-t-3xl hz-w-bold hz-fg hz-mb-5">
            Plays Nicely With Your Favorite AI Dev Tools
          </h2>
          <p className="hz-container-narrow hz-t-xl hz-fg-soft">
            Seamlessly integrate Hanzo Vector with popular AI frameworks, libraries, and platforms.
          </p>
        </motion.div>
        
        <div className="hz-grid hz-grid-6 hz-gap-5">
          {tools.map((tool, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="hz-card hz-col hz-ai-center hz-jc-center hz-transition hz-card-interactive"
            >
              <div className="hz-t-xl hz-w-semibold hz-fg-soft hz-transition hz-hoverable">
                {tool}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Integrations;
