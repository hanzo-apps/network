import { BRAND } from '@/lib/brand';
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Terminal,
  Copy,
  Check,
  ArrowRight,
  MonitorUp,
  Zap,
  Lock,
  Users,
  Shield,
  ExternalLink,
  Code,
  Bug,
  Workflow,
  Box,
  Bot,
} from "lucide-react";
import { CodeTabs } from "@/components/ui/code-block";


// Multi-language code examples for the API section
const API_CODE_EXAMPLES = [
  {
    language: "typescript",
    label: "TypeScript",
    code: `import { Hanzo } from "@hanzo/ai";

const hanzo = new Hanzo({
  apiKey: process.env.HANZO_API_KEY,
});

const response = await hanzo.chat.completions.create({
  model: "claude-sonnet-4-20250514",
  messages: [{ role: "user", content: "Hello!" }],
});

console.log(response.choices[0].message.content);`,
  },
  {
    language: "python",
    label: "Python",
    code: `from hanzo import Hanzo
import os

client = Hanzo(api_key=os.environ["HANZO_API_KEY"])

response = client.chat.completions.create(
    model="claude-sonnet-4-20250514",
    messages=[{"role": "user", "content": "Hello!"}],
)

print(response.choices[0].message.content)`,
  },
  {
    language: "go",
    label: "Go",
    code: `package main

import (
    "context"
    "fmt"
    "os"

    "github.com/hanzoai/hanzo-go"
)

func main() {
    client := hanzo.NewClient(os.Getenv("HANZO_API_KEY"))

    resp, _ := client.Chat.Completions.Create(
        context.Background(),
        hanzo.ChatCompletionRequest{
            Model: "claude-sonnet-4-20250514",
            Messages: []hanzo.Message{
                {Role: "user", Content: "Hello!"},
            },
        },
    )

    fmt.Println(resp.Choices[0].Message.Content)
}`,
  },
  {
    language: "bash",
    label: "cURL",
    code: `curl https://api.hanzo.ai/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer $HANZO_API_KEY" \\
  -d '{
    "model": "claude-sonnet-4-20250514",
    "messages": [
      {"role": "user", "content": "Hello!"}
    ]
  }'`,
  },
];

const DeveloperExperienceSection = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyInstall = () => {
    navigator.clipboard.writeText("curl -fsSL hanzo.sh/install.sh | sh");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="hz-py-7 hz-px-4 hz-bg">
      <div className="hz-container-wide hz-stack-6">

        {/* IDE Agents Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="hz-grid hz-grid-2 hz-gap-7 hz-ai-center"
        >
          <div>
            <p
              className="hz-inline hz-t-xs hz-w-medium hz-r-full hz-px-4 hz-py-2 hz-bordered hz-mb-5"
              style={{ color: BRAND.fg, borderColor: `${BRAND.washStrong}` }}
            >
              Works where developers live
            </p>
            <h2 className="hz-t-3xl hz-w-medium hz-fg hz-mb-4">
              VS Code. JetBrains. Terminal. Remote.
            </h2>
            <p className="hz-t-lg hz-fg-muted hz-mb-6">
              Hanzo reads your repo structure first, edits across files coherently, and executes tasks step-by-step—locally or in isolated remote sandboxes.
            </p>
            <Link
              to="/extensions"
              className="hz-btn hz-btn-primary hz-transition hz-fg-inverse"
            >
              Install the IDE extension
              <ArrowRight className="hz-sq-2 hz-ml-2" />
            </Link>
          </div>

          {/* IDE Preview */}
          <div className="hz-r-lg hz-bordered hz-bg-surface hz-clip">
            <div className="hz-row hz-ai-center hz-gap-2 hz-px-4 hz-py-3 hz-border-b hz-bg-surface">
              <div className="hz-row hz-gap-2">
                <div className="hz-sq-1 hz-r-full hz-bg-raised" />
                <div className="hz-sq-1 hz-r-full hz-bg-raised" />
                <div className="hz-sq-1 hz-r-full hz-bg-raised" />
              </div>
              <span className="hz-ml-2 hz-t-xs hz-fg-muted">VS Code - Hanzo Extension</span>
            </div>
            <div className="hz-p-4 hz-stack-3 hz-bg-surface">
              <div className="hz-btn hz-gap-2">
                <MonitorUp className="hz-sq-2 hz-fg" />
                <span className="hz-t-sm hz-fg-soft">Reading repo structure...</span>
              </div>
              <div className="hz-btn hz-gap-2">
                <Check className="hz-sq-2 hz-fg-muted" />
                <span className="hz-t-sm hz-fg-soft">Edited 4 files cohesively</span>
              </div>
              <div className="hz-btn hz-gap-2">
                <Check className="hz-sq-2 hz-fg-muted" />
                <span className="hz-t-sm hz-fg-muted">All tests passing</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Hanzo Dev Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="hz-grid hz-grid-2 hz-gap-7 hz-ai-center"
        >
          {/* Terminal Preview */}
          <div className="hz-r-lg hz-bordered hz-bg-surface hz-clip">
            <div className="hz-row hz-ai-center hz-gap-2 hz-px-4 hz-py-3 hz-border-b hz-bg-surface">
              <div className="hz-row hz-gap-2">
                <div className="hz-sq-1 hz-r-full hz-bg-raised" />
                <div className="hz-sq-1 hz-r-full hz-bg-raised" />
                <div className="hz-sq-1 hz-r-full hz-bg-raised" />
              </div>
              <span className="hz-ml-2 hz-t-xs hz-fg-muted hz-mono">terminal</span>
              <button
                onClick={handleCopyInstall}
                className="hz-ml-auto hz-p-1 hz-r-md hz-transition hz-hoverable"
              >
                {copied ? (
                  <Check className="hz-sq-1 hz-fg-muted" />
                ) : (
                  <Copy className="hz-sq-1 hz-fg-muted" />
                )}
              </button>
            </div>
            <div className="hz-p-4 hz-mono hz-t-sm hz-bg-surface">
              <div className="hz-mb-2">
                <span className="hz-fg-muted">$ </span>
                <span className="hz-fg-muted">curl</span>
                <span className="hz-fg-soft"> -fsSL </span>
                <span className="hz-fg-muted">hanzo.sh/install.sh</span>
                <span className="hz-fg-soft"> | </span>
                <span className="hz-fg-muted">sh</span>
              </div>
              <div className="hz-mb-4">
                <span className="hz-fg-muted">$ </span>
                <span className="hz-fg-muted">hanzo</span>
                <span className="hz-fg-muted"> dev</span>
                <span className="hz-fg-muted"> "Fix rate limiting. Add metrics. Add tests. Open a PR."</span>
              </div>
              <div className="hz-fg-muted hz-mb-1">
                <span className="hz-fg-muted">✓ </span>Plan created
              </div>
              <div className="hz-fg-muted hz-mb-1">
                <span className="hz-fg-muted">✓ </span>Implementation complete
              </div>
              <div className="hz-fg-muted hz-mb-1">
                <span className="hz-fg-muted">✓ </span>Tests passing (12/12)
              </div>
              <div className="hz-fg">
                <span className="hz-fg-muted">✓ </span>PR opened: #247
              </div>
            </div>
          </div>

          <div className="hz-order-first">
            <p
              className="hz-btn hz-btn-ghost hz-t-xs hz-mb-5"
              style={{ color: BRAND.fg, borderColor: `${BRAND.washStrong}` }}
            >
              <Bot className="hz-sq-2 hz-mr-2" />
              Hanzo Dev
            </p>
            <h2 className="hz-t-3xl hz-w-medium hz-fg hz-mb-4">
              AI coding agent in your terminal.
            </h2>
            <p className="hz-fg-muted hz-mb-5">
              Install <code className="hz-px-2 hz-py-1 hz-r-md hz-bg-raised hz-fg-soft hz-t-sm">@hanzo/dev</code> and <code className="hz-px-2 hz-py-1 hz-r-md hz-bg-raised hz-fg-soft hz-t-sm">@hanzo/cli</code> via curl.
            </p>
            <ul className="hz-stack-3 hz-fg-muted hz-mb-6">
              <li className="hz-row hz-ai-center hz-gap-3">
                <div className="hz-sq-4 hz-r-md hz-bg-raised hz-row hz-ai-center hz-jc-center">
                  <Code className="hz-sq-2 hz-fg-muted" />
                </div>
                Generate APIs, scripts, components, and tests
              </li>
              <li className="hz-row hz-ai-center hz-gap-3">
                <div className="hz-sq-4 hz-r-md hz-bg-raised hz-row hz-ai-center hz-jc-center">
                  <Bug className="hz-sq-2 hz-fg-muted" />
                </div>
                Debug and fix using your real codebase context
              </li>
              <li className="hz-row hz-ai-center hz-gap-3">
                <div className="hz-sq-4 hz-r-md hz-bg-raised hz-row hz-ai-center hz-jc-center">
                  <Workflow className="hz-sq-2 hz-fg-muted" />
                </div>
                Scaffold CI/CD and release workflows
              </li>
              <li className="hz-row hz-ai-center hz-gap-3">
                <div className="hz-sq-4 hz-r-md hz-bg-raised hz-row hz-ai-center hz-jc-center">
                  <Box className="hz-sq-2 hz-fg-muted" />
                </div>
                No framework lock-in
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Remote Agents Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="hz-align-center hz-mb-7">
            <p
              className="hz-inline hz-t-xs hz-w-medium hz-r-full hz-px-4 hz-py-2 hz-bordered hz-mb-5"
              style={{ color: BRAND.fg, borderColor: `${BRAND.washStrong}` }}
            >
              Remote Agents
            </p>
            <h2 className="hz-t-3xl hz-w-medium hz-fg hz-mb-4">
              Secure remote execution for teams
            </h2>
          </div>

          <div className="hz-grid hz-grid-4 hz-gap-5 hz-mb-6">
            {[
              { icon: Zap, title: "Parallel runs", desc: "Execute across repos simultaneously" },
              { icon: Users, title: "Shared workspaces", desc: "Collaborate via shared environments" },
              { icon: Shield, title: "Quality gates", desc: "Enforce policy before PR/merge" },
              { icon: Lock, title: "Isolation", desc: "Safe installs and builds" },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="hz-card hz-align-center"
                >
                  <div className="hz-sq-6 hz-r-lg hz-bg-raised hz-row hz-ai-center hz-jc-center hz-mb-4 hz-mx-auto">
                    <Icon className="hz-sq-3 hz-fg-muted" />
                  </div>
                  <h3 className="hz-t-base hz-w-semibold hz-fg hz-mb-1">{item.title}</h3>
                  <p className="hz-t-sm hz-fg-muted">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>

          <div className="hz-align-center">
            <Link
              to="/remote"
              className="hz-btn hz-btn-ghost hz-transition hz-fg"
            >
              Enable Remote Agents
              <ArrowRight className="hz-sq-2 hz-ml-2" />
            </Link>
          </div>
        </motion.div>

        {/* Hanzo AI API Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="hz-card"
        >
          <div className="hz-grid hz-grid-2 hz-gap-6 hz-ai-start">
            <div>
              <p
                className="hz-inline hz-t-xs hz-w-medium hz-r-full hz-px-4 hz-py-2 hz-bordered hz-mb-5"
                style={{ color: BRAND.fg, borderColor: `${BRAND.washStrong}` }}
              >
                Hanzo AI API
              </p>
              <h2 className="hz-t-3xl hz-w-medium hz-fg hz-mb-4">
                One API for models + tools.
              </h2>
              <p className="hz-t-lg hz-fg-muted hz-mb-5">
                Streaming, tool calling, and agent execution behind a single endpoint. Compatible with existing OpenAI SDKs by switching the base URL.
              </p>
              <a
                href="https://docs.hanzo.ai/api"
                target="_blank"
                rel="noreferrer noopener"
                className="hz-btn hz-btn-primary hz-transition hz-fg-inverse"
              >
                View API reference
                <ExternalLink className="hz-sq-2 hz-ml-2" />
              </a>
            </div>
            <CodeTabs tabs={API_CODE_EXAMPLES} />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DeveloperExperienceSection;
