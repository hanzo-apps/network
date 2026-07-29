
import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const PricingTier = ({ title, price, description, features, highlight = false, cta = "Get Started" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`hz-bordered hz-r-lg hz-p-6 hz-h-full ${
        highlight 
          ? "hz-border-strong" 
          : "hz-bg-surface"
      }`}
    >
      <h3 className="hz-t-2xl hz-w-semibold hz-mb-2">{title}</h3>
      <div className="hz-mb-4">
        <div className="hz-t-3xl hz-w-bold">{price}</div>
        <p className="hz-fg-muted">{description}</p>
      </div>
      
      <ul className="hz-stack-3 hz-mb-6">
        {features.map((feature, index) => (
          <li key={index} className="hz-row hz-ai-start hz-gap-2">
            <Check className="hz-sq-3 hz-fg-muted hz-mt-1 hz-none" />
            <span className="hz-fg-soft">{feature}</span>
          </li>
        ))}
      </ul>
      
      <Button
        className={`hz-w-full ${
          highlight
            ? "hz-bg-raised hz-fg hz-hoverable"
            : "hz-bg-raised hz-fg hz-hoverable"
        }`}
      >
        {cta}
      </Button>
    </motion.div>
  );
};

const HanzoAppPricing = () => {
  const starterFeatures = [
    "10,000 Predictions / month",
    "then $0.001 per prediction",
    "1GB Storage",
    "Database Backup",
    "1 Week Log Retention",
    "Evaluations & Metrics",
    "Custom Chatbot Branding",
    "Community Support"
  ];
  
  const proFeatures = [
    "Everything in Starter",
    "50,000 Predictions / month",
    "then $0.001 per prediction",
    "10GB Storage",
    "Unlimited Workspaces",
    "Admin Roles & Permissions",
    "3 Months Log Retention",
    "Priority Support"
  ];
  
  const enterpriseFeatures = [
    "On-Premise Deployment",
    "Air-gapped Environments",
    "SSO & SAML",
    "LDAP & RBAC",
    "Versioning",
    "Audit Logs",
    "99.99% Uptime SLA"
  ];

  return (
    <section className="hz-py-7 hz-px-4 hz-bg">
      <div className="hz-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="hz-align-center hz-mb-7"
        >
          <h2 className="hz-t-3xl hz-w-bold hz-mb-4">Pricing</h2>
          <p className="hz-t-xl hz-fg-soft">
            Free 14 day trial. No credit card required.
          </p>
        </motion.div>
        
        <div className="hz-grid hz-grid-3 hz-gap-6">
          <PricingTier 
            title="Starter"
            price="$35/month"
            description="For individuals & small teams"
            features={starterFeatures}
          />
          
          <PricingTier 
            title="Pro"
            price="$65/month"
            description="For medium-sized businesses"
            features={proFeatures}
            highlight={true}
          />
          
          <PricingTier 
            title="Enterprise"
            price="Contact Us"
            description="For large organizations"
            features={enterpriseFeatures}
            cta="Contact Sales"
          />
        </div>
      </div>
    </section>
  );
};

export default HanzoAppPricing;
