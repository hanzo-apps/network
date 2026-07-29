
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  LayoutDashboard, 
  Users, 
  Settings, 
  FileCog, 
  Bot, 
  Search, 
  ChevronDown, 
  PlusCircle, 
  BellDot,
  Database,
  Server,
  Cpu,
  Layers,
  Command,
  Keyboard
} from "lucide-react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const navigate = useNavigate();

  return (
    <div className="hz-row hz-h-screen hz-bg hz-fg hz-clip">
      {/* Sidebar */}
      <div className="hz-bw-8 hz-border-r hz-col">
        {/* User/Team Selector */}
        <div className="hz-p-3 hz-border-b hz-row hz-ai-center">
          <div className="hz-sq-4 hz-bg-raised hz-r-md hz-row hz-ai-center hz-jc-center hz-t-xs hz-w-bold hz-mr-2">H</div>
          <span className="hz-w-medium">Hanzo AI</span>
          <ChevronDown className="hz-sq-2 hz-ml-auto" />
        </div>
        
        {/* Search */}
        <div className="hz-px-3 hz-py-2 hz-border-b">
          <Button variant="outline" className="hz-w-full hz-jc-start hz-fg-muted hz-bg">
            <Search className="hz-sq-2 hz-mr-2" />
            <span>Search...</span>
            <div className="hz-ml-auto hz-row hz-ai-center hz-t-xs hz-fg-muted">
              <Command className="hz-sq-1 hz-mr-1" />
              <span>K</span>
            </div>
          </Button>
        </div>
        
        {/* Navigation */}
        <nav className="hz-grow hz-scroll-y hz-py-3 hz-px-3">
          <div className="hz-mb-5">
            <div className="hz-fg-muted hz-t-xs hz-w-medium hz-mb-2 hz-px-2">WORKSPACE</div>
            <ul className="hz-stack-1">
              <li>
                <Button variant="ghost" className="hz-w-full hz-jc-start hz-fg-soft hz-hoverable" onClick={() => navigate("/dashboard")}>
                  <LayoutDashboard className="hz-sq-2 hz-mr-2" /> 
                  Dashboard
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="hz-w-full hz-jc-start hz-fg-soft hz-hoverable">
                  <FileCog className="hz-sq-2 hz-mr-2" /> 
                  Projects
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="hz-w-full hz-jc-start hz-fg-soft hz-hoverable">
                  <Bot className="hz-sq-2 hz-mr-2" /> 
                  AI Agents
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="hz-w-full hz-jc-start hz-fg-soft hz-hoverable">
                  <Database className="hz-sq-2 hz-mr-2" /> 
                  Data Sources
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="hz-w-full hz-jc-start hz-fg-soft hz-hoverable">
                  <Server className="hz-sq-2 hz-mr-2" /> 
                  Infrastructure
                </Button>
              </li>
            </ul>
          </div>
          
          <div className="hz-mb-5">
            <div className="hz-row hz-ai-center hz-jc-between hz-fg-muted hz-t-xs hz-w-medium hz-mb-2 hz-px-2">
              <span>MODELS</span>
              <Button size="icon" variant="ghost" className="hz-sq-2 hz-fg-muted hz-link">
                <PlusCircle className="hz-sq-1" />
              </Button>
            </div>
            <ul className="hz-stack-1">
              <li>
                <Button variant="ghost" className="hz-w-full hz-jc-start hz-fg-soft hz-hoverable">
                  <div className="hz-sq-2 hz-bg-raised hz-r-sm hz-row hz-ai-center hz-jc-center hz-t-xs hz-mr-2">G</div>
                  GPT-4o
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="hz-w-full hz-jc-start hz-fg-soft hz-hoverable">
                  <div className="hz-sq-2 hz-bg-raised hz-r-sm hz-row hz-ai-center hz-jc-center hz-t-xs hz-mr-2">C</div>
                  Claude 3
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="hz-w-full hz-jc-start hz-fg-soft hz-hoverable">
                  <div className="hz-sq-2 hz-bg-raised hz-r-sm hz-row hz-ai-center hz-jc-center hz-t-xs hz-mr-2">L</div>
                  Llama 3
                </Button>
              </li>
            </ul>
          </div>
          
          <div className="hz-mb-5">
            <div className="hz-row hz-ai-center hz-jc-between hz-fg-muted hz-t-xs hz-w-medium hz-mb-2 hz-px-2">
              <span>TEAMS</span>
              <Button size="icon" variant="ghost" className="hz-sq-2 hz-fg-muted hz-link">
                <PlusCircle className="hz-sq-1" />
              </Button>
            </div>
            <ul className="hz-stack-1">
              <li>
                <Button variant="ghost" className="hz-w-full hz-jc-start hz-fg-soft hz-hoverable">
                  <div className="hz-sq-2 hz-bg-raised hz-r-sm hz-row hz-ai-center hz-jc-center hz-t-xs hz-mr-2">E</div>
                  Engineering
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="hz-w-full hz-jc-start hz-fg-soft hz-hoverable">
                  <div className="hz-sq-2 hz-bg-raised hz-r-sm hz-row hz-ai-center hz-jc-center hz-t-xs hz-mr-2">D</div>
                  Design
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="hz-w-full hz-jc-start hz-fg-soft hz-hoverable">
                  <div className="hz-sq-2 hz-bg-raised hz-r-sm hz-row hz-ai-center hz-jc-center hz-t-xs hz-mr-2">M</div>
                  Marketing
                </Button>
              </li>
            </ul>
          </div>
        </nav>
        
        {/* Footer */}
        <div className="hz-mt-auto hz-border-t hz-p-3">
          <ul className="hz-stack-1">
            <li>
              <Button variant="ghost" className="hz-w-full hz-jc-start hz-fg-soft hz-hoverable">
                <Settings className="hz-sq-2 hz-mr-2" /> 
                Settings
              </Button>
            </li>
            <li>
              <Button variant="ghost" className="hz-w-full hz-jc-start hz-fg-soft hz-hoverable">
                <Keyboard className="hz-sq-2 hz-mr-2" /> 
                Keyboard Shortcuts
              </Button>
            </li>
            <li>
              <Button variant="ghost" className="hz-w-full hz-jc-start hz-fg-soft hz-hoverable" onClick={() => navigate("/")}>
                <Home className="hz-sq-2 hz-mr-2" /> 
                Home
              </Button>
            </li>
          </ul>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="hz-grow hz-clip hz-col">
        {/* Header */}
        <header className="hz-bh-7 hz-border-b hz-row hz-ai-center hz-px-4">
          <div className="hz-grow"></div>
          <div className="hz-row hz-ai-center hz-inline-3">
            <Button size="icon" variant="ghost" className="hz-fg-muted hz-link">
              <BellDot className="hz-sq-3" />
            </Button>
            <div className="hz-sq-5 hz-r-full hz-bordered"></div>
          </div>
        </header>
        
        {/* Content */}
        <main className="hz-grow hz-clip hz-p-5">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
