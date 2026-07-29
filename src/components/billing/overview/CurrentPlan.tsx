
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const CurrentPlan = () => {
  const navigate = useNavigate();
  
  const handleUpgradePlan = () => {
    navigate('/account/billing-plans');
  };

  return (
    <div className="hz-card">
      <h3 className="hz-t-xl hz-w-medium hz-mb-4">Current Plan</h3>
      <div className="hz-row hz-ai-center hz-jc-between">
        <div>
          <div className="hz-t-2xl hz-w-bold">Pro Plan</div>
          <div className="hz-fg-muted hz-mt-1">$49/month, billed annually</div>
        </div>
        <Button onClick={handleUpgradePlan}>Upgrade Plan</Button>
      </div>
      <div className="hz-mt-5 hz-pt-6 hz-border-t hz-row hz-ai-center hz-jc-between">
        <div className="hz-fg-muted">Next billing date: July 15, 2024</div>
        <Button variant="outline" size="sm">Cancel Subscription</Button>
      </div>
    </div>
  );
};

export default CurrentPlan;
