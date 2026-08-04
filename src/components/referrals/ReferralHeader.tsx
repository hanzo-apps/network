
import React from 'react';
import { Gift } from 'lucide-react';

const ReferralHeader = () => {
  return (
    <div className="hz-col-row hz-card hz-ai-center hz-jc-between hz-gap-5">
      <div className="hz-row hz-ai-center hz-gap-5">
        <div className="hz-sq-8 hz-r-full hz-bg-raised hz-bordered hz-border-strong hz-row hz-ai-center hz-jc-center hz-none">
          <Gift className="hz-sq-5 hz-fg-soft" />
        </div>
        <div className="hz-align-center">
          <h1 className="hz-t-3xl hz-w-bold hz-mb-2">Referral Program</h1>
          <p className="hz-t-lg hz-fg-soft">Get $5 in credits for every friend who signs up and pays for any plan</p>
        </div>
      </div>
    </div>
  );
};

export default ReferralHeader;
