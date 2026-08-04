
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useBilling } from "@/contexts/BillingContext";
import { CreditCard, Loader2 } from "lucide-react";

interface PurchaseCreditsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PREDEFINED_AMOUNTS = [10, 25, 50, 100];

const PurchaseCreditsDialog = ({ open, onOpenChange }: PurchaseCreditsDialogProps) => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const { addCredits } = useBilling();

  const handlePurchase = async () => {
    const amount = selectedAmount || parseFloat(customAmount);
    if (!amount || amount <= 0) return;

    setIsProcessing(true);
    try {
      const success = await addCredits(amount);
      if (success) {
        onOpenChange(false);
        setSelectedAmount(null);
        setCustomAmount("");
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSelectAmount = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAmount(null);
    setCustomAmount(e.target.value);
  };

  const getEffectiveAmount = (): number => {
    if (selectedAmount) return selectedAmount;
    const parsed = parseFloat(customAmount);
    return !isNaN(parsed) ? parsed : 0;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="hz-bg">
        <DialogHeader>
          <DialogTitle className="hz-t-xl">Purchase Credits</DialogTitle>
          <DialogDescription>
            Add more credits to your account. Credits are used for resource usage.
          </DialogDescription>
        </DialogHeader>

        <div className="hz-stack-5 hz-py-4">
          <div>
            <Label className="hz-fg-muted hz-mb-2">Select an amount</Label>
            <div className="hz-grid hz-grid-2 hz-gap-3">
              {PREDEFINED_AMOUNTS.map((amount) => (
                <Button
                  key={amount}
                  type="button"
                  variant={selectedAmount === amount ? "default" : "outline"}
                  onClick={() => handleSelectAmount(amount)}
                  className={`${
                    selectedAmount === amount
                      ? "hz-bg-raised hz-fg hz-hoverable"
                      : "hz-fg"
                  }`}
                >
                  ${amount}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="custom-amount" className="hz-fg-muted hz-mb-2">
              Or enter a custom amount
            </Label>
            <div className="hz-rel">
              <span className="hz-center-y hz-abs hz-fg-muted">$</span>
              <Input
                id="custom-amount"
                placeholder="Enter amount"
                type="number"
                min="1"
                step="1"
                value={customAmount}
                onChange={handleCustomAmountChange}
                className="hz-px-6 hz-bg-surface hz-fg"
              />
            </div>
          </div>

          <div className="hz-card">
            <div className="hz-row hz-jc-between hz-t-sm hz-mb-1">
              <span className="hz-fg-muted">Amount:</span>
              <span>${getEffectiveAmount().toFixed(2)}</span>
            </div>
            <div className="hz-row hz-jc-between hz-t-sm hz-w-medium">
              <span className="hz-fg-muted">Total:</span>
              <span>${getEffectiveAmount().toFixed(2)}</span>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="ghost"
            onClick={() => onOpenChange(false)}
            className="hz-fg-muted hz-link"
            disabled={isProcessing}
          >
            Cancel
          </Button>
          <Button
            type="button"
            className="hz-bg-inverse hz-fg-inverse hz-hoverable"
            onClick={handlePurchase}
            disabled={isProcessing || getEffectiveAmount() <= 0}
          >
            {isProcessing ? (
              <>
                <Loader2 className="hz-sq-2 hz-mr-2" />
                Processing...
              </>
            ) : (
              <>
                <CreditCard className="hz-sq-2 hz-mr-2" />
                Purchase Credits
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PurchaseCreditsDialog;
