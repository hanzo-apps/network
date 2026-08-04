
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingCart, Book, Code } from "lucide-react";

const CallToAction = () => {
  return (
    <section className="hz-py-7">
      <div className="hz-container hz-mx-auto hz-px-4">
        <div className="hz-container-narrow hz-align-center hz-mb-6">
          <h2 className="hz-t-3xl hz-w-bold hz-mb-5">Ready to Transform Your E-commerce Experience?</h2>
          <p className="hz-t-lg hz-fg-soft hz-mb-6">
            Join thousands of businesses that trust Hanzo Commerce to power their online stores.
          </p>
          
          <div className="hz-grid hz-grid-3 hz-gap-5">
            <div className="hz-card hz-col hz-ai-center">
              <ShoppingCart className="hz-sq-7 hz-fg-muted hz-mb-4" />
              <h3 className="hz-t-xl hz-w-semibold hz-mb-2">Start Selling</h3>
              <p className="hz-fg-muted hz-mb-4 hz-align-center">Launch your store with our easy-to-use platform</p>
              <Button 
                className="hz-mt-auto hz-bg-raised hz-fg-inverse hz-hoverable"
                onClick={() => window.open('https://console.hanzo.ai', '_blank')}
              >
                Get Started <ArrowRight className="hz-sq-2 hz-ml-2" />
              </Button>
            </div>
            
            <div className="hz-card hz-col hz-ai-center">
              <Book className="hz-sq-7 hz-fg-muted hz-mb-4" />
              <h3 className="hz-t-xl hz-w-semibold hz-mb-2">Documentation</h3>
              <p className="hz-fg-muted hz-mb-4 hz-align-center">Explore our guides and API references</p>
              <Button 
                className="hz-mt-auto hz-bg-raised hz-fg-inverse hz-hoverable"
                onClick={() => window.open('https://docs.hanzo.ai/commerce', '_blank')}
              >
                View Docs <ArrowRight className="hz-sq-2 hz-ml-2" />
              </Button>
            </div>
            
            <div className="hz-card hz-col hz-ai-center">
              <Code className="hz-sq-7 hz-fg-muted hz-mb-4" />
              <h3 className="hz-t-xl hz-w-semibold hz-mb-2">For Developers</h3>
              <p className="hz-fg-muted hz-mb-4 hz-align-center">Integrate our APIs into your applications</p>
              <Button 
                className="hz-mt-auto hz-bg-raised hz-fg-inverse hz-hoverable"
                onClick={() => window.open('https://docs.hanzo.ai/api', '_blank')}
              >
                API Reference <ArrowRight className="hz-sq-2 hz-ml-2" />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="hz-container-narrow hz-card hz-align-center">
          <h3 className="hz-t-xl hz-w-semibold hz-mb-3">Need a Custom Solution?</h3>
          <p className="hz-fg-soft hz-mb-5">
            Our team of experts can help you design and implement a tailored e-commerce solution for your unique business needs.
          </p>
          <Button 
            variant="outline" 
            className="hz-border-strong hz-fg-muted hz-link"
            onClick={() => window.open('https://hanzo.ai/contact', '_blank')}
          >
            Contact Sales
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
