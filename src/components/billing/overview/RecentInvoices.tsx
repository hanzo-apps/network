
import React from 'react';
import { Clock, Download, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BillingTabsLink from '../BillingTabsLink';

const RecentInvoices = () => {
  return (
    <div className="hz-card">
      <div className="hz-row hz-jc-between hz-ai-center hz-mb-4">
        <h3 className="hz-t-xl hz-w-medium">Recent Invoices</h3>
        <BillingTabsLink tabId="history">
          <span className="hz-row hz-ai-center">
            View All <ArrowRight className="hz-sq-2 hz-ml-2" />
          </span>
        </BillingTabsLink>
      </div>
      
      <div className="hz-stack-4">
        <div className="hz-row hz-ai-center hz-jc-between hz-p-4 hz-bg-raised hz-r-lg">
          <div className="hz-row hz-ai-center">
            <Clock className="hz-sq-3 hz-fg-muted hz-mr-3" />
            <div>
              <div className="hz-w-medium">June 15, 2024</div>
              <div className="hz-t-sm hz-fg-muted">Pro Plan - $49.00</div>
            </div>
          </div>
          <Button variant="ghost" size="sm">
            <Download className="hz-sq-2 hz-mr-2" />
            PDF
          </Button>
        </div>
        
        <div className="hz-row hz-ai-center hz-jc-between hz-p-4 hz-bg-raised hz-r-lg">
          <div className="hz-row hz-ai-center">
            <Clock className="hz-sq-3 hz-fg-muted hz-mr-3" />
            <div>
              <div className="hz-w-medium">May 15, 2024</div>
              <div className="hz-t-sm hz-fg-muted">Pro Plan - $49.00</div>
            </div>
          </div>
          <Button variant="ghost" size="sm">
            <Download className="hz-sq-2 hz-mr-2" />
            PDF
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RecentInvoices;
