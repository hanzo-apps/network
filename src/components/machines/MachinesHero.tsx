
import React from 'react';
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const MachinesHero = () => {
  return (
    <section className="hz-py-7 hz-rel">
      <div className="hz-abs hz-inset"></div>
      <div className="hz-container hz-rel hz-z-raised">
        <div className="hz-container-narrow hz-align-center hz-mb-7">
          <div className="hz-bg-raised hz-bordered hz-border-strong hz-r-full hz-px-4 hz-py-1 hz-mb-4">
            <span className="hz-fg-muted hz-t-sm hz-w-medium">High-Performance Computing</span>
          </div>
          <h1 className="hz-t-4xl hz-w-bold hz-mb-5 hz-chrome">
            Hanzo Machines
          </h1>
          <p className="hz-t-xl hz-fg-soft hz-mb-6">
            Dedicated AI compute infrastructure optimized for machine learning and high-performance workloads.
          </p>
          <div className="hz-col-row hz-gap-4 hz-jc-center">
            <Button className="hz-bg-raised hz-fg hz-px-6 hz-py-5 hz-t-lg hz-hoverable">
              Get Started
            </Button>
            <Button variant="outline" className="hz-border-strong hz-fg hz-px-6 hz-py-5 hz-t-lg hz-hoverable">
              View Documentation
            </Button>
          </div>
        </div>
        
        {/* Hero Hardware Visualization */}
        <div className="hz-card hz-rel hz-clip">
          <div className="hz-grid hz-grid-3 hz-gap-5">
            <div className="hz-card">
              <h3 className="hz-w-medium hz-fg-muted hz-mb-2">NVIDIA H100</h3>
              <p className="hz-t-sm hz-fg-soft hz-mb-3">Dedicated GPU instances for AI/ML training</p>
              <div className="hz-stack-3">
                <div className="hz-bg-raised hz-r-md hz-p-2 hz-row hz-jc-between hz-ai-center">
                  <span className="hz-t-sm">VRAM</span>
                  <span className="hz-w-medium hz-fg-muted">80GB HBM3</span>
                </div>
                <div className="hz-bg-raised hz-r-md hz-p-2 hz-row hz-jc-between hz-ai-center">
                  <span className="hz-t-sm">Cores</span>
                  <span className="hz-w-medium hz-fg-muted">16,896 CUDA</span>
                </div>
                <div className="hz-bg-raised hz-r-md hz-p-2 hz-row hz-jc-between hz-ai-center">
                  <span className="hz-t-sm">Tensor Cores</span>
                  <span className="hz-w-medium hz-fg-muted">528 TCs</span>
                </div>
              </div>
            </div>
            
            <div className="hz-card">
              <h3 className="hz-w-medium hz-fg-muted hz-mb-2">AMD EPYC 7763</h3>
              <p className="hz-t-sm hz-fg-soft hz-mb-3">High-core count CPU instances</p>
              <div className="hz-stack-3">
                <div className="hz-bg-raised hz-r-md hz-p-2 hz-row hz-jc-between hz-ai-center">
                  <span className="hz-t-sm">Cores</span>
                  <span className="hz-w-medium hz-fg-muted">64 Cores</span>
                </div>
                <div className="hz-bg-raised hz-r-md hz-p-2 hz-row hz-jc-between hz-ai-center">
                  <span className="hz-t-sm">Threads</span>
                  <span className="hz-w-medium hz-fg-muted">128 Threads</span>
                </div>
                <div className="hz-bg-raised hz-r-md hz-p-2 hz-row hz-jc-between hz-ai-center">
                  <span className="hz-t-sm">Memory</span>
                  <span className="hz-w-medium hz-fg-muted">Up to 2TB</span>
                </div>
              </div>
            </div>
            
            <div className="hz-card">
              <h3 className="hz-w-medium hz-fg-muted hz-mb-2">Storage Options</h3>
              <p className="hz-t-sm hz-fg-soft hz-mb-3">Ultra-fast NVMe and persistent storage</p>
              <div className="hz-stack-3">
                <div className="hz-bg-raised hz-r-md hz-p-2 hz-row hz-jc-between hz-ai-center">
                  <span className="hz-t-sm">Local NVMe</span>
                  <span className="hz-w-medium hz-fg-muted">Up to 8TB</span>
                </div>
                <div className="hz-bg-raised hz-r-md hz-p-2 hz-row hz-jc-between hz-ai-center">
                  <span className="hz-t-sm">Network Storage</span>
                  <span className="hz-w-medium hz-fg-muted">Unlimited</span>
                </div>
                <div className="hz-bg-raised hz-r-md hz-p-2 hz-row hz-jc-between hz-ai-center">
                  <span className="hz-t-sm">I/O Performance</span>
                  <span className="hz-w-medium hz-fg-muted">7GB/s</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MachinesHero;
