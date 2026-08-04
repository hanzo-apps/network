
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Play, Pause, SkipForward, SkipBack } from "lucide-react";

const OperativeDemo = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  
  return (
    <section className="hz-py-7 hz-rel hz-clip" id="demo">
      {/* Background gradient */}
      <div className="hz-abs hz-top-0 hz-left-0 hz-w-full hz-h-full"></div>
      
      <div className="hz-container hz-rel hz-z-raised">
        <div className="hz-container-narrow hz-align-center hz-mb-7">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="hz-t-3xl hz-w-bold hz-fg hz-mb-5">
              See Operative in Action
            </h2>
            <p className="hz-t-xl hz-fg-soft">
              Watch as Hanzo Operative uses multimodal AI to navigate interfaces, 
              complete tasks, and solve problems autonomously.
            </p>
          </motion.div>
        </div>
        
        <div className="hz-container-wide hz-rel hz-w-full hz-r-lg hz-clip hz-bordered hz-shadow-lg">
          <div className="hz-abs hz-inset hz-row hz-ai-center hz-jc-center">
            <img 
              src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7" 
              alt="Code on screen" 
              className="hz-w-full hz-h-full hz-object-cover hz-dim-more"
            />
            
            <div className="hz-abs hz-inset hz-col hz-ai-center hz-jc-center">
              <h3 className="hz-t-2xl hz-w-bold hz-fg hz-mb-4">Demo Video</h3>
              <Button 
                size="lg"
                className="hz-r-full hz-bg-surface hz-glass hz-fg hz-hoverable"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? <Pause className="hz-sq-4" /> : <Play className="hz-sq-4 hz-ml-1" />}
              </Button>
              
              <div className="hz-abs hz-w-full hz-mw-xs hz-row hz-ai-center hz-jc-center hz-inline-4">
                <Button size="sm" variant="ghost" className="hz-fg-muted hz-link">
                  <SkipBack className="hz-sq-3" />
                </Button>
                <div className="hz-w-full hz-bg-raised hz-bh-1 hz-r-full hz-clip">
                  <div className="hz-bg-raised hz-h-full hz-r-full"></div>
                </div>
                <Button size="sm" variant="ghost" className="hz-fg-muted hz-link">
                  <SkipForward className="hz-sq-3" />
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="hz-mt-7 hz-align-center">
          <a 
            href="https://docs.hanzo.ai/operative/examples"
            className="hz-fg-muted hz-transition hz-link"
          >
            View more examples →
          </a>
        </div>
      </div>
    </section>
  );
};

export default OperativeDemo;
