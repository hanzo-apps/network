import React from "react";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";

const PricingFooterLinks = () => {
  return (
    <div className="hz-mt-6 hz-align-center hz-row hz-wrap hz-jc-center">
      <Button variant="outline" className="hz-px-4 hz-py-2 hz-bh-6 hz-hoverable" size="sm">
        <a href="https://github.com/hanzoai" target="_blank" rel="noopener noreferrer" className="hz-row hz-ai-center">
          Hanzo GitHub
          <Github className="hz-sq-2 hz-ml-2" />
        </a>
      </Button>
      <Button variant="outline" className="hz-px-4 hz-py-2 hz-bh-6 hz-hoverable" size="sm">
        <a href="mailto:sales@hanzo.ai">
          Contact Sales
        </a>
      </Button>
      <Button variant="outline" className="hz-px-4 hz-py-2 hz-bh-6 hz-hoverable" size="sm">
        <a href="https://discord.gg/XthHQQj" target="_blank" rel="noopener noreferrer">
          Join Discord
        </a>
      </Button>
    </div>
  );
};

export default PricingFooterLinks;