
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BillingCalculator from "@/components/calculator/BillingCalculator";
import { Server, Database, HardDrive, Globe, Shield, HeadsetIcon, Activity, FileText } from "lucide-react";

const Calculator = () => {
  return (
    <div className="hz-min-h-screen hz-bg hz-fg">
      <Navbar />
      <main className="hz-pt-6 hz-pb-6 hz-px-4">
        <div className="hz-container">
          <h1 className="hz-t-4xl hz-w-bold hz-mb-6">Billing Calculator</h1>
          <p className="hz-fg-muted hz-mb-5 hz-mw-lg">
            Estimate your monthly Hanzo costs based on your infrastructure needs. Adjust the sliders below to see how different resources affect your total cost.
          </p>
          
          <div className="hz-card hz-mb-7 hz-stack-4">
            <h2 className="hz-t-xl hz-w-semibold">Pricing Structure</h2>
            <ul className="hz-stack-2 hz-fg-soft">
              <li className="hz-row hz-ai-center hz-gap-2">
                <Server className="hz-sq-2 hz-fg-muted" />
                <span><strong>Compute:</strong> $155/month per performance machine (4 vCPU, 8GB RAM)</span>
              </li>
              <li className="hz-row hz-ai-center hz-gap-2">
                <Database className="hz-sq-2 hz-fg-muted" />
                <span><strong>Hanzo Base:</strong> $77.50/month per replica (2 vCPU, 4GB RAM)</span>
              </li>
              <li className="hz-row hz-ai-center hz-gap-2">
                <HardDrive className="hz-sq-2 hz-fg-muted" />
                <span><strong>Storage:</strong> $0.15/GB per month for persistent storage</span>
              </li>
              <li className="hz-row hz-ai-center hz-gap-2">
                <Globe className="hz-sq-2 hz-fg-muted" />
                <span><strong>Bandwidth:</strong> $0.02/GB for North America outgoing traffic</span>
              </li>
              <li className="hz-row hz-ai-center hz-gap-2">
                <Activity className="hz-sq-2 hz-fg-muted" />
                <span><strong>Analytics Events:</strong> First 1 million events/month free, then $0.0001 per event</span>
              </li>
              <li className="hz-row hz-ai-center hz-gap-2">
                <FileText className="hz-sq-2 hz-fg-muted" />
                <span><strong>Observability Logs:</strong> $0.50/GB for log storage and processing</span>
              </li>
              <li className="hz-row hz-ai-center hz-gap-2">
                <Shield className="hz-sq-2 hz-fg-muted" />
                <span><strong>Compliance:</strong> $99/month for SOC2 Type 2 compliance</span>
              </li>
              <li className="hz-row hz-ai-center hz-gap-2">
                <HeadsetIcon className="hz-sq-2 hz-fg-muted" />
                <span><strong>Enterprise Support:</strong> $2,500/month for premium support</span>
              </li>
            </ul>
          </div>
          
          <BillingCalculator />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Calculator;
