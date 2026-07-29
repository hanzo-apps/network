
import React from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const ExploreAllButton: React.FC = () => {
  return (
    <div className="hz-align-center hz-mt-6">
      <Button 
        variant="outline" 
        className="hz-px-5" 
        radius="full"
        asChild
      >
        <Link to="/platform">
          Explore All Platform Tools
          <ExternalLink className="hz-sq-2 hz-ml-2 hz-transition" />
        </Link>
      </Button>
    </div>
  );
};

export default ExploreAllButton;
