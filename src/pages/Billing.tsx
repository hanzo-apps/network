
import React, { useState, useEffect } from "react";
import BillingOverview from "@/components/billing/BillingOverview";
import AnimatedSection, { AnimatedHeading } from "@/components/ui/animated-section";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CreditCard, FileText } from "lucide-react";

const BillingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <AnimatedSection>
      <AnimatedHeading>
        <h2 className="hz-t-2xl hz-w-medium hz-mb-6">Billing</h2>
      </AnimatedHeading>

      <div className="hz-mb-6 hz-row hz-wrap hz-gap-4">
        <Button 
          variant="outline" 
          onClick={() => navigate('/account/invoices')}
          className="hz-bg hz-bordered hz-fg hz-row hz-ai-center hz-hoverable"
        >
          <FileText className="hz-sq-2 hz-mr-2" />
          View Billing History
        </Button>
        <Button 
          variant="outline" 
          onClick={() => navigate('/account/billing#payment-methods')}
          className="hz-bg hz-bordered hz-fg hz-row hz-ai-center hz-hoverable"
        >
          <CreditCard className="hz-sq-2 hz-mr-2" />
          Manage Payment Methods
        </Button>
      </div>
      
      <div>
        <BillingOverview />
      </div>
    </AnimatedSection>
  );
};

export default BillingPage;
