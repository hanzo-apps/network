
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAccount } from '@/contexts/AccountContext';
import AnimatedSection, { AnimatedHeading } from '@/components/ui/animated-section';
import { toast } from 'sonner';

const AccountSettings = () => {
  const { user, updateUserProfile } = useAccount();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Settings updated successfully');
  };

  return (
    <AnimatedSection>
      <AnimatedHeading>Account Settings</AnimatedHeading>
      
      <form onSubmit={handleSubmit} className="hz-stack-5 hz-mw-md hz-mt-6">
        <div className="hz-stack-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            value={user?.email || ''}
            disabled
            className="hz-bg-surface"
          />
        </div>

        <div className="hz-stack-2">
          <Label htmlFor="notifications">Email Notifications</Label>
          <div className="hz-stack-4">
            <div className="hz-row hz-ai-center hz-inline-2">
              <input
                type="checkbox"
                id="marketing"
                className="hz-r-md hz-bg-surface"
                defaultChecked
              />
              <label htmlFor="marketing">Marketing updates</label>
            </div>
            <div className="hz-row hz-ai-center hz-inline-2">
              <input
                type="checkbox"
                id="security"
                className="hz-r-md hz-bg-surface"
                defaultChecked
              />
              <label htmlFor="security">Security alerts</label>
            </div>
          </div>
        </div>

        <Button type="submit" className="hz-bg-surface hz-border-none hz-hoverable">
          Save Changes
        </Button>
      </form>
    </AnimatedSection>
  );
};

export default AccountSettings;
