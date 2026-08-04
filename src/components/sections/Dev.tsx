
import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Code, 
  Terminal, 
  BookOpen, 
  FileText, 
  Settings, 
  Server, 
  Database, 
  Shield, 
  Search, 
  Download,
  ChevronRight,
  ExternalLink,
  Bot
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Sidebar navigation items
const sidebarItems = [
  { label: "Getting Started", icon: <BookOpen className="hz-sq-2" />, active: true },
  { label: "API Reference", icon: <Code className="hz-sq-2" /> },
  { label: "Models & Pricing", icon: <Database className="hz-sq-2" /> },
  { label: "Security", icon: <Shield className="hz-sq-2" /> },
  { label: "Tool Use", icon: <Settings className="hz-sq-2" /> },
  { label: "Deployment", icon: <Server className="hz-sq-2" /> },
  { label: "Examples", icon: <FileText className="hz-sq-2" /> },
];

// Setup steps for the getting started section
const setupSteps = [
  {
    title: "Install Hanzo Dev",
    code: "npm install -g @hanzo/dev",
    description: "Do NOT use sudo npm install -g as this can lead to permission issues."
  },
  {
    title: "Navigate to your project",
    code: "cd your-project-directory",
    description: "Open the terminal and navigate to your project folder."
  },
  {
    title: "Start Hanzo Dev",
    code: "hanzo",
    description: "Run the command to launch the interactive interface."
  },
  {
    title: "Complete authentication",
    code: "",
    description: "Follow the one-time OAuth process with your Hanzo account."
  }
];

const Dev = () => {
  const [activeTab, setActiveTab] = useState<string>("getting-started");
  
  return (
    <section className="hz-py-7 hz-bg-inverse hz-border-t hz-border-strong">
      <div className="hz-container">
        <div className="hz-col-row hz-gap-6">
          {/* Sidebar */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="hz-none"
          >
            <div className="hz-sticky">
              <div className="hz-mb-6">
                <h2 className="hz-t-lg hz-w-medium hz-mb-2 hz-fg-faint">Hanzo Dev</h2>
                <p className="hz-t-sm hz-fg-faint">
                  Documentation and resources for developers
                </p>
              </div>
              
              <div className="hz-mobile-only hz-row hz-mb-5">
                <Button variant="outline" className="hz-w-full hz-row hz-ai-center hz-jc-between">
                  <span>Navigate</span>
                  <ChevronRight className="hz-sq-2" />
                </Button>
              </div>
              
              <nav className="hz-desktop-only hz-stack-1">
                {sidebarItems.map((item, index) => (
                  <a 
                    key={index}
                    href={`#${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                    className={cn(
                      "hz-btn hz-btn-ghost",
                      item.active 
                        ? "hz-bg-inverse hz-fg-faint" 
                        : "hz-fg-faint hz-link"
                    )}
                  >
                    <span className={cn(
                      "hz-mr-3", 
                      item.active ? "hz-fg-muted" : "hz-fg-muted"
                    )}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </a>
                ))}
              </nav>
            </div>
          </motion.div>
          
          {/* Main Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="hz-grow"
          >
            <div className="hz-prose">
              <h1 className="hz-t-3xl hz-w-bold hz-fg-faint hz-mb-5">
                Hanzo Dev Documentation
              </h1>
              
              <div className="hz-card hz-mb-6">
                <div className="hz-row">
                  <div className="hz-none">
                    <Bot className="hz-sq-3 hz-fg-muted" />
                  </div>
                  <div className="hz-ml-3">
                    <h3 className="hz-t-sm hz-w-medium hz-fg-faint">
                      Beta Release
                    </h3>
                    <div className="hz-mt-2 hz-t-sm hz-fg-faint">
                      <p>
                        Hanzo Dev is currently in beta. We're gathering developer feedback to improve the experience.
                        Please report any issues directly through our GitHub repository.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <h2 className="hz-t-2xl hz-w-semibold hz-fg-faint hz-mt-6 hz-mb-4" id="getting-started">
                Getting Started
              </h2>
              
              <p className="hz-fg-faint hz-mb-5">
                Hanzo Dev is an AI developer tool that lives in your terminal, understands your codebase, 
                and helps you code faster through natural language commands.
              </p>
              
              {/* System Requirements */}
              <div className="hz-mb-6">
                <h3 className="hz-t-xl hz-w-semibold hz-fg-faint hz-mb-4">
                  System Requirements
                </h3>
                
                <div className="hz-grid hz-grid-2 hz-gap-4 hz-mb-5">
                  <div className="hz-bordered hz-border-strong hz-r-md hz-p-4">
                    <h4 className="hz-w-medium hz-fg-faint hz-mb-2">Operating Systems</h4>
                    <ul className="hz-t-sm hz-fg-faint hz-stack-1 hz-ml-4">
                      <li>macOS 10.15+</li>
                      <li>Ubuntu 20.04+/Debian 10+</li>
                      <li>Windows via WSL</li>
                    </ul>
                  </div>
                  
                  <div className="hz-bordered hz-border-strong hz-r-md hz-p-4">
                    <h4 className="hz-w-medium hz-fg-faint hz-mb-2">Software</h4>
                    <ul className="hz-t-sm hz-fg-faint hz-stack-1 hz-ml-4">
                      <li>Node.js 18+</li>
                      <li>git 2.23+ (optional)</li>
                      <li>GitHub or GitLab CLI (optional)</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              {/* Installation Steps */}
              <div className="hz-mb-6">
                <h3 className="hz-t-xl hz-w-semibold hz-fg-faint hz-mb-4">
                  Install and Set Up
                </h3>
                
                <div className="hz-stack-4">
                  {setupSteps.map((step, index) => (
                    <div key={index} className="hz-bordered hz-border-strong hz-r-md hz-clip">
                      <div className="hz-bg-inverse hz-px-4 hz-py-2 hz-border-b hz-border-strong">
                        <div className="hz-row hz-ai-center">
                          <div className="hz-sq-4 hz-none hz-r-full hz-bg-raised hz-fg hz-row hz-ai-center hz-jc-center hz-t-sm hz-w-medium">
                            {index + 1}
                          </div>
                          <h4 className="hz-ml-3 hz-w-medium hz-fg-faint">{step.title}</h4>
                        </div>
                      </div>
                      <div className="hz-px-4 hz-py-3">
                        <p className="hz-t-sm hz-fg-faint hz-mb-3">{step.description}</p>
                        {step.code && (
                          <div className="hz-bg-inverse hz-r-md hz-p-3 hz-mono hz-t-sm hz-scroll-x">
                            {step.code}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Core Features */}
              <div className="hz-mb-6">
                <h3 className="hz-t-xl hz-w-semibold hz-fg-faint hz-mb-4">
                  Core Features
                </h3>
                
                <div className="hz-grid hz-grid-2 hz-gap-4">
                  <div className="hz-bordered hz-border-strong hz-r-md hz-p-4">
                    <Code className="hz-sq-3 hz-fg-muted hz-mb-2" />
                    <h4 className="hz-w-medium hz-fg-faint hz-mb-2">Understand Code</h4>
                    <p className="hz-t-sm hz-fg-faint">
                      Ask questions about your codebase architecture, logic, and functions to get immediate insights.
                    </p>
                  </div>
                  
                  <div className="hz-bordered hz-border-strong hz-r-md hz-p-4">
                    <Terminal className="hz-sq-3 hz-fg-muted hz-mb-2" />
                    <h4 className="hz-w-medium hz-fg-faint hz-mb-2">Execute Commands</h4>
                    <p className="hz-t-sm hz-fg-faint">
                      Run tests, linting, and other commands with natural language instructions.
                    </p>
                  </div>
                  
                  <div className="hz-bordered hz-border-strong hz-r-md hz-p-4">
                    <FileText className="hz-sq-3 hz-fg-muted hz-mb-2" />
                    <h4 className="hz-w-medium hz-fg-faint hz-mb-2">Edit Files</h4>
                    <p className="hz-t-sm hz-fg-faint">
                      Make changes to your code across multiple files with simple natural language requests.
                    </p>
                  </div>
                  
                  <div className="hz-bordered hz-border-strong hz-r-md hz-p-4">
                    <Search className="hz-sq-3 hz-fg-muted hz-mb-2" />
                    <h4 className="hz-w-medium hz-fg-faint hz-mb-2">Search & Navigate</h4>
                    <p className="hz-t-sm hz-fg-faint">
                      Quickly search through git history, find files, and navigate complex codebases.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Example Usage */}
              <div className="hz-mb-6">
                <h3 className="hz-t-xl hz-w-semibold hz-fg-faint hz-mb-4">
                  Example Usage
                </h3>
                
                <div className="hz-bg-inverse hz-r-md hz-p-4 hz-mono hz-t-sm hz-mb-5 hz-scroll-x">
                  <div className="hz-fg-muted"># Ask about your codebase</div>
                  <div className="hz-fg-faint">hanzo</div>
                  <div className="hz-fg-faint">&gt; how does our authentication system work?</div>
                  <div className="hz-mt-2 hz-fg-muted"># Fix issues across files</div>
                  <div className="hz-fg-faint">&gt; fix the type errors in the auth module</div>
                  <div className="hz-mt-2 hz-fg-muted"># Create a commit</div>
                  <div className="hz-fg-faint">&gt; commit my changes</div>
                </div>
              </div>
              
              <div className="hz-row hz-jc-center hz-mt-7">
                <Button className="hz-bg-raised hz-fg hz-hoverable">
                  <Download className="hz-sq-2 hz-mr-2" />
                  <a href="#download">Install Hanzo Dev</a>
                </Button>
                <Button variant="outline" className="hz-ml-4">
                  <ExternalLink className="hz-sq-2 hz-mr-2" />
                  <a href="https://github.com/hanzoai/dev" target="_blank" rel="noopener noreferrer">View on GitHub</a>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Dev;
