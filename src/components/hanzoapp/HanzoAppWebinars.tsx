
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const WebinarCard = ({ title, partner, image, logos = [] }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="hz-bg-surface hz-bordered hz-r-lg hz-clip hz-transition hz-hoverable"
    >
      <div className="hz-bh-8 hz-bg-raised hz-rel">
        <div className="hz-abs hz-inset hz-row hz-ai-center hz-jc-center hz-fg-muted">
          {title}
        </div>
      </div>
      <div className="hz-p-5">
        <div className="hz-row hz-ai-center hz-jc-between hz-mb-4">
          <div className="hz-t-lg hz-w-semibold">{title}</div>
          <div className="hz-fg-muted">{partner}</div>
        </div>
        <Button className="hz-w-full hz-bg-raised hz-hoverable">
          Learn More
        </Button>
      </div>
    </motion.div>
  );
};

const HanzoAppWebinars = () => {
  const webinars = [
    {
      title: "How to Build No-Code SQL Chatbots using Hanzo AI",
      partner: "SingleStore",
      logos: ["SingleStore"],
      image: "/webinar-placeholder-1.jpg" // Added image property
    },
    {
      title: "LlamaIndex Webinar: Build No-Code RAG with Hanzo AI",
      partner: "Milvus",
      logos: ["Milvus"],
      image: "/webinar-placeholder-2.jpg" // Added image property
    },
    {
      title: "How to Build a NoCode AWS Bedrock LLM App on Hanzo AI",
      partner: "AWS",
      logos: ["SingleStore", "AWS"],
      image: "/webinar-placeholder-3.jpg" // Added image property
    },
    {
      title: "Drag and Drop LLMs: Simplifying RAG with Hanzo AI and Milvus",
      partner: "Milvus",
      logos: ["Milvus"],
      image: "/webinar-placeholder-4.jpg" // Added image property
    },
    {
      title: "LangChain Weekly Webinar - Low-Code/No-Code LLM",
      partner: "Langchain",
      logos: ["Langchain"],
      image: "/webinar-placeholder-5.jpg" // Added image property
    }
  ];

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
          <h2 className="hz-t-3xl hz-w-bold hz-mb-4">Webinars</h2>
          <p className="hz-t-xl hz-fg-soft">
            Learn how to use Hanzo AI from different webinar series with our partners
          </p>
        </motion.div>
        
        <div className="hz-grid hz-grid-3 hz-gap-6">
          {webinars.map((webinar, index) => (
            <WebinarCard 
              key={index}
              title={webinar.title}
              partner={webinar.partner}
              logos={webinar.logos}
              image={webinar.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HanzoAppWebinars;
