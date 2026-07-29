
import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import KanbanBoard from "@/components/dashboard/KanbanBoard";
import AgentsList from "@/components/dashboard/AgentsList";
import { Button } from "@/components/ui/button";
import { PlusCircle, LayoutGrid, Users, ChartBar, X, Plus, Database, Bot, Activity, Server } from "lucide-react";
import CommandPalette from "@/components/dashboard/CommandPalette";
import { useSearchParams, useNavigate } from "react-router-dom";
import TabsManager, { TabType } from "@/components/dashboard/TabsManager";
import { v4 as uuidv4 } from 'uuid';

const Dashboard = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const viewParam = searchParams.get('view');
  const [view, setView] = useState<"board" | "agents" | "analytics">(
    (viewParam as "board" | "agents" | "analytics") || "board"
  );

  // For tabs
  const [tabs, setTabs] = useState<TabType[]>([
    {
      id: "tab-1",
      title: "Board",
      icon: <LayoutGrid className="hz-sq-2" />,
      content: <KanbanBoard />
    },
    {
      id: "tab-2",
      title: "Agents",
      icon: <Bot className="hz-sq-2" />,
      content: <AgentsList />
    },
    {
      id: "tab-3",
      title: "Analytics",
      icon: <ChartBar className="hz-sq-2" />,
      content: (
        <div className="hz-grid hz-grid-3 hz-gap-5">
          <div className="hz-card">
            <h3 className="hz-t-lg hz-w-medium hz-mb-4">Usage Overview</h3>
            <p className="hz-t-2xl hz-w-semibold">24.5K</p>
            <p className="hz-fg-muted hz-t-sm">Total tokens used today</p>
            <div className="hz-bh-8 hz-mt-4 hz-row hz-ai-end">
              {[45, 35, 65, 50, 75, 55, 70].map((height, index) => (
                <div 
                  key={index} 
                  className="hz-w-full hz-bg-raised"
                  style={{ height: `${height}%` }}
                ></div>
              ))}
            </div>
          </div>
          
          <div className="hz-card">
            <h3 className="hz-t-lg hz-w-medium hz-mb-4">Agent Activity</h3>
            <p className="hz-t-2xl hz-w-semibold">8</p>
            <p className="hz-fg-muted hz-t-sm">Active agents</p>
            <div className="hz-bh-8 hz-mt-4 hz-row hz-ai-center hz-jc-center">
              <div className="hz-sq-8 hz-rel hz-r-full hz-bordered hz-border-strong hz-row hz-ai-center hz-jc-center">
                <div className="hz-sq-8 hz-r-full hz-bg-raised"></div>
                <div className="hz-sq-2 hz-abs hz-top-0 hz-right-0 hz-r-full hz-bg-raised"></div>
                <div className="hz-sq-2 hz-abs hz-r-full hz-bg-raised"></div>
                <div className="hz-sq-1 hz-abs hz-left-0 hz-r-full hz-bg-raised"></div>
              </div>
            </div>
          </div>
          
          <div className="hz-card">
            <h3 className="hz-t-lg hz-w-medium hz-mb-4">Cost Tracking</h3>
            <p className="hz-t-2xl hz-w-semibold">$12.85</p>
            <p className="hz-fg-muted hz-t-sm">Spent this month</p>
            <div className="hz-bh-8 hz-mt-4">
              <div className="hz-h-full hz-col hz-jc-between">
                <div className="hz-w-full hz-bg-surface hz-bh-2 hz-r-full hz-clip">
                  <div className="hz-bg-raised hz-h-full hz-r-full" style={{ width: '65%' }}></div>
                </div>
                <div className="hz-w-full hz-bg-surface hz-bh-2 hz-r-full hz-clip">
                  <div className="hz-bg-raised hz-h-full hz-r-full" style={{ width: '42%' }}></div>
                </div>
                <div className="hz-w-full hz-bg-surface hz-bh-2 hz-r-full hz-clip">
                  <div className="hz-bg-raised hz-h-full hz-r-full" style={{ width: '28%' }}></div>
                </div>
                <div className="hz-w-full hz-bg-surface hz-bh-2 hz-r-full hz-clip">
                  <div className="hz-bg-raised hz-h-full hz-r-full" style={{ width: '13%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ]);

  const addNewTab = () => {
    const tabOptions = [
      { 
        title: "New Board", 
        icon: <LayoutGrid className="hz-sq-2" />, 
        content: <KanbanBoard /> 
      },
      { 
        title: "Agents", 
        icon: <Bot className="hz-sq-2" />, 
        content: <AgentsList /> 
      },
      { 
        title: "Analytics", 
        icon: <ChartBar className="hz-sq-2" />, 
        content: tabs[2].content 
      },
      { 
        title: "Data Sources", 
        icon: <Database className="hz-sq-2" />, 
        content: <div className="hz-p-4">Data Sources content</div> 
      },
      { 
        title: "Infrastructure", 
        icon: <Server className="hz-sq-2" />, 
        content: <div className="hz-p-4">Infrastructure content</div> 
      }
    ];

    // For now, just add a random tab type
    const randomOption = tabOptions[Math.floor(Math.random() * tabOptions.length)];
    const newTab = {
      id: `tab-${uuidv4()}`,
      title: randomOption.title,
      icon: randomOption.icon,
      content: randomOption.content
    };

    setTabs([...tabs, newTab]);
  };

  return (
    <DashboardLayout>
      <div className="hz-col hz-h-full">
        <div className="hz-row hz-jc-between hz-ai-center hz-mb-4">
          <div>
            <h1 className="hz-t-2xl hz-w-semibold">Workspace</h1>
            <p className="hz-fg-muted hz-t-sm hz-mt-1">Manage your AI tasks and agents</p>
          </div>
        </div>

        <div className="hz-grow hz-clip hz-bordered hz-r-lg hz-bg">
          <TabsManager initialTabs={tabs} onAddTab={addNewTab} />
        </div>
      </div>
      
      <CommandPalette />
    </DashboardLayout>
  );
};

export default Dashboard;
