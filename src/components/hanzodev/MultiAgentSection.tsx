import { BRAND } from '@/lib/brand';
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Users, Crown, Clock, Monitor, Laptop, Gauge, Shield, Play, TestTube, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";


const AgentCodeDemo = () => {
  return (
    <div className="hz-bg-surface hz-r-lg hz-bordered hz-clip">
      {/* IDE header */}
      <div className="hz-row hz-ai-center hz-jc-between hz-px-4 hz-py-2 hz-border-b hz-bg-surface">
        <div className="hz-row hz-ai-center hz-gap-4">
          <div className="hz-row hz-gap-2">
            <div className="hz-sq-1 hz-r-full hz-bg-raised" />
            <div className="hz-sq-1 hz-r-full hz-bg-raised" />
            <div className="hz-sq-1 hz-r-full hz-bg-raised" />
          </div>
          <span className="hz-t-xs hz-fg-muted">Hanzo AI</span>
        </div>
        <div className="hz-row hz-ai-center hz-gap-2">
          <span className="hz-t-xs hz-fg-muted">signal-server</span>
        </div>
      </div>

      <div className="hz-grid hz-grid-6">
        {/* File tree */}
        <div className="hz-span-full hz-border-r hz-p-3 hz-t-xs hz-mono">
          <div className="hz-fg-muted hz-mb-2">service</div>
          <div className="hz-ml-2 hz-stack-1">
            <div className="hz-fg-muted">RateLimiter.java</div>
            <div className="hz-fg-muted">RateLimitConfig.java</div>
            <div className="hz-fg hz-bg-raised hz-px-2 hz-py-1 hz-r-md">RateLimitMetrics.java</div>
          </div>
          <div className="hz-fg-muted hz-mt-3 hz-mb-2">delivery</div>
          <div className="hz-ml-2 hz-stack-1">
            <div className="hz-fg-muted">MessageDeliveryLoop.java</div>
            <div className="hz-fg-muted">NoopDeliveryLoop.java</div>
          </div>
        </div>

        {/* Code panel */}
        <div className="hz-span-full hz-border-r hz-p-4 hz-mono hz-t-xs">
          <div className="hz-fg-muted hz-mb-2">package service.limits;</div>
          <div className="hz-stack-1">
            <div><span className="hz-fg-muted">import</span> java.time.Instant;</div>
            <div><span className="hz-fg-muted">import</span> java.util.concurrent.*;</div>
            <div className="hz-mt-3"><span className="hz-fg-muted">public class</span> <span className="hz-fg-muted">RateLimitMetrics</span> {"{"}</div>
            <div className="hz-ml-4 hz-fg-muted">// allowedCount, blockedCount, resetCount</div>
            <div className="hz-ml-4"><span className="hz-fg-muted">private final</span> AtomicLong allowed = <span className="hz-fg-muted">new</span> AtomicLong();</div>
            <div className="hz-ml-4"><span className="hz-fg-muted">private final</span> AtomicLong blocked = <span className="hz-fg-muted">new</span> AtomicLong();</div>
            <div className="hz-mt-3 hz-ml-4"><span className="hz-fg-muted">public void</span> <span className="hz-fg-muted">markAllowed</span>() {"{"}</div>
            <div className="hz-ml-4">allowed.incrementAndGet();</div>
            <div className="hz-ml-4">lastAllowed.set(Instant.now());</div>
            <div className="hz-ml-4">{"}"}</div>
          </div>
        </div>

        {/* Task panel */}
        <div className="hz-span-full hz-p-4">
          <div className="hz-mb-4">
            <div className="hz-t-xs hz-fg-muted hz-mb-1">Task</div>
            <div className="hz-t-sm hz-fg">Improve the rate limiting implementation.</div>
          </div>
          <div className="hz-bg-surface hz-r-lg hz-p-3 hz-mb-4">
            <div className="hz-t-xs hz-fg-muted hz-mb-2">Thought for 2 minutes.</div>
            <div className="hz-t-xs hz-fg-soft">I'll proceed with implementing all the improvements starting with Enhanced Metrics and Observability...</div>
          </div>
          <div className="hz-row hz-ai-center hz-gap-2 hz-t-xs">
            <div className="hz-sq-1 hz-r-full hz-bg-raised" />
            <span className="hz-fg-muted">Hanzo AI thinking...</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const features = [
  {
    icon: Users,
    title: "Multi-Agent Execution",
    description: "Hanzo dispatches the same task to multiple agents at once: Hanzo, Claude Code, Codex, Gemini.",
  },
  {
    icon: Crown,
    title: "LLM Consensus",
    description: "Every task is implemented differently by each agent, and LLM consensus selects the best implementation for users.",
  },
  {
    icon: Clock,
    title: "Long running tasks",
    description: "Support for long-running tasks that require extended hours of execution in isolated sandbox environments where agents can install, implement, and test.",
  },
  {
    icon: Monitor,
    title: "Monitor agents concurrently",
    description: "One view to monitor all agents' implementations for individuals and teams collaborating on different projects.",
  },
];

const ideFeatures = [
  {
    icon: Laptop,
    title: "Hanzo Agents on +35 IDEs",
    description: "Hanzo Agents run tasks on the Hanzo IDE, VSCode, JetBrains & more...",
  },
  {
    icon: Gauge,
    title: "Large code base context",
    description: "Hanzo coding agent is optimized for both small and very large production-grade codebases that require extensive context.",
  },
  {
    icon: Shield,
    title: "Controllable Autonomy",
    description: "Control the level of autonomy you want to grant the Hanzo coding agent while it executes your tasks.",
  },
  {
    icon: Play,
    title: "Plan, Execute, Test",
    description: "Hanzo agents are designed to implement tasks at a production level with detailed planning, high-precision execution, and a thorough testing phase.",
  },
  {
    icon: Globe,
    title: "Browser Agent",
    description: "The Hanzo coding agent includes many built-in tools, including the browser agent, which provides autonomy in testing and iterating on its implementation.",
  },
];

const MultiAgentSection = () => {
  return (
    <section className="hz-py-7 hz-px-4 hz-bg hz-rel hz-clip">
      {/* Background gradient */}
      <div className="hz-center-xy hz-abs hz-r-full hz-dim-more"
        style={{
          background: `radial-gradient(circle, ${BRAND.fg} 0%, transparent 70%)`,
          filter: "blur(100px)",
        }}
      />

      <div className="hz-container-wide hz-rel hz-z-raised">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="hz-align-center hz-mb-7"
        >
          <p
            className="hz-inline hz-t-xs hz-w-medium hz-r-full hz-px-4 hz-py-2 hz-bordered hz-mb-5"
            style={{ color: BRAND.fg, borderColor: `${BRAND.washStrong}` }}
          >
            Hanzo Autonomous Agent
          </p>
          <h2 className="hz-t-3xl hz-w-bold hz-fg hz-mb-4">
            Run multiple autonomous agents in parallel
            <br />
            locally and remotely
          </h2>
          <p className="hz-container-narrow hz-mw-md hz-t-lg hz-fg-muted">
            Multi-agent remote execution with LLM consensus to select the best execution for each task.
          </p>
          <Button
            size="lg"
            className="hz-mt-6 hz-fg hz-bg-inverse"
            asChild
          >
            <Link to="/signup">
              Get Started Now
              <ArrowRight className="hz-sq-3 hz-ml-2" />
            </Link>
          </Button>
        </motion.div>

        {/* Agent Code Demo */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="hz-mb-7"
        >
          <AgentCodeDemo />
        </motion.div>

        {/* Multi-agent features */}
        <div className="hz-grid hz-grid-4 hz-gap-5 hz-mb-7">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="hz-card hz-transition hz-card-interactive"
              >
                <div
                  className="hz-sq-7 hz-r-lg hz-row hz-ai-center hz-jc-center hz-mb-4 hz-bg-quiet"
                  >
                  <Icon className="hz-sq-4 hz-fg" />
                </div>
                <h3 className="hz-t-lg hz-w-semibold hz-fg hz-mb-2">{feature.title}</h3>
                <p className="hz-t-sm hz-fg-muted">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* IDE Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="hz-align-center hz-mb-7"
        >
          <h3 className="hz-t-2xl hz-w-bold hz-fg hz-mb-4">
            Hanzo Agents on +35 IDEs
          </h3>
          <p className="hz-fg-muted hz-mb-5">
            Hanzo Agents run tasks on the Hanzo IDE, VSCode, JetBrains & more...
          </p>
          <Button
            size="lg"
            className="hz-fg hz-bg-inverse"
            asChild
          >
            <Link to="/download">
              Get Started Now
              <ArrowRight className="hz-sq-3 hz-ml-2" />
            </Link>
          </Button>
        </motion.div>

        {/* IDE features */}
        <div className="hz-grid hz-grid-3 hz-gap-5">
          {ideFeatures.slice(1).map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="hz-card hz-transition hz-card-interactive"
              >
                <div
                  className="hz-sq-7 hz-r-lg hz-row hz-ai-center hz-jc-center hz-mb-4 hz-bg-quiet"
                  >
                  <Icon className="hz-sq-4 hz-fg" />
                </div>
                <h3 className="hz-t-lg hz-w-semibold hz-fg hz-mb-2">{feature.title}</h3>
                <p className="hz-t-sm hz-fg-muted">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MultiAgentSection;
