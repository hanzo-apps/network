import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const RegCFBanner = () => {
  return (
    <div className="hz-sticky hz-top-0 hz-z-overlay hz-glass hz-py-2 hz-px-4 hz-align-center hz-fg hz-border-b">
      <div className="hz-container-wide hz-row hz-ai-center hz-jc-center hz-wrap hz-gap-2">
        <p className="hz-t-sm hz-w-medium">
          Invest in the Future of AI Collaboration—Join Our $5M Reg CF Campaign on Republic.com
        </p>
        <Link
          to="https://republic.com/hanzo" 
          target="_blank"
          rel="noopener noreferrer"
          className="hz-inline hz-ai-center hz-t-xs hz-w-medium hz-px-3 hz-py-1 hz-r-full hz-bg-quiet hz-transition hz-hoverable"
        >
          <span>Learn More / Invest</span>
          <ArrowRight className="hz-sq-1 hz-ml-1" />
        </Link>
      </div>
    </div>
  );
};

export default RegCFBanner;