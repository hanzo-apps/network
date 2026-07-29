
import React from 'react';
import { CreditCard, ArrowRight } from 'lucide-react';
import BillingTabsLink from '../BillingTabsLink';

const PaymentMethodSummary = () => {
  return (
    <div className="hz-card">
      <div className="hz-row hz-jc-between hz-ai-center hz-mb-4">
        <h3 className="hz-t-xl hz-w-medium">Payment Method</h3>
        <BillingTabsLink tabId="payment-methods">
          <span className="hz-row hz-ai-center">
            Manage <ArrowRight className="hz-sq-2 hz-ml-2" />
          </span>
        </BillingTabsLink>
      </div>
      <div className="hz-row hz-ai-center">
        <div className="hz-bh-6 hz-bw-7 hz-bg-raised hz-r-md hz-row hz-ai-center hz-jc-center hz-mr-4">
          <CreditCard className="hz-sq-4 hz-fg-muted" />
        </div>
        <div>
          <div className="hz-w-medium">Visa ending in 4242</div>
          <div className="hz-t-sm hz-fg-muted">Expires 12/25</div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodSummary;
