
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Check, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useBilling } from '@/contexts/BillingContext';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import AnimatedSection, { AnimatedHeading } from '@/components/ui/animated-section';

const BillingPlans = () => {
  const navigate = useNavigate();
  const { checkout, billingInfo } = useBilling();
  const [isUpgrading, setIsUpgrading] = useState(false);

  const plans = [
    {
      id: 'dev',
      name: 'Developer',
      price: 20,
      interval: 'month',
      description: 'For hobbyists and personal projects',
      features: [
        'All core Hanzo platform features',
        'Unlimited private projects',
        'Unlimited deployments',
        'Self-hosted on your infrastructure',
        '1 AI Unit',
        '1 Compute Unit (Server)'
      ],
      popular: false
    },
    {
      id: 'pro',
      name: 'Professional',
      price: 49,
      interval: 'month',
      description: 'For professionals and small teams',
      features: [
        'Everything in Developer plan',
        'Extended messaging and data analysis',
        'Full access to Hanzo App, Chat, Dev',
        'Integration with Hanzo Models',
        'Image generation',
        'Up to 10 AI Units (Adjustable)',
        'Up to 10 Compute Units (Adjustable)'
      ],
      popular: true
    },
    {
      id: 'team',
      name: 'Team',
      price: 99,
      interval: 'month',
      description: 'For growing teams with advanced needs',
      features: [
        'Everything in Professional plan',
        'Higher message limits',
        'Advanced collaborative workspace',
        'Secure workspace with admin console',
        'Unified team billing',
        'Team data excluded from training',
        'Up to 10 AI Units per user (Adjustable)'
      ],
      popular: false
    }
  ];

  const handleUpgrade = async (planId: string) => {
    setIsUpgrading(true);
    
    // Find the plan
    const plan = plans.find(p => p.id === planId);
    if (!plan) {
      toast.error('Invalid plan selected');
      setIsUpgrading(false);
      return;
    }
    
    // Simulate checkout process
    const success = await checkout(planId as any);
    
    if (success) {
      toast.success(`Successfully upgraded to ${plan.name} plan!`);
      navigate('/account/billing');
    }
    
    setIsUpgrading(false);
  };

  return (
    <AnimatedSection>
      <div className="hz-stack-5">
        <div className="hz-row hz-ai-center hz-mb-4">
          <Button variant="ghost" onClick={() => navigate('/account/billing')} className="hz-mr-4">
            <ArrowLeft className="hz-sq-2 hz-mr-2" />
            Back to Billing
          </Button>
        </div>
        
        <AnimatedHeading>
          <h2 className="hz-t-2xl hz-w-bold hz-mb-5">Choose a Plan</h2>
        </AnimatedHeading>
        
        <div className="hz-grid hz-grid-3 hz-gap-5">
          {plans.map(plan => (
            <Card 
              key={plan.id} 
              className={`hz-bg-surface hz-bordered ${
                plan.popular ? 'hz-border-strong' : ''
              } hz-rel`}
            >
              {plan.popular && (
                <div className="hz-center-x hz-abs">
                  <span className="hz-bg-raised hz-fg hz-px-3 hz-py-1 hz-r-full hz-t-xs hz-w-medium">
                    Most Popular
                  </span>
                </div>
              )}
              
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription className="hz-fg-muted">{plan.description}</CardDescription>
                <div className="hz-mt-4">
                  <span className="hz-t-3xl hz-w-bold">${plan.price}</span>
                  <span className="hz-fg-muted">/{plan.interval}</span>
                </div>
              </CardHeader>
              
              <CardContent>
                <ul className="hz-stack-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="hz-row hz-ai-start">
                      <Check className="hz-sq-3 hz-fg-muted hz-mr-2 hz-none" />
                      <span className="hz-t-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              
              <CardFooter>
                <Button 
                  className={`hz-w-full ${
                    plan.popular ? 'hz-bg-raised hz-hoverable' : ''
                  }`}
                  variant={plan.popular ? 'default' : 'outline'}
                  onClick={() => handleUpgrade(plan.id)}
                  disabled={isUpgrading}
                >
                  {billingInfo.plan === plan.id ? 'Current Plan' : 'Upgrade'}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="hz-card hz-mt-6">
          <h3 className="hz-t-xl hz-w-medium hz-mb-4">Enterprise Plan</h3>
          <p className="hz-fg-muted hz-mb-4">
            Need a custom solution for your organization? Our Enterprise plan offers custom pricing, 
            dedicated support, and tailored features for your specific needs.
          </p>
          <Button variant="outline">Contact Sales</Button>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default BillingPlans;
