import { BRAND } from '@/lib/brand';
import React from "react";
import { motion } from "framer-motion";
import {
  Globe,
  Monitor,
  Cpu,
  Shield,
  Cloud,
  Lock,
  Zap,
  Users,
  HardDrive,
  Coins,
  Wifi,
  RefreshCw,
} from "lucide-react";


const modes = [
  {
    id: "web",
    icon: Globe,
    title: "Web App",
    tagline: "Build from anywhere",
    description: "Access Hanzo from any browser. Your workspace syncs across devices automatically.",
    features: [
      { icon: Cloud, text: "Cloud-synced workspaces" },
      { icon: Users, text: "Real-time collaboration" },
      { icon: RefreshCw, text: "Auto-save and versioning" },
    ],
    color: "#a3a3a3", // blue
  },
  {
    id: "desktop",
    icon: Monitor,
    title: "Desktop App",
    tagline: "Native performance",
    description: "Full-featured native app for macOS, Windows, and Linux with system integrations.",
    features: [
      { icon: Zap, text: "Native speed and UI" },
      { icon: Wifi, text: "Works offline" },
      { icon: HardDrive, text: "Local file access" },
    ],
    color: "#a3a3a3", // green
  },
  {
    id: "local",
    icon: Cpu,
    title: "Local AI",
    tagline: "Private and offline",
    description: "Run AI models locally on your hardware. Zero data leaves your machine.",
    features: [
      { icon: Lock, text: "Complete privacy" },
      { icon: Cpu, text: "GPU accelerated" },
      { icon: Zap, text: "Zero latency" },
    ],
    color: "#a3a3a3", // purple
  },
  {
    id: "node",
    icon: Shield,
    title: "Hanzo Node",
    tagline: "Earn while you build",
    description: "Connect to the decentralized network. Contribute compute, earn rewards.",
    features: [
      { icon: Coins, text: "Earn LUX tokens" },
      { icon: Shield, text: "Proof of AI consensus" },
      { icon: Users, text: "Decentralized network" },
    ],
    color: BRAND.fg,
  },
];

const WhyHanzoApp = () => {
  return (
    <section className="hz-py-7 hz-px-4">
      <div className="hz-container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="hz-align-center hz-mb-7"
        >
          <h2 className="hz-t-3xl hz-w-bold hz-fg hz-mb-4">
            Four ways to Hanzo
          </h2>
          <p className="hz-container-narrow hz-mw-md hz-t-lg hz-fg-muted">
            Choose how you want to work. All modes sync seamlessly when connected.
          </p>
        </motion.div>

        <div className="hz-grid hz-grid-2 hz-gap-5">
          {modes.map((mode, index) => {
            const Icon = mode.icon;
            return (
              <motion.div
                key={mode.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="hz-card hz-transition hz-card-interactive"
              >
                <div className="hz-row hz-ai-start hz-gap-4">
                  <div
                    className="hz-sq-7 hz-r-lg hz-row hz-ai-center hz-jc-center hz-none"
                    style={{ backgroundColor: `${mode.color}20` }}
                  >
                    <Icon className="hz-sq-4" style={{ color: mode.color }} />
                  </div>
                  <div className="hz-grow">
                    <h3 className="hz-t-lg hz-w-semibold hz-fg hz-mb-1">{mode.title}</h3>
                    <p className="hz-t-sm hz-mb-3" style={{ color: mode.color }}>{mode.tagline}</p>
                    <p className="hz-t-sm hz-fg-muted hz-mb-4">{mode.description}</p>
                    <div className="hz-stack-2">
                      {mode.features.map((feature) => {
                        const FeatureIcon = feature.icon;
                        return (
                          <div key={feature.text} className="hz-row hz-ai-center hz-gap-2 hz-t-sm hz-fg-muted">
                            <FeatureIcon className="hz-sq-2 hz-fg-muted" />
                            <span>{feature.text}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyHanzoApp;
