
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Play, Terminal } from "lucide-react";

const DemoShowcase: React.FC = () => {
  return (
    <section className="hz-py-7 hz-px-4 hz-rel hz-clip">
      <div className="hz-abs hz-inset" />
      
      <div className="hz-container hz-rel hz-z-raised">
        <div className="hz-col-row hz-ai-center hz-gap-7">
          <motion.div 
            className="hz-w-full"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="hz-px-4 hz-py-1 hz-r-full hz-bg-raised hz-bordered hz-border-strong hz-fg-soft hz-t-sm hz-w-medium hz-mb-5">
              See it in action
            </div>
            
            <h2 className="hz-t-3xl hz-w-bold hz-fg hz-mb-5">
              AI Engineering in Real Time
            </h2>
            
            <p className="hz-t-xl hz-fg-soft hz-mb-6">
              Watch how Hanzo accelerates development and delivers better AI experiences with our 
              integrated tools and services.
            </p>
            
            <Button 
              className="hz-r-full hz-px-5 hz-py-5 hz-fg"
            >
              <Play className="hz-sq-3 hz-mr-2" /> Watch Demo
            </Button>
          </motion.div>
          
          <motion.div 
            className="hz-w-full"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="hz-bg-surface hz-bordered hz-r-lg hz-clip hz-shadow-lg">
              <div className="hz-bg-surface hz-p-3 hz-row hz-ai-center hz-border-b">
                <div className="hz-row hz-inline-2 hz-mr-4">
                  <div className="hz-sq-1 hz-r-full hz-bg-raised"></div>
                  <div className="hz-sq-1 hz-r-full hz-bg-raised"></div>
                  <div className="hz-sq-1 hz-r-full hz-bg-raised"></div>
                </div>
                <div className="hz-row hz-ai-center hz-bg-raised hz-px-4 hz-py-1 hz-r-md hz-fg-muted hz-t-sm">
                  <Terminal className="hz-sq-2 hz-mr-2" /> hanzo-demo.tsx
                </div>
              </div>
              
              <div className="hz-p-5 hz-mono hz-t-sm">
                <pre className="language-typescript">
                  <code className="hz-fg-muted">import {"{"} <span className="hz-fg-muted">useHanzoAI</span> {"}"} from <span className="hz-fg-soft">'@hanzo/ai'</span>;</code>
                  <code className="hz-mt-4 hz-fg-muted">function <span className="hz-fg-muted">AIAssistant</span><span className="hz-fg">()</span> <span className="hz-fg">{"{"}</span></code>
                  <code className="hz-ml-4 hz-fg-muted">const {"{"} <span className="hz-fg-muted">assistant, isLoading, error</span> {"}"} = <span className="hz-fg-muted">useHanzoAI</span>({"{"}</code>
                  <code className="hz-ml-4 hz-fg-muted">model: <span className="hz-fg-soft">'gpt-4'</span>,</code>
                  <code className="hz-ml-4 hz-fg-muted">temperature: <span className="hz-fg-muted">0.7</span>,</code>
                  <code className="hz-ml-4 hz-fg-muted">systemPrompt: <span className="hz-fg-soft">'You are a helpful AI assistant.'</span></code>
                  <code className="hz-ml-4 hz-fg">{"})"}</code>
                  <code className="hz-mt-4 hz-ml-4 hz-fg-muted">return <span className="hz-fg">(</span></code>
                  <code className="hz-ml-4 hz-fg">{"<"}<span className="hz-fg-muted">div</span> <span className="hz-fg-muted">className</span>=<span className="hz-fg-soft">"ai-container"</span>{">"}</code>
                  <code className="hz-ml-4 hz-fg">{"{"}<span className="hz-fg-muted">isLoading</span> ? <span className="hz-fg-soft">'Loading...'</span> : <span className="hz-fg-muted">assistant</span>.response{"}"}</code>
                  <code className="hz-ml-4 hz-fg">{"</div>"}</code>
                  <code className="hz-ml-4 hz-fg">)</code>
                  <code className="hz-fg">{"}"}</code>
                </pre>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DemoShowcase;
