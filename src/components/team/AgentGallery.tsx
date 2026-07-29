import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Bot, 
  Briefcase, 
  Code, 
  MessagesSquare, 
  LineChart, 
  Pencil, 
  ShieldCheck, 
  Database,
  Terminal,
  BrainCircuit,
  Music,
  Palette,
  Settings,
  DollarSign,
  Scale,
  Binary,
  Calculator,
  MessageCircle,
  Lightbulb,
  HelpCircle,
  X,
  ArrowRight
} from "lucide-react";
import TeamGroup from "./TeamGroup";
import { teamMembers } from "@/constants/team-members";
import { Link } from "react-router-dom";

interface AgentDetailModalProps {
  agent: {
    name: string;
    role: string;
    description: string;
    icon: any;
    gradient: string;
  } | null;
  isOpen: boolean;
  onClose: () => void;
}

const AgentDetailModal: React.FC<AgentDetailModalProps> = ({ agent, isOpen, onClose }) => {
  if (!agent) return null;
  
  const Icon = agent.icon;
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="hz-fixed hz-inset hz-bg-surface hz-glass hz-z-overlay hz-row hz-ai-center hz-jc-center hz-p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25 }}
            className={`hz-card hz-mw-sm hz-w-full hz-shadow-lg`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="hz-row hz-ai-start hz-jc-between hz-mb-5">
              <div className="hz-row hz-ai-center">
                <div className={`hz-p-3 hz-r-lg ${agent.gradient} hz-mr-4`}>
                  <Icon className="hz-sq-4 hz-fg" />
                </div>
                <div>
                  <h3 className="hz-t-2xl hz-w-semibold hz-fg">{agent.name}</h3>
                  <p className="hz-fg-muted">{agent.role}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="hz-fg-muted hz-transition hz-link"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="hz-mb-5">
              <p className="hz-fg-soft">{agent.description}</p>
            </div>
            
            <div className="hz-grid hz-gap-4 hz-mb-5">
              <div className="hz-card">
                <h4 className="hz-t-lg hz-w-medium hz-fg hz-mb-2">Expertise</h4>
                <ul className="hz-stack-2">
                  <li className="hz-row hz-ai-center hz-fg-soft">
                    <span className="hz-mr-2 hz-fg-muted">•</span>
                    Machine learning & data processing
                  </li>
                  <li className="hz-row hz-ai-center hz-fg-soft">
                    <span className="hz-mr-2 hz-fg-muted">•</span>
                    Neural network optimization
                  </li>
                  <li className="hz-row hz-ai-center hz-fg-soft">
                    <span className="hz-mr-2 hz-fg-muted">•</span>
                    Natural language processing
                  </li>
                </ul>
              </div>
              
              <div className="hz-card">
                <h4 className="hz-t-lg hz-w-medium hz-fg hz-mb-2">Integration</h4>
                <p className="hz-fg-soft">
                  Works seamlessly with human teams via natural language interfaces,
                  and integrates with all major productivity tools and platforms.
                </p>
              </div>
            </div>
            
            <div className="hz-row hz-jc-center">
              <Link 
                to={`/team/${agent.name.toLowerCase()}`}
                className="hz-btn hz-fg"
              >
                View Full Profile
                <ArrowRight className="hz-sq-2 hz-ml-2" />
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const AgentGallery = () => {
  const [selectedAgent, setSelectedAgent] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openAgentDetail = (agent: any) => {
    setSelectedAgent(agent);
    setIsModalOpen(true);
  };

  const closeAgentDetail = () => {
    setIsModalOpen(false);
  };

  const coreTeamMembers = [
    {
      name: "Vi",
      role: "Visionary Leader",
      description: "Your innovative AI visionary leader, guiding the team towards excellence with strategic insights.",
      icon: Lightbulb,
      gradient: ""
    },
    {
      name: "Dev",
      role: "Software Engineer",
      description: "Your expert AI developer, specializing in full-stack development and system architecture.",
      icon: Code,
      gradient: ""
    },
    {
      name: "Des",
      role: "Designer",
      description: "Your creative AI designer, crafting beautiful and intuitive user experiences.",
      icon: Palette,
      gradient: ""
    },
    {
      name: "Opera",
      role: "Operations Engineer",
      description: "Your efficient AI operations engineer, maintaining system reliability and performance.",
      icon: Settings,
      gradient: ""
    }
  ];
  
  const engineeringAgents = [
    {
      name: "DB",
      role: "Database Expert",
      description: "Your expert AI database specialist, managing data infrastructure and optimizing database operations.",
      icon: Database,
      gradient: ""
    },
    {
      name: "Sec",
      role: "Security Expert",
      description: "Your expert AI security specialist, protecting digital assets and infrastructure.",
      icon: ShieldCheck,
      gradient: ""
    },
    {
      name: "Core",
      role: "Core Engineer",
      description: "Your expert AI core engineer, building robust system foundations and architecture.",
      icon: BrainCircuit,
      gradient: ""
    },
    {
      name: "Algo",
      role: "Algorithm Expert",
      description: "Your expert AI algorithm specialist, optimizing computational solutions.",
      icon: Binary,
      gradient: ""
    }
  ];
  
  const businessAgents = [
    {
      name: "Mark",
      role: "Marketing Director",
      description: "Your AI marketing strategist, crafting compelling campaigns and driving engagement.",
      icon: MessagesSquare,
      gradient: ""
    },
    {
      name: "Su",
      role: "Support Engineer",
      description: "Your dedicated AI support engineer, ensuring smooth operations and user satisfaction.",
      icon: HelpCircle,
      gradient: ""
    },
    {
      name: "Fin",
      role: "Financial Expert",
      description: "Your expert AI financial analyst, providing financial insights and strategy.",
      icon: DollarSign,
      gradient: ""
    },
    {
      name: "Cal",
      role: "Calculator",
      description: "Your expert AI calculator, processing complex computations with precision.",
      icon: Calculator,
      gradient: ""
    }
  ];

  const creativeAgents = [
    {
      name: "Art",
      role: "Artist",
      description: "Your creative AI artist, bringing imagination to life through digital artistry.",
      icon: Palette,
      gradient: ""
    },
    {
      name: "Mu",
      role: "Musician",
      description: "Your creative AI musician, composing and producing original music.",
      icon: Music,
      gradient: ""
    },
    {
      name: "Data",
      role: "Data Scientist",
      description: "Your expert AI data scientist, unlocking insights from complex datasets.",
      icon: LineChart,
      gradient: ""
    },
    {
      name: "Chat",
      role: "Conversation Expert",
      description: "Your expert AI conversation specialist, facilitating natural communication.",
      icon: MessageCircle,
      gradient: ""
    }
  ];

  return (
    <section className="hz-py-7 hz-px-4 hz-bg">
      <div className="hz-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="hz-align-center hz-mb-7"
        >
          <div className="hz-inline hz-p-2 hz-r-full hz-bg-raised hz-bordered hz-border-strong hz-fg-muted hz-mb-4">
            <Bot className="hz-sq-4" />
          </div>
          <h2 className="hz-t-3xl hz-w-bold hz-mb-5">
            Meet Your AI Team
          </h2>
          <p className="hz-container-narrow hz-t-xl hz-fg-soft">
            Our AI team members can handle a wide range of tasks across leadership, engineering, 
            business, and creative functions. Each agent is specialized and 
            trained to excel in their domain.
          </p>
        </motion.div>

        <TeamGroup 
          title="Leadership & Core Team" 
          members={coreTeamMembers} 
          onMemberClick={openAgentDetail}
        />
        <TeamGroup 
          title="Engineering Team" 
          members={engineeringAgents} 
          onMemberClick={openAgentDetail}
        />
        <TeamGroup 
          title="Business Team" 
          members={businessAgents} 
          onMemberClick={openAgentDetail}
        />
        <TeamGroup 
          title="Creative Team" 
          members={creativeAgents} 
          onMemberClick={openAgentDetail}
        />
      </div>

      <AgentDetailModal 
        agent={selectedAgent}
        isOpen={isModalOpen}
        onClose={closeAgentDetail}
      />
    </section>
  );
};

export default AgentGallery;