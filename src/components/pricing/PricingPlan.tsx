
import React from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

interface PricingPlanProps {
  name: string;
  icon: React.ReactNode;
  price: string;
  billingPeriod?: string;
  description: string;
  features: string[];
  popular?: boolean;
  customColor?: string;
  showDetails?: boolean;
  githubLink?: boolean;
}

const PricingPlan = ({
  name,
  icon,
  price,
  billingPeriod,
  description,
  features,
  popular = false,
  customColor,
  showDetails = false,
  githubLink = false
}: PricingPlanProps) => {
  // Use monochrome design
  const borderColor = popular 
    ? "hz-bordered" 
    : "hz-bordered";
  
  const bgColor = popular 
    ? "hz-bg-surface" 
    : "hz-bg-surface";

  // Button color - prominent option gets white bg, others get outline
  const buttonClass = popular 
    ? "hz-btn-primary hz-transition"
    : "hz-bordered hz-fg hz-transition";

  const renderButton = () => {
    if (githubLink || name === "Dev") {
      return (
        <Button
          className={`hz-w-full hz-mb-6 ${buttonClass}`}
          onClick={() => {
            window.open('https://github.com/hanzoai/', '_blank');
          }}
        >
          Get on GitHub
        </Button>
      );
    } else if (name === "Team" && showDetails) {
      return (
        <Button
          className={`hz-w-full hz-mb-6 ${buttonClass}`}
          onClick={() => {
            const teamConfigSection = document.getElementById('team-config-section');
            if (teamConfigSection) {
              teamConfigSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
          Configure Plan
        </Button>
      );
    } else if (name === "Pro" && showDetails) {
      return (
        <Button
          className={`hz-w-full hz-mb-6 ${buttonClass}`}
          onClick={() => {
            const teamConfigSection = document.getElementById('team-config-section');
            if (teamConfigSection) {
              window.history.pushState({}, '', window.location.pathname + '?from=pro');
              teamConfigSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
          Get Started
        </Button>
      );
    } else {
      return (
        <Button className={`hz-w-full hz-mb-6 ${buttonClass}`}>
          Get Started
        </Button>
      );
    }
  };

  return (
    <div 
      className={`hz-rel hz-r-xl hz-bordered ${borderColor} ${bgColor} hz-p-6 hz-glass hz-transition hz-hoverable`}
    >
      {popular && (
        <div className="hz-center-x hz-abs">
          <div className="hz-bg-inverse hz-fg-inverse hz-px-3 hz-py-1 hz-r-full hz-t-sm hz-w-medium">
            Most Popular
          </div>
        </div>
      )}

      <div className="hz-row hz-ai-center hz-gap-3 hz-mb-4">
        {icon}
        <h3 className="hz-t-xl hz-w-semibold">{name}</h3>
      </div>
      
      <div className="hz-mb-5">
        <div className="hz-row hz-ai-baseline hz-gap-1 hz-mb-2">
          <span className="hz-t-4xl hz-w-bold">{price}</span>
          {billingPeriod && (
            <span className="hz-fg-muted">{billingPeriod}</span>
          )}
        </div>
        <p className="hz-fg-muted">{description}</p>
      </div>

      {renderButton()}

      <ul className="hz-stack-4">
        {features.map((feature) => (
          <li key={feature} className="hz-row hz-ai-start hz-gap-3">
            <Check className="hz-sq-3 hz-fg-muted hz-mt-1 hz-none" />
            <span className="hz-fg-soft">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PricingPlan;
