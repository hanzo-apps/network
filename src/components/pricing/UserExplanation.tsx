
import React from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { User, HelpCircle } from "lucide-react";

const UserExplanation = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="hz-row hz-ai-center hz-gap-2 hz-fg-muted hz-bg-none hz-link"
        >
          <HelpCircle className="hz-sq-2" />
          What are users?
        </Button>
      </PopoverTrigger>
      <PopoverContent className="hz-bw-8 hz-bg-surface hz-fg hz-p-4">
        <div className="hz-stack-3">
          <div className="hz-row hz-ai-center hz-gap-2">
            <User className="hz-sq-3 hz-fg-muted" />
            <h4 className="hz-w-medium hz-t-lg">Platform Users</h4>
          </div>
          <p className="hz-fg-soft hz-t-sm">
            Users are individuals with login credentials to your platform. 
            Each user can access the platform's features according to your plan. 
            Team plans are billed per user with login access to your workspace.
          </p>
          <p className="hz-fg-muted hz-t-xs">
            Note: End-users of your applications don't count toward this limit 
            unless they need direct access to the platform.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default UserExplanation;
