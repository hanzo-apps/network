import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import UsageOverview from "@/components/usage/UsageOverview";
import ProjectUsage from "@/components/usage/ProjectUsage";
import ResourceBreakdown from "@/components/usage/ResourceBreakdown";
import DateRangePicker from "@/components/usage/DateRangePicker";
import AnimatedSection, { AnimatedHeading } from "@/components/ui/animated-section";

const Usage = () => {
  const [dateRange, setDateRange] = useState({ start: "Mar 7", end: "Mar 8" });

  return (
    <div className="hz-min-h-screen hz-bg hz-fg">
      <Navbar />
      
      <main className="hz-pt-6 hz-pb-6 hz-px-4">
        <div className="hz-container-wide">
          <AnimatedSection>
            <div className="hz-row hz-jc-between hz-ai-center hz-mb-6">
              <AnimatedHeading>Usage</AnimatedHeading>
              <DateRangePicker 
                dateRange={dateRange} 
                onDateRangeChange={setDateRange} 
              />
            </div>

            <UsageOverview 
              dateRange={dateRange}
              currentUsage="$0.04"
              discounts="$0.00"
              creditsUsed="$0.00"
              estimatedCost="$0.07"
              creditsAvailable="5.00"
              creditsRequired="0.00"
            />
            
            <div className="hz-mt-7">
              <h2 className="hz-t-2xl hz-w-bold hz-mb-5">Usage by Project</h2>
              <ProjectUsage />
            </div>

            <div className="hz-mt-7">
              <h2 className="hz-t-2xl hz-w-bold hz-mb-5">Resource Breakdown</h2>
              <ResourceBreakdown />
            </div>
          </AnimatedSection>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Usage;

