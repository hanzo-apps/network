
import React from "react";
import { Button } from "@/components/ui/button";
import { CreditCard } from "lucide-react";

const BillingManagement = () => {
  return (
    <div className="hz-container-narrow hz-card hz-mb-7 hz-glass hz-transition hz-card-interactive">
      <div className="hz-row hz-ai-center hz-gap-4 hz-mb-4">
        <CreditCard className="hz-sq-5 hz-fg" />
        <h2 className="hz-t-2xl hz-w-medium">Billing Management</h2>
      </div>
      <p className="hz-fg-soft hz-mb-5 hz-leading-relaxed">
        Manage your subscription easily. Need assistance? Join our Discord server for immediate support.
      </p>
      <div className="hz-row hz-wrap hz-gap-4">
        <Button className="hz-bg hz-fg hz-bordered hz-px-5 hz-py-5 hz-hoverable">
          Manage Subscription
        </Button>
        <Button 
          variant="outline" 
          className="hz-px-5 hz-py-5 hz-hoverable"
          onClick={() => window.open('https://discord.com/invite/XthHQQj', '_blank')}
        >
          Join Discord
        </Button>
      </div>
    </div>
  );
};

export default BillingManagement;
