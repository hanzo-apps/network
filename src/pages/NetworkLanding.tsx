import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Server, Cpu, Globe, Shield, Zap, Network, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  { value: "100K+", label: "GPU Hours Available" },
  { value: "50+", label: "Global Regions" },
  { value: "99.9%", label: "Uptime SLA" },
  { value: "$0.10", label: "Per GPU Hour" },
];

const features = [
  {
    icon: Cpu,
    title: "Distributed GPU Compute",
    description: "Access a global network of GPUs for AI training and inference at a fraction of cloud costs.",
  },
  {
    icon: Shield,
    title: "Secure & Verifiable",
    description: "Cryptographic proofs ensure your workloads run correctly on verified hardware.",
  },
  {
    icon: Network,
    title: "Decentralized Infrastructure",
    description: "No single point of failure. Your workloads run across a resilient peer-to-peer network.",
  },
  {
    icon: Zap,
    title: "Instant Scaling",
    description: "Scale from 1 to 1000 GPUs in seconds. Pay only for what you use.",
  },
  {
    icon: Globe,
    title: "Global Edge Network",
    description: "Run inference at the edge, close to your users, with sub-100ms latency worldwide.",
  },
  {
    icon: Users,
    title: "Provider Marketplace",
    description: "Earn by contributing idle compute. Set your own prices and availability.",
  },
];

const NetworkLanding = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a2e_1px,transparent_1px),linear-gradient(to_bottom,#1a1a2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

        {/* Gradient orbs */}
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />

        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm mb-8">
              <Network className="w-4 h-4" />
              Decentralized Compute Network
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent">
              The Future of
              <br />
              AI Compute
            </h1>

            <p className="text-xl text-neutral-400 max-w-2xl mx-auto mb-8 leading-relaxed">
              Access unlimited GPU compute from a global network of providers.
              Train models, run inference, and scale instantly—all at a fraction of cloud costs.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-black font-semibold px-8">
                Start Computing
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button size="lg" variant="outline" className="border-neutral-700 hover:bg-neutral-800">
                Become a Provider
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold text-cyan-400 mb-1">{stat.value}</div>
                  <div className="text-sm text-neutral-500">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-neutral-950">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Hanzo Network?</h2>
            <p className="text-neutral-400 max-w-2xl mx-auto">
              Built for the next generation of AI infrastructure. Decentralized, secure, and cost-effective.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800 hover:border-cyan-500/50 transition-colors"
              >
                <feature.icon className="w-10 h-10 text-cyan-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-neutral-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-b from-neutral-950 to-black">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Join the Network?</h2>
          <p className="text-neutral-400 max-w-2xl mx-auto mb-8">
            Whether you need compute or want to provide it, the Hanzo Network is your gateway to decentralized AI infrastructure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-black font-semibold px-8">
              Get Started
            </Button>
            <Link to="/docs">
              <Button size="lg" variant="outline" className="border-neutral-700 hover:bg-neutral-800">
                Read Documentation
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NetworkLanding;
