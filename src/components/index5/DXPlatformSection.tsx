
import React from "react";
import { motion } from "framer-motion";
import { Code, Terminal, Cpu, Rocket, Server, Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import ChromeText from "@/components/ui/chrome-text";

const DXPlatformSection: React.FC = () => {
  const navigate = useNavigate();
  
  const features = [
    { icon: <Code className="hz-sq-4 hz-fg-muted" />, title: "Hanzo Code", description: "AI-powered code generation and intelligent autocomplete" },
    { icon: <Terminal className="hz-sq-4 hz-fg-muted" />, title: "Hanzo Dev", description: "AI engineering assistant for accelerated development" },
    { icon: <Cpu className="hz-sq-4 hz-fg-muted" />, title: "Hanzo App", description: "Low-code platform for building AI applications" },
    { icon: <Rocket className="hz-sq-4 hz-fg-muted" />, title: "Hanzo Bot", description: "Framework for building advanced AI agents and assistants" },
    { icon: <Server className="hz-sq-4 hz-fg-muted" />, title: "Operative", description: "AI agents that automate your development workflow" },
    { icon: <Zap className="hz-sq-4 hz-fg-muted" />, title: "Extension", description: "Browser and IDE plugins for seamless integration" }
  ];
  
  return (
    <section className="hz-py-7 hz-px-4 hz-rel" id="dx-platform">
      <div className="hz-container">
        <div className="hz-align-center hz-mb-7">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="hz-mb-4"
          >
            <span className="hz-px-4 hz-py-1 hz-r-full hz-bg-raised hz-bordered hz-border-strong hz-fg-soft hz-t-sm hz-w-medium">
              Developer Experience
            </span>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <ChromeText 
              as="h2" 
              className="hz-t-3xl hz-w-bold hz-mb-5"
            >
              DX Platform
            </ChromeText>
            
            <p className="hz-container-narrow hz-t-xl hz-fg-soft">
              Build better, ship faster with AI-powered developer tools and frameworks
            </p>
          </motion.div>
        </div>
        
        <div className="hz-grid hz-grid-3 hz-gap-5 hz-mt-7">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="hz-card hz-transition hz-card-interactive"
            >
              <div className="hz-sq-7 hz-bg-raised hz-r-lg hz-row hz-ai-center hz-jc-center hz-mb-4">
                {feature.icon}
              </div>
              <h3 className="hz-t-xl hz-w-bold hz-mb-2 hz-fg">{feature.title}</h3>
              <p className="hz-fg-soft">{feature.description}</p>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="hz-mt-7 hz-row hz-jc-center"
        >
          <Button 
            className="hz-t-lg hz-px-6 hz-py-5 hz-bg-raised hz-hoverable"
            onClick={() => navigate('/platform')}
          >
            Explore DX Platform <ArrowRight className="hz-sq-3 hz-ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default DXPlatformSection;
