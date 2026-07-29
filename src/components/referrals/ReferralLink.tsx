
import React, { useState } from 'react';
import { Copy, Check, Share2, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface ReferralLinkProps {
  referralLink: string;
  referralCode: string;
}

const ReferralLink = ({ referralLink, referralCode }: ReferralLinkProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const [emailInput, setEmailInput] = useState('');

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setIsCopied(true);
    toast.success("Referral link copied to clipboard!");
    setTimeout(() => setIsCopied(false), 3000);
  };

  const handleSendInvites = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      toast.success(`Invitations sent to ${emailInput.split(',').length} contacts!`);
      setEmailInput('');
    } else {
      toast.error("Please enter at least one email address");
    }
  };

  return (
    <div className="hz-card">
      <h2 className="hz-t-xl hz-w-medium hz-mb-4">Your Referral Link</h2>
      <div className="hz-col-row hz-gap-4">
        <div className="hz-rel hz-grow">
          <Input 
            value={referralLink} 
            readOnly 
            className="hz-px-6 hz-bg-surface"
          />
          <Button 
            variant="ghost" 
            size="sm" 
            className="hz-abs hz-right-0 hz-top-0 hz-h-full"
            onClick={handleCopyLink}
          >
            {isCopied ? <Check className="hz-sq-2" /> : <Copy className="hz-sq-2" />}
          </Button>
        </div>
        <Button className="hz-row hz-ai-center hz-gap-2">
          <Share2 className="hz-sq-2" />
          Share Link
        </Button>
      </div>
      
      <div className="hz-mt-5 hz-pt-6 hz-border-t">
        <h3 className="hz-t-lg hz-w-medium hz-mb-4">Send Invites via Email</h3>
        <form onSubmit={handleSendInvites} className="hz-col-row hz-gap-4">
          <div className="hz-grow">
            <Label htmlFor="emails" className="hz-sr">Email Addresses</Label>
            <Input 
              id="emails"
              placeholder="Enter email addresses, separated by commas" 
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              className="hz-bg-surface"
            />
          </div>
          <Button type="submit" className="hz-row hz-ai-center hz-gap-2">
            <Mail className="hz-sq-2" />
            Send Invites
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ReferralLink;
