
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { useBilling } from '@/contexts/BillingContext';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import AnimatedSection, { AnimatedHeading } from '@/components/ui/animated-section';

const PurchaseCredits = () => {
  const { addCredits } = useBilling();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [creditAmount, setCreditAmount] = useState('50');

  const handleCreditAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCreditAmount(e.target.value);
  };

  const handlePurchaseCredits = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    const amount = parseFloat(creditAmount);
    
    if (isNaN(amount) || amount <= 0) {
      toast.error('Please enter a valid amount greater than 0');
      setIsProcessing(false);
      return;
    }
    
    // Simulate credit purchase
    const success = await addCredits(amount);
    
    if (success) {
      toast.success(`Successfully purchased $${amount} in credits!`);
      navigate('/account/billing');
    } else {
      toast.error('Failed to process payment');
    }
    
    setIsProcessing(false);
  };

  return (
    <AnimatedSection>
      <div className="hz-stack-5">
        <div className="hz-row hz-ai-center hz-mb-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/account/billing')} 
            className="hz-mr-4 hz-hoverable"
          >
            <ArrowLeft className="hz-sq-2 hz-mr-2" />
            Back to Billing
          </Button>
        </div>
        
        <AnimatedHeading>
          <h2 className="hz-t-2xl hz-w-bold hz-mb-5">Purchase Credits</h2>
        </AnimatedHeading>

        <div className="hz-grid hz-grid-5 hz-gap-6">
          <div className="">
            <div className="hz-bg hz-border-none hz-r-lg hz-p-5 hz-stack-5">
              <form onSubmit={handlePurchaseCredits} className="hz-stack-5">
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
                      className="hz-bg-surface hz-px-6"
                    />
                  </div>
                  <p className="hz-t-sm hz-fg-muted">Minimum amount: $10</p>
                </div>
                
                {/* Preset amounts */}
                <div className="hz-row hz-wrap hz-gap-2 hz-mt-4">
                  {['10', '25', '50', '100', '500'].map(amount => (
                    <Button
                      key={amount}
                      type="button"
                      variant="outline"
                      className={`hz-bg hz-hoverable ${
                        creditAmount === amount ? 'hz-border-strong hz-bg-raised' : ''
                      }`}
                      onClick={() => setCreditAmount(amount)}
                    >
                      ${amount}
                    </Button>
                  ))}
                </div>

                <div className="hz-stack-4">
                  <Label htmlFor="card">Payment Method</Label>
                  <div className="hz-p-4 hz-border-none hz-r-lg hz-bg-surface hz-row hz-ai-center">
                    <div className="hz-bh-6 hz-bw-7 hz-bg-surface hz-r-md hz-row hz-ai-center hz-jc-center hz-mr-4">
                      <div className="hz-fg-muted hz-w-bold hz-t-xs">VISA</div>
                    </div>
                    <div>
                      <div className="hz-w-medium">
                        Visa ending in 4242
                        <span className="hz-ml-2 hz-t-xs hz-bg-raised hz-fg-soft hz-px-2 hz-py-1 hz-r-full">
                          Default
                        </span>
                      </div>
                      <div className="hz-t-sm hz-fg-muted">Expires 12/25</div>
                    </div>
                  </div>
                </div>
                
                <div className="hz-row hz-ai-center hz-inline-2 hz-pt-4">
                  <Checkbox id="terms" checked={true} />
                  <Label htmlFor="terms" className="hz-t-sm hz-fg-muted">
                    I agree to the terms and conditions
                  </Label>
                </div>
                
                <Button 
                  type="submit" 
                  className="hz-w-full hz-bg-surface hz-border-none hz-hoverable" 
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Processing...' : 'Purchase Credits'}
                </Button>
              </form>
            </div>
          </div>
          
          <div className="">
            <div className="hz-bg hz-border-none hz-r-lg hz-p-5 hz-stack-4">
              <h3 className="hz-t-lg hz-w-medium">Order Summary</h3>
              
              <div className="hz-stack-2">
                <div className="hz-row hz-jc-between hz-py-2">
                  <span>Credits</span>
                  <span className="hz-w-medium">${creditAmount}</span>
                </div>
                <div className="hz-row hz-jc-between hz-py-2 hz-border-t">
                  <span>Subtotal</span>
                  <span className="hz-w-medium">${creditAmount}</span>
                </div>
                <div className="hz-row hz-jc-between hz-py-2">
                  <span>Tax</span>
                  <span className="hz-w-medium">$0.00</span>
                </div>
                <div className="hz-row hz-jc-between hz-py-2 hz-border-t">
                  <span className="hz-w-bold">Total</span>
                  <span className="hz-w-bold">${creditAmount}</span>
                </div>
              </div>
              
              <div className="hz-pt-4 hz-t-sm hz-fg-muted">
                <p>Credits never expire and can be used for any Hanzo AI service.</p>
                <p className="hz-mt-2">Need help? Contact our support team.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default PurchaseCredits;
