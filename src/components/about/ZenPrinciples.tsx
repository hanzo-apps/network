
import React from "react";
import { motion } from "framer-motion";
import { 
  Users, Database, Share2, RefreshCcw, Heart, BookOpen
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const principles = [
  {
    title: "Empower the Underdog",
    description: "Enable others to win. Democratize technology so small businesses and startups can compete with industry giants.",
    icon: <Users className="hz-sq-6 hz-fg-muted" />,
  },
  {
    title: "Data-Driven Everything",
    description: "Let data be your guide. Embrace analytics and AI as the foundation of decision-making.",
    icon: <Database className="hz-sq-6 hz-fg-muted" />,
  },
  {
    title: "Open Innovation",
    description: "Be open, share often. Openness accelerates growth—both for the company and its community.",
    icon: <Share2 className="hz-sq-6 hz-fg-muted" />,
  },
  {
    title: "Adaptability",
    description: "Pivot with purpose. There is no failure, only feedback. Move quickly and strike in new directions when opportunity calls.",
    icon: <RefreshCcw className="hz-sq-6 hz-fg-muted" />,
  },
  {
    title: "Customer-Centric Growth",
    description: "Coach clients like a sensei. Treat each client as a long-term partner and guide them to success.",
    icon: <Heart className="hz-sq-6 hz-fg-muted" />,
  },
  {
    title: "First Principles Thinking",
    description: "See the invisible, do the impossible. Boil problems down to their essence and solve them in fundamentally better ways.",
    icon: <BookOpen className="hz-sq-6 hz-fg-muted" />,
  }
];

const ZenPrinciples = () => {
  return (
    <section className="hz-py-7 hz-px-4">
      <div className="hz-container">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="hz-align-center hz-mb-7"
        >
          <h2 className="hz-t-3xl hz-w-bold hz-mb-4">The Zen of Hanzo</h2>
          <div className="hz-bh-1 hz-bw-8 hz-bg-raised hz-mx-auto hz-mb-5"></div>
          <p className="hz-container-narrow hz-t-xl hz-fg-soft">
            Our guiding philosophy - a set of first principles and laws that act as our north star.
          </p>
        </motion.div>
        
        <div className="hz-grid hz-grid-3 hz-gap-6 hz-mb-7">
          {principles.map((principle, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="hz-card hz-glass hz-h-full"
            >
              <div className="hz-mb-5">{principle.icon}</div>
              <h3 className="hz-t-2xl hz-w-bold hz-mb-4">{principle.title}</h3>
              <p className="hz-fg-soft">{principle.description}</p>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="hz-align-center"
        >
          <Button 
            size="lg"
            className="hz-fg hz-px-6 hz-py-5 hz-r-lg hz-t-lg hz-w-medium"
          >
            <Link to="/philosophy" className="hz-row hz-ai-center">
              Explore The Full Zen Manifesto
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ZenPrinciples;
