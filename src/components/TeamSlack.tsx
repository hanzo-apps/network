
import { motion } from "framer-motion";
import { MessageSquare, Hash, Users, Search, ChevronDown } from "lucide-react";

const TeamSlack = () => {
  const channels = [
    "general", "design-ideas", "dev-chat", "marketing", "project-updates"
  ];

  const messages = [
    { user: "Dev", message: "Just pushed the new feature to staging ✨", time: "10:30 AM" },
    { user: "Des", message: "The UI looks amazing! Great work team!", time: "10:31 AM" },
    { user: "Mark", message: "Engagement metrics are through the roof 📈", time: "10:32 AM" },
    { user: "Vi", message: "Outstanding progress everyone!", time: "10:33 AM" }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="hz-container-wide hz-mb-7"
    >
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="hz-t-3xl hz-w-bold hz-align-center hz-mb-7"
      >
        Watch Our Team in Action
      </motion.h2>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="hz-r-lg hz-bordered hz-bg-overlay hz-glass hz-clip"
      >
        <div className="hz-grid hz-grid-4">
          {/* Sidebar */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="hz-border-r hz-p-4"
          >
            <div className="hz-row hz-ai-center hz-jc-between hz-p-2 hz-mb-4">
              <h3 className="hz-fg-muted hz-w-semibold">Hanzo Team</h3>
              <ChevronDown className="hz-sq-2 hz-fg-muted" />
            </div>
            <div className="hz-stack-2">
              {channels.map((channel, idx) => (
                <motion.div
                  key={channel}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.5 + (idx * 0.1) }}
                  whileHover={{ x: 4 }}
                  className="hz-row hz-ai-center hz-gap-2 hz-p-2 hz-r-md hz-pointer hz-hoverable"
                >
                  <Hash className="hz-sq-2 hz-fg-muted" />
                  <span className="hz-fg-soft hz-t-sm">{channel}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Chat Area */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="hz-span-full hz-p-4"
          >
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.6 }}
              className="hz-row hz-ai-center hz-gap-4 hz-p-4 hz-border-b hz-mb-4"
            >
              <Hash className="hz-sq-3 hz-fg-muted" />
              <span className="hz-fg hz-w-medium">general</span>
            </motion.div>
            <div className="hz-stack-4">
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.7 + (idx * 0.2) }}
                  className="hz-row hz-ai-start hz-gap-3"
                >
                  <div className="hz-sq-5 hz-r-lg hz-row hz-ai-center hz-jc-center hz-fg hz-t-sm">
                    {msg.user[0]}
                  </div>
                  <div>
                    <div className="hz-row hz-ai-center hz-gap-2">
                      <span className="hz-w-medium hz-fg">{msg.user}</span>
                      <span className="hz-t-xs hz-fg-muted">{msg.time}</span>
                    </div>
                    <p className="hz-fg-soft">{msg.message}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TeamSlack;
