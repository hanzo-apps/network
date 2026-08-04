
import React from "react";
import { motion } from "framer-motion";

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

const timelineEvents: TimelineEvent[] = [
  {
    year: "2013",
    title: "The Spark",
    description: "Launched SKULLY AR-1 helmet, the most successful campaign in Indiegogo's history."
  },
  {
    year: "2017",
    title: "Foundation",
    description: "Hanzo AI established with a vision of democratizing access to artificial intelligence."
  },
  {
    year: "2019",
    title: "First Platform",
    description: "Released the first version of Hanzo Cloud, focusing on simplicity and developer experience."
  },
  {
    year: "2021",
    title: "Open Source",
    description: "Launched Hanzo DX, our open-source, self-hostable platform for AI application development."
  },
  {
    year: "2023",
    title: "Global Scale",
    description: "Reached planetary scale with infrastructure spanning 65+ regions and 200+ edge locations."
  },
  {
    year: "2025",
    title: "Today",
    description: "Leading the AI revolution with our comprehensive suite of products and services."
  }
];

const ZenTimeline: React.FC = () => {
  return (
    <div className="hz-rel hz-py-7">
      <div className="hz-center-x hz-abs hz-h-full hz-bw-1"></div>
      
      <div className="hz-container-wide">
        {timelineEvents.map((event, index) => (
          <motion.div
            key={event.year}
            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`hz-rel hz-mb-7 hz-row ${index % 2 === 0 ? 'hz-jc-end' : 'hz-jc-start'}`}
          >
            <div className="hz-center-x hz-sq-3 hz-abs hz-r-full hz-bg-raised hz-z-raised"></div>
            
            <div className={` ${index % 2 === 0 ? 'hz-px-6' : 'hz-px-6'}`}>
              <div className="hz-card hz-glass">
                <div className="hz-fg-muted hz-w-bold hz-mb-2">{event.year}</div>
                <h3 className="hz-t-xl hz-fg hz-w-bold hz-mb-2">{event.title}</h3>
                <p className="hz-fg-soft">{event.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ZenTimeline;
