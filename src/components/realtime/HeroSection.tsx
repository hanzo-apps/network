
import React from "react";
import { motion } from "framer-motion";
import { Activity, Radio, Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="hz-pt-6 hz-pb-6 hz-px-4 hz-rel hz-clip">
      <div className="hz-abs hz-inset" />
      
      <div className="hz-container hz-rel hz-z-raised">
        <div className="hz-col-row hz-ai-center hz-jc-between hz-gap-7">
          <div className="hz-w-full">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ duration: 0.5 }}
              className="hz-inline hz-ai-center hz-px-3 hz-py-1 hz-r-full hz-bg-raised hz-bordered hz-border-strong hz-mb-5"
            >
              <Activity className="hz-sq-2 hz-fg-muted hz-mr-2" />
              <span className="hz-t-sm hz-fg-soft">Real-time Data Synchronization</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.5, delay: 0.1 }}
              className="hz-t-4xl hz-w-bold hz-mb-5 hz-fg"
            >
              Instant data sync <br/>
              <span className="hz-chrome">
                across all clients
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.5, delay: 0.2 }}
              className="hz-t-lg hz-fg-soft hz-mb-6 hz-mw-md"
            >
              Build collaborative, interactive experiences with Hanzo Realtime. 
              Synchronize data across clients in milliseconds with our reliable 
              WebSocket and pub/sub messaging infrastructure.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.5, delay: 0.3 }}
              className="hz-row hz-wrap hz-gap-4"
            >
              <Button 
                size="lg" 
                className="hz-bg-raised hz-fg hz-px-5 hz-hoverable"
              >
                Start Building <ArrowRight className="hz-sq-2 hz-ml-2" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="hz-fg hz-hoverable"
              >
                View Documentation
              </Button>
            </motion.div>
          </div>
          
          <div className="hz-w-full">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ duration: 0.5, delay: 0.4 }}
              className="hz-card"
            >
              <div className="hz-row hz-jc-between hz-ai-center hz-mb-4">
                <div className="hz-row hz-ai-center">
                  <div className="hz-sq-1 hz-r-full hz-bg-raised hz-mr-3" />
                  <span className="hz-fg-soft hz-t-sm">Live connection</span>
                </div>
                <div className="hz-row hz-ai-center">
                  <Radio className="hz-sq-2 hz-fg-muted hz-mr-2" />
                  <span className="hz-fg-soft hz-t-sm">10ms latency</span>
                </div>
              </div>
              
              <div className="hz-stack-4">
                <div className="hz-card hz-bh-7 hz-row hz-ai-center">
                  <Zap className="hz-sq-3 hz-fg-muted hz-mr-3" />
                  <span className="hz-fg">Client data synchronized in real-time</span>
                </div>
                
                <div className="hz-grid hz-grid-3 hz-gap-4">
                  {[1, 2, 3].map((i) => (
                    <div 
                      key={i}
                      className="hz-card hz-bh-8 hz-col hz-jc-center hz-ai-center"
                    >
                      <div className="hz-sq-1 hz-r-full hz-bg-raised hz-mb-2" />
                      <span className="hz-t-xs hz-fg-muted hz-align-center">Client {i}</span>
                      <span className="hz-t-xs hz-fg-muted hz-align-center">Connected</span>
                    </div>
                  ))}
                </div>
                
                <div className="hz-card hz-card-tight hz-bh-8 hz-clip hz-mono hz-t-xs">
                  <div className="hz-fg-muted">// Subscribe to real-time updates</div>
                  <div className="hz-fg-soft">const channel = await hanzo.realtime.subscribe(</div>
                  <div className="hz-fg-soft hz-px-4">'room-updates',</div>
                  <div className="hz-fg-soft hz-px-4">(message) =&gt; {`{`}</div>
                  <div className="hz-fg-soft hz-px-6">console.log('New message:', message);</div>
                  <div className="hz-fg-soft hz-px-6">updateUIWithData(message.data);</div>
                  <div className="hz-fg-soft hz-px-4">{`}`}</div>
                  <div className="hz-fg-soft">);</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
