
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CallToAction = () => {
  return (
    <div className="hz-mt-7 hz-align-center">
      <h2 className="hz-t-3xl hz-w-bold hz-mb-4">Ready to Get Started?</h2>
      <p className="hz-container-narrow hz-mw-md hz-fg-muted hz-mb-6">
        Join our community of innovators and start building with your AI team today.
      </p>
      <div className="hz-row hz-wrap hz-jc-center hz-gap-4">
        <Button 
          size="lg" 
          className="hz-bg-raised hz-hoverable"
          onClick={() => window.open('https://hanzo.chat', '_blank')}
        >
          Try Hanzo Chat
          <ArrowRight className="hz-sq-2 hz-ml-2" />
        </Button>
        <Button 
          size="lg" 
          className="hz-bg-raised hz-hoverable"
          onClick={() => window.open('https://hanzo.bot', '_blank')}
        >
          Try Hanzo Bot
          <ArrowRight className="hz-sq-2 hz-ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default CallToAction;
