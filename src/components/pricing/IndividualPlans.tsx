
import React, { useEffect, useState } from "react";
import PricingPlan from "./PricingPlan";
import { Code, Users, Zap } from "lucide-react";
import TeamPlanDetails from "./TeamPlanDetails";

const IndividualPlans = () => {
  const [fromProPlan, setFromProPlan] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setFromProPlan(urlParams.get('from') === 'pro');
    window.history.replaceState({}, '', window.location.pathname);
  }, []);

  const plans = [
    {
      name: "Pro",
      icon: <Code className="hz-sq-4 hz-fg-muted" />,
      price: "$20",
      billingPeriod: "/month",
      description: "Ideal for hobbyists and occasional use",
      features: [
        "All core Hanzo platform features",
        "Unlimited private projects",
        "Unlimited deployments",
        "Self-hosted on your infrastructure",
        "Full deployment functionality",
        "Hanzo integration",
        "Automated backups",
        "All upcoming feature updates",
        "1 AI Credit"
      ]
    },
    {
      name: "Max",
      icon: <Zap className="hz-sq-4 hz-fg-muted" />,
      price: "$200",
      billingPeriod: "/month",
      description: "For professionals and small businesses",
      popular: true,
      features: [
        "Everything in the Pro plan",
        "Extended messaging and data analysis",
        "Full access to Hanzo App, Chat, Dev",
        "Integration with Hanzo Models",
        "Image generation",
        "Real-time web search",
        "Access to deep research models",
        "Up to 10 AI Credits (Adjustable)"
      ],
      showDetails: true
    },
    {
      name: "Team",
      icon: <Users className="hz-sq-4 hz-fg-muted" />,
      price: "$30",
      billingPeriod: "/user/month",
      description: "Collaborative teams requiring unified billing",
      features: [
        "Everything in the Max plan",
        "Higher message limits",
        "Advanced collaborative workspace",
        "Secure workspace with admin console",
        "Unified team billing",
        "Team data excluded from training",
        "Custom GPT creation and sharing",
        "Up to 10 AI Credits per user (Adjustable)"
      ],
      showDetails: true
    }
  ];

  return (
    <div className="hz-container hz-mb-7">
      <div className="hz-grid hz-grid-3 hz-gap-6 hz-mb-6">
        {plans.map((plan) => (
          <PricingPlan
            key={plan.name}
            name={plan.name}
            icon={plan.icon}
            price={plan.price}
            billingPeriod={plan.billingPeriod}
            description={plan.description}
            features={plan.features}
            popular={plan.popular}
            showDetails={plan.showDetails}
          />
        ))}
      </div>
      
      <TeamPlanDetails fromProPlan={fromProPlan} />
    </div>
  );
};

export default IndividualPlans;
