
import React from 'react';
import { Mail, User, DollarSign, Clock } from 'lucide-react';
import { ReferralStats } from './types';

interface ReferralStatsProps {
  referralStats: ReferralStats;
}

const ReferralStatsComponent = ({ referralStats }: ReferralStatsProps) => {
  return (
    <div className="hz-grid hz-grid-4 hz-gap-5">
      <div className="hz-card">
        <div className="hz-row hz-ai-center hz-gap-4">
          <div className="hz-sq-7 hz-r-full hz-bg-raised hz-row hz-ai-center hz-jc-center">
            <Mail className="hz-sq-4 hz-fg-muted" />
          </div>
          <div>
            <div className="hz-t-sm hz-fg-muted">Total Invited</div>
            <div className="hz-t-2xl hz-w-bold">{referralStats.totalInvited}</div>
          </div>
        </div>
      </div>
      
      <div className="hz-card">
        <div className="hz-row hz-ai-center hz-gap-4">
          <div className="hz-sq-7 hz-r-full hz-bg-raised hz-row hz-ai-center hz-jc-center">
            <User className="hz-sq-4 hz-fg-muted" />
          </div>
          <div>
            <div className="hz-t-sm hz-fg-muted">Signed Up</div>
            <div className="hz-t-2xl hz-w-bold">{referralStats.signedUp}</div>
          </div>
        </div>
      </div>
      
      <div className="hz-card">
        <div className="hz-row hz-ai-center hz-gap-4">
          <div className="hz-sq-7 hz-r-full hz-bg-raised hz-row hz-ai-center hz-jc-center">
            <DollarSign className="hz-sq-4 hz-fg-muted" />
          </div>
          <div>
            <div className="hz-t-sm hz-fg-muted">Credits Earned</div>
            <div className="hz-t-2xl hz-w-bold">${referralStats.creditsEarned}</div>
          </div>
        </div>
      </div>
      
      <div className="hz-card">
        <div className="hz-row hz-ai-center hz-gap-4">
          <div className="hz-sq-7 hz-r-full hz-bg-raised hz-row hz-ai-center hz-jc-center">
            <Clock className="hz-sq-4 hz-fg-muted" />
          </div>
          <div>
            <div className="hz-t-sm hz-fg-muted">Pending</div>
            <div className="hz-t-2xl hz-w-bold">{referralStats.pending}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferralStatsComponent;
