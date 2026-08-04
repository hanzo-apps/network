import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, ExternalLink, Github, Plug } from "lucide-react";

// Sample integrations data - in production, this would come from an API
const integrationCategories = [
  "AI", "Analytics", "Communication", "CRM", "Database", "Developer Tools",
  "E-commerce", "Files & Storage", "Finance", "Marketing", "Productivity",
  "Project Management", "Sales", "Social Media", "Support"
];

const sampleIntegrations = [
  { name: "OpenAI", category: "AI", logo: "🤖", description: "GPT models and AI capabilities" },
  { name: "Anthropic", category: "AI", logo: "🧠", description: "Claude AI models" },
  { name: "Google AI", category: "AI", logo: "🔷", description: "Gemini and Google AI services" },
  { name: "Slack", category: "Communication", logo: "💬", description: "Team messaging and notifications" },
  { name: "Discord", category: "Communication", logo: "🎮", description: "Community chat platform" },
  { name: "Gmail", category: "Communication", logo: "📧", description: "Email automation" },
  { name: "Salesforce", category: "CRM", logo: "☁️", description: "CRM and sales automation" },
  { name: "HubSpot", category: "CRM", logo: "🔶", description: "Marketing and sales CRM" },
  { name: "Square", category: "Finance", logo: "💳", description: "Payment processing" },
  { name: "GitHub", category: "Developer Tools", logo: "🐙", description: "Code repository automation" },
  { name: "GitLab", category: "Developer Tools", logo: "🦊", description: "DevOps platform" },
  { name: "Jira", category: "Project Management", logo: "📋", description: "Issue tracking" },
  { name: "Notion", category: "Productivity", logo: "📓", description: "All-in-one workspace" },
  { name: "Airtable", category: "Database", logo: "📊", description: "Spreadsheet-database hybrid" },
  { name: "Google Sheets", category: "Productivity", logo: "📗", description: "Spreadsheet automation" },
  { name: "Shopify", category: "E-commerce", logo: "🛒", description: "E-commerce platform" },
  { name: "WooCommerce", category: "E-commerce", logo: "🛍️", description: "WordPress e-commerce" },
  { name: "Mailchimp", category: "Marketing", logo: "🐵", description: "Email marketing" },
  { name: "Twilio", category: "Communication", logo: "📱", description: "SMS and voice" },
  { name: "Zendesk", category: "Support", logo: "🎫", description: "Customer support" },
  { name: "Intercom", category: "Support", logo: "💭", description: "Customer messaging" },
  { name: "Linear", category: "Project Management", logo: "⚡", description: "Modern issue tracking" },
  { name: "Asana", category: "Project Management", logo: "🎯", description: "Work management" },
  { name: "Trello", category: "Project Management", logo: "📌", description: "Kanban boards" },
  { name: "PostgreSQL", category: "Database", logo: "🐘", description: "Relational database" },
  { name: "MongoDB", category: "Database", logo: "🍃", description: "Document database" },
  { name: "Redis", category: "Database", logo: "🔴", description: "In-memory data store" },
  { name: "AWS S3", category: "Files & Storage", logo: "📦", description: "Object storage" },
  { name: "Google Drive", category: "Files & Storage", logo: "📁", description: "Cloud storage" },
  { name: "Dropbox", category: "Files & Storage", logo: "📂", description: "File sync and share" },
  { name: "Twitter/X", category: "Social Media", logo: "🐦", description: "Social media automation" },
  { name: "LinkedIn", category: "Social Media", logo: "💼", description: "Professional networking" },
  { name: "Facebook", category: "Social Media", logo: "👤", description: "Social media platform" },
  { name: "Instagram", category: "Social Media", logo: "📷", description: "Photo sharing" },
  { name: "YouTube", category: "Social Media", logo: "▶️", description: "Video platform" },
  { name: "Google Analytics", category: "Analytics", logo: "📈", description: "Web analytics" },
  { name: "Mixpanel", category: "Analytics", logo: "📊", description: "Product analytics" },
  { name: "Amplitude", category: "Analytics", logo: "📉", description: "Product intelligence" },
  { name: "Segment", category: "Analytics", logo: "🔀", description: "Customer data platform" },
  { name: "Pipedrive", category: "Sales", logo: "💰", description: "Sales CRM" },
  { name: "Calendly", category: "Productivity", logo: "📅", description: "Scheduling automation" },
  { name: "Zoom", category: "Communication", logo: "🎥", description: "Video meetings" },
  { name: "Microsoft Teams", category: "Communication", logo: "👥", description: "Team collaboration" },
  { name: "Webhook", category: "Developer Tools", logo: "🔗", description: "HTTP webhooks" },
  { name: "HTTP Request", category: "Developer Tools", logo: "🌐", description: "Custom API calls" },
  { name: "Code", category: "Developer Tools", logo: "💻", description: "Custom JavaScript/TypeScript" },
];

export default function IntegrationsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredIntegrations = sampleIntegrations.filter(integration => {
    const matchesSearch = integration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         integration.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || integration.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="hz-min-h-screen hz-bg hz-fg">
      <Navbar />
      <div className="hz-pt-6 hz-pb-6">
        {/* Hero Section */}
        <div className="hz-container">
          <div className="hz-align-center hz-mb-7">
            <Badge variant="outline" className="hz-mb-4 hz-border-strong hz-fg-muted">
              <Plug className="hz-sq-1 hz-mr-1" />
              280+ Integrations
            </Badge>
            <h1 className="hz-t-4xl hz-w-bold hz-mb-4">
              Connect to <span className="hz-fg-muted">Everything</span>
            </h1>
            <p className="hz-container-narrow hz-t-xl hz-fg-muted">
              Hanzo Auto comes with 280+ pre-built integrations to connect your favorite apps and services.
              All integrations are also available as MCP servers for use with Claude, Cursor, and other AI tools.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="hz-col-row hz-gap-4 hz-mb-6">
            <div className="hz-rel hz-grow">
              <Search className="hz-center-y hz-sq-2 hz-abs hz-fg-muted" />
              <Input
                placeholder="Search integrations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="hz-px-6 hz-bg-surface"
              />
            </div>
            <div className="hz-row hz-gap-2 hz-wrap">
              <Button
                variant={selectedCategory === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(null)}
                className={selectedCategory === null ? "hz-bg-raised hz-hoverable" : ""}
              >
                All
              </Button>
              {integrationCategories.slice(0, 8).map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? "hz-bg-raised hz-hoverable" : ""}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Integrations Grid */}
          <div className="hz-grid hz-grid-5 hz-gap-4">
            {filteredIntegrations.map((integration, index) => (
              <div
                key={index}
                className="hz-card hz-transition hz-pointer hz-card-interactive"
              >
                <div className="hz-t-3xl hz-mb-2">{integration.logo}</div>
                <h3 className="hz-w-semibold hz-fg hz-transition hz-hoverable">
                  {integration.name}
                </h3>
                <p className="hz-t-sm hz-fg-muted">{integration.description}</p>
                <Badge variant="outline" className="hz-mt-2 hz-t-xs">
                  {integration.category}
                </Badge>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="hz-card hz-mt-7 hz-align-center">
            <h2 className="hz-t-2xl hz-w-bold hz-mb-4">Need a custom integration?</h2>
            <p className="hz-fg-muted hz-mb-5">
              All integrations are built with TypeScript and are open source.
              Create your own pieces or request new integrations.
            </p>
            <div className="hz-row hz-gap-4 hz-jc-center">
              <Button asChild>
                <a href="https://github.com/hanzoai/auto" target="_blank" rel="noopener noreferrer">
                  <Github className="hz-sq-2 hz-mr-2" />
                  View on GitHub
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href="https://activepieces.com/pieces" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="hz-sq-2 hz-mr-2" />
                  Browse All Pieces
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
