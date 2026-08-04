
import React from "react";
import ChromeText from "@/components/ui/chrome-text";

const PricingHeader = () => {
  return (
    <div className="hz-container-narrow hz-align-center hz-mb-7">
      <ChromeText 
        as="h1" 
        className="hz-t-4xl hz-w-bold hz-mb-5"
        preHeading="Simple & Transparent"
      >
        Pricing
      </ChromeText>
    </div>
  );
};

export default PricingHeader;
