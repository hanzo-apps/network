import React from "react";
import { motion } from "framer-motion";
import { Activity, BarChart, Clock, ShoppingCart, Shield, Lightbulb, Signal, LineChart, Gamepad2, Cpu, Network, Users } from "lucide-react";
import ChromeText from "@/components/ui/chrome-text";

const UseCasesSection = () => {
  const useCases = [
    { name: "Web and app analytics", icon: BarChart },
    { name: "E-commerce and finance", icon: ShoppingCart },
    { name: "Time series", icon: Clock },
    { name: "Advertising networks and RTB", icon: Network },
    { name: "Information security", icon: Shield },
    { name: "Business intelligence", icon: Lightbulb },
    { name: "Telecommunications", icon: Signal },
    { name: "Monitoring and telemetry", icon: LineChart },
    { name: "Online games", icon: Gamepad2 },
    { name: "Internet of Things (IoT)", icon: Cpu },
    { name: "Observability", icon: Activity },
    { name: "User behavior analytics", icon: Users }
  ];

  return (
    <section className="hz-py-7 hz-px-4 hz-bg hz-rel">
      <div className="hz-abs hz-inset hz-dim-more hz-no-pointer"></div>

      <div className="hz-container-wide hz-rel hz-z-raised">
        <div className="hz-align-center hz-mb-7">
          <ChromeText as="h2" className="hz-t-3xl hz-w-bold hz-mb-5">
            Datastore at Scale
          </ChromeText>
          <p className="hz-container-narrow hz-t-xl hz-fg-soft hz-mb-6">
            Powering a wide range of applications across industries with unmatched performance
          </p>
        </div>

        <div className="hz-grid hz-grid-4 hz-gap-5">
          {useCases.map((useCase, index) => {
            const Icon = useCase.icon;
            return (
              <motion.div
                key={useCase.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="hz-card hz-align-center hz-col hz-ai-center hz-transition hz-card-interactive"
              >
                <Icon className="hz-sq-5 hz-fg-muted hz-mb-3" />
                <p className="hz-fg-soft">{useCase.name}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default UseCasesSection;
