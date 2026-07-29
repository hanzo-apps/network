
import React from 'react';

const HowItWorks = () => {
  return (
    <div className="hz-card">
      <h2 className="hz-t-xl hz-w-medium hz-mb-4">How It Works</h2>
      
      <div className="hz-grid hz-grid-3 hz-gap-5">
        <div className="hz-p-4 hz-bg-surface hz-r-lg">
          <div className="hz-row hz-ai-center hz-mb-3">
            <div className="hz-sq-5 hz-r-full hz-bg-raised hz-fg-soft hz-row hz-ai-center hz-jc-center hz-mr-3">
              1
            </div>
            <h3 className="hz-w-medium">Share Your Link</h3>
          </div>
          <p className="hz-t-sm hz-fg-muted">
            Share your unique referral link with friends and colleagues via email or social media
          </p>
        </div>
        
        <div className="hz-p-4 hz-bg-surface hz-r-lg">
          <div className="hz-row hz-ai-center hz-mb-3">
            <div className="hz-sq-5 hz-r-full hz-bg-raised hz-fg-soft hz-row hz-ai-center hz-jc-center hz-mr-3">
              2
            </div>
            <h3 className="hz-w-medium">Friends Sign Up</h3>
          </div>
          <p className="hz-t-sm hz-fg-muted">
            When your friends use your link to sign up and subscribe to any paid plan
          </p>
        </div>
        
        <div className="hz-p-4 hz-bg-surface hz-r-lg">
          <div className="hz-row hz-ai-center hz-mb-3">
            <div className="hz-sq-5 hz-r-full hz-bg-raised hz-fg-soft hz-row hz-ai-center hz-jc-center hz-mr-3">
              3
            </div>
            <h3 className="hz-w-medium">Earn Credits</h3>
          </div>
          <p className="hz-t-sm hz-fg-muted">
            You receive $5 in credits for each successful referral that can be used toward your subscription
          </p>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
