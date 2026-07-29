
import React from "react";
import { motion } from "framer-motion";
import { 
  Video, 
  Monitor, 
  MessageSquare, 
  Lightbulb, 
  Workflow,
  Users
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const HumanAIIntegration = () => {
  const features = [
    {
      icon: <Video className="hz-sq-6 hz-fg-muted" />,
      title: "Train via Zoom",
      description: "Simply have a Zoom call with your AI agents. They learn by watching and listening, just like a human team member would."
    },
    {
      icon: <Monitor className="hz-sq-6 hz-fg-muted" />,
      title: "Watch Them Work",
      description: "View your AI agents' work in real-time through a virtual desktop. Provide feedback and guidance as needed."
    },
    {
      icon: <MessageSquare className="hz-sq-6 hz-fg-muted" />,
      title: "Seamless Communication",
      description: "Chat with your AI team members through your existing communication channels like Slack, Teams, or email."
    },
    {
      icon: <Lightbulb className="hz-sq-6 hz-fg-muted" />,
      title: "Proactive Suggestions",
      description: "AI agents will proactively offer insights and suggestions based on their observations of your workflow."
    },
    {
      icon: <Workflow className="hz-sq-6 hz-fg-muted" />,
      title: "Workflow Automation",
      description: "Agents learn your repetitive tasks and offer to automate them, saving you time for more creative work."
    },
    {
      icon: <Users className="hz-sq-6 hz-fg-muted" />,
      title: "Human Escalation",
      description: "When tasks require human judgment, agents automatically escalate to the appropriate team member."
    }
  ];

  return (
    <section className="hz-py-7 hz-px-4 hz-bg-surface">
      <div className="hz-container">
        <div className="hz-grid hz-grid-2 hz-gap-7 hz-ai-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="hz-inline hz-p-2 hz-r-full hz-bg-raised hz-bordered hz-border-strong hz-fg-muted hz-mb-4">
              <Users className="hz-sq-4" />
            </div>
            <h2 className="hz-t-3xl hz-w-bold hz-mb-5">
              Human-AI Integration
            </h2>
            <p className="hz-t-xl hz-fg-soft hz-mb-6">
              Our AI agents are designed to work alongside your human team, 
              creating a seamless integration that enhances productivity and creativity.
            </p>
            
            <div className="hz-rel hz-r-lg hz-clip hz-bordered hz-border-strong hz-bg-overlay">
              <div className="hz-abs hz-inset hz-row hz-ai-center hz-jc-center">
                {/* This would be a real video in production */}
                <div className="hz-align-center hz-p-6">
                  <Video className="hz-sq-8 hz-fg-muted hz-mx-auto hz-mb-4 hz-dim" />
                  <p className="hz-fg-muted">Interactive demo video would be here</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="hz-grid hz-grid-2 hz-gap-5">
              {features.map((feature, index) => (
                <Card 
                  key={index} 
                  className="hz-bg-overlay hz-bordered hz-glass hz-clip"
                >
                  <CardContent className="hz-p-5">
                    <div className="hz-bg-raised hz-p-3 hz-r-lg hz-inline hz-mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="hz-t-xl hz-w-semibold hz-mb-2">{feature.title}</h3>
                    <p className="hz-fg-muted">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HumanAIIntegration;
