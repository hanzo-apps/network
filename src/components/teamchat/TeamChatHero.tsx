
import React from "react";
import { motion } from "framer-motion";
import ChromeText from "@/components/ui/chrome-text";

const TeamChatHero: React.FC = () => {
  return (
    <div className="hz-py-6 hz-px-4">
      <div className="hz-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="hz-align-center"
        >
          <ChromeText as="h1" className="hz-t-4xl hz-w-bold hz-mb-2">
            Hanzo Chat
          </ChromeText>
          <p className="hz-container-narrow hz-mw-md hz-fg-soft">
            Connect with state-of-the-art AI models through our intuitive chat interface.
            Get answers, generate content, and solve problems with natural language.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default TeamChatHero;
