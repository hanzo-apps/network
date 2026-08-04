
import React from "react";
import { Switch } from "@/components/ui/switch";
import { Shield, HeadsetIcon } from "lucide-react";

interface CostSummaryProps {
  costs: {
    compute: number;
    replicas: number;
    storage: number;
    bandwidth: number;
    analytics: number;
    observability: number;
    compliance: number;
    support: number;
    total: number;
  };
  onComplianceChange: () => void;
  onSupportChange: () => void;
  compliance: boolean;
  support: boolean;
}

const CostSummary = ({
  costs,
  onComplianceChange,
  onSupportChange,
  compliance,
  support
}: CostSummaryProps) => {
  return (
    <div className="hz-card hz-card-interactive">
      <h3 className="hz-t-xl hz-w-semibold hz-mb-5">Cost Summary</h3>

      <div className="hz-stack-4 hz-mb-6">
        {[
          { label: "Compute", cost: costs.compute },
          { label: "Hanzo Base", cost: costs.replicas },
          { label: "Storage", cost: costs.storage },
          { label: "Bandwidth", cost: costs.bandwidth },
          { label: "Analytics Events", cost: costs.analytics },
          { label: "Observability", cost: costs.observability }
        ].map(({ label, cost }) => (
          <div key={label} className="hz-row hz-jc-between hz-ai-center">
            <span className="hz-fg-muted">{label}</span>
            <span>${cost.toFixed(2)}</span>
          </div>
        ))}
      </div>

      <div className="hz-stack-4 hz-mb-6 hz-border-t hz-pt-4">
        <div className="hz-row hz-ai-center hz-jc-between">
          <div className="hz-row hz-ai-center hz-gap-2">
            <Shield className="hz-sq-2 hz-fg-muted" />
            <span className="hz-fg-muted">SOC2 Type 2 Compliance</span>
          </div>
          <div className="hz-row hz-ai-center hz-gap-3">
            <span>${costs.compliance.toFixed(2)}</span>
            <Switch checked={compliance} onCheckedChange={onComplianceChange} />
          </div>
        </div>

        <div className="hz-row hz-ai-center hz-jc-between">
          <div className="hz-row hz-ai-center hz-gap-2">
            <HeadsetIcon className="hz-sq-2 hz-fg-muted" />
            <span className="hz-fg-muted">Enterprise Support</span>
          </div>
          <div className="hz-row hz-ai-center hz-gap-3">
            <span>${costs.support.toFixed(2)}</span>
            <Switch checked={support} onCheckedChange={onSupportChange} />
          </div>
        </div>
      </div>

      <div className="hz-border-t hz-pt-4">
        <div className="hz-row hz-jc-between hz-ai-center">
          <span className="hz-t-lg hz-w-semibold">Estimated Total</span>
          <span className="hz-t-lg hz-w-semibold">${costs.total.toFixed(2)}/mo</span>
        </div>
        <p className="hz-t-sm hz-fg-muted hz-mt-2">
          Actual costs may vary based on usage and additional services.
        </p>
      </div>
    </div>
  );
};

export default CostSummary;
