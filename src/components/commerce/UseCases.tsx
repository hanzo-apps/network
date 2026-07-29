
import React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UseCaseCardProps {
  title: string;
  description: string;
  image?: string;
  color: string;
  index: number;
}

const UseCaseCard = ({ title, description, image, color, index }: UseCaseCardProps) => {
  return (
    <div className={`hz-rel hz-clip hz-r-lg hz-bordered ${index % 2 === 0 ? '' : ''} hz-col hz-h-full`}>
      <div className="hz-w-full hz-p-6 hz-col hz-jc-center">
        <h3 className={`hz-t-2xl hz-w-bold hz-mb-4${color}-400`}>{title}</h3>
        <p className="hz-fg-muted hz-mb-4">{description}</p>
        <Button variant="link" size="sm" className="hz-fg-muted hz-p-0 hz-w-fit hz-link">
          Learn more <ArrowRight className="hz-sq-2 hz-ml-1" />
        </Button>
      </div>
      <div className="hz-w-full hz-bg-surface hz-bh-8 hz-rel hz-clip">
        <div className={`hz-abs hz-inset${color}hz-dim-more`}></div>
        <div className="hz-abs hz-inset hz-row hz-ai-center hz-jc-center">
          <div className={`${color}-400 hz-t-7xl hz-dim-more hz-w-bold`}>{index + 1}</div>
        </div>
      </div>
    </div>
  );
};

const UseCases = () => {
  const useCases = [
    {
      title: "Direct-to-Consumer (DTC) Brands",
      description: "Create unique shopping experiences that reflect your brand identity with custom storefronts powered by our API-first platform.",
      color: "amber"
    },
    {
      title: "Multi-channel Retailers",
      description: "Sell seamlessly across web, mobile, social media, and marketplaces with a unified backend for inventory and orders.",
      color: "amber"
    },
    {
      title: "Subscription Businesses",
      description: "Build flexible subscription models with automated recurring billing, customizable frequencies, and easy customer management.",
      color: "amber"
    },
    {
      title: "Enterprise B2B Commerce",
      description: "Power complex B2B sales with account-based pricing, bulk ordering, approval workflows, and personalized catalogs.",
      color: "amber"
    }
  ];

  return (
    <section className="hz-py-7 hz-bg">
      <div className="hz-container hz-mx-auto hz-px-4">
        <div className="hz-align-center hz-mb-7">
          <h2 className="hz-t-3xl hz-w-bold">Use Cases</h2>
          <p className="hz-container-narrow hz-mw-md hz-mt-4 hz-fg-muted">
            See how businesses leverage Hanzo Commerce to create exceptional shopping experiences.
          </p>
        </div>
        
        <div className="hz-grid hz-gap-6">
          {useCases.map((useCase, index) => (
            <UseCaseCard
              key={index}
              title={useCase.title}
              description={useCase.description}
              color={useCase.color}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCases;
