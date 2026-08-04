
import React from 'react';
import { Shield, Database, Server } from "lucide-react";
import ChromeText from "@/components/ui/chrome-text";

const EnterpriseFeature = ({ icon: Icon, title, description }) => {
  return (
    <div className="hz-card hz-col hz-ai-center hz-align-center">
      <Icon className="hz-sq-7 hz-fg-muted hz-mb-4" />
      <h3 className="hz-t-xl hz-w-bold hz-mb-2">{title}</h3>
      <p className="hz-fg-soft">
        {description}
      </p>
    </div>
  );
};

const MachinesEnterprise = () => {
  const features = [
    {
      icon: Shield,
      title: "Security & Compliance",
      description: "SOC 2, HIPAA, and GDPR compliant infrastructure with hardware-level isolation."
    },
    {
      icon: Database,
      title: "Data Sovereignty",
      description: "Regional deployment options to meet data residency and sovereignty requirements."
    },
    {
      icon: Server,
      title: "Reserved Capacity",
      description: "Guaranteed availability with capacity reservations for critical workloads."
    }
  ];

  return (
    <section className="hz-py-7">
      <div className="hz-container">
        <div className="hz-align-center hz-mb-7">
          <ChromeText as="h2" className="hz-t-3xl hz-w-bold hz-mb-4">
            Enterprise-Grade Infrastructure
          </ChromeText>
          <p className="hz-container-narrow hz-t-xl hz-fg-soft">
            Built for organizations with the most demanding requirements
          </p>
        </div>
        
        <div className="hz-grid hz-grid-3 hz-gap-6">
          {features.map((feature, index) => (
            <EnterpriseFeature
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MachinesEnterprise;
