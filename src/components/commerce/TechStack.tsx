
import React from "react";
import { Server, Database, Shield, Zap, Layers, GitBranch } from "lucide-react";

interface TechCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const TechCard = ({ icon, title, description }: TechCardProps) => {
  return (
    <div className="hz-card hz-transition hz-card-interactive">
      <div className="hz-mb-4">
        {icon}
      </div>
      <h3 className="hz-t-xl hz-w-semibold hz-mb-2">{title}</h3>
      <p className="hz-fg-muted">{description}</p>
    </div>
  );
};

const TechStack = () => {
  const techItems = [
    {
      icon: <Server className="hz-sq-5 hz-fg-muted" />,
      title: "Cloud-Native Architecture",
      description: "Built on serverless infrastructure that scales automatically with your business demands."
    },
    {
      icon: <Database className="hz-sq-5 hz-fg-muted" />,
      title: "Real-time Data",
      description: "Access to real-time inventory, pricing, and customer data across all sales channels."
    },
    {
      icon: <Shield className="hz-sq-5 hz-fg-muted" />,
      title: "Enterprise Security",
      description: "PCI-compliant infrastructure with encryption at rest and in transit for all sensitive data."
    },
    {
      icon: <Zap className="hz-sq-5 hz-fg-muted" />,
      title: "High Performance",
      description: "Low latency APIs with global CDN distribution for lightning-fast experiences."
    },
    {
      icon: <Layers className="hz-sq-5 hz-fg-muted" />,
      title: "Composable Architecture",
      description: "Mix and match components to create custom solutions tailored to your specific needs."
    },
    {
      icon: <GitBranch className="hz-sq-5 hz-fg-muted" />,
      title: "Developer Workflow",
      description: "Full CI/CD support with staging environments and version control integration."
    }
  ];

  return (
    <section className="hz-py-7">
      <div className="hz-container hz-mx-auto hz-px-4">
        <div className="hz-align-center hz-mb-7">
          <h2 className="hz-t-3xl hz-w-bold">Technology Stack</h2>
          <p className="hz-container-narrow hz-mw-md hz-mt-4 hz-fg-muted">
            Built on modern technologies for performance, security, and scalability.
          </p>
        </div>
        
        <div className="hz-grid hz-grid-3 hz-gap-5">
          {techItems.map((item, index) => (
            <TechCard
              key={index}
              icon={item.icon}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
