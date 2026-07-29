import React from "react";
import { motion } from "framer-motion";
import ChromeText from "@/components/ui/chrome-text";

interface EfficiencyCardProps {
  title: string;
  mainText: string;
  subText: string;
  initialY: number;
  delay: number;
}

const EfficiencyCard = ({ title, mainText, subText, initialY, delay }: EfficiencyCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: initialY }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="hz-card hz-col hz-ai-center hz-align-center"
    >
      <ChromeText as="h3" className="hz-t-2xl hz-w-bold hz-mb-4">
        {title}
      </ChromeText>
      <p className="hz-fg-soft hz-mb-4">
        {mainText}
      </p>
      <p className="hz-fg-muted">
        {subText}
      </p>
    </motion.div>
  );
};

const EfficiencySection = () => {
  const efficiencyItems = [
    {
      title: "Hardware Efficient",
      mainText: "Datastore processes analytical queries 100-1000x faster than traditional row-oriented systems with the same available I/O throughput and CPU capacity.",
      subText: "Columnar storage format allows fitting more hot data in RAM, which leads to shorter response times.",
      initialY: 30,
      delay: 0
    },
    {
      title: "Maximizes CPU Efficiency",
      mainText: "Vectorized query execution leverages SIMD processor instructions and runtime code generation.",
      subText: "Processing data in columns increases CPU cache line hit rate.",
      initialY: 30,
      delay: 0.2
    },
    {
      title: "Optimizes Disk Access",
      mainText: "Datastore minimizes the number of seeks for range queries to increase efficiency of using disk drives.",
      subText: "Maintains locality of reference for continually stored data.",
      initialY: 30,
      delay: 0.3
    },
    {
      title: "Minimizes Data Transfers",
      mainText: "Datastore enables companies to manage their data and create reports without using specialized networks.",
      subText: "Perfect for high-performance computing at any scale.",
      initialY: 30,
      delay: 0.4
    }
  ];

  return (
    <section className="hz-py-7 hz-px-4">
      <div className="hz-container-wide">
        <div className="hz-align-center hz-mb-7">
          <ChromeText as="h2" className="hz-t-3xl hz-w-bold hz-mb-5">
            Datastore Efficiency
          </ChromeText>
          <p className="hz-container-narrow hz-t-xl hz-fg-soft hz-mb-6">
            Optimized for peak performance at every level
          </p>
        </div>

        <div className="hz-grid hz-grid-2 hz-gap-6">
          {efficiencyItems.map((item, index) => (
            <EfficiencyCard
              key={index}
              title={item.title}
              mainText={item.mainText}
              subText={item.subText}
              initialY={item.initialY}
              delay={item.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EfficiencySection;
