
import React from "react";
import { motion } from "framer-motion";
import { Brain, MessageSquare, Box, Database } from "lucide-react";
import { Button } from "@/components/ui/button";

const AdditionalFeatures = () => {
  return (
    <div className="hz-card hz-mt-7">
      <h3 className="hz-t-2xl hz-w-bold hz-fg hz-mb-4">Single API for Everything</h3>
      <p className="hz-t-lg hz-fg-soft hz-mb-6">
        Our unified API provides seamless access to all AI capabilities through a consistent, developer-friendly interface
      </p>
      
      <div className="hz-grid hz-grid-4 hz-gap-5">
        <div className="hz-bg-overlay hz-p-4 hz-r-lg">
          <Brain className="hz-sq-5 hz-fg-muted hz-mb-3" />
          <h4 className="hz-t-lg hz-w-semibold hz-fg hz-mb-2">Model Routing</h4>
          <p className="hz-t-sm hz-fg-soft">
            Smart routing to optimal models based on task, cost, and performance requirements
          </p>
        </div>
        
        <div className="hz-bg-overlay hz-p-4 hz-r-lg">
          <MessageSquare className="hz-sq-5 hz-fg-muted hz-mb-3" />
          <h4 className="hz-t-lg hz-w-semibold hz-fg hz-mb-2">Document Processing</h4>
          <p className="hz-t-sm hz-fg-soft">
            Built-in document parsing, chunking, and semantic analysis capabilities
          </p>
        </div>
        
        <div className="hz-bg-overlay hz-p-4 hz-r-lg">
          <Box className="hz-sq-5 hz-fg-muted hz-mb-3" />
          <h4 className="hz-t-lg hz-w-semibold hz-fg hz-mb-2">Vector Search</h4>
          <p className="hz-t-sm hz-fg-soft">
            Integrated vector database for semantic search and retrieval augmented generation
          </p>
        </div>
        
        <div className="hz-bg-overlay hz-p-4 hz-r-lg">
          <Database className="hz-sq-5 hz-fg-muted hz-mb-3" />
          <h4 className="hz-t-lg hz-w-semibold hz-fg hz-mb-2">Knowledge Base</h4>
          <p className="hz-t-sm hz-fg-soft">
            Create, manage and query custom knowledge bases for your AI applications
          </p>
        </div>
      </div>

      <div className="hz-mt-6 hz-align-center">
        <Button className="hz-bg-raised hz-fg hz-px-5 hz-py-2 hz-t-lg hz-hoverable">
          Explore the API
        </Button>
      </div>
    </div>
  );
};

export default AdditionalFeatures;
