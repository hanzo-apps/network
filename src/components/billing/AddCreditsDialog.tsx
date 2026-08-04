
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { useBilling } from '@/contexts/BillingContext';

interface AddCreditsDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddCreditsDialog = ({ isOpen, onClose }: AddCreditsDialogProps) => {
  const { addCredits, refreshBillingInfo } = useBilling();
  const [creditAmount, setCreditAmount] = useState('50');
  
  const handleCreditAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCreditAmount(e.target.value);
  };
  
  const handlePurchaseCredits = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const amount = parseFloat(creditAmount);
    
    if (isNaN(amount) || amount <= 0) {
      toast.error('Please enter a valid amount greater than 0');
      return;
    }
    
    // Simulate credit purchase
    const success = await addCredits(amount);
    
    if (success) {
      onClose();
      refreshBillingInfo();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="hz-card">
      <div className="hz-row hz-jc-between hz-ai-center hz-mb-4">
        <h3 className="hz-t-lg hz-w-medium">Add Credits to Your Account</h3>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="hz-sq-2" />
        </Button>
      </div>
      
      <form onSubmit={handlePurchaseCredits} className="hz-stack-4">
        <div className="hz-stack-2">
          <Label htmlFor="creditAmount">Amount (USD)</Label>
          <div className="hz-rel">
            <div className="hz-abs hz-fg-muted">$</div>
            <Input
              id="creditAmount"
              name="creditAmount"
              placeholder="50"
              value={creditAmount}
              onChange={handleCreditAmountChange}
              className="hz-bg-raised hz-px-6"
            />
          </div>
          <p className="hz-t-sm hz-fg-muted">Minimum amount: $10</p>
        </div>
        
        {/* Preset amounts */}
        <div className="hz-row hz-wrap hz-gap-2 hz-mt-2">
          {['10', '25', '50', '100', '500'].map(amount => (
            <Button
              key={amount}
              type="button"
              variant="outline"
              className={`${
                creditAmount === amount ? 'hz-border-strong hz-bg-raised' : ''
              }`}
              onClick={() => setCreditAmount(amount)}
            >
              ${amount}
            </Button>
          ))}
        </div>
        
        <Button type="submit" className="hz-w-full hz-mt-4">
          Purchase Credits
        </Button>
      </form>
    </div>
  );
};

export default AddCreditsDialog;
