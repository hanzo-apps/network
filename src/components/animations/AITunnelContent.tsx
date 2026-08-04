
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface AITunnelContentProps {
  title: string;
  subtitle: string;
  showButtons: boolean;
}

const AITunnelContent: React.FC<AITunnelContentProps> = ({
  title,
  subtitle,
  showButtons
}) => {
  return (
    <div className="hz-abs hz-inset hz-col hz-ai-center hz-jc-center hz-align-center hz-z-raised hz-px-4 hz-py-7">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="hz-rel"
      >
        <h1 className="hz-t-3xl hz-w-bold hz-fg hz-mb-5 hz-leading-tight">
          {title}
        </h1>
        
        {/* Glowing underline */}
        <motion.div 
          className="hz-mx-auto"
          style={{ width: '60%' }}
          animate={{
            opacity: [0.5, 1, 0.5],
            width: ['40%', '60%', '40%'],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="hz-t-lg hz-fg-soft hz-mb-6 hz-mw-md"
      >
        {subtitle}
      </motion.p>

      {showButtons && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="hz-col-row hz-gap-4"
        >
          <Button 
            size="lg"
            radius="full"
            className="hz-t-lg hz-px-6 hz-border-none"
          >
            Start Building
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            radius="full"
            className="hz-t-lg hz-px-6 hz-fg hz-bg-surface hz-hoverable"
          >
            <span className="hz-mr-2">Read Docs</span>
            <ArrowRight className="hz-sq-3" />
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default AITunnelContent;
