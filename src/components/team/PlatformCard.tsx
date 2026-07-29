
import { LucideIcon } from "lucide-react";

interface PlatformCardProps {
  name: string;
  role: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
}

const PlatformCard = ({ name, role, description, icon: Icon, gradient }: PlatformCardProps) => {
  return (
    <div className="hz-card hz-rel hz-glass hz-clip">
      <div className="hz-abs hz-inset hz-invisible hz-transition" />
      <div className={`hz-inline hz-p-3 hz-r-lg ${gradient} hz-mb-4`}>
        <Icon className="hz-sq-4 hz-fg" />
      </div>
      <h3 className="hz-t-xl hz-w-semibold hz-mb-2">{name}</h3>
      <p className="hz-fg-muted hz-w-medium hz-mb-3">{role}</p>
      <p className="hz-fg-muted">{description}</p>
    </div>
  );
};

export default PlatformCard;
