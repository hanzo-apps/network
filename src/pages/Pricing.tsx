import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PricingHeader from "@/components/pricing/PricingHeader";
import PersonalPlans from "@/components/pricing/PersonalPlans";
import TeamEnterprisePlans from "@/components/pricing/TeamEnterprisePlans";
import APIPricing from "@/components/pricing/APIPricing";
import FeatureComparison from "@/components/pricing/FeatureComparison";
import PricingFAQ from "@/components/pricing/PricingFAQ";
import BillingManagement from "@/components/pricing/BillingManagement";

const PricingPlans = () => {
  const [activeTab, setActiveTab] = useState("personal");

  const tabs = [
    { id: "personal", label: "Personal" },
    { id: "team", label: "Team & Enterprise" },
    { id: "api", label: "API" }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "personal":
        return (
          <>
            <PersonalPlans />
            <FeatureComparison />
            <PricingFAQ />
            <BillingManagement />
          </>
        );
      case "team":
        return (
          <>
            <TeamEnterprisePlans />
            <FeatureComparison />
            <PricingFAQ />
            <BillingManagement />
          </>
        );
      case "api":
        return <APIPricing />;
      default:
        return <PersonalPlans />;
    }
  };

  return (
    <div className="hz-min-h-screen hz-bg hz-fg">
      <Navbar />
      
      <main className="hz-pt-6 hz-pb-6 hz-px-4">
        <PricingHeader />
        
        {/* Tab Navigation */}
        <div className="hz-container-narrow hz-mb-7">
          <div className="hz-row hz-jc-center">
            <div className="hz-bg-surface hz-r-full hz-p-1 hz-bordered">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`hz-px-5 hz-py-3 hz-r-full hz-t-sm hz-w-medium hz-transition ${
                    activeTab === tab.id
                      ? "hz-bg-inverse hz-fg-inverse"
                      : "hz-fg-muted hz-link"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        {renderTabContent()}
      </main>

      <Footer />
    </div>
  );
};

export default PricingPlans;