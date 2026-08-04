
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Play, Terminal, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import ChromeText from "@/components/ui/chrome-text";

const DemoSection: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [demoStep, setDemoStep] = useState(0);
  
  const demoSteps = [
    { code: "import { HanzoAI } from '@hanzo/ai';\n\nconst model = HanzoAI.loadModel('gpt-4');\n\nconst response = await model.generate({\n  prompt: 'Explain quantum computing',\n  maxTokens: 100\n});", output: "Quantum computing leverages quantum mechanics principles to process information. Unlike classical computers using bits (0 or 1), quantum computers use quantum bits or 'qubits' that can exist in multiple states simultaneously through superposition..." },
    { code: "const code = await HanzoAI.generateCode({\n  language: 'typescript',\n  task: 'Create a React component for a file uploader',\n  specifications: {\n    acceptedFileTypes: ['image/png', 'image/jpeg'],\n    maxFileSize: '5MB'\n  }\n});", output: "Generating React component for file uploader with specified parameters... Component successfully generated!" },
    { code: "const agent = HanzoAI.createAgent({\n  tools: ['database', 'web-search', 'code-analysis'],\n  goal: 'Optimize database query performance',\n  context: {\n    currentSchema: db.getSchema(),\n    slowQueries: await db.getSlowQueries()\n  }\n});", output: "Agent initialized with 3 tools. Analyzing slow queries and database schema... Found 4 optimization opportunities. Generating SQL modifications to improve performance by estimated 45%." }
  ];
  
  const playDemo = () => {
    setIsPlaying(true);
    let step = 0;
    
    const interval = setInterval(() => {
      step += 1;
      if (step >= demoSteps.length) {
        clearInterval(interval);
        setTimeout(() => {
          setIsPlaying(false);
          setDemoStep(0);
        }, 3000);
        return;
      }
      setDemoStep(step);
    }, 5000);
  };
  
  return (
    <section className="hz-py-7 hz-px-4 hz-rel">
      <div className="hz-container-wide">
        <div className="hz-align-center hz-mb-7">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <ChromeText 
              as="h2" 
              className="hz-t-3xl hz-w-bold hz-mb-5"
            >
              See it in Action
            </ChromeText>
            
            <p className="hz-container-narrow hz-t-xl hz-fg-soft">
              Watch how simple it is to build AI applications with Hanzo
            </p>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="hz-rel"
        >
          <div className="hz-card hz-glass">
            <div className="hz-bg-overlay hz-r-lg hz-clip hz-shadow-lg">
              <div className="hz-row hz-ai-center hz-bg-surface hz-py-2 hz-px-4 hz-border-b">
                <div className="hz-row hz-inline-2 hz-mr-4">
                  <div className="hz-sq-1 hz-r-full hz-bg-raised"></div>
                  <div className="hz-sq-1 hz-r-full hz-bg-raised"></div>
                  <div className="hz-sq-1 hz-r-full hz-bg-raised"></div>
                </div>
                <div className="hz-fg-muted hz-t-sm hz-mono">
                  hanzo-ai-terminal
                </div>
                <div className="hz-ml-auto hz-row hz-ai-center hz-inline-3">
                  {!isPlaying ? (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="hz-t-sm hz-gap-2 hz-bg-raised hz-hoverable"
                      onClick={playDemo}
                    >
                      <Play className="hz-sq-2" /> Run Demo
                    </Button>
                  ) : (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="hz-t-sm hz-gap-2 hz-bg-raised hz-hoverable"
                      disabled
                    >
                      <RefreshCw className="hz-sq-2" /> Running...
                    </Button>
                  )}
                </div>
              </div>
              
              <div className="hz-p-5 hz-mono hz-t-sm hz-clip">
                <div className="hz-row hz-ai-start">
                  <Terminal className="hz-sq-3 hz-fg-muted hz-mr-2 hz-mt-1 hz-none" />
                  <div className="hz-fg-muted">
                    <span className="hz-fg-muted">hanzo@ai</span>:<span className="hz-fg-muted">~/projects/demo</span>$ <span className="hz-fg"> {isPlaying ? "node demo.js" : "node demo.js"}</span>
                  </div>
                </div>
                
                {(isPlaying || demoStep > 0) && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hz-card hz-card-tight hz-mt-4"
                  >
                    <div className="hz-fg-soft hz-mb-2">// Execute code</div>
                    <div className="hz-fg">{demoSteps[demoStep].code}</div>
                  </motion.div>
                )}
                
                {(isPlaying || demoStep > 0) && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="hz-mt-4"
                  >
                    <div className="hz-row">
                      <span className="hz-fg-muted">// Output:</span>
                    </div>
                    <div className="hz-mt-2 hz-fg-soft hz-italic">
                      {demoSteps[demoStep].output}
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
          
          {/* Decorative glows */}
          <div className="hz-center-xy hz-abs hz-z-behind hz-w-full hz-h-full">
            <div className="hz-sq-8 hz-abs hz-bg-raised hz-r-full hz-blur-bg"></div>
            <div className="hz-sq-8 hz-abs hz-bg-raised hz-r-full hz-blur-bg"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DemoSection;
