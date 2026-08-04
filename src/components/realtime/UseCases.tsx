
import React from "react";
import { motion } from "framer-motion";
import { MessageSquare, Users, Edit, GamepadIcon, ChartBar, Code, Heart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UseCaseCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  index: number;
}

const UseCaseCard: React.FC<UseCaseCardProps> = ({ icon: Icon, title, description, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      className="hz-card hz-transition hz-card-interactive"
    >
      <div className="hz-sq-6 hz-bg-raised hz-r-full hz-row hz-ai-center hz-jc-center hz-mb-4">
        <Icon className="hz-sq-3 hz-fg-muted" />
      </div>
      <h3 className="hz-t-lg hz-w-semibold hz-fg hz-mb-2">{title}</h3>
      <p className="hz-fg-muted hz-t-sm">{description}</p>
    </motion.div>
  );
};

const UseCases = () => {
  const useCases = [
    {
      icon: MessageSquare,
      title: "Chat Applications",
      description: "Build messaging apps with real-time delivery, typing indicators, and read receipts."
    },
    {
      icon: Users,
      title: "Collaborative Workspaces",
      description: "Create shared workspaces where multiple users can collaborate simultaneously."
    },
    {
      icon: Edit,
      title: "Collaborative Editing",
      description: "Implement Google Docs-like collaborative document editing with conflict resolution."
    },
    {
      icon: GamepadIcon,
      title: "Multiplayer Games",
      description: "Develop low-latency multiplayer games with synchronized game state across players."
    },
    {
      icon: ChartBar,
      title: "Live Dashboards",
      description: "Build dashboards that update in real-time as new data becomes available."
    },
    {
      icon: Code,
      title: "Dev Tooling",
      description: "Create collaborative coding environments with real-time changes and execution."
    }
  ];

  return (
    <section className="hz-py-7 hz-px-4">
      <div className="hz-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="hz-align-center hz-mb-7"
        >
          <div className="hz-inline hz-ai-center hz-px-3 hz-py-1 hz-r-full hz-bg-raised hz-bordered hz-border-strong hz-mb-5">
            <Heart className="hz-sq-2 hz-fg-muted hz-mr-2" />
            <span className="hz-t-sm hz-fg-soft">Popular Use Cases</span>
          </div>
          <h2 className="hz-t-3xl hz-w-bold hz-fg hz-mb-4">
            Build Interactive Experiences
          </h2>
          <p className="hz-container-narrow hz-t-xl hz-fg-soft">
            Hanzo Realtime powers a wide range of applications that demand immediate data updates
          </p>
        </motion.div>

        <div className="hz-grid hz-grid-3 hz-gap-5 hz-mb-7">
          {useCases.map((useCase, index) => (
            <UseCaseCard
              key={index}
              icon={useCase.icon}
              title={useCase.title}
              description={useCase.description}
              index={index}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="hz-align-center"
        >
          <Button className="hz-bg-raised hz-hoverable">
            Explore All Use Cases <ArrowRight className="hz-sq-2 hz-ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default UseCases;
