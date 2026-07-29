
import React from 'react';
import { Gift, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const ReferralBanner = () => {
  const navigate = useNavigate();

  const handleReferralClick = () => {
    navigate('/referrals');
  };

  return (
    <section className="hz-py-7 hz-px-4 hz-bg hz-rel hz-clip">
      <div className="hz-abs hz-inset"></div>
      <div className="hz-sq-8 hz-abs hz-bg-raised hz-r-full hz-blur-bg"></div>
      <div className="hz-sq-8 hz-abs hz-bg-raised hz-r-full hz-blur-bg"></div>
      
      <div className="hz-container-wide">
        <div className="hz-card hz-glass">
          <div className="hz-col-row hz-ai-center hz-jc-between hz-gap-6">
            <div className="hz-grow">
              <div className="hz-row hz-ai-center hz-mb-4">
                <Gift className="hz-sq-5 hz-fg-soft hz-mr-4" />
                <h2 className="hz-t-2xl hz-w-medium">Join Our Referral Program</h2>
              </div>
              <p className="hz-t-lg hz-fg-soft hz-mb-5 hz-leading-relaxed">
                Get <span className="hz-fg-soft hz-w-medium">$5 in credit</span> every time a friend signs up and pays for any plan. 
                Share the power of Hanzo AI with your network and earn rewards!
              </p>
            </div>
            
            <Button 
              onClick={handleReferralClick}
              size="lg" 
              className="hz-bg hz-fg hz-px-6 hz-py-5 hz-t-lg hz-bordered hz-hoverable"
            >
              Start Referring <ArrowRight className="hz-sq-3 hz-ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReferralBanner;
