import React, { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Cpu, Zap, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TeamPlanDetailsProps {
  fromMaxPlan?: boolean;
  fromProPlan?: boolean;
}

const TeamPlanDetails = ({ fromMaxPlan = false, fromProPlan = false }: TeamPlanDetailsProps) => {
  const [aiUnits, setAiUnits] = useState<number>(5);
  const [teamSize, setTeamSize] = useState<number>(1);
  
  // Set AI units to 10 if coming from Max plan
  useEffect(() => {
    if (fromMaxPlan) {
      setAiUnits(10);
    }
  }, [fromMaxPlan]);
  
  const totalMonthlyPrice = teamSize * 30;
  const additionalAICost = aiUnits > 5 ? (aiUnits - 5) * 10 : 0;
  const totalCost = totalMonthlyPrice + additionalAICost;

  // Determine title based on where user is coming from
  const getTitle = () => {
    if (fromProPlan) {
      return "Pro Plan Configuration";
    } else if (teamSize > 1 || fromMaxPlan) {
      return "Team Plan Configuration";
    }
    return "Configure Plan";
  };

  return (
    <section id="team-config-section" className="hz-container hz-mb-7 hz-mt-7">
      <div className="hz-card hz-glass">
        <div className="hz-border-b hz-px-2 hz-py-4 hz-mb-5">
          <h2 className="hz-t-2xl hz-w-bold">{getTitle()}</h2>
          <p className="hz-fg-muted hz-mt-2">Scale resources to match your exact needs</p>
        </div>
        
        <div className="hz-container-wide hz-p-2 hz-w-full">
          <div className="hz-col-row hz-ai-start hz-jc-between hz-mb-6 hz-gap-4">
            <div className="hz-row hz-ai-center hz-gap-3">
              <Users className="hz-sq-5 hz-fg-muted" />
              <div>
                <h3 className="hz-t-xl hz-w-bold">{fromProPlan ? "Pro Plan" : "Team Plan"}</h3>
                <p className="hz-fg-muted">Custom resources for {fromProPlan ? "your projects" : "your entire team"}</p>
              </div>
            </div>
            <div className="hz-align-right">
              <div className="hz-t-3xl hz-w-bold">${totalCost}/mo</div>
              <div className="hz-fg-muted hz-t-sm">
                {teamSize > 1 
                  ? `Total for ${teamSize} team member${teamSize !== 1 ? 's' : ''}` 
                  : "Base price"}
              </div>
            </div>
          </div>

          <div className="hz-grid hz-grid-2 hz-gap-6 hz-mb-6">
            <div className="hz-stack-5">
              <div className="hz-mb-4">
                <div className="hz-row hz-ai-center hz-jc-between hz-mb-2">
                  <label className="hz-t-lg hz-w-medium hz-row hz-ai-center hz-gap-2">
                    <Users className="hz-sq-3 hz-fg-muted" />
                    {fromProPlan ? "Developer Accounts" : "Team Size"}
                  </label>
                  <span className="hz-t-xl hz-w-semibold">{teamSize} {teamSize === 1 ? (fromProPlan ? "account" : "member") : (fromProPlan ? "accounts" : "members")}</span>
                </div>
                <Slider 
                  className="hz-mt-4" 
                  value={[teamSize]} 
                  onValueChange={(value) => setTeamSize(value[0])} 
                  min={1} 
                  max={50} 
                  step={1}
                />
                <div className="hz-row hz-jc-between hz-t-xs hz-fg-muted hz-mt-1">
                  <span>1</span>
                  <span>25</span>
                  <span>50</span>
                </div>
                <div className="hz-fg-muted hz-mt-2">
                  ${teamSize * 30}/mo (${30}/{fromProPlan ? "account" : "user"})
                </div>
              </div>
            </div>

            <div className="hz-stack-5">
              <div className="hz-mb-4">
                <div className="hz-row hz-ai-center hz-jc-between hz-mb-2">
                  <label className="hz-t-lg hz-w-medium hz-row hz-ai-center hz-gap-2">
                    <Zap className="hz-sq-3 hz-fg-muted" />
                    AI Credits
                  </label>
                  <span className="hz-t-xl hz-w-semibold">{aiUnits} per {fromProPlan ? "account" : "member"}</span>
                </div>
                <Slider 
                  className="hz-mt-4" 
                  value={[aiUnits]} 
                  onValueChange={(value) => setAiUnits(value[0])} 
                  min={1} 
                  max={20} 
                  step={1}
                />
                <div className="hz-row hz-jc-between hz-t-xs hz-fg-muted hz-mt-1">
                  <span>1</span>
                  <span>10</span>
                  <span>20</span>
                </div>
                <div className="hz-fg-muted hz-mt-2">
                  {aiUnits <= 5 ? 
                    "Included in base price" : 
                    `+$${additionalAICost}/mo for additional AI processing`}
                </div>
              </div>
            </div>
          </div>

          <div className="hz-card hz-mb-6">
            <h3 className="hz-t-xl hz-w-semibold hz-mb-4">{fromProPlan ? "Pro Plan Benefits" : "Team Plan Benefits"}</h3>
            <div className="hz-grid hz-grid-2 hz-gap-5">
              <div className="hz-row hz-ai-start hz-gap-3">
                <Zap className="hz-sq-3 hz-fg-muted hz-mt-1 hz-none" />
                <div>
                  <p className="hz-w-medium">AI-Powered Development</p>
                  <p className="hz-fg-muted hz-t-sm">Scale AI processing resources to match your exact workflow needs</p>
                </div>
              </div>
              <div className="hz-row hz-ai-start hz-gap-3">
                <Users className="hz-sq-3 hz-fg-muted hz-mt-1 hz-none" />
                <div>
                  <p className="hz-w-medium">{fromProPlan ? "Developer Flexibility" : "Centralized Management"}</p>
                  <p className="hz-fg-muted hz-t-sm">{fromProPlan ? "Configure your development environment to your exact specifications" : "Single dashboard for user administration, permissions, and unified billing"}</p>
                </div>
              </div>
              <div className="hz-row hz-ai-start hz-gap-3">
                <Cpu className="hz-sq-3 hz-fg-muted hz-mt-1 hz-none" />
                <div>
                  <p className="hz-w-medium">Premium Performance</p>
                  <p className="hz-fg-muted hz-t-sm">Priority access to all platform services with enhanced response times</p>
                </div>
              </div>
              <div className="hz-row hz-ai-start hz-gap-3">
                <Zap className="hz-sq-3 hz-fg-muted hz-mt-1 hz-none" />
                <div>
                  <p className="hz-w-medium">Flexible Scaling</p>
                  <p className="hz-fg-muted hz-t-sm">Adjust AI credits month-to-month as your {fromProPlan ? "project" : "team and project"} needs evolve</p>
                </div>
              </div>
            </div>
          </div>

          <div className="hz-row hz-jc-center">
            <Button size="lg" className="hz-bg-inverse hz-fg-inverse hz-bordered hz-border-strong hz-transition hz-px-6 hz-py-5 hz-t-lg hz-hoverable">
              Get Started with {fromProPlan ? "Pro" : "Team"} Plan
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamPlanDetails;