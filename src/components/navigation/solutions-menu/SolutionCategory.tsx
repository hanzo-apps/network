
import { getIcon } from "@/constants/iconMappings";
import type { SolutionItem } from "@/constants/navigation";
import { Link } from "react-router-dom";

interface SolutionCategoryProps {
  title: string;
  items: SolutionItem[];
  onItemClick: () => void;
}

export const SolutionCategory = ({ title, items, onItemClick }: SolutionCategoryProps) => {
  // Display 8 items per category
  const displayItems = items.slice(0, 8);

  return (
    <div className="hz-stack-4">
      <div className="hz-row hz-ai-center hz-jc-between">
        <h3 className="hz-t-lg hz-w-semibold hz-fg">{title}</h3>
        <Link 
          to="/solutions" 
          className="hz-fg-muted hz-t-sm hz-w-medium hz-link"
          onClick={onItemClick}
        >
          View all
        </Link>
      </div>
      
      <div className="hz-grid hz-gap-3">
        {displayItems.map((item) => {
          const Icon = getIcon(item.name);
          return (
            <Link
              to={item.href}
              key={item.href}
              className="hz-row hz-ai-center hz-inline-3"
              onClick={onItemClick}
            >
              <div className="hz-sq-6 hz-row hz-ai-center hz-jc-center hz-none">
                <Icon className="hz-sq-3 hz-fg-muted hz-transition hz-link" strokeWidth={1.5} />
              </div>
              <div className="hz-grow">
                <div className="hz-fg-soft hz-w-medium hz-truncate hz-hoverable">{item.name}</div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
