
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Bot, Activity, Database, Settings, PlayCircle, StopCircle, Brain, Zap, PlusCircle, Search, List, LayoutGrid } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { DummyAgentData, Agent } from "./data";
import { cn } from "@/lib/utils";
import AgentDetail from "./AgentDetail";
import { toast } from "sonner";

interface AgentsListProps {
  viewMode?: "list" | "grid";
}

const AgentsList = ({ viewMode = "grid" }: AgentsListProps) => {
  const [agents, setAgents] = useState<Agent[]>(DummyAgentData);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [displayMode, setDisplayMode] = useState<"list" | "grid">(viewMode);

  const filteredAgents = agents.filter(agent => 
    agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    agent.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const statusColors = {
    idle: "bg-gray-500",
    running: "bg-neutral-500",
    paused: "bg-neutral-500",
    error: "bg-neutral-600"
  };

  const getStatusText = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const handleAgentClick = (agent: Agent) => {
    setSelectedAgent(agent);
  };

  const handleAgentUpdate = (updatedAgent: Agent) => {
    const updatedAgents = agents.map(agent => 
      agent.id === updatedAgent.id ? updatedAgent : agent
    );
    setAgents(updatedAgents);
    setSelectedAgent(null);
    toast.success(`Agent ${updatedAgent.name} updated successfully`);
  };

  const handleStatusToggle = (agent: Agent, e: React.MouseEvent) => {
    e.stopPropagation();
    const newStatus = agent.status === "running" ? "paused" : "running";
    const updatedAgent = { ...agent, status: newStatus as "running" | "paused" };
    
    const updatedAgents = agents.map(a => 
      a.id === agent.id ? updatedAgent : a
    );
    
    setAgents(updatedAgents);
    toast.success(`Agent ${agent.name} ${newStatus === "running" ? "started" : "paused"}`);
  };

  const toggleDisplayMode = () => {
    setDisplayMode(prev => prev === "grid" ? "list" : "grid");
  };

  return (
    <div className="hz-h-full hz-col">
      <div className="hz-row hz-jc-between hz-ai-center hz-mb-4">
        <div className="hz-rel hz-bw-8">
          <Search className="hz-sq-2 hz-abs hz-fg-muted" />
          <Input 
            placeholder="Search agents..." 
            className="hz-bg hz-px-6"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="hz-row hz-inline-2">
          <Button 
            variant="ghost" 
            className="hz-bordered" 
            onClick={toggleDisplayMode}
            title={displayMode === "grid" ? "Switch to List View" : "Switch to Grid View"}
          >
            {displayMode === "grid" ? <List className="hz-sq-2" /> : <LayoutGrid className="hz-sq-2" />}
          </Button>
          <Button className="hz-bg hz-bordered hz-hoverable">
            <PlusCircle className="hz-sq-2 hz-mr-2" />
            New Agent
          </Button>
        </div>
      </div>
      
      {displayMode === "grid" ? (
        <div className="hz-bordered hz-r-lg hz-clip">
          <table className="hz-w-full hz-t-sm">
            <thead>
              <tr className="hz-bg hz-align-left">
                <th className="hz-px-4 hz-py-3 hz-w-medium hz-fg-muted">Name</th>
                <th className="hz-px-4 hz-py-3 hz-w-medium hz-fg-muted">Status</th>
                <th className="hz-px-4 hz-py-3 hz-w-medium hz-fg-muted">Type</th>
                <th className="hz-px-4 hz-py-3 hz-w-medium hz-fg-muted">Model</th>
                <th className="hz-px-4 hz-py-3 hz-w-medium hz-fg-muted">Tasks</th>
                <th className="hz-px-4 hz-py-3 hz-w-medium hz-fg-muted">Memory</th>
                <th className="hz-px-4 hz-py-3 hz-w-medium hz-fg-muted">Tokens</th>
                <th className="hz-px-4 hz-py-3 hz-w-medium hz-fg-muted">Cost</th>
                <th className="hz-px-4 hz-py-3 hz-w-medium hz-fg-muted">Actions</th>
              </tr>
            </thead>
            <tbody className="">
              {filteredAgents.map((agent) => (
                <tr 
                  key={agent.id} 
                  className="hz-bg hz-pointer hz-hoverable"
                  onClick={() => handleAgentClick(agent)}
                >
                  <td className="hz-px-4 hz-py-3">
                    <div className="hz-row hz-ai-center">
                      <div className="hz-sq-5 hz-r-md hz-bg-raised hz-bordered hz-row hz-ai-center hz-jc-center hz-mr-3">
                        <Bot className="hz-sq-2 hz-fg-muted" />
                      </div>
                      <div>
                        <div className="hz-w-medium">{agent.name}</div>
                        <div className="hz-t-xs hz-fg-muted">Last active: {agent.lastActive}</div>
                      </div>
                    </div>
                  </td>
                  <td className="hz-px-4 hz-py-3">
                    <div className="hz-row hz-ai-center">
                      <div className={`hz-sq-1 hz-r-full ${statusColors[agent.status]} hz-mr-2`}></div>
                      {getStatusText(agent.status)}
                    </div>
                  </td>
                  <td className="hz-px-4 hz-py-3">
                    <div className="hz-row hz-ai-center">
                      {agent.type === "Research" && <Database className="hz-sq-2 hz-mr-1 hz-fg-muted" />}
                      {agent.type === "Coding" && <Brain className="hz-sq-2 hz-mr-1 hz-fg-muted" />}
                      {agent.type === "Assistant" && <Activity className="hz-sq-2 hz-mr-1 hz-fg-muted" />}
                      {agent.type}
                    </div>
                  </td>
                  <td className="hz-px-4 hz-py-3 hz-fg-soft">{agent.model}</td>
                  <td className="hz-px-4 hz-py-3">{agent.tasks}</td>
                  <td className="hz-px-4 hz-py-3">
                    <div className="hz-row hz-ai-center">
                      <Progress 
                        value={agent.memory} 
                        className="hz-bh-1 hz-bw-8 hz-mr-2 hz-bg-raised" 
                        style={{
                          '--progress-background': agent.memory > 80 ? 'bg-neutral-600' : 
                            agent.memory > 60 ? 'bg-neutral-500' : 
                            'bg-neutral-600'
                        } as React.CSSProperties}
                      />
                      <span>{agent.memory}%</span>
                    </div>
                  </td>
                  <td className="hz-px-4 hz-py-3">{agent.tokens.toLocaleString()}</td>
                  <td className="hz-px-4 hz-py-3">${agent.cost.toFixed(2)}</td>
                  <td className="hz-px-4 hz-py-3">
                    <div className="hz-row hz-inline-1" onClick={(e) => e.stopPropagation()}>
                      {agent.status === "running" ? (
                        <Button size="icon" variant="ghost" className="hz-sq-5 hz-fg-muted hz-link" onClick={(e) => handleStatusToggle(agent, e)}>
                          <StopCircle className="hz-sq-2" />
                        </Button>
                      ) : (
                        <Button size="icon" variant="ghost" className="hz-sq-5 hz-fg-muted hz-link" onClick={(e) => handleStatusToggle(agent, e)}>
                          <PlayCircle className="hz-sq-2" />
                        </Button>
                      )}
                      <Button size="icon" variant="ghost" className="hz-sq-5 hz-fg-muted hz-link">
                        <Settings className="hz-sq-2" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="hz-grid hz-grid-3 hz-gap-4">
          {filteredAgents.map((agent) => (
            <div 
              key={agent.id}
              className="hz-card hz-pointer hz-transition hz-card-interactive"
              onClick={() => handleAgentClick(agent)}
            >
              <div className="hz-row hz-ai-center hz-jc-between hz-mb-3">
                <div className="hz-row hz-ai-center">
                  <div className="hz-sq-5 hz-r-md hz-bg-raised hz-bordered hz-row hz-ai-center hz-jc-center hz-mr-3">
                    <Bot className="hz-sq-2 hz-fg-muted" />
                  </div>
                  <div>
                    <div className="hz-w-medium">{agent.name}</div>
                    <div className="hz-t-xs hz-fg-muted">Last active: {agent.lastActive}</div>
                  </div>
                </div>
                <div className="hz-row hz-ai-center">
                  <div className={`hz-sq-1 hz-r-full ${statusColors[agent.status]} hz-mr-2`}></div>
                  <span className="hz-t-sm">{getStatusText(agent.status)}</span>
                </div>
              </div>
              
              <div className="hz-mb-3 hz-t-sm">
                <div className="hz-row hz-jc-between hz-mb-1">
                  <span className="hz-fg-muted">Type:</span>
                  <span className="hz-row hz-ai-center">
                    {agent.type === "Research" && <Database className="hz-sq-1 hz-mr-1 hz-fg-muted" />}
                    {agent.type === "Coding" && <Brain className="hz-sq-1 hz-mr-1 hz-fg-muted" />}
                    {agent.type === "Assistant" && <Activity className="hz-sq-1 hz-mr-1 hz-fg-muted" />}
                    {agent.type}
                  </span>
                </div>
                <div className="hz-row hz-jc-between hz-mb-1">
                  <span className="hz-fg-muted">Model:</span>
                  <span>{agent.model}</span>
                </div>
                <div className="hz-row hz-jc-between hz-mb-1">
                  <span className="hz-fg-muted">Tasks:</span>
                  <span>{agent.tasks}</span>
                </div>
                <div className="hz-row hz-jc-between hz-mb-1">
                  <span className="hz-fg-muted">Tokens:</span>
                  <span>{agent.tokens.toLocaleString()}</span>
                </div>
                <div className="hz-row hz-jc-between">
                  <span className="hz-fg-muted">Cost:</span>
                  <span>${agent.cost.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="hz-row hz-ai-center hz-jc-between">
                <div className="hz-row hz-ai-center hz-t-sm">
                  <span className="hz-fg-muted hz-mr-2">Memory:</span>
                  <Progress 
                    value={agent.memory} 
                    className="hz-bh-1 hz-bw-8 hz-mr-2 hz-bg-raised" 
                    style={{
                      '--progress-background': agent.memory > 80 ? 'bg-neutral-600' : 
                        agent.memory > 60 ? 'bg-neutral-500' : 
                        'bg-neutral-600'
                    } as React.CSSProperties}
                  />
                  <span>{agent.memory}%</span>
                </div>
                
                <div className="hz-row hz-inline-1" onClick={(e) => e.stopPropagation()}>
                  {agent.status === "running" ? (
                    <Button size="icon" variant="ghost" className="hz-sq-5 hz-fg-muted hz-link" onClick={(e) => handleStatusToggle(agent, e)}>
                      <StopCircle className="hz-sq-2" />
                    </Button>
                  ) : (
                    <Button size="icon" variant="ghost" className="hz-sq-5 hz-fg-muted hz-link" onClick={(e) => handleStatusToggle(agent, e)}>
                      <PlayCircle className="hz-sq-2" />
                    </Button>
                  )}
                  <Button size="icon" variant="ghost" className="hz-sq-5 hz-fg-muted hz-link">
                    <Settings className="hz-sq-2" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedAgent && (
        <AgentDetail
          agent={selectedAgent}
          onClose={() => setSelectedAgent(null)}
          onUpdate={handleAgentUpdate}
        />
      )}
    </div>
  );
};

export default AgentsList;
