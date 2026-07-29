
import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

const WorkspaceFooter = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="hz-align-center"
    >
      <p className="hz-container-narrow hz-mw-md hz-t-lg hz-fg-muted hz-mb-6">
        All workspace tools are fully integrated, allowing AI agents to work across platforms
        seamlessly while maintaining a complete audit trail of all actions.
      </p>
      
      <div className="hz-inline hz-wrap hz-jc-center hz-gap-4">
        <Badge className="hz-bg-raised hz-fg-soft hz-border-strong hz-px-3 hz-py-2">
          Real-time collaboration
        </Badge>
        <Badge className="hz-bg-raised hz-fg-soft hz-border-strong hz-px-3 hz-py-2">
          Full audit history
        </Badge>
        <Badge className="hz-bg-raised hz-fg-soft hz-border-strong hz-px-3 hz-py-2">
          Seamless integrations
        </Badge>
        <Badge className="hz-bg-raised hz-fg-soft hz-border-strong hz-px-3 hz-py-2">
          Human oversight
        </Badge>
        <Badge className="hz-bg-raised hz-fg-soft hz-border-strong hz-px-3 hz-py-2">
          Enterprise security
        </Badge>
      </div>
    </motion.div>
  );
};

export default WorkspaceFooter;
