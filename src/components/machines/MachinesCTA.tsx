
import React from 'react';
import { Button } from "@/components/ui/button";

const MachinesCTA = () => {
  return (
    <section className="hz-py-7">
      <div className="hz-container-wide">
        <div className="hz-card">
          <div className="hz-align-center">
            <h2 className="hz-t-3xl hz-w-bold hz-mb-4">Power Your AI Workloads</h2>
            <p className="hz-container-narrow hz-t-xl hz-fg-soft hz-mb-6">
              Get started with Hanzo Machines today and experience high-performance AI infrastructure.
            </p>
            <div className="hz-col-row hz-gap-4 hz-jc-center">
              <Button className="hz-bg-raised hz-fg hz-px-6 hz-py-5 hz-t-lg hz-hoverable">
                Sign Up Free
              </Button>
              <Button variant="outline" className="hz-border-strong hz-fg hz-px-6 hz-py-5 hz-t-lg hz-hoverable">
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MachinesCTA;
