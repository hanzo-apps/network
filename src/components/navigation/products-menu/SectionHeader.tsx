
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  link: string;
  linkText: string;
}

const SectionHeader = ({ title, link, linkText }: SectionHeaderProps) => {
  return (
    <div className="hz-row hz-ai-center hz-jc-between hz-mb-4">
      <Link to={link}>
        <h3 className="hz-t-xl hz-w-semibold hz-fg hz-transition hz-hoverable">
          {title}
        </h3>
      </Link>
      <Link 
        to={link} 
        className={cn(
          "hz-t-sm hz-fg-muted hz-row hz-ai-center hz-link"
        )}
      >
        {linkText}
        <ChevronRight className="hz-sq-2 hz-ml-1 hz-transition" />
      </Link>
    </div>
  );
};

export default SectionHeader;
