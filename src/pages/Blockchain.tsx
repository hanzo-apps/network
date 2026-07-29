import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Blocks,
  Wallet,
  CreditCard,
  FileCode,
  HardDrive,
  Radio,
  Search,
  ArrowLeftRight,
  Shield,
  Clock,
  Bell,
  Mail,
  ArrowRight,
  Check,
  Network,
  Key,
  Database,
  Globe,
  Zap,
  Lock,
  Server,
  Code,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";


// Web3 capability categories
const CAPABILITIES = [
  {
    id: "nodes",
    icon: Server,
    title: "Blockchain Nodes & Data",
    description: "Access any chain with managed node infrastructure",
    features: [
      "Multi-chain RPC endpoints (EVM, Solana, Cosmos, etc.)",
      "Archive nodes for historical data access",
      "WebSocket subscriptions for real-time events",
      "Rate limiting and load balancing built-in",
      "99.9% uptime SLA with global distribution",
    ],
  },
  {
    id: "wallet",
    icon: Wallet,
    title: "Wallet & Key Management",
    description: "Enterprise-grade key infrastructure",
    features: [
      "MPC (Multi-Party Computation) wallets",
      "Hardware Security Module (HSM) integration",
      "Policy-based transaction signing",
      "Multi-sig support across chains",
      "Custodial and non-custodial options",
    ],
  },
  {
    id: "payments",
    icon: CreditCard,
    title: "On-Chain Payments",
    description: "Accept crypto payments seamlessly",
    features: [
      "Stablecoin payment processing (USDC, USDT, DAI)",
      "Native token support across chains",
      "Payment links and checkout widgets",
      "Automatic conversion and settlement",
      "Invoice generation and tracking",
    ],
  },
  {
    id: "contracts",
    icon: FileCode,
    title: "Smart Contract Management",
    description: "Deploy and interact with contracts at scale",
    features: [
      "Contract deployment across multiple chains",
      "ABI management and verification",
      "Gas estimation and optimization",
      "Event indexing and webhooks",
      "Upgradeable proxy pattern support",
    ],
  },
  {
    id: "storage",
    icon: HardDrive,
    title: "Decentralized Storage",
    description: "Persistent, censorship-resistant data storage",
    features: [
      "IPFS pinning with global CDN",
      "Arweave permanent storage integration",
      "Filecoin deal management",
      "NFT metadata hosting",
      "Content-addressed file retrieval",
    ],
  },
  {
    id: "oracles",
    icon: Radio,
    title: "Oracle Services",
    description: "Bring off-chain data on-chain",
    features: [
      "Price feeds for DeFi applications",
      "Custom data feeds and attestations",
      "VRF (Verifiable Random Function)",
      "Cross-chain message passing",
      "Chainlink and custom oracle integration",
    ],
  },
  {
    id: "indexing",
    icon: Search,
    title: "Blockchain Indexing",
    description: "Query blockchain data with GraphQL",
    features: [
      "Custom subgraph deployment",
      "Real-time indexing and caching",
      "Historical data aggregation",
      "Cross-chain data unification",
      "SQL and GraphQL query interfaces",
    ],
  },
  {
    id: "crosschain",
    icon: ArrowLeftRight,
    title: "Cross-Chain Infrastructure",
    description: "Bridge assets and data between chains",
    features: [
      "Token bridging with Wormhole, LayerZero",
      "Cross-chain messaging protocols",
      "Unified liquidity across chains",
      "Chain abstraction for users",
      "Multi-chain transaction batching",
    ],
  },
  {
    id: "compliance",
    icon: Shield,
    title: "Compliance & Fiat",
    description: "Enterprise compliance and fiat rails",
    features: [
      "KYC/AML integration",
      "Transaction monitoring and screening",
      "Fiat on/off ramp connections",
      "Tax reporting and documentation",
      "Regulatory-compliant custody",
    ],
  },
];

// Roadmap items
const ROADMAP = [
  { phase: "Q2 2025", title: "Nodes & Indexing", status: "in-progress" },
  { phase: "Q3 2025", title: "Wallet Infrastructure", status: "planned" },
  { phase: "Q3 2025", title: "Payment Processing", status: "planned" },
  { phase: "Q4 2025", title: "Cross-Chain & Oracles", status: "planned" },
  { phase: "Q1 2026", title: "Full Platform Launch", status: "planned" },
];

// Product pages
const PRODUCTS = [
  { id: "nodes", name: "Hanzo Nodes", description: "Managed RPC endpoints for every chain", icon: Server, color: "#a3a3a3", href: "/blockchain/nodes" },
  { id: "indexer", name: "Hanzo Indexer", description: "Query blockchain data with GraphQL", icon: Search, color: "#a3a3a3", href: "/blockchain/indexer" },
  { id: "wallet", name: "Hanzo Wallet", description: "Unified wallet infrastructure", icon: Wallet, color: "#a3a3a3", href: "/blockchain/wallet" },
  { id: "safe", name: "Hanzo Safe", description: "Multi-sig & threshold custody", icon: Shield, color: "#a3a3a3", href: "/blockchain/safe" },
  { id: "id", name: "Hanzo ID", description: "Decentralized identity & credentials", icon: Key, color: "#a3a3a3", href: "/blockchain/id" },
  { id: "pay", name: "Hanzo Pay", description: "Crypto payments gateway", icon: CreditCard, color: "#a3a3a3", href: "/blockchain/pay" },
  { id: "bridge", name: "Hanzo Bridge", description: "Cross-chain asset transfers", icon: ArrowLeftRight, color: "#a3a3a3", href: "/blockchain/bridge" },
  { id: "defi", name: "Hanzo DeFi", description: "Staking, lending & yield modules", icon: Code, color: "#a3a3a3", href: "/blockchain/defi" },
  { id: "oracle", name: "Hanzo Oracle", description: "Price feeds & VRF", icon: Radio, color: "#a3a3a3", href: "/blockchain/oracle" },
  { id: "storage", name: "Hanzo Storage", description: "IPFS, Arweave & Filecoin", icon: HardDrive, color: "#a3a3a3", href: "/blockchain/storage" },
  { id: "explorer", name: "Hanzo Explorer", description: "Multi-chain block explorer", icon: Search, color: "#a3a3a3", href: "/blockchain/explorer" },
  { id: "quest", name: "Hanzo Quest", description: "Gamified engagement & loyalty", icon: Blocks, color: "#a3a3a3", href: "/blockchain/quest" },
];

const Blockchain = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [expandedCapability, setExpandedCapability] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle waitlist signup
    console.log("Waitlist signup:", email);
    setSubmitted(true);
    setEmail("");
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="hz-min-h-screen hz-bg hz-fg">
      <Navbar />

      {/* Hero Section */}
      <section className="hz-pt-6 hz-pb-6 hz-px-4 hz-rel hz-clip">
        {/* Background gradient */}
        <div className="hz-abs hz-inset hz-clip hz-z-base hz-no-pointer">
          <div
            className="hz-center-xy hz-abs hz-r-full hz-dim-more"
            style={{
              background: `radial-gradient(circle, #a3a3a3 0%, transparent 70%)`,
              filter: "blur(100px)",
            }}
          />
        </div>

        <div className="hz-container-wide hz-rel hz-z-raised">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="hz-align-center hz-mb-7"
          >
            {/* Coming Soon Badge */}
            <div className="hz-btn hz-gap-2 hz-mb-5">
              <Clock className="hz-sq-2 hz-fg-muted" />
              <span className="hz-t-sm hz-w-medium hz-fg-muted">Coming Soon</span>
            </div>

            <h1 className="hz-t-4xl hz-w-medium hz-tracking-tight hz-mb-5">
              <span className="hz-fg">Web3 Infrastructure.</span>
              <br />
              <span className="hz-fg-muted">For the AI Era.</span>
            </h1>

            <p className="hz-container-narrow hz-mw-md hz-t-lg hz-fg-muted hz-mb-6">
              Blockchain nodes, wallets, payments, smart contracts, and more—all integrated into the Hanzo platform. Build decentralized applications with the same simplicity as traditional apps.
            </p>

            {/* Waitlist Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="hz-container-narrow hz-mw-sm"
            >
              <form onSubmit={handleSubmit} className="hz-col-row hz-gap-3">
                <div className="hz-btn hz-grow hz-gap-2">
                  <Mail className="hz-sq-2 hz-fg-muted" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="hz-grow hz-bg-none hz-fg hz-t-sm"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="hz-px-5 hz-py-3 hz-r-lg hz-w-medium hz-transition"
                  style={{ backgroundColor: "#a3a3a3" }}
                >
                  {submitted ? (
                    <span className="hz-row hz-ai-center hz-gap-2">
                      <Check className="hz-sq-2" />
                      Joined!
                    </span>
                  ) : (
                    <span className="hz-row hz-ai-center hz-gap-2">
                      Join Waitlist
                      <Bell className="hz-sq-2" />
                    </span>
                  )}
                </Button>
              </form>
              <p className="hz-t-xs hz-fg-muted hz-mt-3">
                Be the first to know when Hanzo Blockchain launches. No spam, ever.
              </p>
            </motion.div>
          </motion.div>

          {/* Visual Hero Element */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hz-card"
          >
            <div className="hz-grid hz-grid-6 hz-gap-5">
              {[
                { icon: Server, label: "Nodes" },
                { icon: Wallet, label: "Wallets" },
                { icon: CreditCard, label: "Payments" },
                { icon: FileCode, label: "Contracts" },
                { icon: Database, label: "Storage" },
                { icon: ArrowLeftRight, label: "Bridges" },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.3 + idx * 0.05 }}
                    className="hz-col hz-ai-center hz-gap-2"
                  >
                    <div className="hz-sq-7 hz-r-lg hz-bg-raised hz-bordered hz-border-strong hz-row hz-ai-center hz-jc-center">
                      <Icon className="hz-sq-4 hz-fg-muted" />
                    </div>
                    <span className="hz-t-xs hz-fg-muted">{item.label}</span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Products Section */}
      <section className="hz-py-7 hz-px-4 hz-bg-surface">
        <div className="hz-container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="hz-align-center hz-mb-7"
          >
            <h2 className="hz-t-3xl hz-w-medium hz-fg hz-mb-4">
              Web3 Products
            </h2>
            <p className="hz-container-narrow hz-mw-md hz-t-lg hz-fg-muted">
              Explore our suite of blockchain services. Each product is in private beta—apply for early access.
            </p>
          </motion.div>

          <div className="hz-grid hz-grid-4 hz-gap-4">
            {PRODUCTS.map((product, index) => {
              const Icon = product.icon;
              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.03 }}
                >
                  <Link
                    to={product.href}
                    className="hz-card hz-transition hz-card-interactive"
                  >
                    <div
                      className="hz-sq-6 hz-r-lg hz-row hz-ai-center hz-jc-center hz-mb-3"
                      style={{ backgroundColor: `${product.color}1a` }}
                    >
                      <Icon className="hz-sq-3" style={{ color: product.color }} />
                    </div>
                    <h3 className="hz-w-semibold hz-fg hz-mb-1 hz-transition hz-hoverable">
                      {product.name}
                    </h3>
                    <p className="hz-t-sm hz-fg-muted">{product.description}</p>
                    <div className="hz-mt-3 hz-row hz-ai-center hz-gap-1 hz-t-xs hz-fg-muted hz-invisible hz-transition">
                      Apply for beta
                      <ArrowRight className="hz-sq-1" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="hz-py-7 hz-px-4">
        <div className="hz-container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="hz-align-center hz-mb-7"
          >
            <h2 className="hz-t-3xl hz-w-medium hz-fg hz-mb-4">
              Complete Web3 Infrastructure
            </h2>
            <p className="hz-container-narrow hz-mw-md hz-t-lg hz-fg-muted">
              Everything you need to build decentralized applications, from blockchain data access to compliance tools.
            </p>
          </motion.div>

          <div className="hz-grid hz-grid-3 hz-gap-4">
            {CAPABILITIES.map((capability, index) => {
              const Icon = capability.icon;
              const isExpanded = expandedCapability === capability.id;
              return (
                <motion.div
                  key={capability.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="hz-r-lg hz-bordered hz-bg-surface hz-clip"
                >
                  <button
                    onClick={() => setExpandedCapability(isExpanded ? null : capability.id)}
                    className="hz-w-full hz-p-4 hz-align-left hz-row hz-ai-start hz-gap-4 hz-transition hz-hoverable"
                  >
                    <div className="hz-sq-6 hz-r-lg hz-bg-raised hz-row hz-ai-center hz-jc-center hz-none">
                      <Icon className="hz-sq-3 hz-fg-muted" />
                    </div>
                    <div className="hz-grow">
                      <div className="hz-row hz-ai-center hz-jc-between hz-gap-2">
                        <h3 className="hz-w-semibold hz-fg">{capability.title}</h3>
                        {isExpanded ? (
                          <ChevronUp className="hz-sq-2 hz-fg-muted hz-none" />
                        ) : (
                          <ChevronDown className="hz-sq-2 hz-fg-muted hz-none" />
                        )}
                      </div>
                      <p className="hz-t-sm hz-fg-muted hz-mt-1">{capability.description}</p>
                    </div>
                  </button>

                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="hz-px-4 hz-pb-4 hz-border-t"
                    >
                      <ul className="hz-mt-4 hz-stack-2">
                        {capability.features.map((feature, idx) => (
                          <li key={idx} className="hz-row hz-ai-start hz-gap-2 hz-t-sm hz-fg-soft">
                            <Check className="hz-sq-2 hz-fg-muted hz-none hz-mt-1" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="hz-py-7 hz-px-4">
        <div className="hz-container-wide">
          <div className="hz-grid hz-grid-2 hz-gap-7 hz-ai-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="hz-btn hz-gap-2 hz-mb-5">
                <Zap className="hz-sq-2 hz-fg-muted" />
                <span className="hz-t-sm hz-w-medium hz-fg-muted">Unified Platform</span>
              </div>
              <h2 className="hz-t-3xl hz-w-medium hz-fg hz-mb-4">
                AI + Web3.<br />
                <span className="hz-fg-muted">Better Together.</span>
              </h2>
              <p className="hz-t-lg hz-fg-muted hz-mb-5">
                Combine Hanzo's AI capabilities with blockchain infrastructure. Let AI agents manage wallets, execute transactions, and interact with smart contracts autonomously.
              </p>
              <ul className="hz-stack-3 hz-mb-6">
                {[
                  "AI agents that can send on-chain transactions",
                  "Natural language smart contract interaction",
                  "Automated DeFi strategies with AI optimization",
                  "Cross-chain portfolio management",
                ].map((item, idx) => (
                  <li key={idx} className="hz-row hz-ai-center hz-gap-3 hz-fg-soft">
                    <div className="hz-sq-4 hz-r-md hz-bg-raised hz-row hz-ai-center hz-jc-center">
                      <Check className="hz-sq-2 hz-fg-muted" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="hz-r-lg hz-bordered hz-bg-surface hz-clip"
            >
              <div className="hz-row hz-ai-center hz-gap-2 hz-px-4 hz-py-3 hz-border-b hz-bg-surface">
                <div className="hz-row hz-gap-2">
                  <div className="hz-sq-1 hz-r-full hz-bg-raised" />
                  <div className="hz-sq-1 hz-r-full hz-bg-raised" />
                  <div className="hz-sq-1 hz-r-full hz-bg-raised" />
                </div>
                <span className="hz-ml-2 hz-t-xs hz-fg-muted hz-mono">hanzo-agent.ts</span>
              </div>
              <div className="hz-p-4 hz-mono hz-t-sm hz-bg-surface">
                <pre className="hz-fg-soft hz-scroll-x">
{`import { Hanzo } from "@hanzo/ai";
import { Wallet } from "@hanzo/blockchain";

const agent = new Hanzo.Agent({
  model: "claude-sonnet-4-20250514",
  tools: [Wallet.tools],
});

// Agent can now execute on-chain
await agent.run(\`
  Check my ETH balance on Ethereum mainnet,
  then swap 0.1 ETH for USDC on Uniswap
  if the price is favorable.
\`);`}
                </pre>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="hz-py-7 hz-px-4 hz-bg-surface">
        <div className="hz-container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="hz-align-center hz-mb-7"
          >
            <h2 className="hz-t-3xl hz-w-medium hz-fg hz-mb-4">
              Development Roadmap
            </h2>
            <p className="hz-t-lg hz-fg-muted">
              Our planned timeline for launching Web3 infrastructure.
            </p>
          </motion.div>

          <div className="hz-rel">
            {/* Timeline line */}
            <div className="hz-abs hz-top-0 hz-bottom-0 hz-bg-raised" />

            <div className="hz-stack-6">
              {ROADMAP.map((item, index) => (
                <motion.div
                  key={item.phase}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className={`hz-rel hz-row hz-ai-center hz-gap-5 ${
                    index % 2 === 0 ? "" : ""
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="hz-sq-1 hz-abs hz-r-full hz-bg-raised" />

                  {/* Content */}
                  <div className={`hz-ml-4 ${index % 2 === 0 ? "" : ""}`}>
                    <div className="hz-px-3 hz-py-1 hz-r-full hz-t-xs hz-w-medium hz-bg-raised hz-fg-muted hz-bordered hz-border-strong hz-mb-2">
                      {item.phase}
                    </div>
                    <h3 className="hz-t-lg hz-w-semibold hz-fg">{item.title}</h3>
                    <span className={`hz-t-sm ${item.status === "in-progress" ? "hz-fg-muted" : "hz-fg-muted"}`}>
                      {item.status === "in-progress" ? "In Progress" : "Planned"}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Supported Chains */}
      <section className="hz-py-7 hz-px-4">
        <div className="hz-container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="hz-align-center hz-mb-7"
          >
            <h2 className="hz-t-3xl hz-w-medium hz-fg hz-mb-4">
              Multi-Chain from Day One
            </h2>
            <p className="hz-container-narrow hz-mw-md hz-t-lg hz-fg-muted">
              Support for all major blockchain networks, with more being added continuously.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="hz-row hz-wrap hz-jc-center hz-gap-4"
          >
            {[
              "Ethereum",
              "Polygon",
              "Arbitrum",
              "Optimism",
              "Base",
              "Solana",
              "Cosmos",
              "Avalanche",
              "BNB Chain",
              "Lux",
              "zkSync",
              "Starknet",
            ].map((chain, index) => (
              <div
                key={chain}
                className="hz-px-4 hz-py-2 hz-r-full hz-bordered hz-bg-surface hz-t-sm hz-fg-soft"
              >
                {chain}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="hz-py-7 hz-px-4 hz-border-t">
        <div className="hz-container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="hz-card hz-align-center"
          >
            <div className="hz-sq-8 hz-r-xl hz-bg-raised hz-row hz-ai-center hz-jc-center hz-mx-auto hz-mb-5">
              <Blocks className="hz-sq-5 hz-fg-muted" />
            </div>
            <h2 className="hz-t-3xl hz-w-medium hz-fg hz-mb-4">
              Ready to Build on Web3?
            </h2>
            <p className="hz-container-narrow hz-mw-md hz-t-lg hz-fg-muted hz-mb-6">
              Join the waitlist to be among the first to access Hanzo's Web3 infrastructure when it launches.
            </p>

            <form onSubmit={handleSubmit} className="hz-col-row hz-container-narrow hz-mw-sm hz-gap-3">
              <div className="hz-btn hz-grow hz-gap-2">
                <Mail className="hz-sq-2 hz-fg-muted" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="hz-grow hz-bg-none hz-fg hz-t-sm"
                  required
                />
              </div>
              <Button
                type="submit"
                className="hz-px-5 hz-py-3 hz-r-lg hz-w-medium"
                style={{ backgroundColor: "#a3a3a3" }}
              >
                {submitted ? "Joined!" : "Join Waitlist"}
              </Button>
            </form>

            <div className="hz-row hz-wrap hz-jc-center hz-gap-5 hz-mt-6 hz-t-sm hz-fg-muted">
              <span className="hz-row hz-ai-center hz-gap-2">
                <Lock className="hz-sq-2" />
                Enterprise-grade security
              </span>
              <span className="hz-row hz-ai-center hz-gap-2">
                <Globe className="hz-sq-2" />
                Multi-chain support
              </span>
              <span className="hz-row hz-ai-center hz-gap-2">
                <Zap className="hz-sq-2" />
                AI-native integration
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blockchain;
