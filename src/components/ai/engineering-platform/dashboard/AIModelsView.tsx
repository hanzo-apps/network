
import React, { useState } from "react";
import { motion } from "framer-motion";
import { BrainCircuit, BrainCog, Activity, ServerCog, Zap, Terminal } from "lucide-react";
import { aiModels } from "../data/aiModels";

const AIModelsView = () => {
  const [selectedModel, setSelectedModel] = useState<string | null>(null);

  return (
    <div className="hz-stack-4">
      <div className="hz-row hz-ai-center hz-jc-between hz-mb-4">
        <h3 className="hz-t-sm hz-w-medium hz-fg">AI Model Registry</h3>
        <div className="hz-row hz-inline-2">
          <button className="hz-px-2 hz-py-1 hz-bg-raised hz-r-md hz-t-xs hz-fg hz-row hz-ai-center">
            <BrainCog className="hz-sq-1 hz-mr-1" />
            Deploy Model
          </button>
          <button className="hz-px-2 hz-py-1 hz-bg-raised hz-r-md hz-t-xs hz-fg-muted hz-row hz-ai-center">
            <Terminal className="hz-sq-1 hz-mr-1" />
            Import
          </button>
        </div>
      </div>

      <div className="hz-grid hz-gap-3">
        {aiModels.map((model) => (
          <motion.div
            key={model.id}
            className={`hz-p-3 hz-r-lg hz-bordered ${selectedModel === model.id ? "hz-bg-raised hz-border-strong" : "hz-bg-raised"} hz-transition hz-pointer hz-hoverable`}
            onClick={() => setSelectedModel(model.id)}
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            <div className="hz-row hz-ai-start hz-jc-between">
              <div>
                <div className="hz-row hz-ai-center">
                  <BrainCircuit className="hz-sq-2 hz-fg-muted hz-mr-2" />
                  <span className="hz-w-medium hz-fg hz-t-sm">{model.name}</span>
                  <span className="hz-ml-2 hz-px-2 hz-py-1 hz-bg-raised hz-r-md hz-t-xs hz-fg-soft">{model.type}</span>
                </div>
                <div className="hz-t-xs hz-fg-muted hz-mt-1">Provider: {model.provider}</div>
              </div>
              <div className="hz-row hz-ai-center hz-inline-4">
                <div className="hz-align-right">
                  <div className="hz-t-xs hz-fg-muted">Accuracy</div>
                  <div className="hz-t-sm hz-w-medium hz-fg-muted">{model.accuracy}%</div>
                </div>
                <div className="hz-align-right">
                  <div className="hz-t-xs hz-fg-muted">Latency</div>
                  <div className="hz-t-sm hz-w-medium hz-fg-muted">{model.latency}ms</div>
                </div>
              </div>
            </div>

            {selectedModel === model.id && (
              <motion.div 
                className="hz-grid hz-grid-3 hz-mt-3 hz-pt-4 hz-border-t hz-gap-3"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3 }}
              >
                <button className="hz-btn hz-t-xs hz-fg-soft">
                  <Activity className="hz-sq-1 hz-mr-2" />
                  Benchmark
                </button>
                <button className="hz-btn hz-t-xs hz-fg-soft">
                  <ServerCog className="hz-sq-1 hz-mr-2" />
                  Fine-tune
                </button>
                <button className="hz-btn hz-t-xs hz-fg">
                  <Zap className="hz-sq-1 hz-mr-2" />
                  Deploy
                </button>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AIModelsView;
