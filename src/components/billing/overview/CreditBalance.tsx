
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useBilling } from '@/contexts/BillingContext';

const CreditBalance = () => {
  const { billingInfo } = useBilling();
  const navigate = useNavigate();
  
  const handleAddCredits = () => {
    navigate('/account/purchase-credits');
  };

  return (
    <div className="hz-card">
      <div className="hz-row hz-jc-between hz-ai-center hz-mb-4">
        <h3 className="hz-t-xl hz-w-medium">Credit Balance</h3>
        <Button onClick={handleAddCredits}>
          <Plus className="hz-sq-2 hz-mr-2" />
          Add Credits
        </Button>
      </div>
      
      <div className="hz-row hz-ai-center">
        <div className="hz-sq-8 hz-bg-raised hz-r-full hz-row hz-ai-center hz-jc-center hz-mr-4">
          <span className="hz-t-2xl hz-w-bold hz-fg-soft">$</span>
        </div>
        <div>
          <div className="hz-t-3xl hz-w-bold">${billingInfo.credits.toFixed(2)}</div>
          <div className="hz-t-sm hz-fg-muted hz-mt-1">Available credits</div>
        </div>
      </div>
    </div>
  );
};

export default CreditBalance;
