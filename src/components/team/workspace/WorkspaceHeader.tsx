
import React from "react";
import { motion } from "framer-motion";
import { FolderKanban } from "lucide-react";

const WorkspaceHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="hz-align-center hz-mb-7"
    >
      <div className="hz-inline hz-p-2 hz-r-full hz-bg-raised hz-bordered hz-border-strong hz-fg-muted hz-mb-4">
        <FolderKanban className="hz-sq-4" />
      </div>
      <h2 className="hz-t-3xl hz-w-bold hz-mb-5">
        One Workspace for Humans & AI
      </h2>
      <p className="hz-container-narrow hz-t-xl hz-fg-soft">
        Seamlessly integrate your AI team members into your existing workflows with our 
        unified workspace platform, featuring project management, chat, video calls, and 
        knowledge base tools.
      </p>
    </motion.div>
  );
};

export default WorkspaceHeader;
