
import React from "react";
import PricingPlan from "./PricingPlan";
import { Shield, Code } from "lucide-react";

const EnterpriseFreePlans = () => {
  const enterprisePlan = {
    name: "Enterprise",
    icon: <Shield className="hz-sq-4 hz-fg-muted" />,
    price: "Custom",
    description: "For large businesses requiring enterprise-grade security",
    features: [
      "Everything in the Team plan",
      "Expanded context window",
      "Highest limits on messaging & features",
      "Enhanced security (CSA, SOC 2, GDPR, CCPA)",
      "User management via SCIM and SSO",
      "Domain verification, user analytics",
      "Custom data retention policies",
      "Dedicated support & account management",
      "Customizable AI Credits"
    ]
  };

  const freePlan = {
    name: "Open Source",
    icon: <Code className="hz-sq-4 hz-fg-muted" />,
    price: "Free",
    billingPeriod: "Forever",
    description: "For individuals wanting full control",
    features: [
      "Completely open source (self-host via GitHub)",
      "Full access to platform capabilities",
      "Unlimited deployments on your hardware",
      "Self-hosted AI models and compute",
      "Real-time web search",
      "Custom GPT usage"
    ]
  };

  return (
    <div className="hz-grid hz-grid-2 hz-container hz-gap-6 hz-mb-7">
      <PricingPlan
        name={enterprisePlan.name}
        icon={enterprisePlan.icon}
        price={enterprisePlan.price}
        description={enterprisePlan.description}
        features={enterprisePlan.features}
      />
      <PricingPlan
        name={freePlan.name}
        icon={freePlan.icon}
        price={freePlan.price}
        billingPeriod={freePlan.billingPeriod}
        description={freePlan.description}
        features={freePlan.features}
        customColor="gray"
      />
    </div>
  );
};

export default EnterpriseFreePlans;
