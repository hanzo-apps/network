import React from "react";
import { motion } from "framer-motion";
import type { ProductCategory, Product } from "@/data/product-taxonomy";

interface ProductMockupProps {
  category: ProductCategory;
  product: Product;
  className?: string;
}

// Database/SQL Mockup - Shows table view with query editor
const DatabaseMockup: React.FC<{ product: Product }> = ({ product }) => (
  <div className="hz-bg-surface hz-r-lg hz-bordered hz-clip">
    {/* Toolbar */}
    <div className="hz-row hz-ai-center hz-gap-2 hz-px-4 hz-py-3 hz-border-b hz-bg-surface">
      <div className="hz-row hz-gap-2">
        <div className="hz-sq-1 hz-r-full hz-bg-raised" />
        <div className="hz-sq-1 hz-r-full hz-bg-raised" />
        <div className="hz-sq-1 hz-r-full hz-bg-raised" />
      </div>
      <span className="hz-t-xs hz-fg-muted hz-ml-2 hz-mono">{product.shortName} Console</span>
    </div>

    {/* Query Editor */}
    <div className="hz-p-4 hz-border-b hz-bg-surface">
      <div className="hz-mono hz-t-sm">
        <span className="hz-fg-muted">SELECT</span>
        <span className="hz-fg-soft"> * </span>
        <span className="hz-fg-muted">FROM</span>
        <span className="hz-fg-muted"> users </span>
        <span className="hz-fg-muted">WHERE</span>
        <span className="hz-fg-soft"> status = </span>
        <span className="hz-fg-muted">'active'</span>
        <span className="hz-fg-muted">;</span>
      </div>
    </div>

    {/* Results Table */}
    <div className="hz-p-4">
      <div className="hz-t-xs hz-fg-muted hz-mb-3">Results: 3 rows (2ms)</div>
      <div className="hz-clip hz-r-lg hz-bordered">
        <table className="hz-w-full hz-t-sm">
          <thead className="hz-bg-raised">
            <tr>
              <th className="hz-px-3 hz-py-2 hz-align-left hz-fg-muted hz-w-medium">id</th>
              <th className="hz-px-3 hz-py-2 hz-align-left hz-fg-muted hz-w-medium">name</th>
              <th className="hz-px-3 hz-py-2 hz-align-left hz-fg-muted hz-w-medium">email</th>
              <th className="hz-px-3 hz-py-2 hz-align-left hz-fg-muted hz-w-medium">status</th>
            </tr>
          </thead>
          <tbody className="hz-mono hz-t-xs">
            <tr className="hz-border-t">
              <td className="hz-px-3 hz-py-2 hz-fg-muted">1</td>
              <td className="hz-px-3 hz-py-2 hz-fg-soft">alice</td>
              <td className="hz-px-3 hz-py-2 hz-fg-soft">alice@example.com</td>
              <td className="hz-px-3 hz-py-2 hz-fg-muted">active</td>
            </tr>
            <tr className="hz-border-t">
              <td className="hz-px-3 hz-py-2 hz-fg-muted">2</td>
              <td className="hz-px-3 hz-py-2 hz-fg-soft">bob</td>
              <td className="hz-px-3 hz-py-2 hz-fg-soft">bob@example.com</td>
              <td className="hz-px-3 hz-py-2 hz-fg-muted">active</td>
            </tr>
            <tr className="hz-border-t">
              <td className="hz-px-3 hz-py-2 hz-fg-muted">3</td>
              <td className="hz-px-3 hz-py-2 hz-fg-soft">carol</td>
              <td className="hz-px-3 hz-py-2 hz-fg-soft">carol@example.com</td>
              <td className="hz-px-3 hz-py-2 hz-fg-muted">active</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

// Vector Database Mockup - Shows vector visualization
const VectorMockup: React.FC<{ product: Product }> = ({ product }) => (
  <div className="hz-bg-surface hz-r-lg hz-bordered hz-clip">
    {/* Toolbar */}
    <div className="hz-row hz-ai-center hz-gap-2 hz-px-4 hz-py-3 hz-border-b hz-bg-surface">
      <div className="hz-row hz-gap-2">
        <div className="hz-sq-1 hz-r-full hz-bg-raised" />
        <div className="hz-sq-1 hz-r-full hz-bg-raised" />
        <div className="hz-sq-1 hz-r-full hz-bg-raised" />
      </div>
      <span className="hz-t-xs hz-fg-muted hz-ml-2 hz-mono">{product.shortName}</span>
    </div>

    {/* Search Input */}
    <div className="hz-p-4 hz-border-b">
      <div className="hz-row hz-ai-center hz-gap-3">
        <div className="hz-grow hz-bg-surface hz-r-lg hz-px-4 hz-py-2 hz-bordered">
          <span className="hz-fg-muted hz-t-sm">Find similar: "machine learning tutorials"</span>
        </div>
        <button className="hz-px-4 hz-py-2 hz-bg-inverse hz-fg-inverse hz-t-sm hz-r-lg hz-hoverable">
          Search
        </button>
      </div>
    </div>

    {/* Vector Space Visualization */}
    <div className="hz-p-4 hz-rel hz-bh-8">
      <div className="hz-abs">
        {/* Grid */}
        <div className="hz-abs hz-inset hz-dim-more">
          {[...Array(5)].map((_, i) => (
            <div key={`h-${i}`} className="hz-abs hz-w-full hz-bg-raised" style={{ top: `${i * 25}%` }} />
          ))}
          {[...Array(5)].map((_, i) => (
            <div key={`v-${i}`} className="hz-abs hz-h-full hz-bg-raised" style={{ left: `${i * 25}%` }} />
          ))}
        </div>

        {/* Vector points */}
        <motion.div
          className="hz-sq-2 hz-abs hz-r-full hz-bg-inverse hz-shadow-lg hz-shadow"
          style={{ left: '45%', top: '40%' }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <div className="hz-sq-1 hz-abs hz-r-full hz-bg-raised" style={{ left: '50%', top: '35%' }} />
        <div className="hz-sq-1 hz-abs hz-r-full hz-bg-raised" style={{ left: '40%', top: '45%' }} />
        <div className="hz-sq-1 hz-abs hz-r-full hz-bg-raised" style={{ left: '48%', top: '50%' }} />
        <div className="hz-sq-1 hz-abs hz-r-full hz-bg-raised" style={{ left: '20%', top: '25%' }} />
        <div className="hz-sq-1 hz-abs hz-r-full hz-bg-raised" style={{ left: '75%', top: '60%' }} />
        <div className="hz-sq-1 hz-abs hz-r-full hz-bg-raised" style={{ left: '65%', top: '20%' }} />
        <div className="hz-sq-1 hz-abs hz-r-full hz-bg-raised" style={{ left: '30%', top: '70%' }} />

        {/* Similarity lines */}
        <svg className="hz-abs hz-inset hz-w-full hz-h-full hz-no-pointer">
          <line x1="47%" y1="42%" x2="52%" y2="37%" stroke="#a3a3a3" strokeWidth="1" strokeOpacity="0.5" />
          <line x1="47%" y1="42%" x2="42%" y2="47%" stroke="#a3a3a3" strokeWidth="1" strokeOpacity="0.5" />
          <line x1="47%" y1="42%" x2="50%" y2="52%" stroke="#a3a3a3" strokeWidth="1" strokeOpacity="0.5" />
        </svg>
      </div>

      {/* Legend */}
      <div className="hz-abs hz-row hz-ai-center hz-gap-4 hz-t-xs">
        <div className="hz-row hz-ai-center hz-gap-2">
          <div className="hz-sq-1 hz-r-full hz-bg-inverse" />
          <span className="hz-fg-muted">Query</span>
        </div>
        <div className="hz-row hz-ai-center hz-gap-2">
          <div className="hz-sq-1 hz-r-full hz-bg-raised" />
          <span className="hz-fg-muted">Similar</span>
        </div>
      </div>
    </div>

    {/* Results */}
    <div className="hz-p-4 hz-border-t">
      <div className="hz-t-xs hz-fg-muted hz-mb-2">Top 3 matches (cosine similarity)</div>
      <div className="hz-stack-2">
        {[
          { score: 0.95, text: 'Intro to ML with Python' },
          { score: 0.89, text: 'Deep Learning Fundamentals' },
          { score: 0.84, text: 'Neural Networks Guide' }
        ].map((item, i) => (
          <div key={i} className="hz-row hz-ai-center hz-jc-between hz-t-sm">
            <span className="hz-fg-soft hz-truncate">{item.text}</span>
            <span className="hz-fg-muted hz-mono hz-ml-2">{item.score}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Gateway/Compute Mockup - Shows API routes and model selection
const GatewayMockup: React.FC<{ product: Product }> = ({ product }) => (
  <div className="hz-bg-surface hz-r-lg hz-bordered hz-clip">
    {/* Toolbar */}
    <div className="hz-row hz-ai-center hz-gap-2 hz-px-4 hz-py-3 hz-border-b hz-bg-surface">
      <div className="hz-row hz-gap-2">
        <div className="hz-sq-1 hz-r-full hz-bg-raised" />
        <div className="hz-sq-1 hz-r-full hz-bg-raised" />
        <div className="hz-sq-1 hz-r-full hz-bg-raised" />
      </div>
      <span className="hz-t-xs hz-fg-muted hz-ml-2 hz-mono">{product.shortName} Dashboard</span>
    </div>

    {/* Model Selection */}
    <div className="hz-p-4 hz-border-b">
      <div className="hz-t-xs hz-fg-muted hz-mb-2">Active Models</div>
      <div className="hz-row hz-wrap hz-gap-2">
        {['gpt-4o', 'claude-3.5', 'gemini-pro', 'llama-3.1'].map((model) => (
          <div key={model} className="hz-btn hz-gap-2 hz-t-xs">
            <div className="hz-sq-1 hz-r-full hz-bg-raised" />
            <span className="hz-fg-soft">{model}</span>
          </div>
        ))}
      </div>
    </div>

    {/* API Endpoint */}
    <div className="hz-p-4 hz-border-b hz-bg-surface">
      <div className="hz-mono hz-t-sm">
        <span className="hz-fg-muted">POST</span>
        <span className="hz-fg-muted"> /v1/chat/completions</span>
      </div>
    </div>

    {/* Request/Response */}
    <div className="hz-grid hz-grid-2">
      <div className="hz-p-4">
        <div className="hz-t-xs hz-fg-muted hz-mb-2">Request</div>
        <pre className="hz-t-xs hz-mono hz-fg-muted hz-clip">
{`{
  "model": "gpt-4o",
  "messages": [
    {"role": "user",
     "content": "Hello!"}
  ]
}`}
        </pre>
      </div>
      <div className="hz-p-4">
        <div className="hz-t-xs hz-fg-muted hz-mb-2">Response <span className="hz-fg-muted">200</span></div>
        <pre className="hz-t-xs hz-mono hz-fg-muted hz-clip">
{`{
  "choices": [{
    "message": {
      "content": "Hi!"
    }
  }],
  "usage": {...}
}`}
        </pre>
      </div>
    </div>

    {/* Stats */}
    <div className="hz-grid hz-grid-3 hz-p-4 hz-border-t hz-gap-4">
      <div>
        <div className="hz-t-xs hz-fg-muted">Requests/min</div>
        <div className="hz-t-lg hz-w-semibold hz-fg">2.4K</div>
      </div>
      <div>
        <div className="hz-t-xs hz-fg-muted">Avg Latency</div>
        <div className="hz-t-lg hz-w-semibold hz-fg">124ms</div>
      </div>
      <div>
        <div className="hz-t-xs hz-fg-muted">Success Rate</div>
        <div className="hz-t-lg hz-w-semibold hz-fg-muted">99.9%</div>
      </div>
    </div>
  </div>
);

// ML/Training Mockup - Shows training progress
const MLMockup: React.FC<{ product: Product }> = ({ product }) => (
  <div className="hz-bg-surface hz-r-lg hz-bordered hz-clip">
    {/* Toolbar */}
    <div className="hz-row hz-ai-center hz-gap-2 hz-px-4 hz-py-3 hz-border-b hz-bg-surface">
      <div className="hz-row hz-gap-2">
        <div className="hz-sq-1 hz-r-full hz-bg-raised" />
        <div className="hz-sq-1 hz-r-full hz-bg-raised" />
        <div className="hz-sq-1 hz-r-full hz-bg-raised" />
      </div>
      <span className="hz-t-xs hz-fg-muted hz-ml-2 hz-mono">{product.shortName}</span>
    </div>

    {/* Training Status */}
    <div className="hz-p-4 hz-border-b">
      <div className="hz-row hz-ai-center hz-jc-between hz-mb-3">
        <div className="hz-row hz-ai-center hz-gap-2">
          <div className="hz-sq-1 hz-r-full hz-bg-raised" />
          <span className="hz-t-sm hz-fg-soft">Training in progress</span>
        </div>
        <span className="hz-t-xs hz-fg-muted">Epoch 15/50</span>
      </div>
      <div className="hz-bh-1 hz-bg-raised hz-r-full hz-clip">
        <motion.div
          className="hz-h-full"
          initial={{ width: 0 }}
          animate={{ width: '30%' }}
          transition={{ duration: 1 }}
        />
      </div>
    </div>

    {/* Metrics Chart */}
    <div className="hz-p-4 hz-border-b">
      <div className="hz-t-xs hz-fg-muted hz-mb-3">Loss vs Epochs</div>
      <div className="hz-bh-8 hz-rel">
        <svg className="hz-w-full hz-h-full">
          {/* Grid lines */}
          <line x1="0" y1="25%" x2="100%" y2="25%" stroke="#374151" strokeWidth="1" />
          <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#374151" strokeWidth="1" />
          <line x1="0" y1="75%" x2="100%" y2="75%" stroke="#374151" strokeWidth="1" />

          {/* Loss curve */}
          <motion.path
            d="M 0 80 Q 20 70 40 50 T 80 35 T 120 28 T 160 24 T 200 22"
            stroke="#ffffff"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2 }}
          />

          {/* Validation curve */}
          <motion.path
            d="M 0 85 Q 20 75 40 55 T 80 42 T 120 36 T 160 32 T 200 30"
            stroke="#a3a3a3"
            strokeWidth="2"
            fill="none"
            strokeDasharray="4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
          />
        </svg>

        {/* Legend */}
        <div className="hz-abs hz-top-0 hz-right-0 hz-row hz-ai-center hz-gap-4 hz-t-xs">
          <div className="hz-row hz-ai-center hz-gap-2">
            <div className="hz-bw-1 hz-bh-1 hz-bg-inverse" />
            <span className="hz-fg-muted">Train</span>
          </div>
          <div className="hz-row hz-ai-center hz-gap-2">
            <div className="hz-bw-1 hz-bh-1 hz-bg-raised" style={{ borderTop: '2px dashed' }} />
            <span className="hz-fg-muted">Val</span>
          </div>
        </div>
      </div>
    </div>

    {/* Metrics Grid */}
    <div className="hz-grid hz-grid-4 hz-p-4 hz-gap-4">
      <div>
        <div className="hz-t-xs hz-fg-muted">Loss</div>
        <div className="hz-t-sm hz-w-semibold hz-fg">0.0234</div>
      </div>
      <div>
        <div className="hz-t-xs hz-fg-muted">Accuracy</div>
        <div className="hz-t-sm hz-w-semibold hz-fg-muted">94.2%</div>
      </div>
      <div>
        <div className="hz-t-xs hz-fg-muted">LR</div>
        <div className="hz-t-sm hz-w-semibold hz-fg">1e-4</div>
      </div>
      <div>
        <div className="hz-t-xs hz-fg-muted">GPU</div>
        <div className="hz-t-sm hz-w-semibold hz-fg-muted">A100</div>
      </div>
    </div>
  </div>
);

// Chat/Agent Mockup - Shows chat interface with tool calls
const ChatMockup: React.FC<{ product: Product }> = ({ product }) => (
  <div className="hz-bg-surface hz-r-lg hz-bordered hz-clip">
    {/* Toolbar */}
    <div className="hz-row hz-ai-center hz-gap-2 hz-px-4 hz-py-3 hz-border-b hz-bg-surface">
      <div className="hz-row hz-gap-2">
        <div className="hz-sq-1 hz-r-full hz-bg-raised" />
        <div className="hz-sq-1 hz-r-full hz-bg-raised" />
        <div className="hz-sq-1 hz-r-full hz-bg-raised" />
      </div>
      <span className="hz-t-xs hz-fg-muted hz-ml-2 hz-mono">{product.shortName}</span>
      <div className="hz-ml-auto hz-row hz-ai-center hz-gap-2">
        <div className="hz-sq-1 hz-r-full hz-bg-raised" />
        <span className="hz-t-xs hz-fg-muted">gpt-4o</span>
      </div>
    </div>

    {/* Messages */}
    <div className="hz-p-4 hz-stack-4 hz-scroll-y">
      {/* User message */}
      <div className="hz-row hz-jc-end">
        <div className="hz-bg-quiet hz-bordered hz-r-xl hz-px-4 hz-py-2 hz-mw-full">
          <p className="hz-t-sm hz-fg">What's the weather in Tokyo?</p>
        </div>
      </div>

      {/* Tool call */}
      <div className="hz-row hz-jc-start">
        <div className="hz-bg-raised hz-bordered hz-r-lg hz-px-3 hz-py-2 hz-mw-full">
          <div className="hz-row hz-ai-center hz-gap-2 hz-t-xs hz-fg-muted hz-mb-1">
            <svg className="hz-sq-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>get_weather</span>
            <span className="hz-fg-muted">completed</span>
          </div>
          <pre className="hz-t-xs hz-mono hz-fg-muted">{"{ \"city\": \"Tokyo\" }"}</pre>
        </div>
      </div>

      {/* Assistant message */}
      <div className="hz-row hz-jc-start">
        <div className="hz-bg-raised hz-bordered hz-r-xl hz-px-4 hz-py-2 hz-mw-full">
          <p className="hz-t-sm hz-fg">The weather in Tokyo is currently 18C and partly cloudy. Perfect for a walk!</p>
        </div>
      </div>
    </div>

    {/* Input */}
    <div className="hz-p-4 hz-border-t">
      <div className="hz-row hz-ai-center hz-gap-2">
        <input
          type="text"
          placeholder="Type a message..."
          className="hz-grow hz-bg-surface hz-bordered hz-r-lg hz-px-4 hz-py-2 hz-t-sm hz-fg"
        />
        <button className="hz-p-2 hz-bg-inverse hz-fg-inverse hz-r-lg hz-hoverable">
          <svg className="hz-sq-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </div>
  </div>
);

// Agent Workflow Mockup
const AgentMockup: React.FC<{ product: Product }> = ({ product }) => (
  <div className="hz-bg-surface hz-r-lg hz-bordered hz-clip">
    {/* Toolbar */}
    <div className="hz-row hz-ai-center hz-gap-2 hz-px-4 hz-py-3 hz-border-b hz-bg-surface">
      <div className="hz-row hz-gap-2">
        <div className="hz-sq-1 hz-r-full hz-bg-raised" />
        <div className="hz-sq-1 hz-r-full hz-bg-raised" />
        <div className="hz-sq-1 hz-r-full hz-bg-raised" />
      </div>
      <span className="hz-t-xs hz-fg-muted hz-ml-2 hz-mono">{product.shortName} Workflow</span>
    </div>

    {/* Workflow visualization */}
    <div className="hz-p-5 hz-rel">
      <div className="hz-row hz-ai-center hz-jc-between">
        {/* Nodes */}
        <motion.div
          className="hz-col hz-ai-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0 }}
        >
          <div className="hz-sq-7 hz-r-lg hz-bg-quiet hz-bordered hz-border-strong hz-row hz-ai-center hz-jc-center">
            <svg className="hz-sq-4 hz-fg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
          <span className="hz-t-xs hz-fg-muted hz-mt-2">Input</span>
        </motion.div>

        {/* Arrow */}
        <motion.div
          className="hz-grow hz-bh-1"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.3 }}
        />

        <motion.div
          className="hz-col hz-ai-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="hz-sq-7 hz-r-lg hz-bg-raised hz-bordered hz-border-strong hz-row hz-ai-center hz-jc-center">
            <svg className="hz-sq-4 hz-fg-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <span className="hz-t-xs hz-fg-muted hz-mt-2">Planner</span>
        </motion.div>

        {/* Arrow */}
        <motion.div
          className="hz-grow hz-bh-1"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.6 }}
        />

        <motion.div
          className="hz-col hz-ai-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <div className="hz-sq-7 hz-r-lg hz-bg-raised hz-bordered hz-border-strong hz-row hz-ai-center hz-jc-center">
            <svg className="hz-sq-4 hz-fg-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <span className="hz-t-xs hz-fg-muted hz-mt-2">Tools</span>
        </motion.div>

        {/* Arrow */}
        <motion.div
          className="hz-grow hz-bh-1"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.9 }}
        />

        <motion.div
          className="hz-col hz-ai-center"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1 }}
        >
          <div className="hz-sq-7 hz-r-lg hz-bg-raised hz-bordered hz-border-strong hz-row hz-ai-center hz-jc-center">
            <svg className="hz-sq-4 hz-fg-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <span className="hz-t-xs hz-fg-muted hz-mt-2">Output</span>
        </motion.div>
      </div>
    </div>

    {/* Tool calls */}
    <div className="hz-p-4 hz-border-t">
      <div className="hz-t-xs hz-fg-muted hz-mb-2">Tool Calls</div>
      <div className="hz-stack-2">
        {[
          { name: 'search_web', status: 'completed', time: '120ms' },
          { name: 'read_file', status: 'completed', time: '45ms' },
          { name: 'write_code', status: 'running', time: '...' }
        ].map((tool, i) => (
          <div key={i} className="hz-row hz-ai-center hz-jc-between hz-t-xs">
            <div className="hz-row hz-ai-center hz-gap-2">
              <div className={`hz-sq-1 hz-r-full ${tool.status === 'running' ? 'hz-bg-raised' : 'hz-bg-raised'}`} />
              <span className="hz-mono hz-fg-soft">{tool.name}</span>
            </div>
            <span className={tool.status === 'running' ? 'hz-fg-muted' : 'hz-fg-muted'}>{tool.time}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Observability Mockup - Shows metrics/logs
const ObservabilityMockup: React.FC<{ product: Product }> = ({ product }) => (
  <div className="hz-bg-surface hz-r-lg hz-bordered hz-clip">
    {/* Toolbar */}
    <div className="hz-row hz-ai-center hz-gap-2 hz-px-4 hz-py-3 hz-border-b hz-bg-surface">
      <div className="hz-row hz-gap-2">
        <div className="hz-sq-1 hz-r-full hz-bg-raised" />
        <div className="hz-sq-1 hz-r-full hz-bg-raised" />
        <div className="hz-sq-1 hz-r-full hz-bg-raised" />
      </div>
      <span className="hz-t-xs hz-fg-muted hz-ml-2 hz-mono">{product.shortName}</span>
    </div>

    {/* Metrics Overview */}
    <div className="hz-grid hz-grid-3 hz-border-b">
      <div className="hz-p-4">
        <div className="hz-t-xs hz-fg-muted hz-mb-1">Requests/sec</div>
        <div className="hz-t-2xl hz-w-bold hz-fg">1,247</div>
        <div className="hz-t-xs hz-fg-muted">+12.3%</div>
      </div>
      <div className="hz-p-4">
        <div className="hz-t-xs hz-fg-muted hz-mb-1">P99 Latency</div>
        <div className="hz-t-2xl hz-w-bold hz-fg">234ms</div>
        <div className="hz-t-xs hz-fg-muted">+2.1%</div>
      </div>
      <div className="hz-p-4">
        <div className="hz-t-xs hz-fg-muted hz-mb-1">Error Rate</div>
        <div className="hz-t-2xl hz-w-bold hz-fg">0.02%</div>
        <div className="hz-t-xs hz-fg-muted">-0.01%</div>
      </div>
    </div>

    {/* Mini chart */}
    <div className="hz-p-4 hz-border-b">
      <div className="hz-bh-8 hz-row hz-ai-end hz-gap-1">
        {[65, 72, 68, 85, 92, 78, 88, 95, 82, 90, 87, 93].map((h, i) => (
          <motion.div
            key={i}
            className="hz-grow hz-r-md"
            initial={{ height: 0 }}
            animate={{ height: `${h}%` }}
            transition={{ delay: i * 0.05 }}
          />
        ))}
      </div>
    </div>

    {/* Logs */}
    <div className="hz-p-4">
      <div className="hz-t-xs hz-fg-muted hz-mb-2">Recent Logs</div>
      <div className="hz-stack-1 hz-mono hz-t-xs">
        {[
          { level: 'info', msg: 'Request completed successfully', time: '12:34:56' },
          { level: 'warn', msg: 'Rate limit approaching', time: '12:34:55' },
          { level: 'info', msg: 'New connection established', time: '12:34:54' }
        ].map((log, i) => (
          <div key={i} className="hz-row hz-ai-start hz-gap-2">
            <span className="hz-fg-faint">{log.time}</span>
            <span className={log.level === 'warn' ? 'hz-fg-muted' : 'hz-fg-muted'}>[{log.level}]</span>
            <span className="hz-fg-muted hz-truncate">{log.msg}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Platform/Infrastructure Mockup
const PlatformMockup: React.FC<{ product: Product }> = ({ product }) => (
  <div className="hz-bg-surface hz-r-lg hz-bordered hz-clip">
    {/* Toolbar */}
    <div className="hz-row hz-ai-center hz-gap-2 hz-px-4 hz-py-3 hz-border-b hz-bg-surface">
      <div className="hz-row hz-gap-2">
        <div className="hz-sq-1 hz-r-full hz-bg-raised" />
        <div className="hz-sq-1 hz-r-full hz-bg-raised" />
        <div className="hz-sq-1 hz-r-full hz-bg-raised" />
      </div>
      <span className="hz-t-xs hz-fg-muted hz-ml-2 hz-mono">{product.shortName}</span>
    </div>

    {/* Deployment Status */}
    <div className="hz-p-4 hz-border-b">
      <div className="hz-row hz-ai-center hz-jc-between hz-mb-3">
        <div className="hz-row hz-ai-center hz-gap-2">
          <div className="hz-sq-1 hz-r-full hz-bg-raised" />
          <span className="hz-t-sm hz-fg hz-w-medium">Production</span>
        </div>
        <span className="hz-t-xs hz-fg-muted">v2.4.1</span>
      </div>
      <div className="hz-row hz-ai-center hz-gap-4 hz-t-xs">
        <div className="hz-row hz-ai-center hz-gap-2">
          <svg className="hz-sq-2 hz-fg-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
          </svg>
          <span className="hz-fg-muted">3 replicas</span>
        </div>
        <div className="hz-row hz-ai-center hz-gap-2">
          <svg className="hz-sq-2 hz-fg-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
          </svg>
          <span className="hz-fg-muted">us-east-1</span>
        </div>
      </div>
    </div>

    {/* Services */}
    <div className="hz-p-4">
      <div className="hz-t-xs hz-fg-muted hz-mb-3">Services</div>
      <div className="hz-stack-2">
        {[
          { name: 'api-gateway', status: 'healthy', cpu: '23%' },
          { name: 'auth-service', status: 'healthy', cpu: '12%' },
          { name: 'worker', status: 'scaling', cpu: '78%' }
        ].map((svc, i) => (
          <div key={i} className="hz-row hz-ai-center hz-jc-between hz-p-2 hz-bg-surface hz-r-lg">
            <div className="hz-row hz-ai-center hz-gap-2">
              <div className={`hz-sq-1 hz-r-full ${svc.status === 'scaling' ? 'hz-bg-raised' : 'hz-bg-raised'}`} />
              <span className="hz-t-sm hz-fg-soft">{svc.name}</span>
            </div>
            <span className="hz-t-xs hz-fg-muted">{svc.cpu} CPU</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Async/Queue Mockup
const AsyncMockup: React.FC<{ product: Product }> = ({ product }) => (
  <div className="hz-bg-surface hz-r-lg hz-bordered hz-clip">
    {/* Toolbar */}
    <div className="hz-row hz-ai-center hz-gap-2 hz-px-4 hz-py-3 hz-border-b hz-bg-surface">
      <div className="hz-row hz-gap-2">
        <div className="hz-sq-1 hz-r-full hz-bg-raised" />
        <div className="hz-sq-1 hz-r-full hz-bg-raised" />
        <div className="hz-sq-1 hz-r-full hz-bg-raised" />
      </div>
      <span className="hz-t-xs hz-fg-muted hz-ml-2 hz-mono">{product.shortName}</span>
    </div>

    {/* Queue Stats */}
    <div className="hz-grid hz-grid-3 hz-border-b">
      <div className="hz-p-4">
        <div className="hz-t-xs hz-fg-muted hz-mb-1">Pending</div>
        <div className="hz-t-xl hz-w-bold hz-fg-muted">1,247</div>
      </div>
      <div className="hz-p-4">
        <div className="hz-t-xs hz-fg-muted hz-mb-1">Processing</div>
        <div className="hz-t-xl hz-w-bold hz-fg-muted">32</div>
      </div>
      <div className="hz-p-4">
        <div className="hz-t-xs hz-fg-muted hz-mb-1">Completed</div>
        <div className="hz-t-xl hz-w-bold hz-fg-muted">45.2K</div>
      </div>
    </div>

    {/* Queue visualization */}
    <div className="hz-p-4 hz-border-b">
      <div className="hz-row hz-ai-center hz-gap-1">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className={`hz-grow hz-bh-5 hz-r-md ${i < 8 ? 'hz-bg-quiet' : 'hz-bg-raised'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.05 }}
          />
        ))}
      </div>
      <div className="hz-row hz-jc-between hz-t-xs hz-fg-muted hz-mt-2">
        <span>In</span>
        <span>Out</span>
      </div>
    </div>

    {/* Recent Jobs */}
    <div className="hz-p-4">
      <div className="hz-t-xs hz-fg-muted hz-mb-2">Recent Jobs</div>
      <div className="hz-stack-2">
        {[
          { id: 'job-a1b2', status: 'completed', time: '234ms' },
          { id: 'job-c3d4', status: 'running', time: '...' },
          { id: 'job-e5f6', status: 'pending', time: '-' }
        ].map((job, i) => (
          <div key={i} className="hz-row hz-ai-center hz-jc-between hz-t-xs">
            <div className="hz-row hz-ai-center hz-gap-2">
              <div className={`hz-sq-1 hz-r-full ${
                job.status === 'completed' ? 'hz-bg-raised' :
                job.status === 'running' ? 'hz-bg-raised' : 'hz-bg-raised'
              }`} />
              <span className="hz-mono hz-fg-soft">{job.id}</span>
            </div>
            <span className="hz-fg-muted">{job.time}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Generic fallback mockup
const GenericMockup: React.FC<{ product: Product }> = ({ product }) => (
  <div className="hz-bg-surface hz-r-lg hz-bordered hz-clip">
    {/* Toolbar */}
    <div className="hz-row hz-ai-center hz-gap-2 hz-px-4 hz-py-3 hz-border-b hz-bg-surface">
      <div className="hz-row hz-gap-2">
        <div className="hz-sq-1 hz-r-full hz-bg-raised" />
        <div className="hz-sq-1 hz-r-full hz-bg-raised" />
        <div className="hz-sq-1 hz-r-full hz-bg-raised" />
      </div>
      <span className="hz-t-xs hz-fg-muted hz-ml-2 hz-mono">{product.shortName}</span>
    </div>

    <div className="hz-p-6 hz-row hz-ai-center hz-jc-center">
      <div className="hz-align-center">
        <div className="hz-sq-8 hz-r-xl hz-bordered hz-row hz-ai-center hz-jc-center hz-mx-auto hz-mb-4">
          <motion.div
            className="hz-sq-5 hz-r-lg hz-bg-quiet"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
        <p className="hz-t-sm hz-fg-muted">{product.tagline}</p>
      </div>
    </div>
  </div>
);

// Main ProductMockup component that selects the appropriate mockup
export const ProductMockup: React.FC<ProductMockupProps> = ({ category, product, className = '' }) => {
  // Select mockup based on product ID or category
  const getMockup = () => {
    // Specific product mockups
    if (['sql', 'sql-vector', 'documentdb', 'kv', 'datastore', 'datastore-vector'].includes(product.id)) {
      return <DatabaseMockup product={product} />;
    }
    if (['vector', 'search'].includes(product.id)) {
      return <VectorMockup product={product} />;
    }
    if (['gateway', 'functions', 'runtime', 'machines'].includes(product.id)) {
      return <GatewayMockup product={product} />;
    }
    if (['chat', 'mcp'].includes(product.id)) {
      return <ChatMockup product={product} />;
    }
    if (['agent', 'operative', 'flow'].includes(product.id)) {
      return <AgentMockup product={product} />;
    }
    if (['tasks', 'cron', 'queues', 'pubsub'].includes(product.id)) {
      return <AsyncMockup product={product} />;
    }

    // Category-based mockups
    switch (category) {
      case 'data':
        return <DatabaseMockup product={product} />;
      case 'compute':
        return <GatewayMockup product={product} />;
      case 'ml':
        return <MLMockup product={product} />;
      case 'observability':
        return <ObservabilityMockup product={product} />;
      case 'platform':
        return <PlatformMockup product={product} />;
      case 'async':
        return <AsyncMockup product={product} />;
      case 'apps':
        return <ChatMockup product={product} />;
      default:
        return <GenericMockup product={product} />;
    }
  };

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {getMockup()}
    </motion.div>
  );
};

export default ProductMockup;
