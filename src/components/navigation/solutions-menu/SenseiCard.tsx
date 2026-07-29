
import { Shield, ArrowRight } from "lucide-react";

interface SenseiCardProps {
  onCardClick: () => void;
}

export const SenseiCard = ({ onCardClick }: SenseiCardProps) => {
  return (
    <a 
      href="https://sensei.group" 
      target="_blank" 
      rel="noopener noreferrer"
      className="hz-card hz-pointer hz-transition hz-col hz-jc-between hz-card-interactive"
      onClick={onCardClick}
    >
      <div>
        <div className="hz-row hz-ai-center hz-gap-2 hz-mb-3">
          <div className="hz-sq-5 hz-p-2 hz-r-lg hz-bg-raised hz-row hz-ai-center hz-jc-center">
            <Shield className="hz-sq-2 hz-fg-muted" strokeWidth={1.5} />
          </div>
          <h3 className="hz-t-sm hz-w-semibold hz-fg">Sensei Group</h3>
        </div>
        <p className="hz-t-xs hz-fg-muted hz-leading-relaxed">
          Accelerate enterprise transformation with our elite collective of CXOs and technology experts. We guide organizations through digital evolution with strategic implementation.
        </p>
      </div>
      <div className="hz-row hz-ai-center hz-t-xs hz-fg-muted hz-w-medium">
        <span>Learn more</span>
        <ArrowRight className="hz-sq-1 hz-ml-1 hz-transition" />
      </div>
    </a>
  );
};
