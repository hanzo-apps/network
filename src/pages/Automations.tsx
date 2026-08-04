import { BRAND } from '@/lib/brand';
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  ArrowRight,
  Search,
  Zap,
  MessageSquare,
  Database,
  Cloud,
  Users,
  ShoppingCart,
  BarChart3,
  Mail,
  Calendar,
  FileText,
  Code,
  Bot,
  Palette,
  Share2,
  CreditCard,
  Phone,
  Video,
  Globe,
  ExternalLink,
} from "lucide-react";


// Integration categories
const categories = [
  { id: "all", name: "All", icon: Zap },
  { id: "ai", name: "AI & LLMs", icon: Bot },
  { id: "communication", name: "Communication", icon: MessageSquare },
  { id: "productivity", name: "Productivity", icon: FileText },
  { id: "data", name: "Data & Storage", icon: Database },
  { id: "crm", name: "CRM & Sales", icon: Users },
  { id: "commerce", name: "Commerce", icon: ShoppingCart },
  { id: "marketing", name: "Marketing", icon: Mail },
  { id: "developer", name: "Developer Tools", icon: Code },
  { id: "social", name: "Social Media", icon: Share2 },
];

// Featured integrations with icons and colors
const integrations = [
  // AI & LLMs
  { name: "OpenAI", category: "ai", icon: "🤖", color: "#a3a3a3", popular: true },
  { name: "Anthropic Claude", category: "ai", icon: "🧠", color: "#737373", popular: true },
  { name: "Google Gemini", category: "ai", icon: "✨", color: "#a3a3a3", popular: true },
  { name: "Azure OpenAI", category: "ai", icon: "☁️", color: "#d4d4d4" },
  { name: "Hugging Face", category: "ai", icon: "🤗", color: "#525252" },
  { name: "Replicate", category: "ai", icon: "🔄", color: "#000000" },
  { name: "Stability AI", category: "ai", icon: "🎨", color: "#a3a3a3" },
  { name: "ElevenLabs", category: "ai", icon: "🔊", color: "#000000" },
  { name: "Deepgram", category: "ai", icon: "🎙️", color: "#d4d4d4" },

  // Communication
  { name: "Slack", category: "communication", icon: "💬", color: "#525252", popular: true },
  { name: "Discord", category: "communication", icon: "🎮", color: "#737373", popular: true },
  { name: "Telegram", category: "communication", icon: "✈️", color: "#a3a3a3" },
  { name: "WhatsApp", category: "communication", icon: "📱", color: "#d4d4d4", popular: true },
  { name: "Microsoft Teams", category: "communication", icon: "👥", color: "#737373" },
  { name: "Twilio", category: "communication", icon: "📞", color: "#a3a3a3" },
  { name: "Zoom", category: "communication", icon: "📹", color: "#a3a3a3" },
  { name: "Google Chat", category: "communication", icon: "💭", color: "#d4d4d4" },

  // Productivity
  { name: "Notion", category: "productivity", icon: "📝", color: "#000000", popular: true },
  { name: "Airtable", category: "productivity", icon: "📊", color: "#a3a3a3", popular: true },
  { name: "Google Sheets", category: "productivity", icon: "📗", color: "#d4d4d4", popular: true },
  { name: "Google Docs", category: "productivity", icon: "📄", color: "#a3a3a3" },
  { name: "Google Drive", category: "productivity", icon: "📁", color: "#a3a3a3", popular: true },
  { name: "Dropbox", category: "productivity", icon: "📦", color: "#737373" },
  { name: "Calendly", category: "productivity", icon: "📅", color: "#737373" },
  { name: "Google Calendar", category: "productivity", icon: "🗓️", color: "#a3a3a3" },
  { name: "Trello", category: "productivity", icon: "📋", color: "#a3a3a3" },
  { name: "Asana", category: "productivity", icon: "✅", color: "#a3a3a3" },
  { name: "ClickUp", category: "productivity", icon: "🎯", color: "#737373" },
  { name: "Linear", category: "productivity", icon: "📐", color: "#737373", popular: true },
  { name: "Jira", category: "productivity", icon: "🔷", color: "#a3a3a3" },

  // Data & Storage
  { name: "PostgreSQL", category: "data", icon: "🐘", color: "#525252" },
  { name: "MySQL", category: "data", icon: "🐬", color: "#525252" },
  { name: "MongoDB", category: "data", icon: "🍃", color: "#d4d4d4" },
  { name: "Redis", category: "data", icon: "🔴", color: "#a3a3a3" },
  { name: "Supabase", category: "data", icon: "⚡", color: "#d4d4d4" },
  { name: "Firebase", category: "data", icon: "🔥", color: "#d4d4d4" },
  { name: "AWS S3", category: "data", icon: "☁️", color: "#a3a3a3" },
  { name: "Google Cloud Storage", category: "data", icon: "☁️", color: "#a3a3a3" },
  { name: "Snowflake", category: "data", icon: "❄️", color: "#a3a3a3" },
  { name: "BigQuery", category: "data", icon: "📊", color: "#a3a3a3" },

  // CRM & Sales
  { name: "Salesforce", category: "crm", icon: "☁️", color: "#a3a3a3", popular: true },
  { name: "HubSpot", category: "crm", icon: "🧡", color: "#a3a3a3", popular: true },
  { name: "Pipedrive", category: "crm", icon: "📈", color: "#737373" },
  { name: "Close", category: "crm", icon: "📞", color: "#525252" },
  { name: "Intercom", category: "crm", icon: "💬", color: "#a3a3a3" },
  { name: "Zendesk", category: "crm", icon: "🎧", color: "#525252" },
  { name: "Freshdesk", category: "crm", icon: "🎫", color: "#d4d4d4" },
  { name: "Apollo", category: "crm", icon: "🚀", color: "#737373" },

  // Commerce
  { name: "Square", category: "commerce", icon: "💳", color: "#737373", popular: true },
  { name: "Shopify", category: "commerce", icon: "🛒", color: "#d4d4d4", popular: true },
  { name: "WooCommerce", category: "commerce", icon: "🛍️", color: "#737373" },
  { name: "Square", category: "commerce", icon: "⬜", color: "#525252" },
  { name: "PayPal", category: "commerce", icon: "💰", color: "#525252" },
  { name: "Chargebee", category: "commerce", icon: "💵", color: "#a3a3a3" },
  { name: "Paddle", category: "commerce", icon: "🏓", color: "#525252" },
  { name: "LemonSqueezy", category: "commerce", icon: "🍋", color: "#d4d4d4" },

  // Marketing
  { name: "Mailchimp", category: "marketing", icon: "🐵", color: "#d4d4d4", popular: true },
  { name: "SendGrid", category: "marketing", icon: "📧", color: "#a3a3a3" },
  { name: "Resend", category: "marketing", icon: "✉️", color: "#000000" },
  { name: "ConvertKit", category: "marketing", icon: "📬", color: "#a3a3a3" },
  { name: "ActiveCampaign", category: "marketing", icon: "📊", color: "#a3a3a3" },
  { name: "Brevo", category: "marketing", icon: "📨", color: "#a3a3a3" },
  { name: "Customer.io", category: "marketing", icon: "👤", color: "#a3a3a3" },
  { name: "Postmark", category: "marketing", icon: "📮", color: "#d4d4d4" },

  // Developer Tools
  { name: "GitHub", category: "developer", icon: "🐙", color: "#525252", popular: true },
  { name: "GitLab", category: "developer", icon: "🦊", color: "#a3a3a3" },
  { name: "Vercel", category: "developer", icon: "▲", color: "#000000" },
  { name: "Netlify", category: "developer", icon: "🌐", color: "#d4d4d4" },
  { name: "Railway", category: "developer", icon: "🚂", color: "#525252" },
  { name: "Render", category: "developer", icon: "🎨", color: "#d4d4d4" },
  { name: "Sentry", category: "developer", icon: "🐛", color: "#525252" },
  { name: "PagerDuty", category: "developer", icon: "🚨", color: "#d4d4d4" },
  { name: "Datadog", category: "developer", icon: "🐕", color: "#737373" },

  // Social Media
  { name: "Twitter / X", category: "social", icon: "𝕏", color: "#000000" },
  { name: "LinkedIn", category: "social", icon: "🔗", color: "#a3a3a3", popular: true },
  { name: "Instagram", category: "social", icon: "📸", color: "#a3a3a3" },
  { name: "Facebook", category: "social", icon: "📘", color: "#a3a3a3" },
  { name: "TikTok", category: "social", icon: "🎵", color: "#000000" },
  { name: "YouTube", category: "social", icon: "▶️", color: "#a3a3a3" },
  { name: "Pinterest", category: "social", icon: "📌", color: "#a3a3a3" },
  { name: "Bluesky", category: "social", icon: "🦋", color: "#a3a3a3" },
];

const Automations = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredIntegrations = integrations.filter((integration) => {
    const matchesCategory = activeCategory === "all" || integration.category === activeCategory;
    const matchesSearch = integration.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const popularIntegrations = integrations.filter((i) => i.popular);

  return (
    <div className="hz-min-h-screen hz-bg hz-fg">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="hz-rel hz-pt-6 hz-pb-6 hz-px-4 hz-clip">
          {/* Background glow */}
          <div className="hz-abs hz-inset hz-clip">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.15 }}
              transition={{ duration: 1.5 }}
              className="hz-center-xy hz-abs hz-r-full"
              style={{
                background: `radial-gradient(circle, ${BRAND.fg} 0%, transparent 70%)`,
                filter: "blur(100px)",
              }}
            />
          </div>

          <div className="hz-container-wide hz-rel hz-z-raised">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="hz-align-center hz-mb-7"
            >
              <p
                className="hz-inline hz-t-xs hz-w-medium hz-r-full hz-px-4 hz-py-2 hz-bordered hz-mb-5"
                style={{ color: BRAND.fg, borderColor: `${BRAND.washStrong}` }}
              >
                Integrations & Automation
              </p>
              <h1 className="hz-t-4xl hz-w-medium hz-mb-5">
                <span className="hz-fg">Connect with</span>{" "}
                <span className="hz-fg" >500+ apps</span>
              </h1>
              <p className="hz-container-narrow hz-mw-md hz-t-xl hz-fg-muted hz-mb-6">
                Hanzo Automations connects your AI agents to the tools you use every day. Build powerful workflows without code.
              </p>

              {/* Search */}
              <div className="hz-container-narrow hz-mw-sm hz-rel">
                <Search className="hz-center-y hz-sq-3 hz-abs hz-fg-muted" />
                <input
                  type="text"
                  placeholder="Search integrations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="hz-w-full hz-px-6 hz-px-4 hz-py-3 hz-r-full hz-bg-surface hz-bordered hz-fg hz-transition"
                />
              </div>
            </motion.div>

            {/* Popular Integrations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="hz-mb-7"
            >
              <h2 className="hz-t-sm hz-w-medium hz-fg-muted hz-upper hz-tracking-wide hz-mb-4 hz-align-center">
                Popular Integrations
              </h2>
              <div className="hz-row hz-wrap hz-jc-center hz-gap-3">
                {popularIntegrations.slice(0, 12).map((integration) => (
                  <motion.a
                    key={integration.name}
                    href={`#${integration.name.toLowerCase().replace(/\s+/g, "-")}`}
                    whileHover={{ scale: 1.05 }}
                    className="hz-btn hz-gap-2 hz-transition"
                  >
                    <span className="hz-t-lg">{integration.icon}</span>
                    <span className="hz-t-sm hz-fg">{integration.name}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="hz-py-6 hz-px-4 hz-bordered hz-bg-surface hz-sticky hz-z-raised">
          <div className="hz-container-wide">
            <div className="hz-row hz-gap-2 hz-scroll-x hz-pb-4">
              {categories.map((category) => {
                const Icon = category.icon;
                const isActive = activeCategory === category.id;
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`hz-btn hz-btn-ghost hz-gap-2 hz-transition ${
                      isActive
                        ? "hz-bg-inverse hz-fg-inverse"
                        : "hz-bg-surface hz-fg-muted hz-link"
                    }`}
                  >
                    <Icon className="hz-sq-2" />
                    {category.name}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Integrations Grid */}
        <section className="hz-py-7 hz-px-4">
          <div className="hz-container-wide">
            <div className="hz-row hz-ai-center hz-jc-between hz-mb-6">
              <h2 className="hz-t-2xl hz-w-medium hz-fg">
                {activeCategory === "all"
                  ? "All Integrations"
                  : categories.find(c => c.id === activeCategory)?.name}
              </h2>
              <span className="hz-t-sm hz-fg-muted">
                {filteredIntegrations.length} integrations
              </span>
            </div>

            <div className="hz-grid hz-grid-5 hz-gap-4">
              {filteredIntegrations.map((integration, index) => (
                <motion.div
                  key={integration.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.02 }}
                  className="hz-card hz-transition hz-pointer hz-card-interactive"
                >
                  <div
                    className="hz-sq-7 hz-r-lg hz-row hz-ai-center hz-jc-center hz-t-2xl hz-mb-3"
                    style={{ backgroundColor: integration.color + "20" }}
                  >
                    {integration.icon}
                  </div>
                  <h3 className="hz-t-sm hz-w-medium hz-fg hz-transition hz-hoverable">
                    {integration.name}
                  </h3>
                  {integration.popular && (
                    <span className="hz-t-xs hz-fg hz-w-medium">Popular</span>
                  )}
                </motion.div>
              ))}
            </div>

            {filteredIntegrations.length === 0 && (
              <div className="hz-align-center hz-py-7">
                <p className="hz-fg-muted">No integrations found matching your search.</p>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="hz-py-7 hz-px-4 hz-border-t">
          <div className="hz-container-narrow hz-align-center">
            <h2 className="hz-t-3xl hz-w-medium hz-fg hz-mb-4">
              Don't see your app?
            </h2>
            <p className="hz-t-lg hz-fg-muted hz-mb-6">
              We add new integrations every week. Request an integration or build your own with our SDK.
            </p>
            <div className="hz-col-row hz-ai-center hz-jc-center hz-gap-4">
              <Link
                to="/contact"
                className="hz-btn hz-btn-ghost hz-transition hz-bg-inverse"
                >
                Request Integration
                <ArrowRight className="hz-sq-2 hz-ml-2" />
              </Link>
              <a
                href="https://docs.hanzo.ai/automations/sdk"
                target="_blank"
                rel="noreferrer noopener"
                className="hz-btn hz-btn-ghost hz-transition hz-fg"
              >
                Build Custom Integration
                <ExternalLink className="hz-sq-2 hz-ml-2" />
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Automations;
