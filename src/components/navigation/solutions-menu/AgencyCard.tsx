
import { Users, ArrowRight } from "lucide-react";

interface AgencyCardProps {
  onCardClick: () => void;
}

export const AgencyCard = ({ onCardClick }: AgencyCardProps) => {
  return (
    <a 
      href="https://hanzo.agency" 
      target="_blank" 
      rel="noopener noreferrer"
      className="hz-card hz-pointer hz-transition hz-col hz-jc-between hz-card-interactive"
      onClick={onCardClick}
    >
      <div>
        <div className="hz-row hz-ai-center hz-gap-2 hz-mb-3">
          <div className="hz-sq-5 hz-p-2 hz-r-lg hz-bg-raised hz-row hz-ai-center hz-jc-center">
            <Users className="hz-sq-2 hz-fg-muted" strokeWidth={1.5} />
          </div>
          <h3 className="hz-t-sm hz-w-semibold hz-fg">Hanzo Agency</h3>
        </div>
        <p className="hz-t-xs hz-fg-muted hz-leading-relaxed">
          Elevate your brand with our AI-powered creative agency. We craft cutting-edge digital experiences that captivate audiences and deliver measurable business results.
        </p>
      </div>
      <div className="hz-row hz-ai-center hz-t-xs hz-fg-muted hz-w-medium">
        <span>Learn more</span>
        <ArrowRight className="hz-sq-1 hz-ml-1 hz-transition" />
      </div>
    </a>
  );
};
