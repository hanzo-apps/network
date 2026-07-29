
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Code, Terminal, PenTool, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";

const tabs = [
  { id: "js", label: "JavaScript", icon: <Code className="hz-sq-2" /> },
  { id: "py", label: "Python", icon: <Terminal className="hz-sq-2" /> },
  { id: "api", label: "API", icon: <PenTool className="hz-sq-2" /> }
];

const codeExamples = {
  js: `// Initialize Hanzo Analytics in your app
import { HanzoAnalytics } from 'hanzo-analytics';

// Configure your instance
const analytics = new HanzoAnalytics({
  projectId: 'YOUR_PROJECT_ID',
  options: {
    autoPageviews: true,
    trackClicks: true,
    debugMode: false
  }
});

// Track custom events
analytics.track('purchase_completed', {
  productId: 'prod_123',
  price: 89.99,
  currency: 'USD'
});

// Identify users
analytics.identify('user_123', {
  name: 'Jane Smith',
  email: 'jane@example.com',
  plan: 'premium'
});`,
  
  py: `# Install with pip install hanzo-analytics
import hanzo_analytics

# Initialize client
analytics = hanzo_analytics.Client(
    project_id="YOUR_PROJECT_ID",
    api_key="YOUR_API_KEY"
)

# Track events
analytics.track(
    event_name="order_completed",
    properties={
        "order_id": "ord_123",
        "total": 99.99,
        "products": [
            {"id": "prod_1", "name": "Keyboard", "price": 59.99},
            {"id": "prod_2", "name": "Mouse", "price": 39.99}
        ]
    },
    user_id="user_123"
)

# Batch tracking for performance
with analytics.batch():
    for event in events:
        analytics.track(event.name, event.properties, event.user_id)`,
  
  api: `# Using curl to send events to Hanzo Analytics API

curl -X POST https://api.hanzo.analytics/v1/track \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{
    "projectId": "YOUR_PROJECT_ID",
    "event": "page_view",
    "properties": {
      "url": "https://yourapp.com/pricing",
      "referrer": "https://google.com",
      "title": "Pricing | Your App"
    },
    "userId": "user_123",
    "anonymousId": "anon_456",
    "timestamp": "2023-07-22T15:42:12.123Z"
  }'`
};

const DeveloperFirst = () => {
  const [activeTab, setActiveTab] = useState("js");
  
  return (
    <section className="hz-py-7 hz-px-4 hz-bg hz-rel hz-clip">
      <div className="hz-abs hz-inset"></div>
      
      <div className="hz-container hz-rel hz-z-raised">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="hz-align-center hz-mb-7"
        >
          <h2 className="hz-t-3xl hz-w-bold hz-mb-5">Developer-First API & SDKs</h2>
          <p className="hz-container-narrow hz-t-xl hz-fg-soft">
            Easy-to-integrate SDKs and APIs designed for minimal friction and maximum flexibility.
          </p>
        </motion.div>
        
        <div className="hz-grid hz-grid-6 hz-gap-6">
          <div className="hz-col hz-jc-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="hz-row hz-ai-center hz-mb-4">
                <Layers className="hz-sq-4 hz-fg-muted hz-mr-3" />
                <h3 className="hz-t-2xl hz-w-bold">Designed for Developers</h3>
              </div>
              
              <ul className="hz-stack-4 hz-mb-6">
                <li className="hz-row">
                  <div className="hz-mr-3 hz-fg-muted">•</div>
                  <div>
                    <span className="hz-w-medium hz-fg">OpenTelemetry Integration</span>
                    <p className="hz-fg-muted hz-mt-1">Seamlessly integrate with your existing observability stack.</p>
                  </div>
                </li>
                <li className="hz-row">
                  <div className="hz-mr-3 hz-fg-muted">•</div>
                  <div>
                    <span className="hz-w-medium hz-fg">API-first, highly customizable</span>
                    <p className="hz-fg-muted hz-mt-1">Build exactly what you need with our flexible API.</p>
                  </div>
                </li>
                <li className="hz-row">
                  <div className="hz-mr-3 hz-fg-muted">•</div>
                  <div>
                    <span className="hz-w-medium hz-fg">Robust documentation and code examples</span>
                    <p className="hz-fg-muted hz-mt-1">Comprehensive guides and examples to get you started quickly.</p>
                  </div>
                </li>
              </ul>
              
              <div className="hz-row hz-wrap hz-gap-3">
                <Button variant="outline" size="sm">View Documentation</Button>
                <Button variant="outline" size="sm">API Reference</Button>
                <Button variant="outline" size="sm">Example Projects</Button>
              </div>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className=""
          >
            <div className="hz-bg-surface hz-r-lg hz-bordered hz-clip hz-shadow-lg">
              <div className="hz-row hz-border-b">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    className={`hz-row hz-ai-center hz-px-4 hz-py-3 hz-t-sm hz-w-medium ${
                      activeTab === tab.id
                        ? "hz-bg-raised hz-fg"
                        : "hz-fg-muted hz-link"
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <span className="hz-mr-2">{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </div>
              
              <div className="hz-p-4 hz-scroll-x">
                <pre className="hz-t-sm hz-fg-soft hz-mono">
                  {codeExamples[activeTab as keyof typeof codeExamples]}
                </pre>
              </div>
              
              <div className="hz-bg-surface hz-p-3 hz-border-t hz-t-sm hz-fg-muted">
                {activeTab === "js" && "npm install hanzo-analytics"}
                {activeTab === "py" && "pip install hanzo-analytics"}
                {activeTab === "api" && "API Key: Get yours from the Hanzo Analytics dashboard"}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DeveloperFirst;
