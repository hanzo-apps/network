
import React from "react";
import { Check, X } from "lucide-react";

const FeatureComparison = () => {
  // Features categories and their specific features
  const featureCategories = [
    {
      name: "Platform Access",
      features: [
        { name: "Core Platform Features", pro: true, max: true, team: true, enterprise: true },
        { name: "Unlimited Private Projects", pro: true, max: true, team: true, enterprise: true },
        { name: "Self-hosted Infrastructure", pro: true, max: true, team: true, enterprise: true },
        { name: "Hanzo App Access", pro: false, max: true, team: true, enterprise: true },
        { name: "Unified Team Billing", pro: false, max: false, team: true, enterprise: true },
      ]
    },
    {
      name: "AI Credits",
      features: [
        { name: "AI Credits Included", pro: "1", max: "Up to 10", team: "Up to 10/user", enterprise: "Custom" },
        { name: "Custom AI Resources", pro: false, max: false, team: false, enterprise: true },
      ]
    },
    {
      name: "Security & Management",
      features: [
        { name: "Admin Console", pro: false, max: false, team: true, enterprise: true },
        { name: "User Management", pro: false, max: false, team: true, enterprise: true },
        { name: "Data Exclusion from Training", pro: false, max: false, team: true, enterprise: true },
        { name: "Enhanced Security (SOC 2, GDPR)", pro: false, max: false, team: false, enterprise: true },
        { name: "Custom Data Retention", pro: false, max: false, team: false, enterprise: true },
      ]
    },
    {
      name: "Support",
      features: [
        { name: "Community Support", pro: true, max: true, team: true, enterprise: true },
        { name: "Standard Support", pro: false, max: true, team: true, enterprise: true },
        { name: "Priority Support", pro: false, max: false, team: true, enterprise: true },
        { name: "Dedicated Account Manager", pro: false, max: false, team: false, enterprise: true },
      ]
    }
  ];

  // Helper function to render feature value
  const renderFeatureValue = (value: boolean | string) => {
    if (typeof value === "boolean") {
      return value ? (
        <Check className="hz-sq-3 hz-fg-soft hz-mx-auto" />
      ) : (
        <X className="hz-sq-3 hz-fg-faint hz-mx-auto" />
      );
    }
    return <span className="hz-fg-soft hz-align-center">{value}</span>;
  };

  return (
    <div className="hz-container hz-mt-7 hz-mb-7">
      <h2 className="hz-t-2xl hz-w-bold hz-mb-6 hz-align-center">Compare Features Across Plans</h2>
      
      <div className="hz-scroll-x">
        <table className="hz-w-full">
          <thead>
            <tr className="hz-border-b">
              <th className="hz-py-4 hz-px-4 hz-align-left">Feature</th>
              <th className="hz-py-4 hz-px-5 hz-align-center">Pro</th>
              <th className="hz-py-4 hz-px-5 hz-align-center">Max</th>
              <th className="hz-py-4 hz-px-5 hz-align-center">Team</th>
              <th className="hz-py-4 hz-px-5 hz-align-center">Enterprise</th>
            </tr>
          </thead>
          <tbody>
            {featureCategories.map((category) => (
              <React.Fragment key={category.name}>
                <tr className="hz-bg-surface">
                  <td colSpan={5} className="hz-py-3 hz-px-4 hz-w-medium hz-fg-soft">
                    {category.name}
                  </td>
                </tr>
                {category.features.map((feature) => (
                  <tr key={feature.name} className="hz-border-b">
                    <td className="hz-py-3 hz-px-4 hz-fg-muted">{feature.name}</td>
                    <td className="hz-py-3 hz-px-5">{renderFeatureValue(feature.pro)}</td>
                    <td className="hz-py-3 hz-px-5">{renderFeatureValue(feature.max)}</td>
                    <td className="hz-py-3 hz-px-5">{renderFeatureValue(feature.team)}</td>
                    <td className="hz-py-3 hz-px-5">{renderFeatureValue(feature.enterprise)}</td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FeatureComparison;
