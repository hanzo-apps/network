import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  ArrowRight, Database, Cloud, Code, Cpu, 
  Box, Server, Globe, Network, Sparkles,
  Infinity, LayoutGrid, Brain, Bot, Terminal,
  GitBranch, Lock, Zap
} from "lucide-react";

const AICloudSVG = () => (
  <svg 
    className="hz-sq-8 hz-abs hz-dim-more hz-fg-muted" 
    viewBox="0 0 200 200" 
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="2" strokeDasharray="10 5" />
    <circle cx="100" cy="100" r="50" stroke="currentColor" strokeWidth="1.5" strokeDasharray="5 3" />
    <g transform="translate(70, 70)">
      <path d="M30 10C30 15.5228 25.5228 20 20 20C14.4772 20 10 15.5228 10 10C10 4.47715 14.4772 0 20 0C25.5228 0 30 4.47715 30 10Z" fill="currentColor" fillOpacity="0.3" />
      <circle cx="20" cy="10" r="5" fill="currentColor" />
    </g>
    <g transform="translate(120, 90)">
      <path d="M30 10C30 15.5228 25.5228 20 20 20C14.4772 20 10 15.5228 10 10C10 4.47715 14.4772 0 20 0C25.5228 0 30 4.47715 30 10Z" fill="currentColor" fillOpacity="0.3" />
      <circle cx="20" cy="10" r="5" fill="currentColor" />
    </g>
    <g transform="translate(80, 130)">
      <path d="M30 10C30 15.5228 25.5228 20 20 20C14.4772 20 10 15.5228 10 10C10 4.47715 14.4772 0 20 0C25.5228 0 30 4.47715 30 10Z" fill="currentColor" fillOpacity="0.3" />
      <circle cx="20" cy="10" r="5" fill="currentColor" />
    </g>
  </svg>
);

const DxPlatformSVG = () => (
  <svg 
    className="hz-sq-8 hz-abs hz-dim-more hz-fg-muted" 
    viewBox="0 0 200 200" 
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="40" y="40" width="120" height="120" rx="8" stroke="currentColor" strokeWidth="2" />
    <line x1="40" y1="70" x2="160" y2="70" stroke="currentColor" strokeWidth="2" />
    <circle cx="55" cy="55" r="5" fill="currentColor" />
    <circle cx="75" cy="55" r="5" fill="currentColor" />
    <circle cx="95" cy="55" r="5" fill="currentColor" />
    <rect x="60" y="90" width="80" height="50" rx="4" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" fill="currentColor" fillOpacity="0.1" />
    <path d="M70 105L80 115L90 95M110 95L120 115L130 105" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

interface EcosystemDetailProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'cloud' | 'dx';
}

const EcosystemDetail: React.FC<EcosystemDetailProps> = ({ isOpen, onClose, type }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="hz-fixed hz-inset hz-bg-surface hz-glass hz-z-overlay hz-row hz-ai-center hz-jc-center hz-p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25 }}
            className="hz-card hz-mw-lg hz-w-full hz-shadow-lg hz-scroll-y"
            onClick={(e) => e.stopPropagation()}
          >
            {type === 'cloud' ? (
              <>
                <div className="hz-mb-5">
                  <h3 className="hz-t-2xl hz-w-medium hz-fg hz-mb-2 hz-row hz-ai-center">
                    <Cloud className="hz-sq-4 hz-mr-2 hz-fg-muted" />
                    Hanzo AI Cloud
                  </h3>
                  <p className="hz-fg-muted">
                    Our comprehensive AI platform providing seamless access to cutting-edge AI capabilities with enterprise-grade reliability and security.
                  </p>
                </div>

                <div className="hz-grid hz-grid-2 hz-gap-4 hz-mb-5">
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="hz-card"
                  >
                    <div className="hz-row hz-ai-center hz-mb-2">
                      <Brain className="hz-sq-3 hz-fg-muted hz-mr-2" />
                      <h4 className="hz-fg hz-w-medium">AI Model Hub</h4>
                    </div>
                    <p className="hz-fg-muted hz-t-sm">
                      Access to leading open and proprietary AI models with unified API, optimized inference, and cost management.
                    </p>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="hz-card"
                  >
                    <div className="hz-row hz-ai-center hz-mb-2">
                      <Database className="hz-sq-3 hz-fg-muted hz-mr-2" />
                      <h4 className="hz-fg hz-w-medium">Vector Database</h4>
                    </div>
                    <p className="hz-fg-muted hz-t-sm">
                      High-performance vector storage and retrieval for AI applications with advanced filtering and hybrid search.
                    </p>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="hz-card"
                  >
                    <div className="hz-row hz-ai-center hz-mb-2">
                      <Bot className="hz-sq-3 hz-fg-muted hz-mr-2" />
                      <h4 className="hz-fg hz-w-medium">Agent Framework</h4>
                    </div>
                    <p className="hz-fg-muted hz-t-sm">
                      Build, deploy and manage intelligent agents that can reason, plan, and execute complex tasks autonomously.
                    </p>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="hz-card"
                  >
                    <div className="hz-row hz-ai-center hz-mb-2">
                      <Lock className="hz-sq-3 hz-fg-muted hz-mr-2" />
                      <h4 className="hz-fg hz-w-medium">Enterprise Security</h4>
                    </div>
                    <p className="hz-fg-muted hz-t-sm">
                      SOC 2 compliance, end-to-end encryption, and comprehensive audit logging for mission-critical AI systems.
                    </p>
                  </motion.div>
                </div>

                <div className="hz-mt-5 hz-pt-4 hz-border-t hz-row hz-jc-between hz-ai-center">
                  <div className="hz-fg-muted hz-t-sm">
                    Unified AI infrastructure for the enlightened engineer
                  </div>
                  <Link 
                    to="/ai" 
                    className="hz-fg-muted hz-transition hz-t-sm hz-row hz-ai-center hz-link"
                  >
                    <span>Learn more about AI Cloud</span>
                    <ArrowRight className="hz-sq-1 hz-ml-2" />
                  </Link>
                </div>
              </>
            ) : (
              <>
                <div className="hz-mb-5">
                  <h3 className="hz-t-2xl hz-w-medium hz-fg hz-mb-2 hz-row hz-ai-center">
                    <Code className="hz-sq-4 hz-mr-2 hz-fg-muted" />
                    Developer Experience Platform
                  </h3>
                  <p className="hz-fg-muted">
                    Our integrated toolkit designed to streamline the software development lifecycle, from code to production.
                  </p>
                </div>

                <div className="hz-grid hz-grid-2 hz-gap-4 hz-mb-5">
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="hz-card"
                  >
                    <div className="hz-row hz-ai-center hz-mb-2">
                      <GitBranch className="hz-sq-3 hz-fg-muted hz-mr-2" />
                      <h4 className="hz-fg hz-w-medium">CI/CD Pipeline</h4>
                    </div>
                    <p className="hz-fg-muted hz-t-sm">
                      Automated testing, integration, and deployment with intelligent optimization and failure prediction.
                    </p>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="hz-card"
                  >
                    <div className="hz-row hz-ai-center hz-mb-2">
                      <Terminal className="hz-sq-3 hz-fg-muted hz-mr-2" />
                      <h4 className="hz-fg hz-w-medium">Dev Tools</h4>
                    </div>
                    <p className="hz-fg-muted hz-t-sm">
                      Enhanced CLI, IDE integrations, and AI-assisted coding tools that anticipate developer needs.
                    </p>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="hz-card"
                  >
                    <div className="hz-row hz-ai-center hz-mb-2">
                      <Zap className="hz-sq-3 hz-fg-muted hz-mr-2" />
                      <h4 className="hz-fg hz-w-medium">Edge Computing</h4>
                    </div>
                    <p className="hz-fg-muted hz-t-sm">
                      Global edge network for low-latency deployment with intelligent traffic routing and caching.
                    </p>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="hz-card"
                  >
                    <div className="hz-row hz-ai-center hz-mb-2">
                      <Network className="hz-sq-3 hz-fg-muted hz-mr-2" />
                      <h4 className="hz-fg hz-w-medium">Observability</h4>
                    </div>
                    <p className="hz-fg-muted hz-t-sm">
                      Comprehensive monitoring, logging, and analytics with AI-powered anomaly detection and recommendation.
                    </p>
                  </motion.div>
                </div>

                <div className="hz-mt-5 hz-pt-4 hz-border-t hz-row hz-jc-between hz-ai-center">
                  <div className="hz-fg-muted hz-t-sm">
                    Build with tranquility, deploy with confidence
                  </div>
                  <Link 
                    to="/platform" 
                    className="hz-fg-muted hz-transition hz-t-sm hz-row hz-ai-center hz-link"
                  >
                    <span>Learn more about DX Platform</span>
                    <ArrowRight className="hz-sq-1 hz-ml-2" />
                  </Link>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const ProductsOverview = () => {
  const [selectedSystem, setSelectedSystem] = useState<'cloud' | 'dx' | null>(null);
  
  const products = [
    {
      name: "Hanzo Cloud",
      icon: Cloud,
      description: "Deploy with tranquility. Scale without attachment to infrastructure.",
      principle: "The wise engineer creates form from emptiness.",
      path: "/cloud"
    },
    {
      name: "Hanzo Vector",
      icon: Database,
      description: "Store and query vectors with efficiency and grace.",
      principle: "Knowledge structured becomes wisdom accessible.",
      path: "/vector"
    },
    {
      name: "Hanzo AI",
      icon: Cpu,
      description: "Harness artificial intelligence with mindful purpose.",
      principle: "Let AI amplify intention, not replace discernment.",
      path: "/ai"
    },
    {
      name: "Hanzo Code",
      icon: Code,
      description: "Write code that follows the middle path - neither complex nor simplistic.",
      principle: "Perfect code is not when there is nothing more to add, but when there is nothing left to take away.",
      path: "/hanzocode"
    }
  ];

  return (
    <section className="hz-py-7 hz-px-4 hz-bg hz-rel">
      <div 
        className="hz-abs hz-inset hz-no-pointer hz-dim-more"
        style={{
          background: "radial-gradient(circle at 50% 30%, rgba(25,25,25,1), rgba(0,0,0,1))"
        }}
      />
      
      <div className="hz-container-narrow hz-w-full hz-rel hz-z-raised">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="hz-align-center hz-mb-7"
        >
          <h2 className="hz-t-3xl hz-w-bold hz-mb-4 hz-chrome">
            The Way of Building
          </h2>
          <p className="hz-container-narrow hz-mw-md hz-fg-muted">
            Each tool embodies our principles. Together, they form a complete system for enlightened engineering.
          </p>
        </motion.div>

        {/* AI Ecosystem Overview */}
        <div className="hz-grid hz-grid-2 hz-gap-6 hz-mb-7">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="hz-card hz-rel hz-clip hz-pointer"
            onClick={() => setSelectedSystem('cloud')}
          >
            <div className="hz-rel hz-z-raised">
              <div className="hz-row hz-ai-center hz-mb-4">
                <div className="hz-p-2 hz-r-lg hz-bg-raised hz-mr-4">
                  <Cloud className="hz-sq-5 hz-fg-muted" />
                </div>
                <h3 className="hz-t-2xl hz-w-bold hz-fg">AI Cloud</h3>
              </div>
              
              <p className="hz-fg-soft hz-mb-4">
                Our unified AI infrastructure combines vector databases, model inference, 
                and agent frameworks into a coherent platform built for enlightened engineers.
              </p>
              
              <div className="hz-row hz-wrap hz-gap-2 hz-mb-5">
                <span className="hz-px-2 hz-py-1 hz-bg-raised hz-r-full hz-t-xs hz-fg-soft">Vector DB</span>
                <span className="hz-px-2 hz-py-1 hz-bg-raised hz-r-full hz-t-xs hz-fg-soft">Multi-Model</span>
                <span className="hz-px-2 hz-py-1 hz-bg-raised hz-r-full hz-t-xs hz-fg-soft">Agents</span>
                <span className="hz-px-2 hz-py-1 hz-bg-raised hz-r-full hz-t-xs hz-fg-soft">Enterprise Ready</span>
              </div>
              
              <button className="hz-row hz-ai-center hz-fg-muted hz-transition hz-link">
                <span>Explore AI Cloud</span>
                <ArrowRight className="hz-sq-2 hz-ml-2 hz-transition" />
              </button>
            </div>
            
            <AICloudSVG />
            
            <motion.div 
              className="hz-abs hz-inset hz-bg-raised hz-invisible hz-transition"
              initial={false}
              whileHover={{ opacity: 0.1 }}
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="hz-card hz-rel hz-clip hz-pointer"
            onClick={() => setSelectedSystem('dx')}
          >
            <div className="hz-rel hz-z-raised">
              <div className="hz-row hz-ai-center hz-mb-4">
                <div className="hz-p-2 hz-r-lg hz-bg-raised hz-mr-4">
                  <Code className="hz-sq-5 hz-fg-muted" />
                </div>
                <h3 className="hz-t-2xl hz-w-bold hz-fg">DX Platform</h3>
              </div>
              
              <p className="hz-fg-soft hz-mb-4">
                Our developer experience platform streamlines engineering workflow with 
                automated CI/CD, observability, and edge computing in perfect harmony.
              </p>
              
              <div className="hz-row hz-wrap hz-gap-2 hz-mb-5">
                <span className="hz-px-2 hz-py-1 hz-bg-raised hz-r-full hz-t-xs hz-fg-soft">CI/CD</span>
                <span className="hz-px-2 hz-py-1 hz-bg-raised hz-r-full hz-t-xs hz-fg-soft">Dev Tools</span>
                <span className="hz-px-2 hz-py-1 hz-bg-raised hz-r-full hz-t-xs hz-fg-soft">Edge</span>
                <span className="hz-px-2 hz-py-1 hz-bg-raised hz-r-full hz-t-xs hz-fg-soft">Observability</span>
              </div>
              
              <button className="hz-row hz-ai-center hz-fg-muted hz-transition hz-link">
                <span>Explore DX Platform</span>
                <ArrowRight className="hz-sq-2 hz-ml-2 hz-transition" />
              </button>
            </div>
            
            <DxPlatformSVG />
            
            <motion.div 
              className="hz-abs hz-inset hz-bg-raised hz-invisible hz-transition"
              initial={false}
              whileHover={{ opacity: 0.1 }}
            />
          </motion.div>
        </div>
        
        <div className="hz-grid hz-grid-4 hz-gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -5,
                transition: { duration: 0.2 }
              }}
              className="hz-card hz-transition hz-card-interactive"
            >
              <div className="hz-row hz-ai-center hz-mb-4">
                <div className="hz-sq-6 hz-r-full hz-bg-surface hz-row hz-ai-center hz-jc-center hz-mr-4 hz-transition">
                  <product.icon className="hz-sq-3 hz-fg" />
                </div>
                <h3 className="hz-fg hz-t-lg hz-w-medium">{product.name}</h3>
              </div>
              <p className="hz-fg-muted hz-mb-4">{product.description}</p>
              <div className="hz-fg-faint hz-t-sm hz-italic hz-mb-5">"{product.principle}"</div>
              <Link 
                to={product.path} 
                className="hz-fg-muted hz-t-sm hz-row hz-ai-center hz-transition hz-link"
              >
                <span className="">Learn more</span>
                <ArrowRight className="hz-sq-1 hz-ml-2 hz-transition" />
              </Link>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="hz-card hz-mt-7 hz-align-center"
        >
          <h3 className="hz-t-2xl hz-w-medium hz-mb-4 hz-fg">Seek guidance from a Sensei</h3>
          <p className="hz-container-narrow hz-mw-md hz-fg-muted hz-mb-5">
            Our masters can guide your team through the 64 principles and practices of enlightened engineering.
          </p>
          <Link 
            to="/contact" 
            className="hz-btn hz-btn-primary hz-fg hz-transition"
          >
            Request Sensei Consultation
          </Link>
        </motion.div>
      </div>

      <EcosystemDetail 
        isOpen={selectedSystem === 'cloud'}
        onClose={() => setSelectedSystem(null)}
        type="cloud"
      />

      <EcosystemDetail 
        isOpen={selectedSystem === 'dx'}
        onClose={() => setSelectedSystem(null)}
        type="dx"
      />
    </section>
  );
};

export default ProductsOverview;