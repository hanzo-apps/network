
import React from "react";
import { motion } from "framer-motion";
import { Code, Rocket, Stars, Coins, Trophy, Lightbulb, Bot, User2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const timelineEvents = [
  {
    year: "2014-2016",
    title: "Origins: Verus Media & Crowdstart",
    description: "Zach Kelling founded Verus Media and launched Crowdstart, a platform to harness crowd-driven data and AI to help businesses grow.",
    icon: <Rocket className="hz-fg-muted" />,
    highlight: "Record-breaking product launches and significant crowdfunding success.",
    link: { text: "Learn about our platform", url: "/platform" }
  },
  {
    year: "2016",
    title: "Reimagining as Hanzo",
    description: "The company formally incorporated as Hanzo AI, Inc., focusing on AI-powered marketing and development platforms.",
    icon: <Stars className="hz-fg-muted" />,
    highlight: "Helped launch some of the most successful crowdsales in history.",
    link: { text: "View Hanzo AI", url: "/ai" }
  },
  {
    year: "2017",
    title: "Techstars Acceleration",
    description: "Selected for the inaugural Techstars Kansas City accelerator cohort, sharpening focus on e-commerce SaaS.",
    icon: <Trophy className="hz-fg-muted" />,
    highlight: "23 beta users and $42M in client sales by Demo Day.",
    link: { text: "Explore Commerce", url: "/commerce" }
  },
  {
    year: "2018-2020",
    title: "AI Marketing & Blockchain",
    description: "Pivoted to AI marketing platform and blockchain technology, supporting tokenized crowdfunding.",
    icon: <Coins className="hz-fg-muted" />,
    highlight: "Co-founded the first SEC-approved crowdfunding token offering.",
    link: { text: "See our analytics", url: "/analytics" }
  },
  {
    year: "2021-2023",
    title: "Product Innovation",
    description: "Launched Hanzo Dev, an AI-powered code editor and app builder translating natural language to live software.",
    icon: <Code className="hz-fg-muted" />,
    highlight: "Open-sourced Hanzo Base, a powerful backend framework.",
    link: { text: "Try Hanzo Dev", url: "/dev" }
  },
  {
    year: "2024-Present",
    title: "Strategic Partnerships",
    description: "Formed key alliances like Personas Social Inc. partnership to expand Keek's user base using Hanzo's AI.",
    icon: <User2 className="hz-fg-muted" />,
    highlight: "Driven over $1B in revenues to clients using AI-powered marketing.",
    link: { text: "Meet Hanzo Bot", url: "/bot" }
  },
];

const TimelineEvent = ({ event, index }) => {
  const isEven = index % 2 === 0;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`hz-col-row hz-ai-center hz-gap-6 hz-mb-7 ${isEven ? '' : ''}`}
    >
      <div className="">
        <div className="hz-card hz-glass hz-h-full">
          <div className="hz-row hz-ai-center hz-mb-4">
            <div className="hz-p-3 hz-r-full hz-bg-surface hz-mr-4">
              {event.icon}
            </div>
            <div>
              <span className="hz-t-sm hz-fg-muted hz-w-semibold">{event.year}</span>
              <h3 className="hz-t-2xl hz-w-bold">{event.title}</h3>
            </div>
          </div>
          <p className="hz-fg-soft hz-mb-4">{event.description}</p>
          <div className="hz-card hz-mb-5">
            <p className="hz-fg-soft hz-italic">"{event.highlight}"</p>
          </div>
          <Button variant="outline" className="hz-border-strong hz-fg hz-hoverable">
            <a href={event.link.url}>{event.link.text}</a>
          </Button>
        </div>
      </div>
      
      <div className="hz-desktop-only hz-rel">
        <div className="hz-abs hz-inset hz-row hz-ai-center hz-jc-center">
          <div className="hz-bw-1 hz-h-full hz-bg-raised"></div>
        </div>
        <div className="hz-rel hz-row hz-jc-center">
          <div className="hz-sq-7 hz-r-full hz-bg-raised hz-row hz-ai-center hz-jc-center">
            <span className="hz-fg hz-w-bold">{index + 1}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const HistoryTimeline = () => {
  return (
    <section id="timeline" className="hz-py-7 hz-px-4">
      <div className="hz-container">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="hz-align-center hz-mb-7"
        >
          <h2 className="hz-t-3xl hz-w-bold hz-mb-4">Our Journey Through Time</h2>
          <div className="hz-bh-1 hz-bw-8 hz-bg-raised hz-mx-auto hz-mb-5"></div>
          <p className="hz-container-narrow hz-t-xl hz-fg-soft">
            From crowd-powered marketing to AI innovation, explore the key milestones
            that shaped Hanzo Industries.
          </p>
        </motion.div>
        
        <div className="hz-mt-7">
          {timelineEvents.map((event, index) => (
            <TimelineEvent key={index} event={event} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HistoryTimeline;
